"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Component {
    constructor(type, parent) {
        this.type = type;
        this.parent = parent;
    }
    Parent() {
        return this.parent;
    }
    Update() {
    }
    Shutdown() {
    }
    Save() {
        return JSON.stringify(Flatten(this));
    }
}
exports.Component = Component;
//# sourceMappingURL=Component.js.map