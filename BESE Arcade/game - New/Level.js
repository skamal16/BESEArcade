class Level {

    build() {

        gameObjects = [];
        rigidObjects = [];
        enemies = [];

        var level_width = WIDTH * 2;

        //creating Background
        new GameObject().addTransform(-500, 0).addSprite(new Sprite().createRectangle("black", level_width + 1500, HEIGHT));

        this.player = new PlayerBuilder().build(0, 0);

        var level_map = "level1";

        new MapLoader().loadMap(this.player, level_map);

        return this;
    }

}