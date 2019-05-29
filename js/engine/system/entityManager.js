var entityManager = {	
	entityList : [],
	
	createEntity : function(x, y, w, h)
	{
		var e = new entity(x, y, w, h);
		return this.addEntity(e);
	},
	
	addEntity : function(entity)
	{
		 this.entityList.push(entity);
		 return entity;
	},
	
	removeEntity : function(i)
	{
		this.entityList[i].shutdown();
		this.entityList.splice(i, 1);
	},
	
	removeAll : function()
	{
		for(var i = 0; i < this.entityList.length; i++)
		{
			this.entityList[i].shutdown();
		}
		
		this.entityList.splice(0, this.entityList.length);
	},
	
	update : function()
	{
		for(i = 0; i < this.entityList.length; i++)
		{
			this.entityList[i].update();
		}
	},
	
	updatePhysics : function()
	{

	},
	
	render : function()
	{
		for(i = 0; i < this.entityList.length; i++)
		{
			this.entityList[i].render();
		}
	}
}
