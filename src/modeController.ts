import cmdMode from './mode/cmdMode';

export class ModeController {
    private cm: cmdMode;

    constructor() {
        this.cm = new cmdMode();
    }

    keyController(key: string): void {
       if(this.cm.password(key)) {
            this.cm.isActive = !this.cm.isActive;
            
            if(this.cm.isActive) {
                this.cm.on();
            } else {
                this.cm.off();
            }
       }
       this.cm.cmdController(key);
    }
}