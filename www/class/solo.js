import { game } from "./game.js";
import { menu } from "./menu.js";
import { obstacles } from "./obstacles.js";
export class solo extends game {
    static tempsAjoutNewObstacle = 1000;
    constructor() {
        super();
        game.mod = "solo"
        game.setup = this.setup;
        game.addobstacles = this.addobstacles;
    }
    setup = function (startime, sketch) {
        startime = sketch.millis();
        sketch.createCanvas(640, 480);
        sketch.textSize(32);
        sketch.background(220);
        menu.addbutton("Le jeux de survie", "play", 1, 1, 1, () => {
            menu.actif = false;
        })
        menu.addbutton("gameover", "restart", 1, 2, 2, function () {
            game.startGame = true;
            menu.actif = false;
        });
        menu.addbutton("Le jeux de survie", "exit", 2, 1, 1, () => {
            game.remove = true
        });
        menu.addbutton("gameover", "exit", 0, 1, 2, function () {
            game.remove = true;
            menu.select = "Le jeux de survie"
        })
    }
    addobstacles(sketch) {
        if (solo.tempsAjoutNewObstacle > Math.pow(10, 2)) {
            solo.tempsAjoutNewObstacle = 0;
            return new obstacles(1, sketch);
        }
        solo.tempsAjoutNewObstacle++;
    }
}