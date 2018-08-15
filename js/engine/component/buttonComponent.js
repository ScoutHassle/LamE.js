/*//-----------------------------------
// Constructor
//-----------------------------------
function buttonComponent(parent)
{
	inputComponent.call(this, parent);
}

//-----------------------------------
// Inheritance
//-----------------------------------
buttonComponent.prototype = Object.create(inputComponent.prototype, {
	update: {
		value: function() {
		}
	},
	
	shutdown: {
		value: function() {
			inputComponent.prototype.shutdown.apply(this);
		}
	},
	
	onTouchStart: {
		value: function(touch) {
			
			if(this.touchBoundCheck(touch))
			{
				this.triggerTouchEvent(TouchEventType.Touch_Start, touch);
				this.setTouchId(touch.identifier);
				
				return true;
			}
			
			return false;
		}
	},

	onTouchMove: {
		value: function(touch)	{
			
			if(this.touchBoundCheck(touch))
			{
				if(this.validTouchId(touch.identifier))
				{
					this.triggerTouchEvent(TouchEventType.Touch_Start, touch);
					
					return true;
				}
			}
			
			return false;
		}
	},
	
	onTouchEnd: {
		value: function(touch) {
			
			if(this.touchBoundCheck(touch))
			{
				if(this.validTouchId(touch.identifier))
				{
					this.triggerTouchEvent(TouchEventType.Touch_End, touch);
					this.clearTouchId();
					
					return true;
				}
			}
			
			return false;
		}
	}
});

buttonComponent.prototype.constructor = buttonComponent;

//-----------------------------------
// Extend
//-----------------------------------
buttonComponent.prototype.touchBoundCheck = function(touch)
{
	// Cache
	var transform = this.parent.transform;
	
	if((touch.pageX > transform.x && touch.pageX < (transform.x + transform.width)) &&
		(touch.pageY < (transform.y + transform.height) && touch.pageY > transform.y))
	{
		return true;
	}
		
	return false;
};*/
