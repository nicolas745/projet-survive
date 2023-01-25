let http = require('http');
let express = require("express");
let app = express();
app.use('/', express.static(__dirname + '/www/'));
const serveur = http.createServer(app);
const io = require("socket.io")(serveur);
let fs = require('fs');
const validator = require('validator');
const path = require("path");
var crypto = require('crypto');
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
        console.log("le user " + socket.id + " vient de deconnecter");
    });
    socket.on("join",(pseudo)=>{
        if(validator.isString(data)){
            partie.addpartie(socket.id, pseudo);
        }
    })
});

serveur.listen(port, host, () => {
    console.log("serveur est ouver sur le port" + port);
});