window.addEventListener("load", function(event) {

    "use strict";

    //// CONSTANTS ////

    /* Each zone has a url that looks like: zoneXX.json, where XX is the current zone
    identifier. When loading zones, I use the game.world's zone identifier with these
    two constants to construct a url that points to the appropriate zone file. */
    /* I updated this after I made the video. I decided to move the zone files into
    the 06 folder because I won't be using these levels again in future parts. */

    /////////////////
    //// CLASSES ////
    /////////////////

    const AssetsManager = function() {

        this.tile_set_image = undefined;

    };

    AssetsManager.prototype = {

        constructor: Game.AssetsManager,

        /* Requests a file and hands the callback function the contents of that file
        parsed by JSON.parse. */
        requestJSON: function(url, callback) {

            let zone = data["zone" + url];
            callback(zone);

        },

        /* Creates a new Image and sets its src attribute to the specified url. When
        the image loads, the callback function is called. */
        requestImage: function(url, callback) {

            let image = new Image();

            image.addEventListener("load", function(event) {

                callback(image);

            }, { once: true });

            image.src = url;

        },

    };

    ///////////////////
    //// FUNCTIONS ////
    ///////////////////

    var keyDownUp = function(event) {

        controller.keyDownUp(event.type, event.keyCode);

    };

    var resize = function(event) {

        display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height / game.world.width);
        display.render();

    };

    var render = function() {

        var frame = undefined;

        display.drawMap(assets_manager.tile_set_image,
            game.world.tile_set.columns, game.world.graphical_map, game.world.columns, game.world.tile_set.tile_size);

        for (let index = game.world.carrots.length - 1; index > -1; --index) {

            let carrot = game.world.carrots[index];

            frame = game.world.tile_set.frames[carrot.frame_value];

            display.drawObject(assets_manager.tile_set_image,
                frame.x, frame.y,
                carrot.x + Math.floor(carrot.width * 0.5 - frame.width * 0.5) + frame.offset_x,
                carrot.y + frame.offset_y, frame.width, frame.height);

        }

        frame = game.world.tile_set.frames[game.world.player.frame_value];

        display.drawObject(assets_manager.tile_set_image,
            frame.x, frame.y,
            game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
            game.world.player.y + frame.offset_y, frame.width, frame.height);

        for (let index = game.world.grass.length - 1; index > -1; --index) {

            let grass = game.world.grass[index];

            frame = game.world.tile_set.frames[grass.frame_value];

            display.drawObject(assets_manager.tile_set_image,
                frame.x, frame.y,
                grass.x + frame.offset_x,
                grass.y + frame.offset_y, frame.width, frame.height);

        }

        p.innerHTML = "Carrots: " + game.world.carrot_count;

        display.render();

    };

    var update = function() {

        if (controller.left.active) { game.world.player.moveLeft(); }
        if (controller.right.active) { game.world.player.moveRight(); }
        if (controller.up.active) { game.world.player.jump();
            controller.up.active = false; }

        game.update();

        /* This if statement checks to see if a door has been selected by the player.
        If the player collides with a door, he selects it. The engine is then stopped
        and the assets_manager loads the door's level. */
        if (game.world.door) {

            engine.stop();

            /* Here I'm requesting the JSON file to use to populate the game.world object. */
            assets_manager.requestJSON(game.world.door.destination_zone, (zone) => {

                game.world.setup(zone);

                engine.start();

            });

            return;

        }

    };

    /////////////////
    //// OBJECTS ////
    /////////////////

    var assets_manager = new AssetsManager();
    var controller = new Controller();
    var display = new Display(document.querySelector("canvas"));
    var game = new Game();
    var engine = new Engine(1000 / 30, render, update);

    var p = document.createElement("p");
    p.setAttribute("style", "color:#c07000; font-size:2.0em; position:fixed;");
    p.innerHTML = "Carrots: 0";
    document.body.appendChild(p);

    ////////////////////
    //// INITIALIZE ////
    ////////////////////

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;
    display.buffer.imageSmoothingEnabled = false;

    assets_manager.requestJSON(game.world.zone_id, (zone) => {

        game.world.setup(zone);

        assets_manager.requestImage("tilesettest.png", (image) => {

            assets_manager.tile_set_image = image;

            resize();
            engine.start();

        });

    });

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", resize);

});