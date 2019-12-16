class MapLoader {
    loadMap(file) {
        var reader = new FileReader();
        var text;

        reader.onload = function() {
            text = reader.result;
            createObjectsFromText(text);
        };

        var textfile = new File
        reader.readAsText(file);
    }

    createObjectsFromText(text) {
        console.log(text);
    }
}

class GameObject {
    constructor() {
        gameObjects.push(this);
        this.transform = null;
        this.rigidbody = null;
        this.sprite = null;
        this.script = null;
    }

    addTransform(x, y) {
        this.transform = new Transform(this, x, y);
        return this;
    }

    addRigidBody(x, y, width, height, isKinematic = false) {
        this.rigidbody = new RigidBody(this, isKinematic).addCollider(x, y, width, height);
        return this;
    }

    addSprite(sprite) {
        if (this.transform) {
            sprite.x = this.transform.x;
            sprite.y = this.transform.y;
        }
        this.sprite = sprite;
        return this;
    }

    addScript(script) {
        this.script = script;
        this.script.start();
        return this;
    }

    update() {
        if (this.script) this.script.update();

        if (this.rigidbody)
            if (this.transform) this.rigidbody.update();

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
    }

    start() {}

    update() {}
}

//collision and physics
class RigidBody {
    constructor(gameObject, isKinematic = false) {
        if (!isKinematic) rigidObjects.push(this);
        this.collider = null;
        this.gameObject = gameObject;
        this.isKinematic = isKinematic;
    }

    addCollider(x, y, width, height) {
        this.collider = new Collider(x, y, width, height);
        return this;
    }

    collidex(rb, dx) {
        var otherobj = rb.collider;

        var x = this.collider.x + dx;
        var y = this.collider.y;
        var width = this.collider.width;
        var height = this.collider.height;

        var myleft = x;
        var myright = x + (width);
        var mytop = y;
        var mybottom = y + (height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

    collidey(rb, dy) {
        var otherobj = rb.collider;

        var x = this.collider.x;
        var y = this.collider.y + dy;
        var width = this.collider.width;
        var height = this.collider.height;

        var myleft = x;
        var myright = x + (width);
        var mytop = y;
        var mybottom = y + (height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

    collideAllx(dx) {
        var collision = false;
        var rb = this;
        rigidObjects.forEach(function(rigidbody) {
            if (rb != rigidbody && !rigidbody.isKinematic && !rb.isKinematic)
                if (rb.collidex(rigidbody, dx)) collision = true;
        });

        if (collision) {
            if (dx != 0) {
                dx -= (Math.abs(dx) / dx)
                dx = this.collideAllx(dx);
            }
        }

        return dx;
    }

    collideAlly(dy) {
        var collision = false;
        var rb = this;
        rigidObjects.forEach(function(rigidbody) {
            if (rb != rigidbody && !rigidbody.isKinematic && !rb.isKinematic)
                if (rb.collidey(rigidbody, dy)) collision = true;
        });
        if (collision) {
            if (dy != 0) {
                dy -= (Math.abs(dy) / dy)
                dy = this.collideAlly(dy);
            }
        }

        return dy;
    }

    update() {
        this.collider.x = this.gameObject.transform.x;
        this.collider.y = this.gameObject.transform.y;
    }
}

//rectangular collider
class Collider {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

//positioning details
class Transform {
    constructor(gameobject, x, y) {
        this.gameObject = gameobject;
        this.x = x;
        this.y = y;
    }

    move(dx, dy) {
        var rb = this.gameObject.rigidbody;
        if (rb && !rb.isKinematic) dx = rb.collideAllx(dx);
        if (rb && !rb.isKinematic) dy = rb.collideAlly(dy);
        this.x += dx;
        this.y += dy;

        var d = [dx, dy];

        return d;
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