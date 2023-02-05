import { autreJoueur } from "./autreJoueur.js";
import { game } from "./game.js";
import { obstacles } from "./obstacles.js";
export class multi extends game {
    static adversaire;
    static obstacles;
    static tempsAjoutNewObstacle = 1000;
    constructor() {
        super();
        game.setup = this.setup;
        game.multi = this.multijoueur;
    }
    setup = function (startime, sketch) {
        multi.adversaire = new autreJoueur(sketch);
        multi.obstacles = new obstacles(0, sketch);
        multi.tempsAjoutNewObstacle = 1000;
        sketch.createCanvas(640 * 2, 480);
        sketch.textSize(32);
        sketch.background(220);
    }
    multijoueur = function (sketch) {
        game.multijoueur(multi.adversaire, multi.obstacles, sketch);
    }
}