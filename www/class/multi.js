import { autreJoueur } from "./autreJoueur.js";
import { game } from "./game.js";
import { obstacles } from "./obstacles.js";
export class multi extends game {
    adversaire;
    obstacles;
    constructor() {
        super();
        game.setup = this.setup;
        game.multi = this.multijoueur;
    }
    setup = function (startime, sketch) {
        this.adversaire = new autreJoueur(sketch);
        this.obstacles = new obstacles(0, sketch);
        startime = sketch.millis();
        sketch.createCanvas(640 * 2, 480);
        sketch.textSize(32);
        sketch.background(220);
    }
    multijoueur = function (sketch) {
        game.multijoueur(this.adversaire, this.obstacles, sketch);
    }
    editfunction(func) {
        game.multijoueur = func;
    }
}