
import obstacles from "./obstacles.js";
import cercle from "./cercle.js"
import game from "./game.js";
class solo extends game{
    starstartGamet = true;
    constructor(){
        super();
    }
    game(sketch){
        function millisToTimes(millis) {
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
        function addobstacles() {
            if (tempsAjoutNewObstacle == Math.pow(10, 2)) {
                tempsAjoutNewObstacle = 0;
                return new obstacles(1,sketch);
            }
            tempsAjoutNewObstacle++;
        }
        let joueur = new cercle(320, 240, 50, 'white',sketch);
        let enemieStart = 1;
        let tempsAjoutNewObstacle = 0; //ne pas modifier
        let tout_obstacles =  new obstacles(enemieStart,sketch);
        let startime;
        sketch.setup = function() { 
            startime = sketch.millis();
            sketch.createCanvas(640, 480);
            sketch.textSize(32);
            sketch.background(220);
        }
        sketch.draw = function() {
            if(this.startGame){
                this.startGame = false;
                tout_obstacles.reset();
                startime = sketch.millis();
                new obstacles(this.enemieStart,sketch);
                sketch.gameover = false;
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
                //adversaire.position();
            }
        }
    }
}

let test = new solo();
test.start();