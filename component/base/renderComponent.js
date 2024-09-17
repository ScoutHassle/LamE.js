'use strict';

class RenderComponent extends Component {    
    
    constructor(entity, r) {        
        super(ComponentType.Component_Renderable, entity);
        this.resource = r;
        this.visible = true;
        this.layer = RenderLayer.RenderLayer_Middleground;
        this.ruid = renderManager.addRenderable(this, this.layer);
    }
    
    get GetResource() {
        
        return this.resource;
    }

    get IsVisible() /* bool */ {
        
        return this.visible;
    }

    get RenderLayer() /* RenderLayer(int) */ {
        return this.layer;
    }

    set SetResource(r) /* */ {
        
        this.resource = r;
    }

    set SetVisible(state) /* */ {
        
        this.visible = state;
    }

    set RenderLayer(layer) /* */ {
        renderManager.swapLayer(this, this.ruid, this.layer, layer);
    }

    update() /* */ {        
        super.update();        
    }

    shutdown() /* */ {
        renderManager.removeRenderable(this.ruid, this.layer);
        super.shutdown();
        this.resource = null;
    }

    render() /* */ {
        
    }
}
