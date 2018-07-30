function textResource(font, colour, alignment)
{
	this.font = font;
	this.colour = colour;
	this.alignment = alignment;
}

//-----------------------------------
// Constructor
//-----------------------------------
function textComponent(parent, txtRes, text)
{
	renderComponent.call(this, parent, txtRes);
	
	this.text = text;
}

//-----------------------------------
// Inheritance
//-----------------------------------
textComponent.prototype = Object.create(renderComponent.prototype, {
	update: {
		value: function() {
		}
	},
	
	render: {
		value: function() {
			if(this.isVisible())
			{
				var ctx = globalCanvas.context;		
				ctx.save();
				
				// Grab our textResource object
				var resource = this.getResource();				
				ctx.font = resource.font;
				ctx.fillStyle = resource.colour;
				ctx.textAlign = resource.alignment;
				
				// Cache transform and draw
				var transform = this.parent.transform;
				ctx.fillText(this.text, transform.x, transform.y );
				
				// Restore ctx to its old state
				ctx.restore();
			}
		}
		
	}
});

textComponent.prototype.constructor = textComponent;

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
textComponent.load = function(temp, json) {
	
	var str = json.data[0].text;
	var textRes = new textResource( json.data[0].resource.font,
							json.data[0].resource.colour,
							json.data[0].resource.alignment);
							
	return new textComponent(temp, textRes, str);
}
