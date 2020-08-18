'use strict';

class SpriteComponent extends RenderComponent {
    
    constructor(entity, path) {
        super(entity, resources.LoadResource(path, ResourceType.Texture));

        this.width = 1;
        this.height = 1;
    }
    
    static load(temp, json) /* null */ {        
      return null
    }
    
    render() /* */ {
        if(this.IsVisible) {
            // Do something...
        }
    }
}
