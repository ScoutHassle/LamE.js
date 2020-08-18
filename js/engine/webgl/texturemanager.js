class TextureManager {
	constructor() {
		this.textures = [];
	}

	LoadTexture(gl, filename) /* WebGLTexture */ {

		if (this.textures[filename] != null) {
			return this.textures[filename];
		}

		const texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);

		// Create placeholder data for the texture
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

		var textureInfo = {
			width: 1,   // we don't know the size until it loads
			height: 1,
			texture: texture,
		  };
		// Create an Image to handle the texture.
		const image = new Image();
		image.onload = function() {
			textureInfo.width = image.width;
			textureInfo.height = image.height;

			gl.bindTexture(gl.TEXTURE_2D, texture)
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

			 if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
			 	gl.generateMipmap(gl.TEXTURE_2D);
			 } else {
				// Not ^2
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			}
		};
		image.crossOrigin = "";
		image.src = filename;

		this.textures[filename] = texture;
		return textureInfo;
	}

	// TODO: Matsh lib

}

function 	isPowerOf2(iV) /* bool */ {
	return (iV & (iV - 1)) == 0;
}