import { cercle } from "./cercle.js";

export class menu {
    static actif;
    static menu = {};
    static select = "Le jeux de survie";
    static sketch;
    static selecButonY = 0;
    static selecButonX = 0;
    static colorActif = "#00ff00"
    static colorpassif = "white"
    static delay = 10;
    static times = 1000;
    static timeEntre = 1000;
    static gamefunc;
    static butonSize = {
        x: 300,
        y: 50
    }
    static posYmenu = 90;
    static espacebuton = 10
    constructor(sketch) {
        menu.sketch = sketch;
        menu.actif = true;
    }
    static get isactif() {
        return this.actif;
    }
    static affiche() {
        this.sketch.background(220);
        if (typeof this.gamefunc === "function") {
            this.gamefunc(this.sketch);
        }
        this.sketch.textAlign(this.sketch.CENTER);
        this.sketch.fill(0);
        this.sketch.text(this.select, this.sketch.width / 2, 40);
        if (typeof this.menu[this.select] !== "undefined") {
            this.menu[this.select].forEach((element) => {
                if (this.selecButonY === element.posY) {
                    this.sketch.fill(this.colorActif);
                } else {
                    this.sketch.fill(255);
                }
                this.sketch.rect(this.sketch.width / 2 - this.butonSize.x / 2, this.posYmenu + element.posY * (this.butonSize.y + this.espacebuton), this.butonSize.x, this.butonSize.y);
                this.sketch.fill(0);
                this.sketch.text(element.text, this.sketch.width / 2, this.posYmenu + 40 + element.posY * (this.butonSize.y + this.espacebuton))
            });
        }
        this.action();
    }
    static action() {
        if (this.delay > this.times) {
            this.times++;
        }
        if (this.delay > this.timeEntre) {
            this.timeEntre++;
        }
        if (this.delay <= this.times && this.sketch.keyIsDown(38)) {
            this.selecButonY--;
            this.times = 0;
        }
        if (this.delay <= this.times && this.sketch.keyIsDown(40)) {
            this.times = 0;
            this.selecButonY++
        }
        if (this.delay <= this.times && this.sketch.keyIsDown(37)) {
            this.selecButonX--;
            this.times = 0;
        }
        if (this.delay <= this.times && this.sketch.keyIsDown(39)) {
            this.times = 0;
            this.selecButonX++
        }
        if ((this.sketch.keyIsDown(32) || this.sketch.keyIsDown(13)) && this.delay <= this.timeEntre) {
            this.menu[this.select].forEach((element) => {
                if (element.posY === this.selecButonY) {
                    this.timeEntre = 0;
                    element.func();
                }
            })
            this.times = 0;
        }
        if (this.selecButonY < 0) {
            this.selecButonY = this.menu[this.select].length - 1;
        }
        if (this.selecButonY >= this.menu[this.select].length) {
            this.selecButonY = 0;
        }
    }
    static addbutton(menuname, text, posY, posX, divX, funcselect, gamefunc) {
        this.gamefunc = gamefunc;
        if (typeof this.menu[menuname] === "undefined") {
            this.menu[menuname] = [];
        }
        let res = -1;
        this.menu[menuname].forEach((element, index) => {
            if (element.posY === posY) {
                res = index;
            }
        });
        if (res === -1) {
            this.menu[menuname].push({
                "text": text,
                "func": funcselect,
                "posY": posY

            })
        } else {
            this.menu[menuname][res] = {
                "text": text,
                "func": funcselect,
                "posY": posY
            }
        }
    }

}