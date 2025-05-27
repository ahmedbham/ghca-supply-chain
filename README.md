# 🚀 OctoCAT Supply Chain: The Ultimate GitHub Copilot Demo

![OctoCAT Supply Chain](./frontend/public/hero.png)

## Introduction
The purpose of this branch is to demonstrate using GitHub Copilot to generate Bicep templates for an Azure Developer CLI (azd) project structure. This project is structured to support both a backend API and a frontend application, with infrastructure managed through Bicep.

## Instructions
1. Open the `.github/azd-setup.prompt.md` file.
2. Open GitHub Copilot Chat and set MODE to `agent`.
3. Type `run the prompt` in the chat input.
4. Review the generated Bicep templates in the `infra/` directory.
5. Ensure the project structure is as follows:
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
6. Ensure the `azure.yaml` file is correctly configured to point to both the API and frontend applications.
7. Run `azd init` to initialize the Azure Developer CLI project.
8. If there are any errors, use GitHub Copilot in Agent Mode to troubleshoot and fix them by modifying the Bicep templates or the project structure as needed.
9. Once everything is set up, you can deploy your applications using `azd up`.
10. Execute `azd pipepline config` to create a CI/CD pipeline for your project.