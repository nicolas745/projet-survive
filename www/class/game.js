import { obstacles } from "./obstacles.js";
import { cercle } from "./cercle.js"
import { menu } from "./menu.js";
export class game {
  static parent;
  static func = {};
  constructor(parent) {
    game.parent = parent;
  }
  static startGame = true;
  static remove = false;
  mod;
  setup;
  get mod() {
    return mod;
  }
  set mod(valeur) {
    this.mod = valeur
  }
  get setup() {
    return mod;
  }
  set setup(valeur) {
    this.mod = valeur
  }
  start() {
    new p5(this.game);
    game.startGame = true;
    game.remove = false;
    this.toggleFullScreen(document.getElementsByClassName("p5Canvas")[0], true);
  }
  restart() {
    game.startGame = true;
  }
  remove() {
    game.remove = true;
  }
  static editfunction(name, func) {
    game.func[name] = func;
  }
  toggleFullScreen(canvas, fullscreen) {
    if (fullscreen) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  game(sketch) {
    function millisToTimes(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    let joueur = new cercle(320, 240, 50, 'white', sketch);
    let tout_obstacles = new obstacles(0, sketch);
    let startime = sketch.millis();
    sketch.setup = function () {
      game.setup(startime, sketch);
      new menu(sketch);
      menu.addbutton("Le jeux de survie", "config", 0, 1, 1, () => {
      });
    }
    sketch.draw = function () {
      if (game.remove) {
        sketch.remove();
      }
      if (menu.isactif) {
        menu.affiche();
        return;
      }
      if (game.startGame == true) {
        game.startGame = false;
        tout_obstacles.reset();
        startime = sketch.millis();
        sketch.gameover = false;
        joueur.PosX = 320;
        joueur.PosY = 240;
      }
      if (!sketch.gameover) {
        sketch.textAlign(sketch.LEFT);
        sketch.stroke(0, 0, 0)
        sketch.background(220);
        sketch.line(640, 0, 640, 480);
        joueur.deplacement(5);
        joueur.position();
        tout_obstacles.position(joueur);
        sketch.fill(0)
        sketch.text("timer : " + millisToTimes(sketch.millis() - startime), 10, 40);
        game.addobstacles(sketch);
        if (typeof game.multi !== "undefined") {
          game.multi(sketch);
        }
      }
    }
  }
}