'use strict';

class vec2 {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    set set(x, y) {
        this.x = x;
        this.y = y;
    }
    
    get magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    
    get magnitudeSquared() {
        return (this.x * this.x) + (this.y * this.y)
    }
    
    normalize() {
        var length = Math.sqrt((this.x * this.x) + (this.y * this.y));
		this.x = this.x / length;
		this.y = this.y / length;
    }

    clean() {
        if (Math.abs(this.x) < Number.EPSILON) {
            this.x = 0.0;
        }

        if (Math.abs(this.y) < Number.EPSILON) {
            this.y = 0.0;
        }
    }

    //----------------------------------------
    // No operator overloading so methods to 
    // support addition and multiplication
    //----------------------------------------

    // Vector/Vector
    add(v) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
    }

    subtract(v) {
        this.x = this.x - v.x;
        this.y = this.y - v.y;
    }

    multiply(v) {
        this.x = this.x * v.x;
        this.y = this.y * v.y;
    }

    // Vector/Float
    fmultiply(f) {
        this.x = this.x * f;
        this.y = this.y * f;
    }

    fdivide(f) {
        this.x = this.x / f;
        this.y = this.y / f;
    }
}
