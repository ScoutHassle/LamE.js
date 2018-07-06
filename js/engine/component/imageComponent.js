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
				ctx = globalCanvas.context;
				var transform = this.parent.transform;
				ctx.drawImage(this.getResource(), transform.x, transform.y, transform.width, transform.height);
			}
		}
		
	}
});

imageComponent.prototype.constructor = imageComponent;