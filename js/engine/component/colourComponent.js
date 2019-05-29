'use strict';

class ColourComponent extends RenderComponent {
    
    constructor(entity, r) {
        
        super(entity, r);
    }
    
    static load(temp, json) {
        
        var colour = json.data[0].colour;
        return new ColourComponent(temp, colour);
    }
    
    render() {
        
        if(this.IsVisible)
        {
            var ctx = globalCanvas.context;
			ctx.fillStyle = this.GetResource;
				
			var transform = this.parent.transform;
			ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
        }
    }
}
