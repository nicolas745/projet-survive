class cercle {
    x = 0
    y = 0
    size = 10;
    couleur = 'white'
    constructor(x, y, size, couleur) {
        this.x = x + size / 2;
        this.y = y + size / 2;
        this.size = size;
        this.couleur = couleur;
    }
    get PosX() {
        return this.x
    }
    get PosY() {
        return this.y
    }
    set PosX(x) {
        if (0 <= x && x <= 640) {
            this.x = x;
        }
    }
    set PosY(y) {
        if (0 <= y && y <= 480) {
            this.y = y;
        }
    }
    position() {
        fill(this.couleur);
        ellipse(this.PosX, this.PosY, this.size, this.size);
    }
    deplacement(val) {
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
    set direction(rad) {
        this.direction = rad;
    }
    testCollision(obstacle) {
        let sizeX = this.PosX - obstacle.PosX
        let sizeY = this.PosY - obstacle.PosY
        let calcDistance = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
        if (calcDistance <= + (obstacle.size + this.size) / 2) {
            return true;
        }
        return false;
    }
    deplacement(joueur) {
        this.PosX += this.DirectionX;
        this.PosY += this.DirectionY;
        if (Math.round(this.PosX) <= 1 || Math.round(this.PosX) >= 640 - 1) {
            this.DirectionX = - this.DirectionX;
        }
        if (Math.round(this.PosY) <= 1 || Math.round(this.PosY) >= 480 - 1) {
            this.DirectionY = -this.DirectionY
        }
        if (this.testCollision(joueur)) {
            fill(0);
            text("tu as perdu", 160, 240)
            gameover = true;
        }

    }
}
let joueur = new cercle(320, 240, 10, 'white');
let gameover = false;
let startime;
class obstacles {
    static list = []
    constructor(nb) {
        for (let i = 0; i < nb; i++) {
            obstacles.list.push(new obstacle(Math.random() * 640, Math.random() * 480, 10, 'red'));
        }
    }
    reset() {
        obstacles.list = [];
    }
    obstacle(id) {
        return obstacles.list[id];
    }
    position(joueur) {
        obstacles.list.forEach(obstacle => {
            obstacle.deplacement(joueur);
            obstacle.position();
        });
    }
};
let tout_obstacles = new obstacles(100);
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
    }
}

document.getElementById("restart").onclick = () => {
    startime = millis();
};