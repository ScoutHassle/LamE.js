"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RenderComponent_1 = require("./base/RenderComponent");
const CanvasManager_1 = require("../managers/CanvasManager");
class ColourComponent extends RenderComponent_1.RenderComponent {
    constructor(parent, colour) {
        super(parent, colour);
    }
    static Load(temp, json) {
        const colour = json.data[0].colour;
        return new ColourComponent(temp, colour);
    }
    Render() {
        if (this.visible) {
            // TO DO - Port GlobalCanvas for context etc.
            let ctx = CanvasManager_1.CanvasManager.Instance.GetContext();
            ctx.fillStyle = this.Resource();
            const transform = this.Parent().transform;
            const pos = transform.Position();
            const size = transform.Size();
            ctx.fillRect(pos.x, pos.y, size.x, size.y);
        }
    }
}
exports.ColourComponent = ColourComponent;
//# sourceMappingURL=ColourComponent.js.map