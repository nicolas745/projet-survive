class obstacles {
    static list = []
    //nb c'est nombre
    constructor(nb) {
        for (let i = 0; i < nb; i++) {
            obstacles.list.push(new obstacle(Math.random() * 630 + 5, Math.random() * 470 + 5, 10, 'red'));
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