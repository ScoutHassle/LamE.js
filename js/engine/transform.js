"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = require("./utility/Vector2");
class Transform {
    constructor(x, y, w, h) {
        this.position = new Vector2_1.Vector2(x, y);
        this.size = new Vector2_1.Vector2(w, h);
    }
    Position() {
        return this.position;
    }
    Size() {
        return this.size;
    }
    SetPosition(v) {
        this.position.Set(v);
    }
    MoveX(x) {
        this.position.x += x;
    }
    MoveY(y) {
        this.position.y += y;
    }
    Move(v) {
        this.position.x += v.x;
        this.position.y += v.y;
    }
    Rotate(angle) {
    }
}
exports.Transform = Transform;
//# sourceMappingURL=Transform.js.map