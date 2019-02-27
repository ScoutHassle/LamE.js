export class CanvasManager {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor() {

        this.canvas = null;
        this.context = null;
    }

    CreateCanvas(w: number, h: number): HTMLCanvasElement {

        var c = document.createElement("canvas");
        c.id = "MainCanvas";
        c.width = w;
        c.height = h;
        document.body.insertBefore(c, document.body.childNodes[0]);

        this.canvas = c;
        this.context = c.getContext("2d");
        return c;
    }

    GetCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    Clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
