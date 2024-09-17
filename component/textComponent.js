function textResource(font, colour, alignment)
{
	this.font = font;
	this.colour = colour;
	this.alignment = alignment;
}

class TextComponent extends RenderComponent {
    
    constructor(entity, txtRes, text) {
        
        super(entity, txtRes);
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
    static load(temp, json) {
        
        var str = json.data[0].text;
        var textRes = new textResource( json.data[0].resource.font,
							json.data[0].resource.colour,
							json.data[0].resource.alignment);
							
        return new TextComponent(temp, textRes, str);
    }
    
    render() {
        if(this.IsVisible)
		{
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
