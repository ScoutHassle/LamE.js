import { Entity } from "./Entity";
import { ScriptComponent } from "./component/base/ScriptComponent";
import { ColourComponent } from "./component/ColourComponent";
import { ImageComponent } from "./component/ImageComponent";
import { TextComponent } from "./component/TextComponent";

export class Scene {
	
    //--------------------------------
    // Vars
    //-------------------------------
    entityList: Entity[];
    
    constructor() {
        // ?
    }

    //--------------------------------
    // Scene Running
    //--------------------------------
    Start(): void {
        
    }

    Update(): void {
        
        this.UpdateEntityList();
    }

    Render(): void {
        
        this.RenderEntityList();
    }

    Shutdown(): void {
        
        this.ClearEntityList();
    }

	//--------------------------------
	// Entity Management
	//--------------------------------
    CreateEntity(name: string, x: number, y: number, w: number, h: number): Entity {

        const e = new Entity(name, x, y, w, h);
        this.entityList.push(e)
        return e;
    }
	
	ClearEntityList(): void {
		
		for(let i = 0; i < this.entityList.length; i++)
		{
			this.entityList[i].Shutdown();
		}
		
		this.entityList.splice(0, this.entityList.length);
	}
	
	UpdateEntityList(): void {
		
		for(let i = 0; i < this.entityList.length; i++)
		{
			this.entityList[i].Update();
		}
	}
	
	RenderEntityList(): void {
		
		for(var i = 0; i < this.entityList.length; i++)
		{
			this.entityList[i].Render();
		}
	}
	
	// Utility Getters
	GetEntityCount(): number {
		
		return this.entityList.length;
	}
	
	GetEntityAt(i: number): Entity {
		
		return this.entityList[i];
    }
    

    //--------------------------------
	// Scene Creation - TO DO
	//--------------------------------
    Load(json: any): void {
        // TO DO - Load in from json
        // Running as a test example
        
        const entitys = json['Entitys'];
        for(let i = 0; i < entitys.length; i++)
        {
            // DONE - Pass entitys[i] into createEntity. Not my problem!
            this.CreateEntityFromJson(entitys[i]);
        }
    };
    
   CreateEntityFromJson(data: any): void {	
            
        const temp = this.CreateEntity(data.name, data.x, data.y, data.w, data.h);
        
        const components = data.components;
        for(var i = 0; i < components.length; i++)
        {
            switch(components[i].type)
            {
                case "image":
                    ImageComponent.Load(temp, components[i]);
                    break;
                    
                case "colour":
                    ColourComponent.Load(temp, components[i]);
                    break;
                    
                case "text":
                    TextComponent.Load(temp, components[i]);
                    break;
                    
                case "script":
                    ScriptComponent.Load(temp, components[i]);
                    break;
            }
        }
    };
}


