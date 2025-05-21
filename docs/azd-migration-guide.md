# Azure Developer CLI (azd) Migration Guide

This document outlines the changes made to the OctoCAT Supply Chain Management System to make it compatible with Azure Developer CLI (azd).

## Changes Applied

1. **Project Structure**
   - Verified the existing structure with `/api` and `/frontend` folders
   - Created the `/infra` folder for Azure infrastructure as code

2. **Azure Configuration**
   - Created `azure.yaml` in the root directory to define services
   - Added configuration for API (App Service) and Frontend (App Service)
   - Added post-deployment hooks for configuration

3. **Infrastructure as Code**
   - Created `infra/main.bicep` for infrastructure definition
   - Created `infra/main.parameters.json` for deployment parameters
   - Added post-deployment script to configure environment variables

4. **Frontend Configuration**
   - Updated the Vite configuration to support environment variables
   - Added web.config for App Service SPA hosting
   - Enhanced API configuration to use environment variables
   - Added deployment configuration for App Service

5. **Documentation**
   - Added Azure deployment guide in `/docs/azure-deployment.md`
   - Updated the main README with Azure deployment information
   - Added infrastructure README in `/infra/README.md`

## Testing the Setup

To test the Azure configuration, follow these steps:

1. Verify that the project builds correctly:
   ```bash
   npm run build
   ```

2. Initialize with Azure Developer CLI:
   ```bash
   azd init
   ```
   
   This should correctly identify both the API and Frontend applications.

3. Deploy to Azure:
   ```bash
   azd up
   ```

## Troubleshooting

If you encounter any issues:

1. **Build Errors**: Check that the build scripts in package.json are correctly set up.
2. **azd Init Issues**: Ensure azure.yaml is correctly formatted and in the root directory.
3. **Deployment Errors**: Check the logs and ensure that your Azure subscription has the necessary permissions.

## Next Steps

- Set up CI/CD with GitHub Actions using `azd pipeline config`
- Add monitoring and logging configurations
- Explore additional Azure resources like databases
