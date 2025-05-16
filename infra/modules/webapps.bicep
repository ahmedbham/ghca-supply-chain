@description('The name of the application.')
param appName string

@description('The environment name.')
param environmentName string

@description('The location for all resources.')
param location string

@description('A unique string for resource names.')
param resourceToken string

@description('The name of the ACR.')
param acrName string

@description('The ACR resource ID')
param acrResourceId string

@description('The tag of the image to deploy.')
param imageTag string

@description('The Log Analytics workspace ID')
param logAnalyticsWorkspaceId string

// Names for the web apps
var apiWebAppName = '${toLower(appName)}-${environmentName}-api-${resourceToken}'
var frontendWebAppName = '${toLower(appName)}-${environmentName}-frontend-${resourceToken}'

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: '${toLower(appName)}-${environmentName}-plan-${resourceToken}'
  location: location
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
  properties: {
    reserved: true // Required for Linux
  }
}

// API Web App
resource apiWebApp 'Microsoft.Web/sites@2022-03-01' = {
  name: apiWebAppName
  location: location
  tags: {
    'azd-env-name': environmentName
    'azd-service-name': 'api'
  }
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    clientAffinityEnabled: false
    siteConfig: {
      linuxFxVersion: 'DOCKER|${acrName}.azurecr.io/octocat-api:${imageTag}'
      acrUseManagedIdentityCreds: true
      cors: {
        allowedOrigins: [
          'https://${frontendWebAppName}.azurewebsites.net'
        ]
      }
      appSettings: [
        {
          name: 'API_CORS_ORIGINS'
          value: 'https://${frontendWebAppName}.azurewebsites.net'
        }
        {
          name: 'WEBSITES_PORT'
          value: '3000'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${acrName}.azurecr.io'
        }
        {
          name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'false'
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: applicationInsights.properties.ConnectionString
        }
      ]
    }
  }
}

// Frontend Web App
resource frontendWebApp 'Microsoft.Web/sites@2022-03-01' = {
  name: frontendWebAppName
  location: location
  tags: {
    'azd-env-name': environmentName
    'azd-service-name': 'frontend'
  }
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    clientAffinityEnabled: false
    siteConfig: {
      linuxFxVersion: 'DOCKER|${acrName}.azurecr.io/octocat-frontend:${imageTag}'
      acrUseManagedIdentityCreds: true
      appSettings: [
        {
          name: 'API_HOST'
          value: '${apiWebAppName}.azurewebsites.net'
        }
        {
          name: 'API_PORT'
          value: '80'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${acrName}.azurecr.io'
        }
        {
          name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'false'
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: applicationInsights.properties.ConnectionString
        }
      ]
    }
  }
}

// Application Insights
resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${toLower(appName)}-${environmentName}-ai-${resourceToken}'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalyticsWorkspaceId
  }
}

// Role assignments for the web apps
resource apiAcrPullRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(apiWebApp.id, acrResourceId, 'acrpull')
  scope: resourceGroup()
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d') // AcrPull role
    principalId: apiWebApp.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

resource frontendAcrPullRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(frontendWebApp.id, acrResourceId, 'acrpull')
  scope: resourceGroup()
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d') // AcrPull role
    principalId: frontendWebApp.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

// Outputs
output apiHostName string = apiWebApp.properties.defaultHostName
output frontendHostName string = frontendWebApp.properties.defaultHostName
