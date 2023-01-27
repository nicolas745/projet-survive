import {game} from "./game.js";
export class solo extends game{
    constructor(){
        super();
        game.mod = "solo"
        game.setup = this.setup;
    }
    setup = function(startime,sketch){
        startime = sketch.millis();
        sketch.createCanvas(640, 480);
        sketch.textSize(32);
        sketch.background(220);
    }
}