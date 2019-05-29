# LamE.js
LamE.js (Look at my Engine). A HTML5 engine/editor I'm building to learn javascript.

---
## New Coding Standards

I've chosen to do this in the move back to JavaScript as what I really wanted from TypeScript was to know what the types were, rather than the safety of them. As such I'm introducing some coding standards that I think will help with a lot of the issues I had between long coding spells.

#### Function Parameters should be named to give an idea of type

e.g. in the Entity class:
```
addComponent(component) - component Class type
removeComponent(idx) - index (int assumed) into an array
```

#### Functions should also specify their return
Void return:
```
addComponent(component) /* */ {
    ...
}
```

Basic type return (e.g. int):
- Lower case start
```
getEntityCount() /* int */ {
    ...
}
```

Class return:
- Upper case start
```
getComponentAt(idx) /* Component */ {
    ...
}
```
---