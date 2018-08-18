'use strict';

class SkipSplash extends ScriptComponent {
    
    constructor() {
        
        super("SkipSplash");
        
        this.skipKey = key_Space_Bar;
    }
    
    setScriptData(json) {
        
        this.skipKey = json.skipKey;
    }
    
    update() {
        
        if(inputManager.isKeyDown(this.skipKey)) {
        
            // Go to next scene!
            sceneManager.changeScene(1);
        }
    }
}

scriptDatabase["SkipSplash"] = function() { return new SkipSplash(); };