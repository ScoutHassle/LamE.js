// from https://stackoverflow.com/questions/8779249/how-to-stringify-inherited-objects-to-json
function flatten(obj) {
    var result = Object.create(obj);
    for(var key in result) {
        result[key] = result[key];
    }
    return result;
}
