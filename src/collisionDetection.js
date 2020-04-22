export function collisionDetection(ball, gameObject) {
  let bottemOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;
  let leftSideOBject = gameObject.position.x;
  let rightSideObject = gameObject.position.x + gameObject.width;
  let bottomSideObject = gameObject.position.y + gameObject.height;
  let topSideObject = gameObject.position.y;
  if (
    bottemOfBall >= topSideObject &&
    topOfBall <= bottomSideObject &&
    ball.position.x >= leftSideOBject &&
    ball.position.x <= rightSideObject
  ) {
    return true;
  } else {
    return false;
  }
}
