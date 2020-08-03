class GLCanvas {

	constructor() {
        this.canvas = null;
        this.gl = null;

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
        c.id = "glCanvas";
        c.width = iW;
        c.height = iH;
        document.body.insertBefore(c, document.body.childNodes[0]);

        this.canvas = c;
        this.gl = c.getContext("webgl")
        return c;
    }

    ResolveTransformValues(x, y, w, h) {
        return {x, y, w, h};
    }

    clear() /* */ {
        this.gl.clearColor(0.5, 0.5, 0.5, 1.0); // Black
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}
}
