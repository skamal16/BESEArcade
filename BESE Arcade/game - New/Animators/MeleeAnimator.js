class MeleeAnimator extends Animator {
    constructor(images, width, height) {
        super(images[0], width, height, 4);
        this.attack_right = images[0];
        this.attack_left = images[1];
        this.active = false;
    }

    render() {
        if (this.active) {
            var image = new Image();
            image.src = this.active;
            this.image = image;
            if (this.active == this.attack_right) {
                this.x -= 15;
                this.y -= 20;
            } else if (this.active == this.attack_left) {
                this.x += 15;
                this.y -= 20;
            }
            super.render();
        }
    }
}