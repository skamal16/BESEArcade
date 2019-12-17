class PlayerScript extends Script {
    constructor(player, melee) {
        super(player);
        this.melee = melee;
    }

    start() {
        this.dx = 0;
        this.dy = 0;
        this.lastdy = 0;
        this.left = 0;
        this.right = 0;
        this.up = 0;
        this.down = 0;
        this.max_speed = 10;
        this.acceleration = 2;
        this.jump = 30;
        this.drag = 1;
        this.gravity = 3;

        this.viewportLeft = WIDTH / 3;
        this.viewportRight = WIDTH * 2 / 3;
    }

    update() {
        this.move();
        var animator = this.gameObject.sprite.animator;
        if (this.dx < 0) {
            animator.active = animator.walk_left;
            animator.frames = 6;
        } else if (this.dx > 0) {
            animator.active = animator.walk_right;
            animator.frames = 6;
        } else {
            animator.active = animator.idle;
            animator.frames = 1;
            animator.currentFrame = 0;
        }
        this.accelerate();
        this.applyResistances();
        if (controller.mouse[0]) this.killEnemy();

        var m = this.melee.transform;
        var p = this.gameObject.transform;

        var mouseX = controller.mousePos[0];

        m.x = mouseX > p.x ? p.x + this.gameObject.rigidbody.collider.width / 2 : p.x - this.gameObject.rigidbody.collider.width / 2;
        m.y = p.y;
    }

    killEnemy() {
        var new_enemies = enemies;
        var melee = this.melee;
        var dx = this.dx;
        var dy = this.dy;

        enemies.forEach(function(enemy) {
            if (melee.rigidbody.collidex(enemy.rigidbody, dx) || melee.rigidbody.collidex(enemy.rigidbody, dy)) {

                new_enemies = new_enemies.filter(function(value) {
                    return value != enemy;
                });

                rigidObjects = rigidObjects.filter(function(value) {
                    return value.gameObject != enemy;
                });

                gameObjects = gameObjects.filter(function(value) {
                    return value != enemy;
                });
            }
        });

        enemies = new_enemies;
    }

    move() {
        var obj = this.gameObject;
        var plr = obj.transform;
        var dx = this.dx;

        var collide = false;

        gameObjects.forEach(function(gameObject) {
            if (gameObject !== obj && gameObject.rigidbody && !gameObject.rigidbody.isKinematic && gameObject.rigidbody.collidex(obj.rigidbody, -dx)) {
                collide = true;
                return;
            }
        });

        if (plr.x > this.viewportRight && dx > 0 && !collide) {
            gameObjects.forEach(function(gameObject) {
                if (gameObject !== obj)
                    gameObject.transform.moveMap(-dx, 0);
            });
            this.dy = plr.move(0, this.dy)[1];

        } else if (plr.x < this.viewportLeft && dx < 0 && !collide) {
            gameObjects.forEach(function(gameObject) {
                if (gameObject !== obj)
                    gameObject.transform.moveMap(-dx, 0)[0];
            });
            this.dy = plr.move(0, this.dy)[1];

        } else {
            [this.dx, this.dy] = plr.move(this.dx, this.dy);
        }
    }

    accelerate() {
        if (this.up && this.dy == 0 && this.lastdy == 0) this.dy -= this.jump;
        //if (this.down) this.dy += this.acceleration;
        if (this.left) this.dx -= this.acceleration;
        if (this.right) this.dx += this.acceleration;

        if (this.dx > this.max_speed) this.dx = this.max_speed;
        if (this.dx < -this.max_speed) this.dx = -this.max_speed;
    }

    applyResistances() {
        this.lastdy = this.dy;
        this.dx = this.dx <= 1 && this.dx >= -1 ? this.dx = 0 : this.dx;
        this.dx = this.dx >= 1 ? this.dx -= this.drag : this.dx;
        this.dx = this.dx <= -1 ? this.dx += this.drag : this.dx;

        this.dy = this.dy += this.gravity;
    }
}