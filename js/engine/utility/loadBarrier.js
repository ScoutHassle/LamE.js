var loadBarrier = {
	
	resourcesWaiting : 0,
	resourcesLoaded : 0,
	
	clearLoadBarrier : function()
	{
		resourcesWaiting = 0;
		resourcesLoaded = 0;
	},
		
	resourceLoading : function()
	{
		this.resourcesWaiting++;
	},
	
	objectLoaded : function()
	{
		this.resourcesLoaded++;
	},
	
	loadBarrierPassed : function()
	{
		// If we've loaded as much as we have to load then we've passed.
		return (this.resourcesWaiting === this.resourcesLoaded);
	},
	
	render : function()
	{
		// Draw loading screen
		
		ctx = sceneManager.context;
		canvas = sceneManager.canvas;
		ctx.fillStyle = "Blue";
		ctx.fillRect(0, 0, sceneManager.canvas.width, sceneManager.canvas.height);
		
		// Text
		ctx.font = "20px Arial";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		
		ctx.fillText("LOADING", canvas.width/2, canvas.height/2 - 20);
	}
}
