let ExtendedComponentType = {
	"Component_Colour":1,
	"Component_Image":2,
	"Component_Text":3,
	"Component_Button":4 };
Object.freeze(ExtendedComponentType);

class Entity {
	#uid;

	constructor(uid, name, iX, iY, iW, iH) {
		this.#uid = uid;
		this.name = name;
		this.transform = new Transform(iX, iY, iW, iH);
		this.components = [];
	}

	get UID() /* int */ {
		return this.#uid;
	}

	addComponent(component) /* */ {
		if(component != null) {
			this.components.push(component);
		}
	}

	removeComponent(idx) /* */ {
		this.components.splice(index, 1);
	}

	update() /* */ {
		for(let i = 0; i < this.components.length; i++)	{
			this.components[i].update();
		}
	}

	render() /* */ {
		for(let i = 0; i < this.components.length; i++)	{
			if(this.components[i].render) {
				this.components[i].render();
			}
		}
	}

	shutdown() /* */ {
		for(let i = 0; i < this.components.length; i++)	{
			this.components[i].shutdown();
		}
		
		this.transform = null;
		this.components.splice(0, this.components.length);
	}

	getComponentAt(idx) /* Component */ {	
		return this.components[idx];
	}

	getComponentIndexOfBaseType(componentType) /* idx */ {
	
		for(let i = 0; i < this.components.length; i++)	{
			if(this.components[i].type === componentType) {
				return i;
			}
		}
		
		return -1;
	}

	getScriptableComponentByName(name) /* Component */ {
		for(let i = 0; i < this.components.length; i++)	{
			const component = this.components[i];
			if(component.type === ComponentType.Component_Script) {
				if(component.scriptName == name) {
					return component;
				}
			}
		}
		
		return null;
	}
}
