import { RenderComponent } from './base/RenderComponent';
import { Entity } from '../Entity';

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
            const transform = this.Parent().transform;
        }
    }
}