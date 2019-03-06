import { Entity } from "engine/Entity";
import { RenderComponent } from "./base/RenderComponent";


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
        
        var str = json.data[0].text;
        var textRes = new TextResource( json.data[0].resource.font,
							json.data[0].resource.colour,
							json.data[0].resource.alignment);
							
        return new TextComponent(temp, textRes, str);
    }
    
    render() {
        if(this.IsVisible)
		{
            // TO DO - When we have globalcanvas

            // var ctx = globalCanvas.context;		
			// ctx.save();
				
			// // Grab our textResource object
			// var resource = this.GetResource;				
			// ctx.font = resource.font;
			// ctx.fillStyle = resource.colour;
			// ctx.textAlign = resource.alignment;
				
			// // Cache transform and draw
			// var transform = this.parent.transform;
			// ctx.fillText(this.text, transform.x, transform.y );
				
			// // Restore ctx to its old state
			// ctx.restore();
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