"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InputComponent_1 = require("./base/InputComponent");
class ButtonComponent extends InputComponent_1.InputComponent {
    constructor(parent) {
        super(parent);
    }
    OnTouchStart(touch) {
        if (this.TouchBoundCheck(touch)) {
            this.TriggerTouchEvent(TouchEventType.Touch_Start, touch);
            this.SetTouchId(touch.identifier);
            return true;
        }
        return false;
    }
    OnTouchMove(touch) {
        if (this.TouchBoundCheck(touch)) {
            if (this.IsValidTouchId(touch.identifier)) {
                this.TriggerTouchEvent(TouchEventType.Touch_Start, touch);
                return true;
            }
        }
        return false;
    }
    OnTouchEnd(touch) {
        if (this.TouchBoundCheck(touch)) {
            if (this.IsValidTouchId(touch.identifier)) {
                this.TriggerTouchEvent(TouchEventType.Touch_End, touch);
                this.ClearTouchId();
                return true;
            }
        }
        return false;
    }
    TouchBoundCheck(touch) {
        // Cache
        const transform = this.parent.transform;
        const pos = transform.Position();
        const size = transform.Size();
        if ((touch.pageX > pos.x && touch.pageX < (pos.x + size.x)) &&
            (touch.pageY < (pos.y + size.y) && touch.pageY > pos.y)) {
            return true;
        }
        return false;
    }
}
exports.ButtonComponent = ButtonComponent;
//# sourceMappingURL=ButtonComponent.js.map