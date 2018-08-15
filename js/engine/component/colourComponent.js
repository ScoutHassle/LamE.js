/*//-----------------------------------
// Constructor
//-----------------------------------
function colourComponent(parent, r)
{
	renderComponent.call(this, parent, r);
}

//-----------------------------------
// Inheritance
//-----------------------------------
colourComponent.prototype = Object.create(renderComponent.prototype, {
	update: {
		value: function() {
		}
	},
	
	render: {
		value: function() {
			if(this.isVisible())
			{
				ctx = globalCanvas.context;
				ctx.fillStyle = this.getResource();
				
				var transform = this.parent.transform;
				ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
			}
		}
		
	}
});

colourComponent.prototype.constructor = colourComponent;

//-----------------------------------
// Load from Json
// Format:
//	"data": 
//	[{
//		"colour": "#ffffff"
//	}]
//-----------------------------------
colourComponent.load = function(temp, json) {
	
	var colour = json.data[0].colour;
	return new colourComponent(temp, colour);
}*/
