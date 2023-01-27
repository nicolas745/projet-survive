export class cercle {
    x = 0
    y = 0
    size = 10;
    couleur = 'white'
    sketch;
    //size est un nombre
    //couleur int ou string
    //x et y un nombre
    constructor(x, y, size, couleur,sketch) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.couleur = couleur;
        this.sketch = sketch;
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
        this.sketch.fill(this.couleur);
        this.sketch.ellipse(this.PosX, this.PosY, this.size, this.size);
    }
    bordure() {
        this.sketch.stroke(0, 0, 0);
        this.sketch.strokeWeight(5)
        this.sketch.line(0, 0, 0, 480);
        this.sketch.line(0, 0, 640, 0);
        this.sketch.line(640, 0, 640, 480);
        this.sketch.line(0, 480, 640, 480);
        this.sketch.strokeWeight(1)
    }
    //val c'est class cercle ou obstacle
    deplacement(val) {
        this.couleur = "white"
        if (this.sketch.keyIsDown(this.sketch.LEFT_ARROW)) {
            this.PosX = this.PosX - val
        }
        if (this.sketch.keyIsDown(this.sketch.RIGHT_ARROW)) {
            this.PosX = this.PosX + val
        }
        if (this.sketch.keyIsDown(this.sketch.UP_ARROW)) {
            this.PosY = this.PosY - val
        }
        if (this.sketch.keyIsDown(this.sketch.DOWN_ARROW)) {
            this.PosY = this.PosY + val
        }
    }
}