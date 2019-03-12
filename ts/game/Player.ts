import { ScriptComponent } from "engine/component/base/ScriptComponent";
import { InputManager } from "engine/managers/InputManager";
import { SceneManager } from "engine/managers/SceneManager";
import { ColourComponent } from "engine/component/ColourComponent";
import { RigidBodyComponent } from "engine/component/RigidBodyComponent";

class Player extends ScriptComponent {
    
    health: number;
    speed: number;
    spawn: any;

    constructor() {
        
        super("Player");
        
        this.health = 10;
        this.speed = 5.0;

        this.spawn = null;
    }
    
    setScriptData(json) {
        
        this.health = json.health;
        this.speed = json.speed;
    }
    
    Update() {
        if(InputManager.Instance.IsKeyDown(Keys.Key_W)) {
            
            // Do something.
            if (this.spawn == null) {
               
                // Spawn a physics object
                var e = SceneManager.Instance.currentScene.CreateEntity("entity", 375, 250, 50, 50);
                new ColourComponent(e, "#ff0000");
                var rb = new RigidBodyComponent(e);

                this.spawn = {e: e, rb: rb};
            }

            this.spawn.rb.Velocity = {x: 0, y: -20};
        }
    }
    
    Save(): any {        
        return this.constructor;
    }
}

ScriptDatabase["Player"] = function() { return new Player(); };
