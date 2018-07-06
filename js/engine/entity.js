var ExtendedComponentType = {
	"Component_Colour":1,
	"Component_Image":2,
	"Component_Text":3,
	"Component_Button":4 };
Object.freeze(ExtendedComponentType);


function entity(name, x, y, w, h) {
	
	this.name = name;
	this.transform = new transform(x, y, w, h);
	this.components = [];
}

entity.prototype.addComponent = function(component) {
	
	this.components.push(component);
};

entity.prototype.removeComponent = function(index) {
	
	this.components.splice(index, 1);
};

entity.prototype.update = function() {
	
	for(var i = 0; i < this.components.length; i++)
	{
		this.components[i].update();
	}
};

entity.prototype.render = function() {
	
	for(var i = 0; i < this.components.length; i++)
	{
		if(this.components[i].render)
		{
			this.components[i].render();
		}
	}
};

entity.prototype.shutdown = function() {
	
	for(var i = 0; i < this.components.length; i++)
	{
		this.components[i].shutdown();
	}
	
	this.transform = null;
	this.components.splice(0, this.components.length);
};

entity.prototype.getComponentAt = function(i) {
	
	return this.components[i];
};

entity.prototype.getComponentIndexOfBaseType = function(type) {
	
	for(var i = 0; i < this.components.length; i++)
	{
		if(this.components[i].type === type)
		{
			return i;
		}
	}
	
	return -1;
};
