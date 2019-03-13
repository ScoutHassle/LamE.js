import { ScriptComponent } from "../engine/component/base/ScriptComponent";
import { InputManager, Keys } from "../engine/managers/InputManager";
import { SceneManager } from "../engine/managers/SceneManager";
import { ScriptDatabase } from "../engine/utility/ScriptBuilder";

class SkipSplash extends ScriptComponent {
    
    skipKey: Keys

    constructor() {
        
        super("SkipSplash");
        
        this.skipKey = Keys.Key_Space_Bar;
    }
    
    SetScriptData(json: any): void {
        
        this.skipKey = json.skipKey;
    }
    
    Update(): void {
        
        if(InputManager.Instance.IsKeyDown(this.skipKey)) {
        
            // Go to next scene!
            SceneManager.Instance.ChangeScene(1);
        }
    }
}

ScriptDatabase["SkipSplash"] = function() { return new SkipSplash(); };
