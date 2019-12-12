var controller = {
    start: function() {
        window.addEventListener('keydown', function(e) {
            controller.key = e.keyCode;
            controller.keyDown = true;
        });

        window.addEventListener('keyup', function(e) {
            controller.key = e.keyCode;
            controller.keyDown = false;
        });
    },

    update: function() {
        var plr = game.level.player;

        if (controller.keyDown)
            switch (controller.key) {
                case 37:
                    plr.setDirection("left");
                    break;
                case 39:
                    plr.setDirection("right");
                    break;
                case 38:
                    plr.setDirection("up");
                    break;
                case 40:
                    plr.setDirection("down");
                    break;
            }
        else
            switch (controller.key) {
                case 37:
                    plr.xdir = plr.xdir == -1 ? 0 : plr.xdir;
                    break;
                case 39:
                    plr.xdir = plr.xdir == 1 ? 0 : plr.xdir;
                    break;
                case 38:
                    plr.ydir = plr.ydir == -1 ? 0 : plr.ydir;
                    break;
                case 40:
                    plr.ydir = plr.ydir == 1 ? 0 : plr.ydir;
                    break;
            }
    }
}