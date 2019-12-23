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
        this.pace = 100;
        this.timer = 0;
        this.chase = true;
    }

    update() {
        this.findPlayer();
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
    }

    findPlayer() {
        var trgt = this.target.transform;
        var transform = this.gameObject.transform;

        if (this.timer == 0) {
            this.chase = Math.random() > 0.5;
        }

        if (this.chase) {
            this.left = (trgt.x < transform.x) ? 1 : 0;
            this.right = (trgt.x > transform.x) ? 1 : 0;
        } else {
            this.right = (trgt.x < transform.x) ? 1 : 0;
            this.left = (trgt.x > transform.x) ? 1 : 0;
        }
        //this.up = trgt.y < transform.y ? 1 : 0;

        this.timer = (this.timer + 1) % 120;
    }

    move() {
        var enemy = this.gameObject.transform;
        [this.dx, this.dy] = enemy.move(this.dx, this.dy);
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