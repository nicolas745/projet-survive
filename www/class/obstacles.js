import { cercle } from "./cercle.js";
import { obstacle } from "./obstacle.js"
export class obstacles {
    static list = []
    //nb c'est nombre
    sketch;
    constructor(nb, sketch) {
        this.sketch = sketch
        this.newobs = []
        for (let i = 0; i < nb; i++) {
            let x= Math.random() * 630 + 5;
            let y= Math.random() * 470 + 5;
            let vec = Math.random() * 2 * Math.PI;
            obstacles.list.push(new obstacle(x, y, vec, 10, 'red', sketch));
            if(typeof cercle.socket !=="undefined"){
                cercle.socket.emit("obstacles",x,y,vec);
            }
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
    addDirection(x, y, direction) {
        obstacles.list.push(new obstacle(x, y, direction, 10, 'red', this.sketch));
    }
};