function canvasManager()
{
	this.canvas = null;
	this.context = null;
}

canvasManager.prototype.createCanvas = function(w, h) {
	
	var c = document.createElement("canvas");
	c.id = "MainCanvas";
	c.width = w;
	c.height = h;
	document.body.insertBefore(c, document.body.childNodes[0]);

	this.canvas = c;
	this.getContext2d();
	return c;
}

canvasManager.prototype.getCanvas = function(id) {
	
	this.canvas = document.getElementById(id);
	this.getContext2d();
	return this.canvas;
}

canvasManager.prototype.getContext2d = function() {
	
	this.context = this.canvas.getContext("2d");
}

canvasManager.prototype.clear = function() {

	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}