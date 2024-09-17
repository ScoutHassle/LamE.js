var resource_type_image = 0;
var resource_type_audio = 1;

var resourceManager = {
	resourceList : [],
	
	audioType : "",
	
	start : function()
	{
		
	},
	
	loadResource : function(src, type)
	{
		var res = this.resourceList.find(res => res.source === src);
		var obj = null;
		if(!res)
		{
			switch(type)
			{
				case resource_type_image:
				obj = new Image();
				obj.onload = imageLoadComplete();
				obj.src = src;				
				break;
				
				case resource_type_audio:
				obj = new Audio(src + this.audioType);
				loadBarrier.objectLoaded(); // auto loads
			}
			
			res = new resource(src, obj, type);
			loadBarrier.resourceLoading();
		}
		else
		{
			obj = res.object;
			res.addReference();
		}
		
		return obj;
	},
	
	getResource : function(src)
	{
		var res = this.resourceList.find(res => res.source === src);
		if(res)
		{
			return res.obj;
		}
		
		return null;
	},
	
	unloadResource : function(src)
	{
		// TO DO
	}
}

function resource(src, obj, type)
{
	this.source = src;
	this.object = obj;
	this.type = type;
	
	this.referenceCount = 1;
	
	this.addReference = function()
	{
		referenceCount++;
	}
	
	this.removeReference = function()
	{
		referenceCount--;
		if(referenceCount < 0 )
		{
			referenceCount = 0;
		}
	}
}

function imageLoadComplete()
{
	loadBarrier.objectLoaded();
}