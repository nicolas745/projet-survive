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
        if (this.size / 2 <= x % 640 && x % 640 <= 640 - this.size / 2) {
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