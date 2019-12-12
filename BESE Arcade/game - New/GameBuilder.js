class GameBuilder {

    build() {
        //creating Background
        this.background = new GameObject().addTransform(0, 0).addSprite(new Sprite().createRectangle("lightblue", WIDTH, HEIGHT));

        //creating Ground
        var height = HEIGHT / 3;
        this.ground = new GameObject().addTransform(0, HEIGHT - height).addSprite(new Sprite().createRectangle("darkgreen", WIDTH, height));

        //creating Player
        this.player = new GameObject().addTransform(500, 400).addSprite(new Sprite().createRectangle("red", 50, 50));

        var playerScript = new Script(this.player).addStart(
            function() {
                var player = this.gameObject;
                player.dx = 0;
                player.dy = 0;
                player.xdir = 0;
                player.ydir = 0;
                player.max_speed = 10;
                player.acceleration = 2;

                player.move = function() {
                    this.transform.x += this.dx;
                    this.transform.y += this.dy;
                }

                player.accelerate = function() {
                    this.dx += this.acceleration * this.xdir;
                    this.dy += this.acceleration * this.ydir;
                    if (this.dx > this.max_speed) this.dx = this.max_speed;
                    if (this.dx < -this.max_speed) this.dx = -this.max_speed;
                    if (this.dy > this.max_speed) this.dy = this.max_speed;
                    if (this.dy < -this.max_speed) this.dy = -this.max_speed;
                }

                player.applyResistances = function() {
                    this.dx = this.dx <= 0.5 && this.dx >= -0.5 ? this.dx = 0 : this.dx;
                    this.dx = this.dx >= 0.5 ? this.dx -= 1 : this.dx;
                    this.dx = this.dx <= -0.5 ? this.dx += 1 : this.dx;

                    this.dy = this.dy <= 0.5 && this.dy >= -0.5 ? this.dy = 0 : this.dy;
                    this.dy = this.dy >= 0.5 ? this.dy -= 1 : this.dy;
                    this.dy = this.dy <= -0.5 ? this.dy += 1 : this.dy;
                }

                player.setDirection = function(key) {
                    switch (key) {
                        case "up":
                            this.ydir = -1;
                            break;
                        case "down":
                            this.ydir = 1;
                            break;
                        case "left":
                            this.xdir = -1;
                            break;
                        case "right":
                            this.xdir = 1;
                            break;
                    }
                }
            }
        ).addUpdate(
            function() {
                var player = this.gameObject;
                player.move();
                player.accelerate();
                player.applyResistances();
            }
        );
        this.player.addScript(playerScript);

        return this;
    }

}