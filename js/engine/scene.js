function scene()
{
	//--------------------------------
	// Scene Creation - TO DO
	//--------------------------------
	
	//--------------------------------
	// Entity Management
	//--------------------------------
	var entityList = [];
	
	this.createEntity = function(name, x, y, w, h) {
		
		var e = new entity(name, x, y, w, h);
		entityList.push(e);
		return e;
	};
	
	this.clearEntityList = function() {
		
		for(var i = 0; i < entityList.length; i++)
		{
			entityList[i].shutdown();
		}
		
		entityList.splice(0, entityList.length);
	};
	
	this.updateEntityList = function() {
		
		for(var i = 0; i < entityList.length; i++)
		{
			entityList[i].update();
		}
	};
	
	this.renderEntityList = function() {
		
		for(var i = 0; i < entityList.length; i++)
		{
			entityList[i].render();
		}
	};
	
	// Utility Getters
	this.getEntityCount = function() {
		
		return entityList.length;
	};
	
	this.getEntityAt = function(i) {
		
		return entityList[i];
	};
}

//--------------------------------
// Extend
//--------------------------------
scene.prototype.load = function(json) {
	// TO DO - Load in from json
	// Running as a test example
	
	var entitys = json['entitys'];
	for(var i = 0; i < entitys.length; i++)
	{
		// TO DO - Pass entitys[i] into createEntity. Not my problem!
		var name, x, y, w, h;
		name = 	entitys[i].name;
		x = 	entitys[i].x;
		y =		entitys[i].y;
		w = 	entitys[i].w;
		h = 	entitys[i].h;
		
		var temp = this.createEntity(name, x, y, w, h);
		
		var components = entitys[i].components;//['components'];
		for(var j = 0; j < components.length; j++)
		{
			// Just do something basic...
			if(components[j].type === "image")
			{
				// So thinking I might store this as part of the object.
				// Do a "loadFromJson" function on base component.
				
				// Anyway I know what I want from it right now so we'll just rip it
				// out at this stage and do some jazz.
				
				var path = components[j].data[0].file;
				new imageComponent(temp, 
					resourceManager.loadResource(path, resource_type_image));
			}
		}
	}		
};

scene.prototype.start = function() {
	
};

scene.prototype.update = function() {
	
	this.updateEntityList();
};

scene.prototype.render = function() {
	
	this.renderEntityList();
};

scene.prototype.shutdown = function() {
	
	this.clearEntityList();
};
