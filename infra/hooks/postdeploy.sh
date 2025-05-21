#!/bin/bash

# This script builds and pushes container images to ACR, then sets up environment variables
# It is executed by azd after deployment

# Get the API URL and ACR information from the output variables
API_URI=$(azd env get-values | grep API_URI | cut -d= -f2 | tr -d '"')
ACR_LOGIN_SERVER=$(azd env get-values | grep ACR_LOGIN_SERVER | cut -d= -f2 | tr -d '"')
ACR_NAME=$(azd env get-values | grep ACR_NAME | cut -d= -f2 | tr -d '"')

echo "API URI: $API_URI"
echo "ACR Login Server: $ACR_LOGIN_SERVER"
echo "ACR Name: $ACR_NAME"

# Get the frontend app service name
FRONTEND_URI=$(azd env get-values | grep FRONTEND_URI | cut -d= -f2 | tr -d '"')
FRONTEND_NAME=$(echo $FRONTEND_URI | sed 's/https:\/\///' | sed 's/\.azurewebsites\.net//')
API_NAME=$(echo $API_URI | sed 's/https:\/\///' | sed 's/\.azurewebsites\.net//')

# Login to Azure Container Registry
echo "Logging in to Azure Container Registry..."
az acr login --name $ACR_NAME

# Get the working directory
WORKING_DIR=$(pwd)
echo "Working directory: $WORKING_DIR"

# Build and push API container
echo "Building and pushing API container..."
cd $WORKING_DIR/api
docker build -t $ACR_LOGIN_SERVER/api:latest .
docker push $ACR_LOGIN_SERVER/api:latest

# Build and push frontend container
echo "Building and pushing frontend container..."
cd $WORKING_DIR/frontend
docker build -t $ACR_LOGIN_SERVER/frontend:latest .
docker push $ACR_LOGIN_SERVER/frontend:latest

# Ensure Azure Web Apps have permissions to pull from ACR
# Get the managed identity IDs for both web apps
echo "Assigning ACR pull permissions to web apps..."
API_MI_PRINCIPAL_ID=$(az webapp identity show --name $API_NAME --query principalId -o tsv)
FRONTEND_MI_PRINCIPAL_ID=$(az webapp identity show --name $FRONTEND_NAME --query principalId -o tsv)

# Assign the AcrPull role to the web app managed identities
echo "Assigning AcrPull role to API web app..."
az role assignment create \
  --assignee-object-id $API_MI_PRINCIPAL_ID \
  --assignee-principal-type ServicePrincipal \
  --scope $(az acr show --name $ACR_NAME --query id -o tsv) \
  --role AcrPull

echo "Assigning AcrPull role to Frontend web app..."
az role assignment create \
  --assignee-object-id $FRONTEND_MI_PRINCIPAL_ID \
  --assignee-principal-type ServicePrincipal \
  --scope $(az acr show --name $ACR_NAME --query id -o tsv) \
  --role AcrPull

# Restart the web apps to pick up the new images
echo "Restarting web apps to pick up new images..."
az webapp restart --name $API_NAME
az webapp restart --name $FRONTEND_NAME

echo "Containerized deployment completed successfully!"
