class Level {

    build() {

        gameObjects = [];
        rigidObjects = [];
        enemies = [];

        this.player = new PlayerBuilder().build(0, 0);

        var level_map = currentLevel;

        new MapLoader().loadMap(this.player, level_map);

        return this;
    }

}