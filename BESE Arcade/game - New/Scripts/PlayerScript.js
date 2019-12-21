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
        this.viewportTop = HEIGHT / 3;
        this.viewportBottom = HEIGHT * 2 / 3;
        this.camspeed = 10;
    }

    update() {
        var animator = this.gameObject.sprite.animator;
        var melee_animator = this.melee.sprite.animator;
        melee_animator.active = false;

        var m = this.melee.transform;
        var p = this.gameObject.transform;

        var mouseX = controller.mousePos[0];

        m.y = p.y;

        if (controller.mouse[0]) {
            this.killEnemy();
            if (mouseX > p.x) {
                m.x = p.x + this.gameObject.rigidbody.collider.width / 2;
                animator.active = animator.attack_right;
                melee_animator.active = melee_animator.attack_right;
            } else {
                m.x = p.x - this.gameObject.rigidbody.collider.width / 2;
                animator.active = animator.attack_left;
                melee_animator.active = melee_animator.attack_left;
            }
            if (animator.frames != 4) {
                animator.frames = 4;
                animator.currentFrame = 0;
            }
            melee_animator.currentFrame = animator.currentFrame;
            this.dx = 0;
        } else if (this.dx < 0) {
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
        this.move();

        this.accelerate();
        this.applyResistances();
    }

    killEnemy() {
        var new_enemies = enemies;
        var melee = this.melee;

        enemies.forEach(function(enemy) {
            if (melee.rigidbody.collidex(enemy.rigidbody, 0)) {

                new_enemies = new_enemies.filter(function(value) {
                    return value != enemy;
                });

                rigidObjects = rigidObjects.filter(function(value) {
                    return value.gameObject != enemy;
                });

                gameObjects = gameObjects.filter(function(value) {
                    return value != enemy;
                });

                killCount++;
            }
        });

        enemies = new_enemies;
    }

    move() {
        var obj = this.gameObject;
        var plr = obj.transform;

        var camspeed = this.camspeed;

        if (plr.x > this.viewportRight) {
            gameObjects.forEach(function(gameObject) {
                gameObject.transform.moveMap(-camspeed, 0);
            });

        }
        if (plr.x < this.viewportLeft) {
            gameObjects.forEach(function(gameObject) {
                gameObject.transform.moveMap(camspeed, 0);
            });

        }
        if (plr.y < this.viewportTop) {
            gameObjects.forEach(function(gameObject) {
                gameObject.transform.moveMap(0, camspeed);
            });

        }
        if (plr.y > this.viewportBottom) {
            gameObjects.forEach(function(gameObject) {
                gameObject.transform.moveMap(0, -camspeed);
            });
        }

        [this.dx, this.dy] = plr.move(this.dx, this.dy);
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