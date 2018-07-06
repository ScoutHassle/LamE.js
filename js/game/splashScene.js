function splashScene()
{
	this.splashImage;
	this.splashEntity;
	this.timer = 0.0;
	this.visibleTime = 5.0;
	var imgComp;
	
	this.start = function()
	{
		this.splashImage = resourceManager.loadResource('images/logosplash.png', resource_type_image);
		var tableImage = resourceManager.loadResource('images/hockeyTable.png', resource_type_image);
		
		this.splashEntity = entityManager.createEntity(0, 0, sceneManager.canvas.width, sceneManager.canvas.height);
		imgComp = new imageComponent(this.splashEntity, this.splashImage);
		
		var button = entityManager.createEntity(0, 0, sceneManager.canvas.width, sceneManager.canvas.height);
		var btnComp = new buttonComponent(button);
		btnComp.setTouchEvent(TouchEventType.Touch_End, progressToMain);
	}
	
	this.update = function()
	{
	//	imgComp.setVisible(!imgComp.isVisible())
		
		/*this.timer += frameTime;
		if(this.timer >= this.visibleTime)
		{
			var s = new menuScene();
			changeScene(s);
		}*/
	}
	
	this.render = function()
	{
		/*ctx = sceneManager.context;
		canvas = sceneManager.canvas;
		ctx.fillStyle = "Black";
		ctx.drawImage(this.splashImage, 0, 0, sceneManager.canvas.width, sceneManager.canvas.height);*/
	}
	
	this.shutdown = function()
	{
		entityManager.removeAll();
	}
}

function progressToMain(touch)
{
	var s = new menuScene();
	changeScene(s);
}