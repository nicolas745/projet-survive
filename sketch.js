let personnage = {
    postion: {
        x: 0,
        y: 0
    },
    GetPosX: () => {
        return personnage.postion.x
    },
    GetPosY: () => {
        return personnage.postion.y
    },
    SetPosX: (x) => {
        personnage.postion.x = x;
    },
    SetPosY: (y) => {
        personnage.postion.y = y;
    },
    setPersonnage: () => {
        fill(255);
        ellipse(personnage.GetPosX(), personnage.GetPosY(), 10, 10);
    }
}
function setup() {
    createCanvas(640, 480);
}

function draw() {
    background(220);
    personnage.setPersonnage()
}

function keyPressed() {
    console.log(value);
}