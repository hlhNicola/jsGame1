import { collisionDetection } from "./collisionDetection";

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("brick");
    this.position = position;
    this.width = 80;
    this.height = 24;
    this.game = game;
    this.markedForDeletion = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    if (collisionDetection(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
    }
  }
}
