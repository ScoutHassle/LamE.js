'use strict';

class TestScene extends ScriptComponent {
    constructor() {
        super("TestScene")
        console.log("Test Scene!");

        // Lets create some stuff
        this.sprite = null;
    }

    awake() {
       this.createSprite();
    }

    createSprite() {
        // this.sprite = sceneManager.currentScene.createEntity("sprite", 0, 0, 350, 350);
        // new SpriteComponent(this.sprite, "assets/images/sprite.jpg");
    }

    update() {

    }
}

scriptDatabase["TestScene"] = function() { return new TestScene(); };