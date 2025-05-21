# Deploying OctoCAT Supply Chain to Azure

This guide provides instructions for deploying the OctoCAT Supply Chain Management System to Azure using the Azure Developer CLI (azd).

## Prerequisites

- Azure CLI installed
- Azure Developer CLI (azd) installed
- Azure subscription
- Node.js (version 18 or higher)

## Deployment Steps

### 1. Install the Azure Developer CLI

If you haven't installed azd yet, you can do so with:

```bash
# For Linux/macOS
curl -fsSL https://aka.ms/install-azd.sh | bash

# For Windows (in PowerShell)
# irm https://aka.ms/install-azd.ps1 | iex
```

### 2. Login to Azure

```bash
azd auth login
```

### 3. Initialize the Environment

From the root of the project:

```bash
azd init
```

This will detect the project structure and services specified in the `azure.yaml` file.

### 4. Provision and Deploy

```bash
azd up
```

This command will:
- Create a resource group (if specified)
- Deploy the infrastructure defined in `infra/main.bicep`
- Build and deploy the API service 
- Build and deploy the frontend
- Configure the necessary connection settings

### 5. Access Your Application

After deployment completes, you'll receive URLs for:
- The API service (running on Azure App Service)
- The frontend application (running on Azure App Service)

The frontend application will be configured to communicate with the API service automatically.

## Monitoring and Troubleshooting

You can monitor your application through the Azure Portal or using Azure CLI commands:

```bash
# View resource group
az group show --name <resource-group-name>

# View logs for the API App Service
az webapp log tail --name <api-app-service-name> --resource-group <resource-group-name>
```

## Clean Up Resources

To remove all resources created by the deployment:

```bash
azd down
```

## CI/CD Integration

For CI/CD integration with GitHub Actions or Azure DevOps, use:

```bash
azd pipeline config
```

This will create the necessary pipeline configuration files for your selected CI/CD provider.
