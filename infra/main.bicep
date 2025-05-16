@description('The environment name. This will be used as a prefix for all resources.')
param environmentName string

@description('The name of the application. This will be used as a prefix for all resources.')
param appName string

@description('The name of the ACR.')
param acrName string

@description('The tag of the images to deploy.')
param imageTag string

@description('The location for all resources.')
param location string = resourceGroup().location

// Generate a unique suffix for the resources
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))

// Log Analytics Workspace
module logAnalytics './modules/logAnalytics.bicep' = {
  name: 'logAnalytics'
  params: {
    name: '${toLower(appName)}-${environmentName}-law-${resourceToken}'
    location: location
  }
}

// Calculated ACR resource ID
var acrResourceId = resourceId('Microsoft.ContainerRegistry/registries', acrName)

// Create the web apps for API and Frontend
module webapps './modules/webapps.bicep' = {
  name: 'webapps'
  params: {
    appName: appName
    environmentName: environmentName
    location: location
    resourceToken: resourceToken
    acrName: acrName
    acrResourceId: acrResourceId
    imageTag: imageTag
    logAnalyticsWorkspaceId: logAnalytics.outputs.id
  }
}

// Output the URLs of the API and Frontend apps
output apiHostName string = webapps.outputs.apiHostName
output frontendUrl string = 'https://${webapps.outputs.frontendHostName}'
output apiUrl string = 'https://${webapps.outputs.apiHostName}'
