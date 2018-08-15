'use strict';

class RenderComponent extends Component {    
    
    constructor(parent, r) {
        
        super(ComponentType.Component_Renderable, parent);
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
