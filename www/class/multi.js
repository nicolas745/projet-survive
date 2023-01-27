import { autreJoueur } from "./autreJoueur.js";
import {game} from "./game.js";
export class multi extends game{
    adversaire;
    constructor(){
        super();
        game.setup = this.setup;
        game.multi = this.multijoueur;
    }
    setup = function(startime,sketch){
        this.adversaire = new autreJoueur(sketch);
        startime = sketch.millis();
        sketch.createCanvas(640*2, 480);
        sketch.textSize(32);
        sketch.background(220);
    }
    multijoueur(sketch){
        this.adversaire.position();
    }
}