import { multi } from "./multi.js";
import { obstacles } from "./obstacles.js";
export class offline extends multi {
    constructor() {
        super();
        this.mod = "offline"
        multi.test = multi;
        this.editfunction(this.funconline);
    }
    static addobtacle(sketch) {
        if (multi.tempsAjoutNewObstacle >= Math.pow(10, 2)) {
            multi.tempsAjoutNewObstacle = 0;
            let obstacle = new obstacles(0, sketch);
            obstacle.addDirection(640 + Math.random() * 630 + 5, Math.random() * 470 + 5, Math.random() * 2 * Math.PI, sketch)
        }
        multi.tempsAjoutNewObstacle++;
    }
    funconline(adversaire, obstacles, sketch) {
        obstacles.position(adversaire.adversaire);
        let deplacement = true;
        adversaire.deplacement(deplacement);
        offline.addobtacle(sketch);
    }
}