class PlayerBuilder {

    build(x, y) {
        var width = 100;
        var height = 150;

        var images = ["player_sprite_idle.png", "player_sprite_walk_left.png", "player_sprite_walk_right.png", "player_sprite_jump.png", "player_sprite.png"];

        var player = new GameObject().addTransform(x, y).addSprite(new Sprite().createAnimatedSprite(new PlayerAnimator(images, width, height))).addRigidBody(x, y, width, height);
        var melee = new GameObject().addTransform(x, y).addRigidBody(x, y, width, height, true);
        var playerScript = new PlayerScript(player, melee);
        player.addScript(playerScript);

        return player;
    }

}