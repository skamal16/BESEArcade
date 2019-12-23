class PlatformScript extends Script {
    constructor(platform, cooldown, vertical = false) {
        super(platform);
        this.cooldown = cooldown;
        this.vertical = vertical;
    }

    start() {
        this.dx = 0;
        this.dy = 0;
        this.left = 0;
        this.right = 0;
        this.up = 0;
        this.down = 0;
        this.max_speed = 7;
        this.acceleration = 2;
        this.jump = 20;
        this.timer = 0;
        this.switch = false;
    }

    update() {
        this.choosemovement();
        this.move();
        this.accelerate();
    }

    choosemovement() {
        var transform = this.gameObject.transform;

        if (this.timer == 0) {
            this.switch = !this.switch;
        }

        if (this.switch) {
            this.left = 1;
            this.right = 0;
        } else {
            this.right = 1;
            this.left = 0;
        }
        //this.up = trgt.y < transform.y ? 1 : 0;

        this.timer = (this.timer + 1) % (60 * this.cooldown);
    }

    move() {
        var platform = this.gameObject.transform;
        [this.dx, this.dy] = platform.move(this.dx, this.dy);
    }

    accelerate() {
        if (this.up && this.dy == 0 && this.lastdy == 0) this.dy -= this.jump;
        if (this.left) this.dx -= this.acceleration;
        if (this.right) this.dx += this.acceleration;

        if (this.dx > this.max_speed) this.dx = this.max_speed;
        if (this.dx < -this.max_speed) this.dx = -this.max_speed;
    }

}