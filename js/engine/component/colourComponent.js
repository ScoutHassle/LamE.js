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
            var transform = this.parent.transform;
            const centre =  transform.PivotPosition;

            ctx.setTransform(1, 0, 0, 1, centre.x, centre.y);
            ctx.rotate(transform.Rotation  * Math.PI / 180);

            ctx.fillRect(Math.floor(-transform.width * 0.5), Math.floor(-transform.height * 0.5), transform.width, transform.height);
        }
    }
}
