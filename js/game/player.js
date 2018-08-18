'use strict';

class Player extends ScriptComponent {
    
    constructor() {
        
        super("Player");
        
        this.health = 10;
        this.speed = 5.0;
    }
    
    setScriptData(json) {
        
        this.health = json.health;
        this.speed = json.speed;
    }
    
    update() {
        
        if(inputManager.isKeyDown(key_W)) {
            
            // Do something.
        }
    }
    
    save() {
        
        return this.constructor;
    }
}

scriptDatabase["Player"] = function() { return new Player(); };
