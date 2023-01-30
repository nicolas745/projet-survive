import { game } from "./game.js";
import { multi } from "./multi.js";
import { obstacles } from "./obstacles.js";
export class offline extends multi {
    static tempsAjoutNewObstacle = 1000;
    constructor() {
        super();
        this.mod = "offline"
        game.multijoueur = this.funconline;
        game.addobstacles = this.addobstacles;
    }
    funconline(adversaire, obstacles, sketch) {
        obstacles.position(adversaire.adversaire);
        let deplacement = true;
        adversaire.deplacement(deplacement);
    }
    addobstacles(sketch) {
        if (offline.tempsAjoutNewObstacle > Math.pow(10, 2)) {
            offline.tempsAjoutNewObstacle = 0;
            let obstacle = new obstacles(1, sketch);
            obstacle.addDirection(640 + Math.random() * 630 + 5, Math.random() * 470 + 5, Math.random() * 2 * Math.PI, sketch)
        }
        offline.tempsAjoutNewObstacle++;
    }
}