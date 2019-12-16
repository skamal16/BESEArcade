class EnemyBuilder {

    build(target) {
        var x = 800;
        var y = 400;
        var width = 50;
        var height = 50;

        var enemy = new GameObject().addTransform(x, y).addSprite(new Sprite().createRectangle("blue", width, height)).addRigidBody(x, y, width, height);
        var enemyScript = new EnemyScript(enemy, target);
        enemy.addScript(enemyScript);
        enemies.push(enemy);

        return enemy;
    }

}