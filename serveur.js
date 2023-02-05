let http = require('http');
let express = require("express");
let app = express();
app.use('/', express.static(__dirname + '/www/'));
const serveur = http.createServer(app);
const io = require("socket.io")(serveur);
let fs = require('fs');
const path = require("path");
const port = 81;
const host = 'localhost'
const whitelist = [];
let listpartie = require("./class/listpartie")
let partie = new listpartie(io);
function readDirRecursive(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            readDirRecursive(filePath);
        } else {
            whitelist.push(filePath);
        }
    }
}
readDirRecursive(__dirname + "/www/")
app.get('*', (req, res) => {
    const url = req.url;
    const filePath = path.normalize(__dirname + "/www/" + url.split("?")[0]);
    if (!filePath.startsWith(__dirname)) {
        return res.status(404).send('File not found');
    }
    if (!whitelist.includes(filePath)) {
        return res.status(401).send('Not authorized');
    }
    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.log(err);
            res.status(404).send('File not found');
        } else {
            res.send(data);
        }
    });
});

io.on('connection', (socket) => {
    socket.join(socket.id);
    console.log("le user " + socket.id + " est connecter");
    socket.on("disconnect", () => {
        partie.disconnect(socket.id, io);
        console.log(socket.id + "a quité la salle d'attent");
        console.log("le user " + socket.id + " vient de deconnecter");
    });
    socket.on("join", (pseudo) => {
        console.log(socket.id + "a rejoint la salle d'attent");
        partie.addpartie(socket.id, pseudo);
    })
    socket.on("left join", (pseudo) => {
        console.log(socket.id + "a quité la salle d'attent");
        partie.disconnect(socket.id, io);
    });
    socket.on("adversaire", (DataAdversaire) => {
        if(typeof partie.listjoueur[socket.id]==="undefined") return;
        let idadv = partie.listjoueur[socket.id].getAdversaire(socket.id);
        io.to(idadv).emit("PositionAdversaire", DataAdversaire)
    })
    socket.on("obstacles",(x,y,vec)=>{
        if(typeof partie.listjoueur[socket.id]==="undefined") return;
        let idadv = partie.listjoueur[socket.id].getAdversaire(socket.id);
        io.to(idadv).emit("obstacles", x,y,vec)
    })
});
serveur.listen(port, host, () => {
    console.log("serveur est ouver sur le port" + port);
});