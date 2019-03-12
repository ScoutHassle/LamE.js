import { Entity } from "engine/Entity";
import { RenderComponent } from "./base/RenderComponent";
import { CanvasManager } from "../managers/CanvasManager";


export class TextComponent extends RenderComponent {

    text: string;
    
    constructor(parent: Entity, txtRes: TextResource, text: string){
        
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
    static Load(temp: Entity, json: any): TextComponent {
        
        const str = json.data[0].text;
        const textRes = new TextResource( json.data[0].resource.font,
							json.data[0].resource.colour,
							json.data[0].resource.alignment);
							
        return new TextComponent(temp, textRes, str);
    }
    
    render() {
        if(this.IsVisible)
		{
            let ctx = CanvasManager.Instance.GetContext();		
			ctx.save();
				
			// Grab our textResource object
			const resource = this.Resource();				
			ctx.font = resource.font;
			ctx.fillStyle = resource.colour;
			ctx.textAlign = resource.alignment;
				
			// Cache transform and draw
			const transform = this.parent.transform;
            const pos = transform.Position();
			ctx.fillText(this.text, pos.x, pos.y );
				
			// Restore ctx to its old state
			ctx.restore();
        }
    }
}

export class TextResource {

    font: string;
	colour: string;
	alignment: string;
    
    constructor(font: string, colour: string, alignment: string) {
        this.font = font;
        this.colour = colour;
        this.alignment = alignment;
    }	
}