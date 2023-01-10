document.getElementById("restart").addEventListener("click", () => {
    tout_obstacles.reset();
    startime = millis();
    new obstacles(enemieStart);
    gameover = false;
});