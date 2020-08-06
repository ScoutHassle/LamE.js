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
		const activeShader = this.shaderController.programs[ShaderPrograms.Default];

		gl.useProgram(activeShader);
		{
			const numComponents = 2;  // pull out 2 values per iteration
			const type = gl.FLOAT;    // the data in the buffer is 32bit floats
			const normalize = false;  // don't normalize
			const stride = 0;         // how many bytes to get from one set of values to the next
									// 0 = use type and numComponents above
			const offset = 0;         // how many bytes inside the buffer to start from
	
			gl.vertexAttribPointer(
				gl.getAttribLocation(activeShader, 'aVertexPosition'),
				numComponents,
				type,
				normalize,
				stride,
				offset);
			gl.enableVertexAttribArray(gl.getAttribLocation(activeShader, 'aVertexPosition'));
		}

		gl.uniformMatrix4fv(
			gl.getUniformLocation(activeShader, 'uViewProjMatrix'),
			false,
			this.camera.viewProjMatrix);
		//-------------------------------

		
		//-------------------------------
		// Do render
		const modelMatrix = mat4.create();
		mat4.translate(modelMatrix,	modelMatrix, [-0.0, 0.0, -6.0]);

		gl.uniformMatrix4fv(
			gl.getUniformLocation(activeShader, 'uWorldMatrix'),
			false,
			modelMatrix);
	

		{
			const offset = 0;
			const vertexCount = 4;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.data);
			gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
		}
		//-------------------------------
    }
}
