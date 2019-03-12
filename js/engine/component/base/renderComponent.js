"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
class RenderComponent extends Component_1.Component {
    constructor(parent, resource) {
        super(ComponentType.Component_Renderable, parent);
        this.resource = resource;
        this.visible = true;
    }
    Resource() {
        return this.resource;
    }
    SetResource(resource) {
        this.resource = resource;
    }
    IsVisible() {
        return this.visible;
    }
    SetVisible(state) {
        this.visible = state;
    }
    Update() {
    }
    Shutdown() {
        super.Shutdown();
        this.resource = null;
    }
    Render() {
    }
}
exports.RenderComponent = RenderComponent;
//# sourceMappingURL=RenderComponent.js.map