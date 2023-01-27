import { cercle } from "./cercle.js";
import { obstacles } from "./obstacles.js";

export class autreJoueur extends obstacles {
    sketch;
    adversaire;
    constructor(sketch) {
        super(0);
        this.sketch = sketch;
        this.adversaire = new cercle(640+320, 240, 50, 'white',sketch)
    }
    addobstacles(x, y, direction) {
        let newobstacle = new obstacles(0,this.sketch);
        newobstacle.addDirection(x, y,direction);
    }
    position =function(){
        this.adversaire.position();
    }
}