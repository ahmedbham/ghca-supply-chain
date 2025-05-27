---
mode: 'agent'
---
# This is a prompt for setting up the Azure Developer CLI (azd) environment.
## Azure Developer CLI (azd) Project Structure Setup

I'll help you restructure your project to make it compatible with Azure Developer CLI (azd). When you run `azd init`, we want it to correctly identify and manage two separate applications: one in the `/api` folder and another in the `/front` folder.

### Required Changes

1. **Project Structure**: Ensure your project follows this structure:
    ```
    /
    ├── api/              # Backend application
    │   ├── package.json  # (or equivalent for your language)
    │   └── ...
    ├── front/            # Frontend application
    │   ├── package.json  # (or equivalent for your language) 
    │   └── ...
    ├── infra/            # Infrastructure as Code
    │   ├── main.bicep    # Main Bicep file
    │   └── ...
    └── azure.yaml        # Azure config file
    ```

2. **Create an `azure.yaml` file** in the root directory with the following content:
    ```yaml
    name: your-application-name
    services:
      api:
         project: ./api
         language: js # or appropriate language
         host: containerapp
      frontend:
         project: ./frontend
         language: js # or appropriate language
         host: containerapp
    ```

3. **Place appropriate language indicators** in each folder:
    - For Node.js applications: Ensure `package.json` exists
    - For .NET applications: Include `.csproj` or `.sln` files
    - For Python applications: Include `requirements.txt`
    - For Java applications: Include `pom.xml` or `build.gradle`

4. **Create required bicep files** to help azd implement the project structure.

When you run `azd init` after making these changes, it should correctly identify both applications and allow you to proceed with the initialization process.