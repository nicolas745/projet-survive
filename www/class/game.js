import { obstacles } from "./obstacles.js";
import { cercle } from "./cercle.js"
export class game {
    static parent;
    static func = {};
    constructor(parent) {
        game.parent = parent;
    }
    static startGame = true;
    static remove = false;
    mod;
    setup;
    get mod() {
        return mod;
    }
    set mod(valeur) {
        this.mod = valeur
    }
    get setup() {
        return mod;
    }
    set setup(valeur) {
        this.mod = valeur
    }
    start() {
        new p5(this.game);
        game.startGame = true;
    }
    restart() {
        game.startGame = true;
    }
    remove() {
        game.remove = true;
    }
    static editfunction(name, func) {
        game.func[name] = func;
    }
    game(sketch) {
        function millisToTimes(millis) {
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
        function addobstacles() {
            if (tempsAjoutNewObstacle == Math.pow(10, 2)) {
                tempsAjoutNewObstacle = 0;
                return new obstacles(1, sketch);
            }
            tempsAjoutNewObstacle++;
        }
        let joueur = new cercle(320, 240, 50, 'white', sketch);
        let enemieStart = 1;
        let tempsAjoutNewObstacle = 0; //ne pas modifier
        let tout_obstacles = new obstacles(enemieStart, sketch);
        let startime = sketch.millis();
        sketch.setup = function () {
            game.setup(startime, sketch);
        }
        sketch.draw = function () {
            if (game.startGame == true) {
                game.startGame = false;
                tout_obstacles.reset();
                startime = sketch.millis();
                new obstacles(enemieStart, sketch);
                sketch.gameover = false;
                joueur.PosX = 320;
                joueur.PosY = 240;
            }
            sketch.text(true)
            if (!sketch.gameover) {
                sketch.stroke(0, 0, 0)
                sketch.background(220);
                sketch.line(640, 0, 640, 480);
                joueur.deplacement(5);
                joueur.position();
                tout_obstacles.position(joueur);
                sketch.fill(0)
                sketch.text("timer : " + millisToTimes(sketch.millis() - startime), 10, 40);
                addobstacles();
                if (typeof game.multi !== "undefined") {
                    game.multi(sketch);
                }
            }
            if (game.remove) {
                game.remove = false;
                sketch.remove();
            }
        }
    }
}