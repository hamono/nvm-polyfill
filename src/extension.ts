// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { posix } from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	if(vscode.workspace.workspaceFolders){
		const folderUri = vscode.workspace.workspaceFolders[0].uri;
		const fileUri = folderUri.with({ path: posix.join(folderUri.path, '.nvmrc') });

		const readData = await vscode.workspace.fs.readFile(fileUri);
		const readStr = Buffer.from(readData).toString('utf8');

		const ter = vscode.window.createTerminal({hideFromUser: true});
		ter.show();
		ter.sendText(`nvm use ${readStr.slice(1)}`);
	}

}

// this method is called when your extension is deactivated
export function deactivate() {}
