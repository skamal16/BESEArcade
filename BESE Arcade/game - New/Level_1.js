class Level_1 {

    build() {

        gameObjects = [];
        rigidObjects = [];
        enemies = [];

        var level_map = "level1.txt";

        new MapLoader().loadMap(level_map);

        var level_width = WIDTH * 2;

        //creating Background
        this.background = new GameObject().addTransform(-500, 0).addSprite(new Sprite().createRectangle("black", level_width + 1500, HEIGHT));

        //creating Ground
        var height = HEIGHT / 3;
        this.ground = new GameObject().addTransform(0, HEIGHT - height).addSprite(new Sprite().createRectangle("white", level_width, 10)).addRigidBody(0, HEIGHT - height, level_width, height);

        //creating invisible boundaries
        this.boundary_left = new GameObject().addTransform(0, HEIGHT - height - 501).addRigidBody(0, HEIGHT - height - 501, 5, 500);
        this.boundary_right = new GameObject().addTransform(level_width - 5, HEIGHT - height - 501).addRigidBody(level_width - 5, HEIGHT - height - 501, 5, 500);

        //creating Player
        this.player = new PlayerBuilder().build();

        //creating obstacle
        var obstacle_x = 600;
        var obstacle_y = 400;
        var obstacle_height = 50;
        var obstacle_width = 50;

        this.obstacle = new GameObject().addTransform(obstacle_x, obstacle_y).addSprite(new Sprite().createRectangle("gray", obstacle_width, obstacle_height)).addRigidBody(obstacle_x, obstacle_y, obstacle_width, obstacle_height);

        //creating enemy
        this.enemy = new EnemyBuilder().build(this.player);

        return this;
    }

}