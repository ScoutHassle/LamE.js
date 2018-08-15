'use strict';

class ImageComponent extends RenderComponent {
    
    constructor(parent, r) {
        
        super(parent, r);
    }
    
    static load(temp, json) {
        
       var path = json.data[0].file;
	   var imgComp = new ImageComponent(temp, resourceManager.loadResource(path, resource_type_image));
	
	   return imgComp;
    }
    
    render() {
        if(this.IsVisible)
		{
            var ctx = globalCanvas.context;
            var transform = this.parent.transform;
            ctx.drawImage(this.GetResource, transform.x, transform.y, transform.width, transform.height);
        }
    }
}
