'use strict';

class RenderComponent extends Component {    
    
    constructor(entity, r) {
        
        super(ComponentType.Component_Renderable, entity);
        this.resource = r;
        this.visible = true;
    }
    
    get GetResource() {
        
        return this.resource;
    }

    get IsVisible() {
        
        return this.visible;
    }

    set SetResource(r) {
        
        this.resource = r;
    }

    set SetVisible(state) {
        
        this.visible = state;
    }

    update() {
        
        super.update();        
    }

    shutdown() {
        
        super.shutdown();
        this.resource = null;
    }

    render() {
        
    }
}
