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

        this.viewportLeft = WIDTH / 6;
        this.viewportRight = WIDTH / 2;
    }

    update() {
        this.move();
        this.accelerate();
        this.applyResistances();
        if (controller.mouse[0]) this.killEnemy();

        var m = this.melee.transform;
        var p = this.gameObject.transform;

        var mouseX = controller.mousePos[0];
        var mouseY = controller.mousePos[1];

        m.x = mouseX > p.x ? p.x + this.gameObject.rigidbody.collider.width / 2 : p.x - this.gameObject.rigidbody.collider.width / 2;
        m.y = p.y - this.gameObject.rigidbody.collider.height / 2;
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
            if (gameObject !== obj)
                if (gameObject.rigidbody && gameObject.rigidbody.collideAllx(-dx) != -dx) collide = true;
        });

        if (plr.x > this.viewportRight && dx > 0 && !collide) {
            gameObjects.forEach(function(gameObject) {
                if (gameObject !== obj)
                    gameObject.transform.move(-dx, 0);
            });
            this.dy = plr.move(0, this.dy)[1];

        } else if (plr.x < this.viewportLeft && dx < 0 && !collide) {
            gameObjects.forEach(function(gameObject) {
                if (gameObject !== obj)
                    gameObject.transform.move(-dx, 0)[0];
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