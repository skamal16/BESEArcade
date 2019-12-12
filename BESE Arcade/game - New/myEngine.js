class GameObject {
    constructor() {
        gameObjects.push(this);
    }

    addSprite(sprite) {
        if (this.transform) {
            sprite.x = this.transform.x;
            sprite.y = this.transform.y;
        }
        this.sprite = sprite;
        return this;
    }

    addTransform(x, y) {
        this.transform = new Transform(x, y);
        return this;
    }

    addScript(script) {
        this.script = script;
        this.script.start();
        return this;
    }

    update() {
        if (this.script) this.script.update();

        if (this.sprite) {
            if (this.transform) this.sprite.update(this.transform);
            this.sprite.render();
        }
    }
}

//additional functionality
class Script {
    constructor(gameObject) {
        this.gameObject = gameObject;
        this.start = function() {};
        this.update = function() {};
    }

    addStart(start) {
        this.start = start;
        return this;
    }

    addUpdate(update) {
        this.update = update;
        return this;
    }
}

//collision and physics
class RigidBody {

}

//positioning details
class Transform {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//sprite to be rendered
class Sprite {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    createImage(image) {
        return this;
    }

    createRectangle(color, width, height) {
        this.color = color;
        this.width = width;
        this.height = height;
        CTX.fillStyle = color;
        CTX.fillRect(this.x, this.y, this.width, this.height);
        return this;
    }

    update(transform) {
        this.x = transform.x;
        this.y = transform.y;
    }

    render() {
        CTX.fillStyle = this.color;
        CTX.fillRect(this.x, this.y, this.width, this.height);
    }
}