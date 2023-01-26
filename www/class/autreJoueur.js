class autreJoueur extends obstacles {
    id = ""
    constructor() {
        super(0);
    }
    addobstacles(x, y, directionX, directionY) {
        let newobstacle = new obstacle(x + 640, y, 10, 'red');
        newobstacle.editDirection(directionX, directionY);
        obstacles.list.push(newobstacle);
    }
}