export class Vector2 {
    
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    Set(v: Vector2): void {
        this.x = v.x;
        this.y = v.y;
    }
    
    Magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    
    MagnitudeSquared() {
        return (this.x * this.x) + (this.y * this.y)
    }
    
    Normalize() {
        const length = Math.sqrt((this.x * this.x) + (this.y * this.y));
        this.x = this.x / length;
        this.y = this.y / length;
    }
    Clean() {
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
    Add(v: Vector2) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
    }
    Subtract(v: Vector2) {
        this.x = this.x - v.x;
        this.y = this.y - v.y;
    }
    Multiply(v: Vector2) {
        this.x = this.x * v.x;
        this.y = this.y * v.y;
    }
    // Vector/Float
    FloatMultiply(f: number) {
        this.x = this.x * f;
        this.y = this.y * f;
    }
    FloatDivide(f: number) {
        this.x = this.x / f;
        this.y = this.y / f;
    }
}
