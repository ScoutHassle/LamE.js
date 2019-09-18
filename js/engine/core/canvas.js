class Canvas {

	constructor() {
		this.canvas = null; /* doc element "canvas" */
		this.context = null; /* canvas context "2d" */
	}

	createCanvas(iW, iH) /* <canvas> */ {

		let c = document.createElement("canvas");
		c.id = "MainCanvas";
		c.width = iW;
		c.height = iH;
		document.body.insertBefore(c, document.body.childNodes[0]);

		this.canvas = c;
		this.findContext2d();
		return c;
	}

	resize(iW, iH) /* */ {
		this.canvas.width = iW;
		this.canvas.height = iH;
		this.clear();
	}

	findContext2d() /* */ {	
		this.context = this.canvas.getContext("2d");
	}

	clear() /* */ {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
