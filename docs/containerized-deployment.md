# Containerized Deployment Guide for OctoCAT Supply Chain

This guide explains how to deploy the containerized OctoCAT Supply Chain application to Azure using Azure Developer CLI (azd).

## Architecture

The containerized deployment uses the following Azure resources:

1. **Azure Container Registry (ACR)** - Stores and manages Docker container images for both API and Frontend
2. **Azure App Service** - Hosts both the API and Frontend as containerized applications
3. **Log Analytics Workspace** - Provides monitoring and diagnostics for the applications

## Prerequisites

- Azure CLI installed and logged in
- Azure Developer CLI (azd) installed
- Docker installed and running
- Azure subscription with sufficient permissions

## Deployment Steps

### 1. Initialize the Azure Developer CLI

```bash
azd init
```

This will detect the project structure and prompt you for environment details.

### 2. Deploy the Application

```bash
azd up
```

This will:
1. Provision all Azure resources including Container Registry and App Services
2. Build and push Docker images to Azure Container Registry
3. Configure App Services to pull the images from ACR
4. Set up necessary environment variables and connections between components

### 3. What Happens Behind the Scenes

During deployment:

1. **Infrastructure Provisioning**:
   - Creates a resource group
   - Deploys Azure Container Registry (Premium SKU for multi-region support)
   - Creates App Service Plan and App Services configured for containers
   - Sets up Log Analytics for monitoring

2. **Container Build and Push**:
   - Builds Docker images for both API and Frontend
   - Pushes images to Azure Container Registry
   - Configures App Services to use the latest images

3. **Configuration and Integration**:
   - Enables managed identities for App Services
   - Grants App Services permission to pull from ACR
   - Configures Frontend to communicate with API
   - Sets up continuous deployment for future container updates

## Monitoring and Management

- **Container Logs**: Access logs through the Azure Portal under the App Service -> Log Stream
- **Registry Management**: Manage container images through Azure Container Registry in the Azure Portal
- **Diagnostics**: View application insights and metrics in the Log Analytics workspace

## Scaling the Solution

- **Horizontal Scaling**: Adjust the App Service Plan to scale out instances
- **Geo-replication**: Enable ACR replication to secondary regions for multi-region deployments
- **CI/CD Integration**: Run `azd pipeline config` to set up CI/CD pipelines for container builds

## Troubleshooting

If you encounter issues:

1. Check the App Service logs
2. Verify container registry permissions
3. Ensure container images are properly built and pushed
4. Validate environment variables are correctly set

For detailed logging and diagnostics, access the Log Analytics workspace created during deployment.
