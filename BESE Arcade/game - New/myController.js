var controller = {
    keys: {},
    mouse: {},
    mousePos: [0, 0],

    start: function() {
        window.onkeyup = function(e) { controller.keys[e.keyCode] = false; }
        window.onkeydown = function(e) { controller.keys[e.keyCode] = true; }
        window.onmouseup = function(e) { controller.mouse[e.button] = false; }
        window.onmousedown = function(e) { controller.mouse[e.button] = true; }
        window.onmousemove = function(e) { controller.mousePos = [e.pageX, e.pageY]; }
    },

    update: function() {
        var plr = game.level.player.script;

        plr.left = controller.keys[65] ? plr.left = 1 : plr.left = 0;
        plr.right = controller.keys[68] ? plr.right = 1 : plr.right = 0;
        plr.up = controller.keys[32] ? plr.up = 1 : plr.up = 0;
        plr.down = controller.keys[83] ? plr.down = 1 : plr.down = 0;
    }
}