"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
class PhysicsComponent extends Component_1.Component {
    constructor(parent) {
        super(ComponentType.Component_Physics, parent);
    }
    PrePhysicsUpdate() {
    }
    PhysicsUpdate(delta) {
    }
    PostPhysicsUpdate() {
    }
}
exports.PhysicsComponent = PhysicsComponent;
//# sourceMappingURL=PhysicsComponent.js.map