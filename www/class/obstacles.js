import { obstacle } from "./obstacle.js"
export class obstacles {
    static list = []
    //nb c'est nombre
    constructor(nb, sketch) {
        for (let i = 0; i < nb; i++) {
            obstacles.list.push(new obstacle(Math.random() * 630 + 5, Math.random() * 470 + 5, Math.random() * 2 * Math.PI, 10, 'red', sketch));
        }
    }
    reset() {
        obstacles.list = [];
    }
    //id  nombre
    obstacle(id) {
        return obstacles.list[id];
    }
    //joueur class cercle
    position(joueur) {
        obstacles.list.forEach(obstacle => {
            obstacle.deplacement(joueur);
            obstacle.position();
        });
    }
    addDirection(x, y, direction, sketch) {
        obstacles.list.push(new obstacle(x, y, direction, 10, 'red', sketch));
    }
};