class cercle {
    x = 0
    y = 0
    size = 10;
    couleur = 'white'
    //size est un nombre
    //couleur int ou string
    //x et y un nombre
    constructor(x, y, size, couleur) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.couleur = couleur;
    }
    get PosX() {
        return this.x
    }
    get PosY() {
        return this.y
    }
    //nombre
    set PosX(x) {
        if (this.size / 2 <= x && x <= 640 - this.size / 2) {
            this.x = x;
        } else {
            this.couleur = "red"
            this.bordure()
        }
    }
    //nombre
    set PosY(y) {
        if (this.size / 2 <= y && y <= 480 - this.size / 2) {
            this.y = y;
        } else {
            this.couleur = "red"
            this.bordure();
        }
    }
    position() {
        fill(this.couleur);
        ellipse(this.PosX, this.PosY, this.size, this.size);
    }
    bordure() {
        stroke(0, 0, 0);
        strokeWeight(5)
        line(0, 0, 0, 480);
        line(0, 0, 640, 0);
        line(640, 0, 640, 480);
        line(0, 480, 640, 480);
        strokeWeight(1)
    }
    //val c'est class cercle ou obstacle
    deplacement(val) {
        this.couleur = "white"
        if (keyIsDown(LEFT_ARROW)) {
            this.PosX = this.PosX - val
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.PosX = this.PosX + val
        }
        if (keyIsDown(UP_ARROW)) {
            this.PosY = this.PosY - val
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.PosY = this.PosY + val
        }
    }
}
class obstacle extends cercle {
    DirectionX = 0
    DirectionY = 0
    constructor(x, y, size, couleur) {
        super(x, y, size, couleur);
        let direction = Math.random() * 2 * Math.PI;
        this.DirectionX = Math.cos(direction);
        this.DirectionY = Math.sin(direction);
    }
    //obstacle class obstacle
    testCollision(obstacle) {
        let sizeX = this.PosX - obstacle.PosX
        let sizeY = this.PosY - obstacle.PosY
        let calcDistance = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
        if (calcDistance <= + (obstacle.size + this.size) / 2) {
            return true;
        }
        return false;
    }
    //class joueur class joueur
    deplacement(joueur) {
        this.PosX += this.DirectionX;
        this.PosY += this.DirectionY;
        if (Math.round(this.PosX) <= 1 + this.size / 2 || Math.round(this.PosX) >= 640 - 1 - this.size / 2) {
            this.DirectionX = - this.DirectionX;
        }
        if (Math.round(this.PosY) <= 1 + this.size / 2 || Math.round(this.PosY) >= 480 - 1 - this.size / 2) {
            this.DirectionY = -this.DirectionY
        }
        if (this.testCollision(joueur)) {
            fill(0);
            text("tu as perdu", 160, 240)
            gameover = true;
        }

    }
}
class obstacles {
    static list = []
    //nb c'est nombre
    constructor(nb) {
        for (let i = 0; i < nb; i++) {
            obstacles.list.push(new obstacle(Math.random() * 630, Math.random() * 470, 10, 'red'));
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

// --------------------------------
//init 
let joueur = new cercle(320, 240, 50, 'white');
let gameover = false;
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
    createCanvas(640, 480);
    textSize(32);

}
function draw() {
    if (!gameover) {
        background(220);
        joueur.deplacement(5);
        joueur.position();
        tout_obstacles.position(joueur);
        fill(0)
        text("timer : " + millisToTimes(millis() - startime), 10, 40);
        addobstacles();
    }
}