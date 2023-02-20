import { autreJoueur } from "./autreJoueur.js";
import { cercle } from "./cercle.js";
import { game } from "./game.js";
import { menu } from "./menu.js";
import { multi } from "./multi.js";
import { obstacles } from "./obstacles.js";
import socket, { io } from "./socket.js";
import { solo } from "./solo.js";
export class online extends multi {
    static join = false
    static connect = false;
    constructor() {
        super();
        this.mod = "online"

        game.addobstacles = this.addobstacles;
        game.multijoueur = this.funconline;
        cercle.socket = io();
        menu.addbutton("Le jeux de survie", "jouer", 1, 1, 1, () => {
            cercle.socket.emit("join", document.getElementById("pseudo").value);
            menu.select = "en attend de autre joueur";
            online.join = true;
            menu.gamefunc = function (sketch) {
                sketch.text("P1 : " + document.getElementById("pseudo").value, sketch.width / 2, 45 + 90);
                sketch.text("P2 : ...", sketch.width / 2, 180);
            }
        })
        menu.addbutton("en attend de autre joueur", "start", -10, 1, 1, function () {
            menu.actif = false;
        })
        menu.addbutton("Le jeux de survie", "exit", 2, 1, 1, () => {
            game.remove = true
            cercle.socket.disconnect();
        });
        menu.addbutton("gameover", "restart", 1, 2, 2, function () {
            cercle.socket.emit("restart", document.getElementById("pseudo").value);
            menu.select = "en attend de autre joueur";
        });
        menu.addbutton("gameover", "exit", 0, 1, 2, function () {
            game.remove = true;
            cercle.socket.disconnect();
            menu.select = "Le jeux de survie"
        })
        cercle.socket.on("deplacement", (data) => {
            autreJoueur.adversaire.posX = data.posX;
            autreJoueur.adversaire.posY = data.posY;
        });
        cercle.socket.on('connect', () => {
            online.connect = true;
        });
        cercle.socket.on("AdversaireConnecter", () => {
            online.join = false;
            menu.actif = false;
        });
        cercle.socket.on("AdversaireDeconecter", () => {
        });
        cercle.socket.on("obstacles", (x, y, vec) => {
            multi.adversaire.addobstacles(640 + x, y, vec)
        });
        cercle.socket.on("PositionAdversaire", (DataAdversaire) => {
            multi.adversaire.adversaire.PosX = 640 + DataAdversaire.PosX
            multi.adversaire.adversaire.PosY = DataAdversaire.PosY
        });

        cercle.socket.on('disconnect', () => {
            cercle.socket.emit("left join", autreJoueur.pseudo);
            online.connect = false;
            online.join = false;
        });
    }
    static get isjoin() {
        return this.join;
    }
    static get isconnect() {
        return this.connect;
    }
    editPosAdv(DataAdversaire) {
        this.adversaire.adversaire.PosY = DataAdversaire.posY;
        this.adversaire.adversaire.PosX = DataAdversaire.posX;
    }
    funconline(adversaire, obstacles, sketch) {
        obstacles.position(adversaire.adversaire);
        let deplacement = false;
        adversaire.deplacement(deplacement);
    }
    restart() {
        menu.actif = true;
        menu.select = "en attend de autre joueur"
    }
    addobstacles(sketch) {
        if (solo.tempsAjoutNewObstacle > Math.pow(10, 2)) {
            solo.tempsAjoutNewObstacle = 0;
            let obs = new obstacles(1, sketch);
            return obs;
        }
        solo.tempsAjoutNewObstacle++;
    }
}