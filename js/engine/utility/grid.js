class grid {
    
    constructor(x, y) {
        
        this.x = x;
        this.y = y;
        this.size = x * y;
        this.grid = new Uint8Array(this.size);
        
        this.randomize();
    }
    
    GetGridNode(x, y) {
        
        x = Math.floor(x);
        y = Math.floor(y);
        if(!this.WithinBounds(x, y)) return -1;
        
        return this.grid[y * this.x + x];
    }
    
    WithinBounds(x, y) {
        
        if(x < 0 || x >= this.x || y < 0 || y >= this.y ) {
            
            return false;
        }
        
        return true;
    }
    
    // Utility stuff
    randomize() {

        for(var i = 0; i < this.size; i++) {
            
            this.grid[i] = Math.random() < 0.3 ? 1 : 0;
        }
    }
}
