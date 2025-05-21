# OctoCAT Supply Chain Infrastructure

This folder contains infrastructure as code (IaC) files for deploying the OctoCAT Supply Chain Management System to Azure using the Azure Developer CLI (azd).

## Architecture

The system is deployed with the following resources:

- **Azure Container Registry**: Stores and manages Docker container images
- **API Backend**: Azure App Service running containerized Node.js application
- **Frontend**: Azure App Service running containerized Nginx/React application
- **Log Analytics**: Provides monitoring and diagnostics
- **Configuration**: Environment variables for connecting the components

## Deployment

To deploy this solution:

1. Install the Azure Developer CLI (azd) if you haven't already:
   ```bash
   curl -fsSL https://aka.ms/install-azd.sh | bash
   ```

2. Login to Azure:
   ```bash
   azd auth login
   ```

3. Initialize the environment:
   ```bash
   azd init
   ```

4. Provision and deploy:
   ```bash
   azd up
   ```

## Configuration

After deployment, the Static Web App is configured to communicate with the API via environment variables that are set automatically by the post-deployment hook script.

## Customizing the Infrastructure

The main infrastructure is defined in `main.bicep`. You can modify this file to add additional Azure resources like databases, storage accounts, or other services as needed.
