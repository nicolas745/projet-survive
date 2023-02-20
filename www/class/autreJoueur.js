import { cercle } from "./cercle.js";
import { obstacles } from "./obstacles.js";

export class autreJoueur extends obstacles {
    sketch;
    adversaire;
    static pseudo;
    constructor(sketch) {
        super(0);
        this.sketch = sketch;
        this.adversaire = new cercle(640 + 320, 240, 50, 'white', sketch);
        this.adversaire.type = "p2";
    }
    /**
     * ca permet d'ajouter un obstacle
     * @param {*} x postion x
     * @param {*} y postion y
     * @param {*} direction la direction en rad
     */
    addobstacles(x, y, direction) {
        let newobstacle = new obstacles(0, this.sketch);
        newobstacle.addDirection(x, y, direction);
    }
    deplacement = function (deplacement) {
        this.adversaire.position();
        if (deplacement) {
            this.adversaire.deplacement(5);
        }
    }
    get adversaire() {
        return this.adversaire
    }
}