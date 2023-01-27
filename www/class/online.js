import { multi } from "./multi.js";
import { obstacles } from "./obstacles.js";
export class online extends multi {
    constructor() {
        super();
        this.mod = "online"
        multi.test = multi;
        this.editfunction(this.funconline);
    }
    funconline(adversaire, obstacles, sketch) {
        obstacles.position(adversaire.adversaire);
        let deplacement = false;
        adversaire.deplacement(deplacement);
    }
}