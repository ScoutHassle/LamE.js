class GLContext {

    constructor() {
        this.gl = null;
        this.canvas = new GLCanvas();
		this.shaderController = new ShaderManager();
		this.textureController = new TextureManager();
		this.camera = new Camera();
		this.spriteCamera = new Camera();

		// SORT THIS
		this.mesh = new Mesh();

		// SORT THIS
		this.positionBuffer = null;
		this.texcoordBuffer = null;
		this.sprite = null;
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

		// SPRITE TEST
		this.spriteinitbits();
		this.spriteCamera.BuildOrthographicMatrix(this.canvas.baseWidth, this.canvas.baseHeight);
		this.sprite = new SpriteComponent(null, "assets/images/sprite.png");
		
		this.mesh.LoadMesh(this.gl);

        return true;
	}

	LoadTexture(path) /* WebGLTexture */ {
		return this.textureController.LoadTexture(this.gl, path);
	}

    Render() {
        const gl = this.gl; // I hate typing this.
        gl.clearColor(0.5, 0.5, 0.5, 1.0); // Grey
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

	spriteinitbits() {
		  // Create a buffer.

		  const gl = this.gl;

		  this.positionBuffer = gl.createBuffer();
		  gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		
		  // Put a unit quad in the buffer
		  var positions = [
			0, 0,
			0, 1,
			1, 0,
			1, 0,
			0, 1,
			1, 1,
		  ];
		  
		  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
		
		  // Create a buffer for texture coords
		  this.texcoordBuffer = gl.createBuffer();
		  gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
		
		  // Put texcoords in the buffer
		  var texcoords = [
			0, 0,
			0, 1,
			1, 0,
			1, 0,
			0, 1,
			1, 1,
		  ];
		 
		  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);		
	}
	
	RenderSprites() {

		const gl = this.gl;
		gl.clearColor(0.5, 0.5, 0.5, 1.0); // Grey		
		gl.viewport(0, 0, this.canvas.baseWidth, this.canvas.baseHeight);
		gl.clear(gl.COLOR_BUFFER_BIT);

		const textureInfo = this.sprite.GetResource;
		gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);

		const activeShader = this.shaderController.GetProgram(ShaderPrograms.Texture);

		// Tell WebGL to use our shader program pair
		gl.useProgram(activeShader);

		// Setup the attributes to pull data from our buffers
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		gl.enableVertexAttribArray(gl.getAttribLocation(activeShader, "a_position"));
		gl.vertexAttribPointer(gl.getAttribLocation(activeShader, "a_position"), 2, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
		gl.enableVertexAttribArray(gl.getAttribLocation(activeShader, "a_texcoord"));
		gl.vertexAttribPointer(gl.getAttribLocation(activeShader, "a_texcoord"), 2, gl.FLOAT, false, 0, 0);

		// this matrix will convert from pixels to clip space
		const matrix = mat4.create();
		mat4.ortho(matrix, 0, this.canvas.baseWidth, this.canvas.baseHeight, 0, -1, 1);
		mat4.translate(matrix, matrix, vec3.fromValues(0, 0, 0));
		mat4.scale(matrix, matrix, vec3.fromValues(textureInfo.width, textureInfo.height, 1))
		

		// Set the matrix.
		gl.uniformMatrix4fv(
			gl.getUniformLocation(activeShader, "u_matrix"),
			false,
			matrix);

		// Tell the shader to get the texture from texture unit 0
		gl.uniform1i(gl.getUniformLocation(activeShader, "u_texture"), 0);

		// draw the quad (2 triangles, 6 vertices)
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}
}
