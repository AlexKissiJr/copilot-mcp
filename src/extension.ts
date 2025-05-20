// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TelemetryReporter } from '@vscode/extension-telemetry';
import { CopilotMcpViewProvider } from './panels/ExtensionPanel';
import { GITHUB_AUTH_PROVIDER_ID, SCOPES } from './utilities/const';
import { defaultMcpConfig } from './defaultConfig';
const connectionString = "InstrumentationKey=2c71cf43-4cb2-4e25-97c9-bd72614a9fe8;IngestionEndpoint=https://westus2-2.in.applicationinsights.azure.com/;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/;ApplicationId=862c3c9c-392a-4a12-8475-5c9ebeff7aaf";


async function showUpdatesToUser(context: vscode.ExtensionContext) {
    const extensionManifest = vscode.extensions.getExtension(context.extension.id)?.packageJSON;
    if (!extensionManifest) {
        return;
    }
    const currentVersion = extensionManifest.version;
    const whatsNewShownForVersionKey = 'whatsNewShownForVersion';

    const lastShownVersion = context.globalState.get<string>(whatsNewShownForVersionKey);

    if (lastShownVersion === undefined || lastShownVersion !== currentVersion) {
        const whatsNewFilePath = vscode.Uri.joinPath(context.extensionUri, 'WHATS_NEW.md');

        try {
            await vscode.workspace.fs.stat(whatsNewFilePath);
            // File exists, show it
            vscode.commands.executeCommand('markdown.showPreview', whatsNewFilePath);
            context.globalState.update(whatsNewShownForVersionKey, currentVersion);
        } catch (error) {
            // File does not exist or other error
            console.error("WHATS_NEW.md not found or could not be accessed: " + whatsNewFilePath.fsPath, error);
            // Still update the version so we don't try to show it every time if the file is missing
            context.globalState.update(whatsNewShownForVersionKey, currentVersion);
        }
    }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	const Octokit = await import("@octokit/rest");
    const telemetryReporter = new TelemetryReporter(connectionString);
    context.subscriptions.push(telemetryReporter);
	const session = await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES, { createIfNone: true, });
	const octokit = new Octokit.Octokit({
		auth: session.accessToken
	});

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "createlex-mcp" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const helloWorldCommand = vscode.commands.registerCommand('createlex-mcp.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from CreateLex MCP!');
	});

	// Register the command to add the default CreateLex MCP server
	const addDefaultServerCommand = vscode.commands.registerCommand('createlex-mcp.addDefaultServer', async () => {
		try {
			// Get the MCP configuration
			const config = vscode.workspace.getConfiguration("mcp");
			const servers = config.get("servers", {} as Record<string, any>);

			// Add the default CreateLex MCP server
			servers["CreateLex-UnrealEngine"] = defaultMcpConfig();

			// Update the configuration
			await config.update("servers", servers, vscode.ConfigurationTarget.Global);

			// Show a notification to the user
			vscode.window.showInformationMessage("CreateLex MCP server for Unreal Engine added successfully!");
		} catch (error) {
			vscode.window.showErrorMessage(`Failed to add CreateLex MCP server: ${error}`);
		}
	});

	// Register the command to select an Unreal Engine project
	const selectUnrealProjectCommand = vscode.commands.registerCommand('createlex-mcp.selectUnrealProject', async () => {
		try {
			// Show a folder picker dialog
			const folderUri = await vscode.window.showOpenDialog({
				canSelectFiles: false,
				canSelectFolders: true,
				canSelectMany: false,
				openLabel: 'Select Unreal Engine Project Folder'
			});

			if (folderUri && folderUri.length > 0) {
				const projectPath = folderUri[0].fsPath;

				// Check if the MCP server file exists in the expected location
				const mcpServerPath = vscode.Uri.joinPath(folderUri[0], 'Plugins', 'UnrealGenAISupport', 'Content', 'Python', 'mcp_server.py');

				try {
					await vscode.workspace.fs.stat(mcpServerPath);

					// MCP server file exists, update the configuration
					const config = vscode.workspace.getConfiguration("mcp");
					const servers = config.get("servers", {} as Record<string, any>);

					// Update or add the CreateLex MCP server configuration
					servers["CreateLex-UnrealEngine"] = defaultMcpConfig(projectPath);

					// Update the configuration
					await config.update("servers", servers, vscode.ConfigurationTarget.Global);

					// Show a notification to the user
					vscode.window.showInformationMessage("Unreal Engine project selected successfully!");
				} catch (error) {
					// MCP server file doesn't exist
					vscode.window.showErrorMessage(`MCP server not found at ${mcpServerPath.fsPath}. Please make sure the UnrealGenAISupport plugin is installed.`);
				}
			}
		} catch (error) {
			vscode.window.showErrorMessage(`Failed to select Unreal Engine project: ${error}`);
		}
	});

	context.subscriptions.push(helloWorldCommand);
	context.subscriptions.push(addDefaultServerCommand);
	context.subscriptions.push(selectUnrealProjectCommand);

	const provider = new CopilotMcpViewProvider(context.extensionUri, session.accessToken, telemetryReporter, session);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(CopilotMcpViewProvider.viewType, provider)
	);

	// Show "What's New" page if the extension has been updated
	// await showUpdatesToUser(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
