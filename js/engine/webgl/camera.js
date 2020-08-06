class Camera {
    constructor() {
        this.fov = 45 * Math.PI / 180; // in deg, stored as radians
        this.nearClip = 0.1;
        this.farClip = 1000.0;
		this.worldMatrix = mat4.create();
		this.viewMatrix = mat4.create();
        this.projMatrix = mat4.create();
        this.viewProjMatrix = mat4.create();
	}
	
	BuildProjectionMatrix(iW, iH) {
		mat4.perspective(
			this.projMatrix,
			this.fov,
			iW / iH,
			this.nearClip,
			this.farClip,
		);
	}

    UpdateView() {
		mat4.invert(this.viewMatrix, this.worldMatrix);
		mat4.multiply(this.viewProjMatrix, this.viewMatrix, this.projMatrix);
    }
}
