import { ScriptComponent } from "engine/component/base/ScriptComponent";
import { InputManager } from "engine/managers/InputManager";
import { SceneManager } from "engine/managers/SceneManager";

class SkipSplash extends ScriptComponent {
    
    skipKey: Keys

    constructor() {
        
        super("SkipSplash");
        
        this.skipKey = Keys.Key_Space_Bar;
    }
    
    setScriptData(json) {
        
        this.skipKey = json.skipKey;
    }
    
    update() {
        
        if(InputManager.Instance.IsKeyDown(this.skipKey)) {
        
            // Go to next scene!
            SceneManager.Instance.ChangeScene(1);
        }
    }
}

ScriptDatabase["SkipSplash"] = function() { return new SkipSplash(); };
