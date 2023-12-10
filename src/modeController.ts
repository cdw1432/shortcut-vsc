import * as vscode from 'vscode';
import cmdMode from './mode/cmdMode';

export class ModeController {
    private cm: cmdMode;
    private statusBar : vscode.StatusBarItem;
    private status:boolean;
    constructor() {
        this.cm = new cmdMode();
        this.status = false;
        this.statusController(this.status);
    }

    keyController(key: string): void {
       if(this.cm.password(key)) {
            this.cm.isActive = !this.cm.isActive;
            this.status = !this.status;
            this.statusController(this.status);
            this.cm.cursorController(this.status);
            return;
       }
       if(this.cm.isActive) {
            this.cm.cmdController(key);
        } else {
            vscode.window.activeTextEditor.edit((editBuilder) => {
                editBuilder.insert(vscode.window.activeTextEditor.selection.active, key);
            });
        } 
    }
    statusController(m: boolean):void {
        if (!this.statusBar) {
            this.statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        }
        this.statusBar.text = (m)? '|‾cmd‾mode‾on‾|' : '|_cmd_mode_off_|';
        this.statusBar.show();
    }
}