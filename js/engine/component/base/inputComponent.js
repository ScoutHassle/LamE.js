var TouchEventType = {
	"Touch_Start":1,
	"Touch_Move":2,
	"Touch_End":3 };
Object.freeze(TouchEventType);

//-----------------------------------
// Constructor
//-----------------------------------
function inputComponent(parent)
{
	component.call(this, ComponentType.Component_Input, parent);
	
	var touchId = -1;
	var onTouchStartEvent = null;
	var onTouchMoveEvent = null;
	var onTouchEndEvent = null;
	
	// Add to the inputManager
	inputManager.addInputComponent(this);
	
	this.setTouchId = function(id)
	{
		touchId = id;
	};
	
	this.validTouchId = function(id)
	{
		if(touchId == id && touchId != -1) return true;
		
		return false;
	};
	
	this.clearTouchId = function()
	{
		touchId = -1;
	};
	
	this.setTouchEvent = function(type, func)
	{
		switch(type)
		{
			case TouchEventType.Touch_Start:
				onTouchStartEvent = func;
			break;
			
			case TouchEventType.Touch_Move:
				onTouchMoveEvent = func;
			break;
			
			case TouchEventType.Touch_End:
				onTouchEndEvent = func;
			break;
		}
	};
	
	this.triggerTouchEvent = function(type, touch)
	{
		switch(type)
		{
			case TouchEventType.Touch_Start:
				if(onTouchStartEvent != null) onTouchStartEvent(touch);
			break;
			
			case TouchEventType.Touch_Move:
				if(onTouchMoveEvent != null) onTouchMoveEvent(touch);
			break;
			
			case TouchEventType.Touch_End:
				if(onTouchEndEvent != null) onTouchEndEvent(touch);
			break;
		}
	};
}

//-----------------------------------
// Inheritance
//-----------------------------------
inputComponent.prototype = Object.create(component.prototype, {
	update: {
		value: function() {
		}
	},
	
	shutdown: {
		value: function() {
			component.prototype.shutdown.apply(this);
			
			onTouchStartEvent = null;
			onTouchMoveEvent = null;
			onTouchEndEvent = null;
			
			inputManager.removeInputComponent(this);
		}
	}
});

inputComponent.prototype.constructor = inputComponent;

//-----------------------------------
// Extend
//-----------------------------------
inputComponent.prototype.onTouchStart = function(touch)
{
	return false;
}

inputComponent.prototype.onTouchMove = function(touch)
{
	return false;
}

inputComponent.prototype.onTouchEnd = function(touch)
{
	return false;
}	
