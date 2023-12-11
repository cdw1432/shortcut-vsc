/* Command Mode */
import * as vscode from 'vscode';
class Cursor {
    static currentPosition(): vscode.Position {
        return vscode.window.activeTextEditor?.selection.active || new vscode.Position(0, 0);
    }
    toWordStart(): void {
        const currentPosition = Cursor.currentPosition();
        const newPosition = vscode.commands.executeCommand<vscode.Position>(
            "cursorWordLeft",
            { to: "wrappedLineFirstNonWhitespaceCharacter", by: "word" },
            currentPosition
        );

        if (newPosition instanceof vscode.Position) {
            vscode.window.activeTextEditor.selection = new vscode.Selection(newPosition, newPosition);
        }
    }

    toWordEnd(): void {
        const currentPosition = Cursor.currentPosition();
        const newPosition = vscode.commands.executeCommand<vscode.Position>(
            "cursorWordRight",
            { to: "wrappedLineLastNonWhitespaceCharacter", by: "word" },
            currentPosition
        );

        if (newPosition instanceof vscode.Position) {
            vscode.window.activeTextEditor.selection = new vscode.Selection(newPosition, newPosition);
        }
    }
}

export default class cmdMode {
    private active: boolean;
    private cursor: Cursor;
    constructor() {
        this.active = false;
        this.cursor = new Cursor();
    }
    get isActive(): boolean {
        return this.active;
    }
    set isActive(v: boolean) {
        this.active = v;
    }
    password(key: string): boolean {
        return key === 'ctrl+shift+j';
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
                case 'q':
                    this.cursor.toWordStart();
                    break;       
                case 'e':
                    this.cursor.toWordEnd();
                    break;
            }
        }
    }
    cursorController(s: boolean) {
        if(s) {
            vscode.workspace.getConfiguration('editor').update('cursorStyle', 'block', vscode.ConfigurationTarget.Workspace);
        } else {
            vscode.workspace.getConfiguration('editor').update('cursorStyle', 'line', vscode.ConfigurationTarget.Workspace);

        }
    }
}