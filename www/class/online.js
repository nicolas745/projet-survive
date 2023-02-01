import { autreJoueur } from "./autreJoueur.js";
import { cercle } from "./cercle.js";
import { game } from "./game.js";
import { menu } from "./menu.js";
import { multi } from "./multi.js";
import { obstacles } from "./obstacles.js";
import socket, { io } from "./socket.js";
import { solo } from "./solo.js";
export class online extends multi {
    static socket;
    constructor() {
        super();
        this.mod = "online"
        game.addobstacles = this.addobstacles;
        game.multijoueur = this.funconline;
        cercle.socket = io();
        menu.addbutton("Le jeux de survie","jouer",1,1,1,()=>{
            menu.select = "en attend de autre joueur";
        })
        menu.addbutton("en attend de autre joueur","start",0,1,1,function(){
            menu.actif = false;
        })
        menu.addbutton("Le jeux de survie", "exit",2,1,1, () => {
            game.remove = true
            cercle.socket.disconnect();
          });
          menu.addbutton("gameover","exit",0,1,2,function(){
            game.remove = true;
            cercle.socket.disconnect();
            menu.select = "Le jeux de survie"
          })
          cercle.socket.on("deplacement",(data)=>{
            autreJoueur.adversaire.posX = data.posX;
            autreJoueur.adversaire.posY = data.posY;
          });
    }

    funconline(adversaire, obstacles, sketch) {
        obstacles.position(adversaire.adversaire);
        let deplacement = false;
        adversaire.deplacement(deplacement);
    }
    
    addobstacles(sketch) {
        if (solo.tempsAjoutNewObstacle > Math.pow(10, 2)) {
            solo.tempsAjoutNewObstacle = 0;
            return new obstacles(1, sketch);
        }
        solo.tempsAjoutNewObstacle++;
    }
}