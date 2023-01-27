import { key } from "./key.js";
export class cercle {
    x = 0
    y = 0
    size = 10;
    couleur = 'white'
    sketch;
    type = "p1"; //valeur p1 ou p2 qui corespont type de joueur
    touche = {
        leftKey: 37,
        upKey: 38,
        rightKey: 39,
        downKey: 40
    }
    Ckey = new key();
    //size est un nombre
    //couleur int ou string
    //x et y un nombre
    constructor(x, y, size, couleur, sketch) {
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
    set type(playeur) {
        this.type = playeur;
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
        if (this.keypress("Left")) {
            this.PosX = this.PosX - val
        }
        if (this.keypress("Right")) {
            this.PosX = this.PosX + val
        }
        if (this.keypress("Up")) {
            this.PosY = this.PosY - val
        }
        if (this.keypress("Down")) {
            this.PosY = this.PosY + val
        }
    }
    keypress(keyname) {
        return this.sketch.keyIsDown(this.Ckey.getkey(keyname, this.type));
    }
}