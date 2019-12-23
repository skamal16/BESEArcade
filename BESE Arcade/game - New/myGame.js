const WIDTH = 1280;
const HEIGHT = 720;

let canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;

const CTX = canvas.getContext("2d");

let gameObjects = [];
let rigidObjects = [];
let enemies = [];

let currentLevel = 1;

let killCount = 0;

window.onload = function() {
    startGame();
}

function startGame() {
    game.start();
    controller.start();
    setInterval(function() {
        game.update();
        controller.update();
    }, 15);
}

var game = {

    start: function() {
        document.body.append(canvas);
        $.ajax({
            url: "getActiveLevel.php",
            success: function(response) {
                currentLevel = response;
                game.level = new Level().build();
            }
        });
    },


    update: function() {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        CTX.fillStyle = 'black';
        CTX.fillRect(0, 0, canvas.width, canvas.height);
        gameObjects.forEach(function(gameObject) {
            gameObject.update();
        });
    }
}