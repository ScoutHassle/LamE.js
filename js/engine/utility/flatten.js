// from https://stackoverflow.com/questions/8779249/how-to-stringify-inherited-objects-to-json
function Flatten(obj) {
    let result = Object.create(obj);
    for (let key in result) {
        result[key] = result[key];
    }
    return result;
}
//# sourceMappingURL=Flatten.js.map