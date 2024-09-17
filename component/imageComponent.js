'use strict';

class ImageComponent extends RenderComponent {
    
    constructor(entity, r) {
        
        super(entity, r);
    }
    
    static load(temp, json) /* ImageComponent */ {
        
       const path = json.data[0].file;
       const imgComp = new ImageComponent(temp, resourceManager.loadResource(path, resource_type_image));
       
       if(json.data[0].layer != null) {
           imgComp.RenderLayer = json.data[0].layer;
       }
	
	   return imgComp;
    }
    
    render() /* */ {
        if(this.IsVisible)
		{
            const ctx = globalCanvas.context;
            const transform = this.parent.transform;
            const centre =  transform.PivotPosition;

            ctx.setTransform(1, 0, 0, 1, centre.x, centre.y);
            ctx.rotate(transform.Rotation  * Math.PI / 180);
            ctx.drawImage(this.GetResource,Math.floor(-transform.width * 0.5), Math.floor(-transform.height * 0.5), transform.width, transform.height);
        }
    }
}
