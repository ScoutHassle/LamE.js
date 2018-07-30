//-----------------------------------
// Constructor
//-----------------------------------
function imageComponent(parent, r)
{
	renderComponent.call(this, parent, r);
}

//-----------------------------------
// Inheritance
//-----------------------------------
imageComponent.prototype = Object.create(renderComponent.prototype, {
	update: {
		value: function() {
		}
	},
	
	render: {
		value: function() {
			if(this.isVisible())
			{
				var ctx = globalCanvas.context;
				var transform = this.parent.transform;
				ctx.drawImage(this.getResource(), transform.x, transform.y, transform.width, transform.height);
			}
		}
		
	}
});

imageComponent.prototype.constructor = imageComponent;

//-----------------------------------
// Load from Json
// Format:
//	"data": 
//	[{
//		"file": "FILENAME.EXT"
//	}]
//-----------------------------------
imageComponent.load = function(temp, json) {
	
	var path = json.data[0].file;
	return new imageComponent(temp, resourceManager.loadResource(path, resource_type_image));
}
