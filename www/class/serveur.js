// function pour jouer en ligne
socket.on("AdversaireConnecter", (adv) => {
    console.log("adverser connecter");
    prestart.classList.remove('mask')
    attent.classList.add('mask')
    existadversaire = true;
});
socket.on("AdversaireDeconecter", () => {
    existadversaire = false;
    attent.classList.remove('mask')
    prestart.classList.add('mask')
});
socket.on("AddObstacleAdversaire", (Dataobstacle) => {
    let autre = new autreJoueur();
    autre.addobstacles(Dataobstacle.x, Dataobstacle.y, Dataobstacle.directionX, Dataobstacle.directionY);
});
socket.on("PositionAdversaire", (DataAdversaire) => {
    adversaire.PosX = DataAdversaire.posX;
    adversaire.PosY = DataAdversaire.posY;
});
