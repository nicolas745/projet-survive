export class key {
    static key = {};
    charTocode(c) {
        return c.charCodeAt(0);
    }
    convertir(keycode) {
        let res = keycode;
        if (res === this.charTocode('%')) {
            res = '←'.charCodeAt(0)
        }
        if (res === '&'.charCodeAt(0)) {
            res = '↑'.charCodeAt(0)
        }
        if (res === '\''.charCodeAt(0)) {
            res = '→'.charCodeAt(0)
        }
        if (res === '('.charCodeAt(0)) {
            res = '↓'.charCodeAt(0)
        }
        return String.fromCharCode(res);
    }
    editkey(playeur, keyname, keycode) {
        if (document.getElementById(keyname) === null) {
            let ligne = document.createElement("tr");
            ligne.setAttribute("id", keyname);
            let p1 = document.createElement("td");
            p1.setAttribute('id', keyname + '-p1');
            let p2 = document.createElement("td");
            p2.setAttribute('id', keyname + '-p2');
            let Vkey = document.createElement("td");
            Vkey.innerHTML = keyname;
            ligne.append(Vkey)
            ligne.append(p1);
            ligne.append(p2);
            document.getElementById("keyboard-table").append(ligne);
            key.key[keyname] = {};
        }
        let cell = document.getElementById(keyname + '-' + playeur);
        cell.innerHTML = this.convertir(keycode);
        key.key[keyname][playeur] = keycode;
    }
    getkey(keyname, playeur) {
        return key.key[keyname][playeur];
    }
}