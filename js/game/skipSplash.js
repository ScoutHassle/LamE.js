"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScriptComponent_1 = require("engine/component/base/ScriptComponent");
const InputManager_1 = require("engine/managers/InputManager");
const SceneManager_1 = require("engine/managers/SceneManager");
class SkipSplash extends ScriptComponent_1.ScriptComponent {
    constructor() {
        super("SkipSplash");
        this.skipKey = Keys.Key_Space_Bar;
    }
    setScriptData(json) {
        this.skipKey = json.skipKey;
    }
    update() {
        if (InputManager_1.InputManager.Instance.IsKeyDown(this.skipKey)) {
            // Go to next scene!
            SceneManager_1.SceneManager.Instance.ChangeScene(1);
        }
    }
}
ScriptDatabase["SkipSplash"] = function () { return new SkipSplash(); };
//# sourceMappingURL=SkipSplash.js.map