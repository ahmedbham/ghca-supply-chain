// Template bicep file for azd project
// This file defines the Azure resources that will be deployed for the project

// Parameters
@description('The environment name')
param environmentName string

@description('The Azure region to deploy to')
param location string = resourceGroup().location

@description('Tags to apply to all resources')
param tags object = {}

@description('Container registry SKU')
param acrSku string = 'Premium'

@description('Enable ACR replication to secondary regions')
param enableReplication bool = false

@description('Secondary regions to replicate ACR to, if enableReplication is true')
param secondaryRegions array = []

// Variables
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))
var prefix = '${environmentName}-${resourceToken}'
var apiServiceName = '${prefix}-api'
var frontendServiceName = '${prefix}-frontend'
var registryName = '${replace(prefix, '-', '')}acr' // ACR name cannot have hyphens

// Container Registry
resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-01-01-preview' = {
  name: registryName
  location: location
  tags: tags
  sku: {
    name: acrSku
  }
  properties: {
    adminUserEnabled: true
  }
}

// ACR Replication for better performance in multi-region deployments
@batchSize(1)
resource acrReplications 'Microsoft.ContainerRegistry/registries/replications@2023-01-01-preview' = [for region in secondaryRegions: if (enableReplication && acrSku == 'Premium') {
  name: region
  parent: containerRegistry
  location: region
  properties: {}
}]

// App Service Plan for API
resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: '${prefix}-asp'
  location: location
  tags: tags
  sku: {
    name: 'B1'
  }
  properties: {
    reserved: true // Required for Linux
  }
}

// Web App for API
resource apiAppService 'Microsoft.Web/sites@2022-03-01' = {
  name: apiServiceName
  location: location
  tags: union(tags, {
    'azd-service-name': 'api'
  })
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'DOCKER|${containerRegistry.properties.loginServer}/api:latest'
      appSettings: [
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${containerRegistry.properties.loginServer}'
        }
        {
          name: 'DOCKER_ENABLE_CI'
          value: 'true'
        }
        {
          name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'false'
        }
      ]
    }
  }
}

// Web App for Frontend
resource frontendAppService 'Microsoft.Web/sites@2022-03-01' = {
  name: frontendServiceName
  location: location
  tags: union(tags, {
    'azd-service-name': 'frontend'
  })
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'DOCKER|${containerRegistry.properties.loginServer}/frontend:latest'
      appSettings: [
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${containerRegistry.properties.loginServer}'
        }
        {
          name: 'DOCKER_ENABLE_CI'
          value: 'true'
        }
        {
          name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'false'
        }
        {
          name: 'API_URL'
          value: 'https://${apiAppService.properties.defaultHostName}'
        }
        {
          name: 'PORT'
          value: '80'
        }
        {
          name: 'WEBSITES_PORT'
          value: '80'
        }
      ]
    }
  }
}

// Add a Log Analytics workspace for diagnostics
resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: '${prefix}-logs'
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
  }
}

// Add diagnostic settings for Container Registry
resource acrDiagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: '${containerRegistry.name}-diagnostics'
  scope: containerRegistry
  properties: {
    workspaceId: logAnalytics.id
    logs: [
      {
        category: 'ContainerRegistryRepositoryEvents'
        enabled: true
      }
      {
        category: 'ContainerRegistryLoginEvents'
        enabled: true
      }
    ]
    metrics: [
      {
        category: 'AllMetrics'
        enabled: true
      }
    ]
  }
}

// Outputs
output API_URI string = 'https://${apiAppService.properties.defaultHostName}'
output FRONTEND_URI string = 'https://${frontendAppService.properties.defaultHostName}'
output ACR_LOGIN_SERVER string = containerRegistry.properties.loginServer
output ACR_NAME string = containerRegistry.name
output LOG_ANALYTICS_WORKSPACE_ID string = logAnalytics.id
