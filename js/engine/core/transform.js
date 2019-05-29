class Transform {
	
	constructor(iX, iY, iW, iH) {
		this.x = iX;
		this.y = iY;
		this.width = iW;
		this.height = iH;
	}
	
	get Position() /* js: {x, y} */ {
		return {x: x, y: y};
	}

	set Position(v2) /* */ {
		this.x = v2.x;
		this.y = v2.y;
	}

	moveX(iX) /* */ {
		this.x += iX;
	}

	moveY(iY) /* */ {
		this.y += iY;
	}

	move(v2) /* */ {
		this.x += v2.x;
		this.y += v2.y;
	}

	rotate(angle) /* */ {

	}
}
