
import {Entity} from '../../Entity';

declare global {
        enum ComponentType {
        Component_Base = 1,
        Component_Renderable,
        Component_Input,
        Component_Script,
        Component_Physics
    }
}

export class Component {

    type: ComponentType;
    parent: Entity;

    constructor(type: ComponentType, parent: Entity) {

        this.type = type;
        this.parent = parent;
    }

    Parent(): Entity {
        return this.parent;
    }

    Update(): void {

    }

    Shutdown(): void {

    }

    Save(): any {        
        return JSON.stringify(Flatten(this));
    }
}
