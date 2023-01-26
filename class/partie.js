class partie {
    joueur1 = "";
    joueur2 = "";
    io = "";
    constructor(joueur1, joueur2, io) {
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
        this.io = io;
    }
    getAdversaire(joueur) {
        if (joueur === this.joueur1.id) {
            return this.joueur2.id;
        } else {
            return this.joueur1.id;
        }
    }
    disconnect(joueur) {
        this.io.to(this.getAdversaire(joueur)).emit("AdversaireDeconecter", joueur)
    }
    prestart() {
        this.io.to(this.joueur1.id).emit("AdversaireConnecter", this.joueur2.id);
        this.io.to(this.joueur2.id).emit("AdversaireConnecter", this.joueur1.id);
    }
}

module.exports = partie;