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
	
	var entitys = json['Entitys'];
	for(var i = 0; i < entitys.length; i++)
	{
		// DONE - Pass entitys[i] into createEntity. Not my problem!
		this.createEntityFromJson(entitys[i]);
	}
};

scene.prototype.createEntityFromJson = function(data) {	
		
	var temp = this.createEntity(data.name, data.x, data.y, data.w, data.h);
	
	var components = data.components;
	for(var i = 0; i < components.length; i++)
	{
		switch(components[i].type)
		{
			case "image":
				ImageComponent.load(temp, components[i]);
				break;
				
			case "colour":
				colourComponent.load(temp, components[i]);
				break;
				
			case "text":
				TextComponent.load(temp, components[i]);
				break;
                
            case "script":
                ScriptComponent.load(temp, components[i]);
                break;
                
            case "raycast":
                new RaycasterComponent(temp, new grid(20, 20), "/assets/images/wall_texture.jpg");
                break;
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
