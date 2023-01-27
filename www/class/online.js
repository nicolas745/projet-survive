import { multi } from "./multi.js";
export class online extends multi {
    constructor() {
        super();
        this.mod = "online"
        this.editfunction(this.funconline);
    }
    funconline = function (adversaire, obstacles) {
        adversaire.deplacement();
        obstacles.position(this.adversaire);
    }
}