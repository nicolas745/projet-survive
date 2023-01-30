import { game } from "./game.js";
import { multi } from "./multi.js";
import { io } from "./socket.js";
export class online extends multi {
    constructor() {
        super();
        this.mod = "online"
        game.addobstacles = this.addobstacles;
        game.multijoueur = this.funconline;
        let socket = io();
    }

    funconline(adversaire, obstacles, sketch) {
        obstacles.position(adversaire.adversaire);
        let deplacement = false;
        adversaire.deplacement(deplacement);
    }
    disconnect(){
        this.socket.disconnect();
    }
    
    addobstacles(sketch) {
        if (solo.tempsAjoutNewObstacle > Math.pow(10, 2)) {
            solo.tempsAjoutNewObstacle = 0;
            return new obstacles(1, sketch);
        }
        solo.tempsAjoutNewObstacle++;
    }
}