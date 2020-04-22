import "./styles.css";
import Game from "./game";

const canvas = document.getElementById("gameScreen");

const ctx = canvas.getContext("2d"); // get 2d context

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let lastTime = 0;
const game = new Game(GAME_WIDTH, GAME_HEIGHT);

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(dt);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
