import { ScriptComponent } from "engine/component/base/ScriptComponent";

class Player extends ScriptComponent {
    
    health: number;
    speed: number;


    constructor() {
        
        super("Player");
        
        this.health = 10;
        this.speed = 5.0;
    }
    
    setScriptData(json) {
        
        this.health = json.health;
        this.speed = json.speed;
    }
    
    Update() {
        
    }
    
    Save() {
        
        return this.constructor;
    }
}

ScriptDatabase["Player"] = function() { return new Player(); };
