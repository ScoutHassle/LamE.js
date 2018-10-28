// https://github.com/hunterloftis/playfuljs-demos/blob/gh-pages/raycaster/index.html

function raycast(position, direction, length, grid) {
    
    var sin = Math.sin(direction);
    var cos = Math.cos(direction);
    var noWall = { length2: Infinity };
    
    return ray({x: position.x, y: position.y, height: 0, distance: 0 });
    
    function ray(origin) {
        
        var stepX = step(sin, cos, origin.x, origin.y);
        var stepY = step(cos, sin, origin.y, origin.x, true);
        var nextStep = stepX.length2 < stepY.length2
            ? inspect(stepX, 1, 0, origin.distance, stepX.y)
            : inspect(stepY, 0, 1, origin.distance, stepY.x);
        
        if (nextStep.distance > length) return [origin];
        
        return [origin].concat(ray(nextStep));
    }
    
    function step(rise, run, x, y, inverted) {
        
        if(run === 0) return noWall;
        var dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
        var dy = dx * (rise / run);
        
        return {
            x: inverted ? y + dy : x + dx,
            y: inverted ? x + dx : y + dy,
            length2: dx * dx + dy * dy };
    }
    
    function inspect(step, shiftX, shiftY, distance, offset) {
     
        var dx = cos < 0 ? shiftX : 0;
        var dy = sin < 0 ? shiftY : 0;
        step.height = grid.GetGridNode(step.x - dx, step.y - dy); //self.get(step.x - dx, step.y - dy);
        step.distance = distance + Math.sqrt(step.length2);
        
        if (shiftX)
        {
            step.shading = cos < 0 ? 2 : 0;
        }
        else
        {
            step.shading = sin < 0 ? 2 : 1;
        }
        
        step.offset = offset - Math.floor(offset);
        
        return step;
    }
}