class Mesh {
    constructor() {
        this.verticies =[
            -1.0, 1.0,
            1.0, 1.0,
            -1.0, -1.0,
            1.0, -1.0,
        ];

        // WebGLBuffer 
        this.data = null;
    }

    LoadMesh(glctx) /* bool */ {

        // Load successful? Hardcoded atm
        const rawData = this.verticies;

        this.data = glctx.createBuffer();
        glctx.bindBuffer(glctx.ARRAY_BUFFER, this.data);
        glctx.bufferData(glctx.ARRAY_BUFFER, new Float32Array(rawData), glctx.STATIC_DRAW);

        return true;
    }
}