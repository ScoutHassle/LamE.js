var defaultTextColour = "rgba(248, 212, 47, 1)";

function menuScene()
{	
	this.start = function()
	{
		
	}
	
	this.update = function()
	{
		
	}
	
	this.input = function(keys)
	{

	}
	
	this.onTouchStart = function(touch)
	{
		
	}
	
	this.onTouchMove = function(touch)
	{
		
	}
	
	this.onTouchEnd = function(touch)
	{		
		
	}
	
	this.render = function()
	{
		ctx = sceneManager.context;
		canvas = sceneManager.canvas;
		ctx.fillStyle = "Black";
		
		// Text
		ctx.font = "20px Arial";
		ctx.fillStyle = "White";
		ctx.textAlign = "center";
		
		// Black outline shadow
		ctx.fillText("MAIN", sceneManager.canvas.width / 2, sceneManager.canvas.height / 2);
	}
	
	this.shutdown = function()
	{
		resourceManager.unloadResource(this.bgImg.source);
	}
}
