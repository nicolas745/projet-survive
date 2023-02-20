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
    getdata(joueur) {
        if (joueur === this.joueur1.id) {
            return this.joueur2;
        } else {
            return this.joueur1;
        }
    }
    disconnect(joueur) {
        this.io.to(this.getAdversaire(joueur)).emit("AdversaireDeconecter", joueur);
    }
    prestart() {
        console.log(this.joueur1.id);
        this.io.to(this.joueur1.id).emit("AdversaireConnecter", this.joueur2.pseudo);
        this.io.to(this.joueur2.id).emit("AdversaireConnecter", this.joueur1.pseudo);
    }
}

module.exports = partie;