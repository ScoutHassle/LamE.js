class Transform {
	
	constructor(iX, iY, iW, iH) {
		this.x = iX;
		this.y = iY;
		this.width = iW;
		this.height = iH;
	}
	
	get Position() /* js: {x, y} */ {
		return {x: this.x, y: this.y};
	}

	get PivotPosition() /* js: {x, y} */ {
		return {x: this.x + (this.width*0.5), y: this.y + (this.height*0.5)};
	}

	get PositionV2() /* Vector2 */ {
		return new vec2(this.x, this.y);
	}

	get PivotPositionV2() /* Vector2 */ {
		return new vec2(this.x + (this.width*0.5), this.y + (this.height*0.5));
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
