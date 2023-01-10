let http = require('http');
let express = require("express");
let app = express();
const serveur = http.createServer(app);
const io = require("socket.io")(serveur);

let fs = require('fs');
var crypto = require('crypto');
const port = 80;
const host = 'localhost'
let listjoueur = {};

app.get('/index.html', (request, reponce) => {
    fs.readFile('index.html', (err, stdout) => {
        reponce.end(stdout.toString());
    });
});
app.get('/p5.min.js', (request, reponce) => {
    fs.readFile('p5.min.js', (err, stdout) => {
        reponce.end(stdout.toString());
    });
});
app.get('/bouton.js', (request, reponce) => {
    fs.readFile('bouton.js', (err, stdout) => {
        reponce.end(stdout.toString());
    });
});
app.get('/sketch.js', (request, reponce) => {
    fs.readFile('sketch.js', (err, stdout) => {
        reponce.end(stdout.toString());
    });
});

io.on('connection', (socket) => {
    console.log("le user " + id + " est connecter");
    socket.on("disconnect", () => {
        console.log("le user " + id + " vient de deconnecter");
    });
});

serveur.listen(port, host, () => {
    console.log("serveur est ouver sur le port" + port);
});