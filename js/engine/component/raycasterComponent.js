// https://github.com/hunterloftis/playfuljs-demos/blob/gh-pages/raycaster/index.html

function Bitmap(src, width, height) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
      }

class RaycasterComponent extends RenderComponent {

    constructor(parent, grid, wallImagePath) {
        
        super(parent, grid);
        
        this.resolution = 320;
        this.focalLength = 0.8;
        this.range = 14;
        this.lightRange = 5;
        
        
        this.skyboxImage = null;
        this.wallTexture = new Bitmap(wallImagePath, 1024, 1024);
        
        this.width = globalCanvas.canvas.width;
        this.height = globalCanvas.canvas.height;
        
        this.spacing = this.width / this.resolution;
        this.scale = (this.width + this.height) / 1200;
    }
    
    static load(temp, json) {
        
        
    }
    
    update() {
        
    }
    
    render() {
     
        this.renderWalls();
    }
    
    renderSky() {
        
    }
    
    renderWalls() {
        
        var ctx = globalCanvas.context;
        ctx.save();
        
        for(var column = 0; column < this.resolution; column++) {
            
            var x = column / this.resolution - 0.5;
            var angle = Math.atan2(x, this.focalLength);
            
            // where x + y are player pos
            // where Math.PI * 0.3 = player angle
            var ray = raycast({x: 15.3, y: -1.2}, Math.PI * 0.3 + angle, this.range, this.GetResource);
            this.renderWall(column, ray, angle);
        }
    }
    
    renderWall(column, ray, angle) {
        
        var ctx = globalCanvas.context;
        var texture = this.wallTexture;
        var left = Math.floor(column * this.spacing);
        var width = Math.ceil(this.spacing);
        var hit = -1;
        while (++hit < ray.length && ray[hit].height <= 0);
        for (var s = ray.length - 1; s >= 0; s--) {
            var step = ray[s];
            var rainDrops = Math.pow(Math.random(), 3) * s;
            var rain = (rainDrops > 0) && this.project(0.1, angle, step.distance);
            if (s === hit) {
                var textureX = Math.floor(texture.width * step.offset);
                var wall = this.project(step.height, angle, step.distance);
                ctx.globalAlpha = 1;
                ctx.drawImage(texture.image, textureX, 0, 1, texture.height, left, wall.top, width, wall.height);
            
                ctx.fillStyle = '#000000';
                ctx.globalAlpha = Math.max((step.distance + step.shading) / this.lightRange - 10 /*map.light*/, 0);
                ctx.fillRect(left, wall.top, width, wall.height);
            }
          
          //ctx.fillStyle = '#ffffff';
          //ctx.globalAlpha = 0.15;
          //while (--rainDrops > 0) ctx.fillRect(left, Math.random() * rain.top, 1, rain.height);
        }
    }
    
    project(height, angle, distance) {
        
        var z = distance * Math.cos(angle);
        var wallHeight = this.height * height / z;
        var bottom = this.height / 2 * (1 + 1 / z);
        return {
            top: bottom - wallHeight,
            height: wallHeight
        };
    }
}