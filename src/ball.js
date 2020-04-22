import { collisionDetection } from "./collisionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("pokeball");
    this.size = 16;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.reset();
  }

  reset() {
    this.speed = { x: 4, y: -2 };
    this.position = { x: 10, y: 400 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  stop() {
    this.speed = 0;
  }

  update(dt) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // wall on left or right
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // wall on top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // wall on bottom
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }
    if (collisionDetection(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
    }
  }
}
