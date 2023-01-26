import solo from "./class/solo.js"
import offline from "./class/offline.js"
import online from "./class/online.js"
document.getElementById("select").addEventListener("change",(event)=>{
    if(document.getElementById("select").value!=="offline"){
        document.getElementById("pseudo1").classList.add("mask")
    }else{
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
    if(typeof games === "undefined" || games.mod !== mod) {
        if(typeof games !== "undefined") {
            games.remove();
        }
        games = new gameModes[mod]();
        games.start();
    } else {
        games.restart();
    }
}
document.getElementById("start").addEventListener("click",()=>{
    startGame(document.getElementById("select").value);
})