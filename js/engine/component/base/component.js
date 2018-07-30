var ComponentType = {
	"Component_Base": 1,
	"Component_Renderable": 2,
	"Component_Input": 3 };
Object.freeze(ComponentType);

//-----------------------------------
// Constructor
//-----------------------------------
function component(type, parent) {
	this.type = type;
	this.parent = parent;
	parent.addComponent(this);
}

//-----------------------------------
// Extend
//-----------------------------------
component.prototype.getParent = function() {
	
	return this.parent;
};

component.prototype.update = function() {
	
};

component.prototype.shutdown = function() {
	
	this.parent = null; // Clear the reference
};
