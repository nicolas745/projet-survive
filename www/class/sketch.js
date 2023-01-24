//--------------------------------------------
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

// --------------------------------
//init 
let existadversaire = false;
let joueur = new cercle(320, 240, 50, 'white');
let adversaire = new cercle(640 + 320, 240, 50, 'white');
let gameover = true;
let enemieStart = 1;
let tempsAjoutNewObstacle = 0; //ne pas modifier
let tout_obstacles = new obstacles(enemieStart);

//function
function addobstacles() {
    if (tempsAjoutNewObstacle == Math.pow(10, 2)) {
        tempsAjoutNewObstacle = 0;
        return new obstacles(1);
    }
    tempsAjoutNewObstacle++;
}
//millis c'est nombre
function millisToTimes(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
function setup() {
    startime = millis();
    createCanvas(640 * 2, 480);
    textSize(32);
    background(220);

}
function draw() {
    if (!gameover) {
        stroke(0, 0, 0)
        background(220);
        line(640, 0, 640, 480);
        joueur.deplacement(5);
        joueur.position();
        tout_obstacles.position(joueur);
        fill(0)
        text("timer : " + millisToTimes(millis() - startime), 10, 40);
        addobstacles();
        adversaire.position();
    }
}

