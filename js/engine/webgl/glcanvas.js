class GLCanvas {

	constructor() {
        this.canvas = null;

        // Used for scaling.
		this.aspect = 0;
		this.baseWidth = 0;
		this.baseHeight = 0;
    }

    CreateCanvas(iW, iH) /* */ {

        this.baseWidth = iW;
        this.baseHeight = iH;
        this.aspect = iW / iH;

        let c = document.createElement("canvas");
        c.id = "glCanvas";
        c.width = iW;
        c.height = iH;
        document.body.insertBefore(c, document.body.childNodes[0]);

        this.canvas = c;
    }

    GetGLContext() /* WebGLRenderingContext */ {
        return this.canvas.getContext("webgl")
    }
}
