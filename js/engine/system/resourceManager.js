var resource_type_image = 0;
var resource_type_audio = 1;

const ResourceType = {
	"Image": 0,
	"Autio": 1,
	"Texture": 2,
	"Mesh": 3, // because plans.
};
Object.freeze(ResourceType);

class ResourceManager {
	constructor() {
		this.resourceList = [];
		this.audioType = "";
	}
	
	Initialise() {
	}
	
	LoadResource(src, type)	{
		var res = this.resourceList.find(res => res.source === src);
		var obj = null;
		if(!res) {
			switch(type) {
				case ResourceType.Image:
				obj = new Image();
				obj.onload = imageLoadComplete();
				obj.src = src;				
				break;
				
				case ResourceType.Audio:
				obj = new Audio(src + this.audioType);
				loadBarrier.objectLoaded(); // auto loads

				case ResourceType.Texture:
				obj = glcontext.LoadTexture(src);
			}
			
			res = new resource(src, obj, type);
			this.resourceList[src] = res;
			loadBarrier.resourceLoading();
		}
		else {
			obj = res.object;
			res.addReference();
		}
		
		return obj;
	}
	
	getResource(src) {
		var res = this.resourceList.find(res => res.source === src);
		if(res) {
			return res.obj;
		}
		
		return null;
	}
	
	unloadResource(src)	{
		// TO DO
	}
}


const resources = new ResourceManager()

class resource {

	constructor(src, obj, type) {
		this.source = src;
		this.object = obj;
		this.type = type;
		
		this.referenceCount = 1;
	}
	
	addReference() {
		referenceCount++;
	}
	
	removeReference() {
		referenceCount--;
		if(referenceCount < 0 )	{
			referenceCount = 0;
		}
	}
}

function imageLoadComplete()
{
	loadBarrier.objectLoaded();
}