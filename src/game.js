import Paddle from "./paddle";
import InputHandler from "./input";
import Ball from "./ball";
import {
  buildLevel,
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9
} from "./levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameState = GAMESTATE.MENU;
    this.gameObjects = [];
    this.lives = 3;
    this.bricks = [];
    this.levels = [
      level1,
      level2,
      level3,
      level4,
      level5,
      level6,
      level7,
      level8,
      level9
    ];
    this.currentLevel = 0;
    new InputHandler(this, this.paddle);
  }

  start() {
    if (
      this.gameState !== GAMESTATE.MENU &&
      this.gameState !== GAMESTATE.NEWLEVEL
    )
      return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.paddle, this.ball];
    this.gameState = GAMESTATE.RUNNING;
  }

  update(dt) {
    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER
    )
      return;

    if (this.lives === 0) {
      this.gameState = GAMESTATE.GAMEOVER;
    }

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gameState = GAMESTATE.NEWLEVEL;
      this.start();
    }

    [...this.bricks, ...this.gameObjects].forEach(item => {
      item.update(dt);
    });

    this.bricks = this.bricks.filter(item => {
      return !item.markedForDeletion;
    });
  }

  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }

  draw(ctx) {
    [...this.bricks, ...this.gameObjects].forEach(item => {
      item.draw(ctx);
    });

    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "White";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "White";
      ctx.fillText(
        "Press SPACEBAR To Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    if (this.gameState === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "White";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }
}
