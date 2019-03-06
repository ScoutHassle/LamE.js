import { Component } from "./component/base/Component";
import { Transform } from "./Transform";

export class Entity {

    name: string;
	transform: Transform;
	components: any[];

    constructor(name: string, x: number, y: number, w: number, h: number) {

		this.name = name;
		this.transform = new Transform(x, y, w, h);
	}
	
	AddComponent(component: Component) {
		if (component  != null) {
			this.components.push(component);
		}
	}

	// Needs work... Component UID?
	RemoveComponent(index: number) {
		this.components.splice(index, 1);
	}

	Update() {
		for (let i = 0; i < this.components.length; i++) {
			this.components[i].Update();
		}
	}

	Render() {
		for(let i = 0; i < this.components.length; i++)
		{
			if(this.components[i].Render) {
				this.components[i].Render();
			}
		}
	}

	Shutdown() {
		for(let i = 0; i < this.components.length; i++)
		{
			this.components[i].shutdown();
		}
		
		this.transform = null;
		this.components.splice(0, this.components.length);
	}

	GetComponentAt(i: number): Component {
		return this.components[i];
	}

	GetComponentIndexOfBaseType(type: ComponentType): number {

		for(let i = 0; i < this.components.length; i++)
		{
			if(this.components[i].type === type)
			{
				return i;
			}
		}
	
		return -1;
	}
}
