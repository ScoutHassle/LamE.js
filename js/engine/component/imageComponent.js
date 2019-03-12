"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RenderComponent_1 = require("./base/RenderComponent");
const CanvasManager_1 = require("../managers/CanvasManager");
const ResourceManager_1 = require("../managers/ResourceManager");
class ImageComponent extends RenderComponent_1.RenderComponent {
    constructor(parent, r) {
        super(parent, r);
    }
    static Load(temp, json) {
        const path = json.data[0].file;
        const imgComp = new ImageComponent(temp, ResourceManager_1.ResourceManager.Instance.LoadResource(path, ResourceType.Image));
        return imgComp;
    }
    render() {
        if (this.IsVisible) {
            const ctx = CanvasManager_1.CanvasManager.Instance.GetContext();
            const transform = this.parent.transform;
            const pos = transform.Position();
            const size = transform.Size();
            ctx.drawImage(this.Resource(), pos.x, pos.y, size.x, size.y);
        }
    }
}
exports.ImageComponent = ImageComponent;
//# sourceMappingURL=ImageComponent.js.map