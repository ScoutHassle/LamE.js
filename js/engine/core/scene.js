
class Scene {

	constructor() {
		this.entityList = [];
		this.nextUID = 0;
	}

	// Basic internals
	start() /* */ {
	
	}
	
	update() /* */ {		
		this.updateEntityList();
	};
	
	render() /* */ {		
		this.renderEntityList();
	}
	
	shutdown() /* */ {		
		this.clearEntityList();
	}

	// Entity Management
	createEntity(name, iX, iY, iW, iH) /* Entity */ {
		const e = new Entity(this.nextUID++, name, iX, iY, iW, iH);
		this.entityList.push(e);
		return e;
	}

	clearEntityList() /* */ {		
		for(let i = 0; i < this.entityList.length; i++)	{
			this.entityList[i].shutdown();
		}
		
		this.entityList.splice(0, this.entityList.length);
	}

	updateEntityList() /* */ {		
		for(let i = 0; i < this.entityList.length; i++) {
			this.entityList[i].update();
		}
	}

	renderEntityList() /* */ {
		
		for(let i = 0; i < this.entityList.length; i++)	{
			this.entityList[i].render();
		}
	}

	getEntityCount() /* int */ {		
		return this.entityList.length;
	}

	getEntityAt(idx) /* Entity */ {		
		return this.entityList[idx];
	}

	getEntityWithName(name) /* Entity */ {
		for(let i = 0; i < this.entityList.length; i++)	{
			if(this.entityList[i].name == name) {
				return this.entityList[i];
			}
		}

		return null;
	}

	// SceneManager and loading functionality
	load(json) /* */ {
		const entitys = json['Entitys'];
		for(let i = 0; i < entitys.length; i++)	{
			// DONE - Pass entitys[i] into createEntity. Not my problem!
			this.createEntityFromJson(entitys[i]);
		}
	}

	createEntityFromJson(json) /* */ {			
		const temp = this.createEntity(json.name, json.x, json.y, json.w, json.h);
		
		const components = json.components;
		for(let i = 0; i < components.length; i++) {
			switch(components[i].type) {
				case "image":
					ImageComponent.load(temp, components[i]);
					break;
					
				case "colour":
					ColourComponent.load(temp, components[i]);
					break;
					
				case "text":
					TextComponent.load(temp, components[i]);
					break;
					
				case "script":
					ScriptComponent.load(temp, components[i]);
					break;
			}
		}
	}
}
