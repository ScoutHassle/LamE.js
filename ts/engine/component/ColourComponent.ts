import { RenderComponent } from './base/RenderComponent';
import { Entity } from '../Entity';
import { CanvasManager } from '../managers/CanvasManager';

export class ColourComponent extends RenderComponent {

    constructor(parent: Entity, colour: string) {
        super(parent, colour);
    }

    static Load(temp: Entity, json: any): ColourComponent {
        const colour = json.data[0].colour;
        return new ColourComponent(temp, colour);
    }

    Render(): void {

        if (this.visible) {

            // TO DO - Port GlobalCanvas for context etc.
            

            let ctx = CanvasManager.Instance.GetContext();
			ctx.fillStyle = this.Resource();
				
            const transform = this.Parent().transform;
            const pos = transform.Position();
            const size = transform.Size();
			ctx.fillRect( pos.x, pos.y, size.x, size.y);
        }
    }
}