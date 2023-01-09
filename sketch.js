class individu {
    postion = {
        x: 0,
        y: 0
    }
    constructor() {

    }
    get PosX() {
        return this.postion.x
    }
    get PosY() {
        return this.postion.y
    }
    set PosX(x) {
        if (0 <= x && x <= 640) {
            this.postion.x = x;
        }
    }
    set PosY(y) {
        if (0 <= y && y <= 480) {
            this.postion.y = y;
        }
    }
    setPersonnage() {
        fill(255);
        ellipse(this.PosX, this.PosY, 10, 10);
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

let personnage = new individu();
function setup() {
    createCanvas(640, 480);
}
function draw() {
    background(220);
    personnage.deplacement(5);
    personnage.setPersonnage();
}