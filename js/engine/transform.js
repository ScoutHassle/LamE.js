function transform(x, y, w, h)
{
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
}

transform.prototype.rotate = function(angle)
{
	
};

transform.prototype.moveY = function(y)
{
	this.y += y;
};

transform.prototype.moveX = function(x)
{
	this.x += x;
};

transform.prototype.move = function(x, y)
{
	this.moveY(y);
	this.moveX(x);
};
