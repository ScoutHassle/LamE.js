import {Vector2} from './utility/Vector2';


export class Transform {
    
    // Variables
    private position: Vector2;
    private size: Vector2;

	constructor(x: number, y: number, w: number, h: number) {

        this.position = new Vector2(x, y);
        this.size = new Vector2(w, h);
	}
	
	Position(): Vector2 {
		return this.position;
	}

	Size(): Vector2 {
		return this.size;
	}

	SetPosition(v: Vector2): void{
		this.position.Set(v);
	}

	MoveX(x: number): void {
		this.position.x += x;
	}

	MoveY(y: number): void {
		this.position.y += y;
	}

	Move(v: Vector2): void {
		this.position.x += v.x;
		this.position.y += v.y;
	}

	Rotate(angle: number): void {

	}
}
