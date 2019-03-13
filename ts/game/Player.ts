import { ScriptComponent } from "../engine/component/base/ScriptComponent";
import { InputManager, Keys } from "../engine/managers/InputManager";
import { SceneManager } from "../engine/managers/SceneManager";
import { ColourComponent } from "../engine/component/ColourComponent";
import { RigidBodyComponent } from "../engine/component/RigidBodyComponent";
import { ScriptDatabase } from "../engine/utility/ScriptBuilder";
import { Vector2 } from "../engine/utility/Vector2";

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
    
    SetScriptData(json: any): void {
        
        this.health = json.health;
        this.speed = json.speed;
    }
    
    Update(): void {
        if(InputManager.Instance.IsKeyDown(Keys.Key_W)) {
            
            // Do something.
            if (this.spawn == null) {
               
                // Spawn a physics object
                let e = SceneManager.Instance.currentScene.CreateEntity("entity", 375, 250, 50, 50);
                e.AddComponent(new ColourComponent(e, "#ff0000"));
                let rb = new RigidBodyComponent(e);
                e.AddComponent(rb);

                this.spawn = {e: e, rb: rb};
            }

            let vel: Vector2 = this.spawn.rb.Velocity();
            vel.Add(new Vector2(0, -20));
            this.spawn.rb.SetVelocity(vel);
        }
    }
    
    Save(): any {        
        return this.constructor;
    }
}

ScriptDatabase["Player"] = function() { return new Player(); };
