"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RenderComponent_1 = require("./base/RenderComponent");
const CanvasManager_1 = require("../managers/CanvasManager");
class TextComponent extends RenderComponent_1.RenderComponent {
    constructor(parent, txtRes, text) {
        super(parent, txtRes);
        this.text = text;
    }
    //-----------------------------------
    // Load from Json
    // Format:
    //	"data": 
    //	[{
    //		"text": "Hello World",
    //		"resource": {
    //			"font": "family",
    //			"color": "#ffffff",
    //			"alignment": "left"
    //		}
    //	}]
    //-----------------------------------
    static Load(temp, json) {
        const str = json.data[0].text;
        const textRes = new TextResource(json.data[0].resource.font, json.data[0].resource.colour, json.data[0].resource.alignment);
        return new TextComponent(temp, textRes, str);
    }
    render() {
        if (this.IsVisible) {
            let ctx = CanvasManager_1.CanvasManager.Instance.GetContext();
            ctx.save();
            // Grab our textResource object
            const resource = this.Resource();
            ctx.font = resource.font;
            ctx.fillStyle = resource.colour;
            ctx.textAlign = resource.alignment;
            // Cache transform and draw
            const transform = this.parent.transform;
            const pos = transform.Position();
            ctx.fillText(this.text, pos.x, pos.y);
            // Restore ctx to its old state
            ctx.restore();
        }
    }
}
exports.TextComponent = TextComponent;
class TextResource {
    constructor(font, colour, alignment) {
        this.font = font;
        this.colour = colour;
        this.alignment = alignment;
    }
}
exports.TextResource = TextResource;
//# sourceMappingURL=TextComponent.js.map