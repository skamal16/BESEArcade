class LevelDoorScript extends Script {
    constructor(gameObject, player) {
        super(gameObject);
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
            this.updateScore();
            currentLevel++;
            killCount = 0;
            game.level = new Level().build();
        }
    }

    updateScore() {
        var score = killCount;
        console.log(score);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("SCORE SENT");
                console.log(this.responseText);
            }
        };
        xmlhttp.open("GET", "score_upload.php?score=" + score + "&level=" + currentLevel, true);
        xmlhttp.send();
    }
}