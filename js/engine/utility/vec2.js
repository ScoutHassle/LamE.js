function vec2(x, y)
{
	this.x = x;
	this.y = y;
	
	this.set = function(x, y)
	{
		this.x = x;
		this.y = y;
	}
	
	this.normalize = function()
	{
		var length = Math.sqrt((this.x * this.x) + (this.y * this.y));
		this.x = x / length;
		this.y = y / length;
	}
	
	this.magnitude = function()
	{
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}
	
	this.magnitudeSquared = function()
	{
		return (this.x * this.x) + (this.y * this.y);
	}
}
