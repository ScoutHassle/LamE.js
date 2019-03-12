"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transform_1 = require("./Transform");
class Entity {
    constructor(name, x, y, w, h) {
        this.name = name;
        this.transform = new Transform_1.Transform(x, y, w, h);
    }
    AddComponent(component) {
        if (component != null) {
            this.components.push(component);
        }
    }
    // Needs work... Component UID?
    RemoveComponent(index) {
        this.components.splice(index, 1);
    }
    Update() {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].Update();
        }
    }
    Render() {
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i].Render) {
                this.components[i].Render();
            }
        }
    }
    Shutdown() {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].shutdown();
        }
        this.transform = null;
        this.components.splice(0, this.components.length);
    }
    GetComponentAt(i) {
        return this.components[i];
    }
    GetComponentIndexOfBaseType(type) {
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i].type === type) {
                return i;
            }
        }
        return -1;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map