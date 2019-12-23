class MapLoader {
    loadMap(player, level) {
        var map = levels[level];
        var lines = map.split('\n');

        var tileWidth = 30;

        var enemyWidth = 60;
        var enemyHeight = 90;

        var y = 0;
        lines.forEach(function(line) {
            var x = 0;
            line.split('').forEach(function(tile) {
                if (tile == '0') {
                    new GameObject().addTransform(x, y).addSprite(new Sprite().createRectangle("white", tileWidth, tileWidth)).addRigidBody(x, y, tileWidth, tileWidth);
                } else if (tile == '1') {
                    player.transform.x = x;
                    player.transform.y = y - player.sprite.height;
                } else if (tile == '2') {
                    new EnemyBuilder().build(player, x, y - enemyHeight, enemyWidth, enemyHeight);
                } else if (tile == '3') {
                    var door = new GameObject().addTransform(x, y - player.sprite.height + 20).addSprite(new Sprite().createRectangle("darkgreen", tileWidth * 3, player.sprite.height + 20));
                    var door_script = new LevelDoorScript(door, player, level + 1);
                    door.addScript(door_script);
                } else if (tile == '4') {
                    var platform = new GameObject().addTransform(x, y).addSprite(new Sprite().createRectangle("white", tileWidth * 5, tileWidth)).addRigidBody(x, y, tileWidth * 5, tileWidth);
                    var platform_script = new PlatformScript(platform, 2);
                    platform.addScript(platform_script);
                }
                x += tileWidth;
            });
            y += tileWidth;
        });
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

    moveMap(dx, dy) {
        this.x += dx;
        this.y += dy;

        var d = [dx, dy];

        return d;
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

//animator
class Animator {
    constructor(image, width, height, frames, speed = 6) {
        this.image = new Image();
        this.image.src = image;
        this.x = 0;
        this.y = 0;
        this.delay = 6;
        this.counter = this.speed;
        this.frames = frames;
        this.currentFrame = 0;
        this.width = width;
        this.height = height;
    }

    render() {
        var clipWidth = this.image.width / this.frames;
        CTX.drawImage(this.image, clipWidth * this.currentFrame, 0, clipWidth, this.image.height, this.x, this.y, this.width, this.height);

        if (this.counter > 0) this.counter--;
        else {
            this.counter = this.delay;
            this.currentFrame = (this.currentFrame + 1) % this.frames;
        }
    }
}

//sprite to be rendered
class Sprite {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    createImage(image, width, height) {
        this.image = new Image();
        this.image.src = image;
        this.width = width;
        this.height = height;
        this.type = "image";
        return this;
    }

    createAnimatedSprite(animator) {
        this.width = animator.width;
        this.height = animator.height;
        this.animator = animator;
        this.type = "animated";
        return this;
    }

    createRectangle(color, width, height) {
        this.color = color;
        this.width = width;
        this.height = height;
        this.type = "rect";
        return this;
    }

    update(transform) {
        this.x = transform.x;
        this.y = transform.y;

        if (this.type == "animated") {
            this.animator.x = this.x;
            this.animator.y = this.y;
        }
    }

    render() {
        if (this.type == "rect") {
            CTX.fillStyle = this.color;
            CTX.fillRect(this.x, this.y, this.width, this.height);
        } else if (this.type == "image") {
            CTX.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (this.type == "animated") {
            this.animator.render();
        }
    }
}