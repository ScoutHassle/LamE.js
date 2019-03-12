import { RenderComponent } from "./base/RenderComponent";
import { Entity } from "engine/Entity";
import { CanvasManager } from "../managers/CanvasManager";
import { ResourceManager } from "../managers/ResourceManager";

export class ImageComponent extends RenderComponent {
    
    constructor(parent: Entity, r: any) {
        
        super(parent, r);
    }
    
    static Load(temp: Entity, json: any): ImageComponent {
        
       const path = json.data[0].file;
	   const imgComp = new ImageComponent(temp, ResourceManager.Instance.LoadResource(path, ResourceType.Image));
	
	   return imgComp;
    }
    
    render() {
        if(this.IsVisible)
		{
            const ctx = CanvasManager.Instance.GetContext();
            const transform = this.parent.transform;
            const pos = transform.Position();
            const size = transform.Size();
            ctx.drawImage(this.Resource(), pos.x, pos.y, size.x, size.y);
        }
    }
}
