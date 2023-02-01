import { cercle } from "./cercle.js";
import { menu } from "./menu.js";
export class obstacle extends cercle {
    DirectionX = 0
    DirectionY = 0
    sketch;
    constructor(x, y, direction, size, couleur, sketch) {
        super(x, y, size, couleur, sketch);
        this.sketch = sketch;
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
    // Y et X sont des nombre
    editDirection(x, y) {
        this.DirectionX = x;
        this.DirectionY = y;
    }
    //class joueur class joueur
    deplacement(joueur) {
        this.PosX += this.DirectionX;
        this.PosY += this.DirectionY;
        if (Math.round(this.PosX) % 640 <= 1 + this.size / 2 || Math.round(this.PosX) % 640 >= 640 - 1 - this.size / 2) {
            this.DirectionX = - this.DirectionX;
        }
        if (Math.round(this.PosY) <= 1 + this.size / 2 || Math.round(this.PosY) >= 480 - 1 - this.size / 2) {
            this.DirectionY = -this.DirectionY
        }
        if (this.testCollision(joueur)) {
            this.sketch.fill(0);
            menu.actif = true;
            menu.select= "gameover"
            this.sketch.gameover = true;
        }

    }
}