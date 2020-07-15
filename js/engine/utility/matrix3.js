'use strict';

const m3 = {
    "ScX": 0,
    "SkX": 1,
    "X": 2,
    "SkY": 3,
    "ScY": 4,
    "Y": 5,
};
Object.freeze(m3);

class matrix3 {
    
    constructor(fX, fY) {

        // Matrix 3x3
        this.m = [  
            1, 0, fX,
            0, 1, fY,
            0, 0, 1
        ];
    }

    translateX(fX) /* */ {
        this.m[m3.X] += fX;
    }

    translateY(fY) /* */ {
        this.m[m3.Y] += fY;
    }

    translate(fX, fY) /* */ {
        this.m[m3.X] += fX;
        this.m[m3.Y] += fY;
    }

    setPosition(fX, fY) /* */ {
        this.m[m3.X] = fX;
        this.m[m3.Y] = fY;
    }

    scaleX(fX) /* */ {
        this.m[m3.ScX] += fX;
    }

    scaleY(fY) /* */ {
        this.m[m3.ScY] += fY;
    }

    scale(fX, fY) /* */ {
        this.m[m3.ScX] += fX;
        this.m[m3.ScY] += fY;
    }

    setScale(fX, fY) /* */ {
        this.m[m3.ScX] = fX;
        this.m[m3.ScY] = fY;
    }

    skewX(fX) /* */ {
        this.m[m3.SkX] += fX
    }

    skewY(fY) /* */ {
        this.m[m3.SkY] += fY
    }

    skew(fX, fY) /* */ {
        this.m[m3.SkX] += fX;
        this.m[m3.SkY] += fY;
    }

    setSkew(fX, fY) /* */ {
        this.m[m3.SkX] = fX;
        this.m[m3.SkY] = fY;
    }
}
