class PlayerBuilder {

    build() {
        var x = 500;
        var y = 400;
        var width = 50;
        var height = 50;

        var player = new GameObject().addTransform(x, y).addSprite(new Sprite().createRectangle("red", width, height)).addRigidBody(x, y, width, height);
        var melee = new GameObject().addTransform(x, y).addSprite(new Sprite().createRectangle("white", width * 1, height * 1)).addRigidBody(x, y, width * 1, height * 1, true);
        var playerScript = new PlayerScript(player, melee);
        player.addScript(playerScript);

        return player;
    }

}