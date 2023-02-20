function removeValueFromArray(value, array) {
    return array.filter(function (item) {

        return item != value;
    });
}
let partie = require("./partie");
class listpartie {
    attent = [];
    io = '';
    listjoueur = {};
    constructor(io) {
        this.io = io
    }
    addpartie(userId, pseudo) {
        var data = {
            id: userId,
            pseudo: pseudo
        }
        if (this.attent.length >= 1) {
            let create = new partie(data, this.attent[0], this.io);
            this.listjoueur[this.attent[0].id] = create;
            this.listjoueur[userId] = create;
            this.attent.shift();
            create.prestart();
        } else {
            this.attent.push(data);
        }
    }
    restart(userId, pseudo) {
        let data = {
            id: userId,
            pseudo: pseudo
        }
        if (this.listjoueur.hasOwnProperty(userId)) {
            data = this.listjoueur[userId].getdata(userId);
            delete this.listjoueur[userId];
        }
        this.addpartie(data.id, data.pseudo);
    }
    disconnect(userId) {
        this.attent.splice(0, 1);
        if (this.listjoueur.hasOwnProperty(userId)) {
            let Partie = this.listjoueur[userId];
            let adv = Partie.getAdversaire(userId);
            Partie.disconnect(userId);
            delete this.listjoueur[userId];
            delete this.listjoueur[adv];
            this.attent.push(adv);
        }
    }
}
module.exports = listpartie;