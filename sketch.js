class cercle {
    x = 0
    y = 0
    size = 10;
    couleur = 'white'
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
        sizeX = this.DirectionX - obstacle.PosX
        sizeY = this.DirectionY - obstacle.PosY
        calcDistance = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
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
        if (testCollision(joueur)) {
            console.log("tu a perdu")
        }

    }
}
let joueur = new cercle(0, 0, 50, 'white');
class obstacles {
    list = []
    constructor(nb) {
        for (let i = 0; i < nb; i++) {
            this.list.push(new obstacle(Math.random() * 640, Math.random() * 480, 10, 'red'));
        }
    }
    obstacle(id) {
        return this.list[id];
    }
    newcreate(nb, size, couleur) {
        this.list = [];
        for (var i = 0; i < nb; i++) {
            this.list.push(new obstacle(Math.random() * 640, Math.random() * 480, size, couleur));
        }
    }
    position(joueur) {
        this.list.forEach(obstacle => {
            obstacle.deplacement(joueur);
            obstacle.position();
        });
    }
};
let tout_obstacles = new obstacles(5);
function setup() {
    createCanvas(640, 480);

}
function draw() {
    background(220);
    tout_obstacles.position(joueur)
    joueur.deplacement(5);
    joueur.position();
}