export class menu {
    static actif;
    static menu = {};
    static select= "Le jeux de survie";
    static sketch;
    static selecButon = 0;
    static colorActif = "#00ff00"
    static colorpassif = "white"
    static delay = 5;
    static times = 1000;
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
        this.sketch.textAlign(this.sketch.CENTER);
        this.sketch.fill(0);
        this.sketch.text(this.select, this.sketch.width / 2, 40);
        if (typeof this.menu[this.select] !== "undefined") {
            this.menu[this.select].forEach((element) => {
                if (this.selecButon === element.pos) {
                    this.sketch.fill(this.colorActif);
                } else {
                    this.sketch.fill(255);
                }
                this.sketch.rect(this.sketch.width / 2 - this.butonSize.x / 2, this.posYmenu + element.pos * (this.butonSize.y + this.espacebuton), this.butonSize.x, this.butonSize.y);
                this.sketch.fill(0);
                this.sketch.text(element.text, this.sketch.width / 2, this.posYmenu + 40 + element.pos * (this.butonSize.y + this.espacebuton))
            });
        }
        this.action();
    }
    static action() {
        if (this.delay > this.times) {
            this.times++;
        }
        if (this.delay <= this.times && this.sketch.keyIsDown(38)) {
            this.selecButon--;
            this.times = 0;
        }
        if (this.delay <= this.times && this.sketch.keyIsDown(40)) {
            this.times = 0;
            this.selecButon++
        }
        if (this.sketch.keyIsDown(13) || this.sketch.keyIsDown(13)) {
            menu.menu[this.select].forEach((element) => {
                if (element.pos === this.selecButon) {
                    element.func();
                }
            })
            this.times = 0;
        }
        if (this.selecButon < 0) {
            this.selecButon = menu.menu[this.select].length - 1;
        }
        if (this.selecButon >= menu.menu[this.select].length) {
            this.selecButon = 0;
        }
    }
    static addbutton(menuname, text, pos, func) {
        if (typeof menu.menu[menuname] === "undefined") {
            menu.menu[menuname] = [];
        }
        let res = -1;
        menu.menu[menuname].forEach((element,index) => {
            if (element.pos === pos) {
                res = index;
            }
        });
        if (res === -1) {
            menu.menu[menuname].push({
                "text": text,
                "func": func,
                "pos": pos

            })
        } else {
            menu.menu[menuname][res]={
                "text": text,
                "func": func,
                "pos": pos
            }
        }
    }

}