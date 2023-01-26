export default class game{
    static startGame = true;
    static remove = false;
    start(){
        new p5(this.game);
        game.startGame = true;
    }
}