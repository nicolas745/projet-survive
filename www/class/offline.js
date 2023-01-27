import { multi } from "./multi.js";
import { obstacles } from "./obstacles.js";
export class offline extends multi {
    static tempsAjoutNewObstacle = 0;
    constructor() {
        super();
        this.mod = "offline"
        multi.test = multi;
        this.editfunction(this.funconline);
    }
    static addobtacle(sketch) {
        if (offline.tempsAjoutNewObstacle == Math.pow(10, 2)) {
            offline.tempsAjoutNewObstacle = 0;
            let obstacle = new obstacles(0, sketch);
            obstacle.addDirection(630 + Math.random() * 630 + 5, Math.random() * 470 + 5, Math.random() * 2 * Math.PI, sketch)
        }
        this.tempsAjoutNewObstacle++;
    }
    funconline(adversaire, obstacles, sketch) {
        adversaire.deplacement();
        obstacles.position(adversaire);
        offline.addobtacle(sketch);
    }
}