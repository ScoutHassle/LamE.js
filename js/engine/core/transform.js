class Transform {
	
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}
	
	get Position() {
		return {x: x, y: y};
	}

	set Position(v) {
		this.x = v.x;
		this.y = v.y;
	}

	moveX(x) {
		this.x += x;
	}

	moveY(y) {
		this.y += y;
	}

	move(v) {
		this.x += v.x;
		this.y += v.y;
	}

	rotate(angle) {

	}
}
