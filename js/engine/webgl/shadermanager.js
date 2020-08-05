
const VertexShader = {
	"Default": 0,
};
Object.freeze(VertexShader);
const vertShaderSources = [
	vsSource, // Default
];

const FragmentShader = {
	"Default": 0,
};
Object.freeze(FragmentShader);
const fragShaderSources = [
	fsSource, // Default
];

const ShaderPrograms = {
	"Default": 0,
};
Object.freeze(ShaderPrograms);
const shaderPrograms = [
	{v: VertexShader.Default, f: FragmentShader.Default}, // Default
];

class ShaderManager {

	constructor() {
		this.vertexShaders = [];
		this.fragShaders = [];
		this.programs = [];
	}

	CreateShaders(glctx) /* bool */ {

		// Go through list of shaders, create them
		for (let i = 0; i < vertShaderSources.length; i++) {
			const vs = this.createShader(glctx, glctx.VERTEX_SHADER, vertShaderSources[i]);
			if (vs == null) {
				// Failed - TODO decide action
				return false;
			}
			this.vertexShaders.push(vs);
		}

		for (let i = 0; i < fragShaderSources.length; i++) {
			const fs = this.createShader(glctx, glctx.FRAGMENT_SHADER, fragShaderSources[i]);
			if (fs == null) {
				return false;
			}
			this.fragShaders.push(fs);
		}

		// Then create the programs
		for (let i = 0; i < shaderPrograms.length; i++) {
			const vs = this.vertexShaders[shaderPrograms[i].v];
			const fs = this.fragShaders[shaderPrograms[i].f];

			const sp = this.createShaderProgram(glctx,  vs, fs);
			if (sp == null) {
				return false;
			}
			this.programs.push(sp);
		}

		return true;
	}

	createShaderProgram(glctx, vertexShader, fragmentShader) /* WebGLProgram */ {
		
		// Create the shader program      
		const shaderProgram = glctx.createProgram();
		glctx.attachShader(shaderProgram, vertexShader);
		glctx.attachShader(shaderProgram, fragmentShader);
		glctx.linkProgram(shaderProgram);
			
		// If creating the shader program failed, alert      
		if (!glctx.getProgramParameter(shaderProgram, glctx.LINK_STATUS)) {
			alert('Unable to initialize the shader program: ' + glctx.getProgramInfoLog(shaderProgram));
			return null;
		}
			
		return shaderProgram;
	}

	createShader(glctx, type, source) /* WebGLShader */ {
		const shader = glctx.createShader(type);
	
		// Send the source to the shader object	
		glctx.shaderSource(shader, source);
	
		// Compile the shader program	
		glctx.compileShader(shader);
			
		// See if it compiled successfully			
		if (!glctx.getShaderParameter(shader, glctx.COMPILE_STATUS)) {
			alert('An error occurred compiling the shaders: ' + glctx.getShaderInfoLog(shader));
			glctx.deleteShader(shader);
			return null;
		}

		return shader;
	}
}
