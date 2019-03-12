"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScriptComponent_1 = require("engine/component/base/ScriptComponent");
const InputManager_1 = require("engine/managers/InputManager");
const SceneManager_1 = require("engine/managers/SceneManager");
const ColourComponent_1 = require("engine/component/ColourComponent");
const RigidBodyComponent_1 = require("engine/component/RigidBodyComponent");
class Player extends ScriptComponent_1.ScriptComponent {
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
        if (InputManager_1.InputManager.Instance.IsKeyDown(Keys.Key_W)) {
            // Do something.
            if (this.spawn == null) {
                // Spawn a physics object
                var e = SceneManager_1.SceneManager.Instance.currentScene.CreateEntity("entity", 375, 250, 50, 50);
                new ColourComponent_1.ColourComponent(e, "#ff0000");
                var rb = new RigidBodyComponent_1.RigidBodyComponent(e);
                this.spawn = { e: e, rb: rb };
            }
            this.spawn.rb.Velocity = { x: 0, y: -20 };
        }
    }
    Save() {
        return this.constructor;
    }
}
ScriptDatabase["Player"] = function () { return new Player(); };
//# sourceMappingURL=Player.js.map