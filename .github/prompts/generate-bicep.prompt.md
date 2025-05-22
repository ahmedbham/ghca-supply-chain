---
mode: 'agent'
---
# This is a prompt for generating Bicep templates for Azure resources.
## Azure Bicep Template Generation
I need to create Bicep templates for deploying my applications to Azure. My application has two components:

1. Backend API (located in /api folder)
2. Frontend app (located in /frontend folder)

Please generate the following Bicep files:

1. **main.bicep**: The main deployment file that references all other modules
2. **containerRegistry.bicep**: For creating an Azure Container Registry to store my container images
3. **containerApps.bicep**: For deploying both applications using Azure Container Apps

Requirements:
- Both applications should be containerized and deployed as Azure Container Apps
- The container images should be stored in Azure Container Registry
- The API should be accessible by the frontend
- Include appropriate parameters and variables for flexibility
- Add comments explaining the purpose of each resource and section
- Include proper tagging for resources
- Set up appropriate networking and security configurations
- Configure scaling rules for both applications

Please provide guidance on how these templates work together and any additional steps I'll need to take to deploy my applications (like building container images and pushing them to ACR).