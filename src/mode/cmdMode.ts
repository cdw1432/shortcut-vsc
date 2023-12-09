/* Command Mode */
import * as vscode from 'vscode';

export default class cmdMode {
    private active: boolean;

    constructor() {
        this.active = false;
    }
    get isActive(): boolean {
        return this.active;
    }
    set isActive(v: boolean) {
        this.active = v;
    }
    password(key: string): boolean {
        return key === 'ctrl+shift+alt+a';
    }
    on() {
        vscode.workspace.getConfiguration('editor').update('cursorStyle', 'block', vscode.ConfigurationTarget.Global);
    }
    cmdController(cmd: string): void {
        if(this.active) {
            switch(cmd) {
                case 'h':
                    vscode.commands.executeCommand("cursorLeft");
                    break;
                case 'j':
                    vscode.commands.executeCommand("cursorDown");
                    break;
                case 'k':
                    vscode.commands.executeCommand("cursorUp");
                    break;
                case 'l':
                    vscode.commands.executeCommand("cursorRight");
                    break;        
            }
        }
    }
    off() {
        vscode.workspace.getConfiguration('editor').update('cursorStyle', 'line', vscode.ConfigurationTarget.Global);
    }
}