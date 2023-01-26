import obstacle from "./obstacle.js"
export default class obstacles {
    static list = []
    sketch;
    //nb c'est nombre
    constructor(nb,sketch) {
        for (let i = 0; i < nb; i++) {
            obstacles.list.push(new obstacle(Math.random() * 630 + 5, Math.random() * 470 + 5, 10, 'red',sketch));
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
};