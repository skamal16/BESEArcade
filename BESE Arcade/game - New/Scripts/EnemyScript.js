class EnemyScript extends Script {
    constructor(enemy, target) {
        super(enemy);
        this.target = target;
    }

    start() {
        this.dx = 0;
        this.dy = 0;
        this.lastdy = 0;
        this.left = 0;
        this.right = 0;
        this.up = 0;
        this.down = 0;
        this.max_speed = 7;
        this.acceleration = 2;
        this.jump = 20;
        this.drag = 1;
        this.gravity = 2;
    }

    update() {
        this.findPlayer();
        this.move();
        this.accelerate();
        this.applyResistances();
    }

    findPlayer() {
        var trgt = this.target.transform;
        var transform = this.gameObject.transform;

        this.left = trgt.x < transform.x ? 1 : 0;
        this.right = trgt.x > transform.x ? 1 : 0;
        //this.up = trgt.y < transform.y ? 1 : 0;
    }

    move() {
        var enemy = this.gameObject.transform;
        this.dy = enemy.move(this.dx, this.dy)[1];
    }

    accelerate() {
        if (this.up && this.dy == 0 && this.lastdy == 0) this.dy -= this.jump;
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