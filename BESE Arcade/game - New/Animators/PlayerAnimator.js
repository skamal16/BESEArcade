class PlayerAnimator extends Animator {
    constructor(images, width, height) {
        super(images[0], width, height, 6);
        this.idle = images[0];
        this.walk_left = images[1];
        this.walk_right = images[2];
        this.jump = images[3];
        this.active = this.idle;
    }

    render() {
        var image = new Image();
        image.src = this.active;
        this.image = image;
        super.render();
    }
}