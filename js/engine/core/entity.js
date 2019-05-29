var ExtendedComponentType = {
	"Component_Colour":1,
	"Component_Image":2,
	"Component_Text":3,
	"Component_Button":4 };
Object.freeze(ExtendedComponentType);

class Entity {

	constructor(uid, name, iX, iY, iW, iH) {
		this.uid = uid;
		this.name = name;
		this.transform = new Transform(iX, iY, iW, iH);
		this.components = [];
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
		for(var i = 0; i < this.components.length; i++)	{
			this.components[i].update();
		}
	}

	render() /* */ {
		for(var i = 0; i < this.components.length; i++)	{
			if(this.components[i].render) {
				this.components[i].render();
			}
		}
	}

	shutdown() /* */ {
		for(var i = 0; i < this.components.length; i++)	{
			this.components[i].shutdown();
		}
		
		this.transform = null;
		this.components.splice(0, this.components.length);
	}

	getComponentAt(idx) /* Component */ {	
		return this.components[idx];
	}

	getComponentIndexOfBaseType(componentType) /* idx */ {
	
		for(var i = 0; i < this.components.length; i++)	{
			if(this.components[i].type === componentType) {
				return i;
			}
		}
		
		return -1;
	}
}
