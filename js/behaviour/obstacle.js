function obstacleBehaviour(transform)
{
	this.transform = transform;
	
	this.update = function(entity)
	{
		this.transform.y += 1;		

		var canvas = document.getElementById('MainCanvas');
		if(canvas != null)
		{
			var height = canvas.height;
			if(this.transform.y > (height + this.transform.height))
			{
				entity.kill = true; // mark for removal
			}
		}

	}
}