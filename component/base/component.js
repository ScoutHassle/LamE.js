'use strict';

const ComponentType = {
	"Component_Base": 1,
	"Component_Renderable": 2,
	"Component_Input": 3,
	"Component_Script": 4,
    "Component_Physics": 5,};
Object.freeze(ComponentType);

// So javascript added some nice syntax sugar and... so we're moving to that.

class Component {
    
    constructor(type, entity) {
        
        this.type = type;
        if(entity != null)  entity.addComponent(this);
    }
    
    get Parent(){
        
        return this.parent;
    }
    
    update() {
        
    }
    
    shutdown() {
        
        this.parent = null;
    }
    
    save() {
        
        return JSON.stringify(flatten(this));
    }
}
