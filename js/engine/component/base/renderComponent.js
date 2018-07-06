//-----------------------------------
// Constructor
//-----------------------------------
function renderComponent(parent, r)
{
	component.call(this, ComponentType.Component_Renderable, parent);
	
	//-----------------------------------
	// Private Vars
	//-----------------------------------
	var resource = r;
	var visible = true;	
	
	//-----------------------------------
	// Getters
	//-----------------------------------	
	this.getResource = function() {
		return resource;
	};
	
	this.isVisible = function() {
	
		return visible;
	};
	
	//-----------------------------------
	// Setters
	//-----------------------------------
	this.setResource = function(r) {
		resource = r;
	};
	
	this.setVisible = function(state) {
	
		visible = state;
	};
}

//-----------------------------------
// Inheritance
//-----------------------------------
renderComponent.prototype = Object.create(component.prototype, {
	update: {
		value: function() {
		}
	},
	
	shutdown: {
		value : function() {
			component.prototype.shutdown.apply(this);
			
			// Should we just let our inherited handle their resource?
			resource = null;
		}
	}
});

renderComponent.prototype.constructor = renderComponent;

//-----------------------------------
// Extend
//-----------------------------------
renderComponent.prototype.render = function(){
	
};
