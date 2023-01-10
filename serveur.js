let http = require('http');
let express = require("express");
let fs = require('fs');
let app = express();

const port = 80
const host = 'localhost'

const serveur = http.createServer(app);
const io = require("socket.io")(serveur);
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
    console.log('a user connected');
});

serveur.listen(port, host, () => {
    console.log("serveur est ouver sur le port" + port);
});