const WIDTH = 1280;
const HEIGHT = 720;

let canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;

const CTX = canvas.getContext("2d");

let gameObjects = [];
let rigidObjects = [];
let enemies = [];

window.onload = function() {
    startGame();
}

function startGame() {
    game.start();
    controller.start();
    setInterval(function() {
        game.update();
        controller.update();
    }, 20);
}

var game = {

    start: function() {
        document.body.append(canvas);
        this.level = new Level_1().build();
    },

    update: function() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        gameObjects.forEach(function(gameObject) {
            gameObject.update();
        });
    }
}