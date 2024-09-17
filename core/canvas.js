class Canvas {

	constructor() {
		this.canvas = null; /* doc element "canvas" */
		this.context = null; /* canvas context "2d" */

		// Used for scaling.
		this.aspect = 0;
		this.baseWidth = 0;
		this.baseHeight = 0;
	}

	createCanvas(iW, iH) /* <canvas> */ {

		this.baseWidth = iW;
		this.baseHeight = iH;
		this.aspect = iW / iH;

		let c = document.createElement("canvas");
		c.id = "MainCanvas";
		c.width = iW;
		c.height = iH;
		document.body.insertBefore(c, document.body.childNodes[0]);

		this.canvas = c;
		this.findContext2d();
		return c;
	}

	ScaledWidth() /* float */ {
		return this.baseWidth * (this.canvas.height / this.baseHeight);
	}

	CanvasWidth() /* float */ {
		return this.canvas.width;
	}

	CanvasHeight() /* float */ {
		return this.canvas.height;
	}

	ResolveVectorValues(iX, iY) /* js {x, y} */ {
		iX = (iX / this.baseWidth) * this.canvas.width;
		iY = (iY / this.baseHeight) * this.canvas.height;

		return {x: iX, y: iY};
	}

	ResolveTransformValues(iX, iY, iW, iH) /* js {x, y, w, h} */ {
		iX = (iX / this.baseWidth) * this.canvas.width;
		iY = (iY / this.baseHeight) * this.canvas.height;
		iW = (iW / this.baseWidth) * this.canvas.width;
		iH = (iH / this.baseHeight) * this.canvas.height;

		return {x: iX, y: iY, w: iW, h: iH};
	}

	ResolveTransformValuesWithinAspect(iX, iY, iW, iH) /* js {x, y, w, h} */ {

	}

	resize(iW, iH) /* */ {
		this.canvas.width = iW;
		this.canvas.height = iH;
		this.clear();
	}

	refreshCanvas() {
		this.canvas = document.getElementById("MainCanvas");
		this.findContext2d();
	}

	findContext2d() /* */ {	
		this.context = this.canvas.getContext("2d");
	}

	clear() /* */ {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
