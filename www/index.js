import { solo } from "./class/solo.js"
import { offline } from "./class/offline.js"
import { online } from "./class/online.js"
import { key } from "./class/key.js"
import { menu } from "./class/menu.js"
import { game } from "./class/game.js"
document.getElementById("select").addEventListener("change", (event) => {
    if (document.getElementById("select").value !== "offline") {
        document.getElementById("pseudo1").classList.add("mask")
    } else {
        document.getElementById("pseudo1").classList.remove("mask")
    }
})
let games;
const gameModes = {
    "solo": solo,
    "offline": offline,
    "online": online
};
function startGame(mod) {

    if (typeof games === "undefined" || games.mod !== mod) {
        if (typeof games !== "undefined") {
            if(games.mod==="online"){
                games.disconnect();
            }
            if(document.fullscreenElement){
                games.toggleFullScreen(document.getElementsByClassName("p5Canvas")[0],false);
            }
            games.remove();
        }
        var intervalId = setInterval(function(){
            if(document.getElementsByClassName("p5Canvas").length === 0){
                clearInterval(intervalId);
                games = new gameModes[mod]();
                games.start();
            }
        }, 100);
    } else {
        if(document.fullscreenElement){
            games.toggleFullScreen(document.getElementsByClassName("p5Canvas")[0],true);
        }
        menu.select ="Le jeux de survie"
        menu.actif = true
        game.remove = false;
        games.restart();
    }
}
document.getElementById("start").addEventListener("click", () => {
    startGame(document.getElementById("select").value);
});
let gameKey = new key();
gameKey.editkey("p1", "Left", 37);
gameKey.editkey("p1", "Up", 38);
gameKey.editkey("p1", "Right", 39);
gameKey.editkey("p1", "Down", 40);
gameKey.editkey("p2", "Left", "Q".charCodeAt(0));
gameKey.editkey("p2", "Up", "Z".charCodeAt(0));
gameKey.editkey("p2", "Right", "D".charCodeAt(0));
gameKey.editkey("p2", "Down", "S".charCodeAt(0));