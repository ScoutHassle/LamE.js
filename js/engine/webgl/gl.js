class GLContext {

    constructor() {
        this.gl = null;
        this.canvas = new GLCanvas();
		this.shaderController = new ShaderManager();
		this.camera = new Camera();

		// SORT THIS
		this.mesh = new Mesh();
    }

    Initialise(iW, iH) /* bool */ {
        // Create EVERYTHING we may need that isn't already.

        this.canvas.CreateCanvas(iW, iH);
        this.gl = this.canvas.GetGLContext();
        if (this.gl == null) {
            // TODO: Logging.
            return false;
        }

        if (!this.shaderController.CreateShaders(this.gl)) {
            // TODO: Logging.
            return false;
		}

		this.camera.BuildProjectionMatrix(this.canvas.baseWidth, this.canvas.baseHeight);		
		
		this.mesh.LoadMesh(this.gl);

        return true;
	}

    Render() {
        const gl = this.gl; // I hate typing this.
        gl.clearColor(0.5, 0.5, 0.5, 1.0); // Black
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		//-------------------------------
        // TO DO CAMERA
       this.camera.UpdateView();
		//-------------------------------
	

		//-------------------------------
		//Set up the shader program
		const activeShader = this.shaderController.BindShader(gl, ShaderPrograms.Default, this.camera);

		
		//-------------------------------
		// Do render
		const modelMatrix = mat4.create();
		mat4.translate(modelMatrix,	modelMatrix, [-0.0, 0.0, -6.0]);
		activeShader.bindWorldMatrix(gl, modelMatrix);
	

		{
			const offset = 0;
			const vertexCount = 4;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.data);
			gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
		}
		//-------------------------------
    }
}
