class EnemyBuilder {

    build(target, x, y, width, height) {

        var images = ["enemy_sprite_idle.png", "enemy_sprite_walk_left.png", "enemy_sprite_walk_right.png", "enemy_sprite_jump.png", "enemy_sprite.png"];

        var enemy = new GameObject().addTransform(x, y).addSprite(new Sprite().createAnimatedSprite(new PlayerAnimator(images, width, height))).addRigidBody(x, y, width, height);
        var enemyScript = new EnemyScript(enemy, target);
        enemy.addScript(enemyScript);
        enemies.push(enemy);

        return enemy;
    }

}