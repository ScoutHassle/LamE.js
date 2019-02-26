import {Component} from './Component';
import {Entity} from '../../Entity';

export class PhysicsComponent extends Component {    
    
    constructor(parent: Entity) {
        
        super(ComponentType.Component_Physics, parent);
    }
    

    PrePhysicsUpdate(): void {
        
    }
    
    PhysicsUpdate(delta: number): void {
        
    }
    
    PostPhysicsUpdate(): void {
        
    }
    
    // TO DO - DebugRender(){}
}
