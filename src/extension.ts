import * as vscode from 'vscode';
import { ModeController } from './modeController';

let modeController:ModeController;
export function activate(context: vscode.ExtensionContext) {
	
	modeController = new ModeController();
	//default cursor style. off
	vscode.workspace.getConfiguration('editor').update('cursorStyle', 'line', vscode.ConfigurationTarget.Workspace);
	
	vscode.commands.registerCommand('ext.cmd_mode', () => modeController.keyController("ctrl+shift+j"));

	vscode.commands.registerCommand('ext.cmd_mode.h', () => modeController.keyController("h"));
	vscode.commands.registerCommand('ext.cmd_mode.j', () => modeController.keyController("j"));
	vscode.commands.registerCommand('ext.cmd_mode.k', () => modeController.keyController("k"));
	vscode.commands.registerCommand('ext.cmd_mode.l', () => modeController.keyController("l"));

	vscode.commands.registerCommand('ext.cmd_mode.q', () => modeController.keyController("q"));
	vscode.commands.registerCommand('ext.cmd_mode.e', () => modeController.keyController("e"));

	vscode.commands.registerCommand('ext.cmd_mode.f', () => modeController.keyController("f"));

}
export function deactivate() {
	try {
		console.log('successfully deactivated.');
	} catch(error) {
		console.log(error);
	}
}
