class LevelDoorScript extends Script {
    constructor(gameObject, player, level_target) {
        super(gameObject);
        this.level_target = level_target;
        this.player = player;
    }

    update() {
        var otherobj = this.player.rigidbody.collider;
        var dx = this.player.script.dx;

        var x = this.gameObject.sprite.x;
        var y = this.gameObject.sprite.y;
        var width = this.gameObject.sprite.width;
        var height = this.gameObject.sprite.height;

        var myleft = x;
        var myright = x + (width);
        var mytop = y;
        var mybottom = y + (height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;

        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }

        if (crash && ((dx > 0 && myright <= otherright) || (dx < 0 && myleft >= otherleft))) {
            game.level = new Level().build(this.level_target);
        }
    }
}