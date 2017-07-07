import Piece from './piece';

export default class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalTime = 900;
    this.beginTime = 0;
    this.downSteps = 0;
    // this.tPiece = [
    //   [0, 0, 0],
    //   [1, 1, 1],
    //   [1, 1, 1]
    // ]
    this.allPieces = [new Piece(this.ctx, 400)];
    this.piece = this.allPieces[0];

    this.handleKeyPress = this.handleKeyPress.bind(this);

    document.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.keyCode === 37) {
      this.piece.moveLeft();
    } else if (event.keyCode === 39) {
      this.piece.moveRight();
    }
  }

  drawBackground() {
    this.ctx.fillStyle = "#B0C4DE";
    this.ctx.fillRect(0, 0, 240, 400);
  }

  draw() {
    this.ctx.clearRect(0, 0, 240, 400);
    this.drawBackground();
    this.piece.drawPiece();
  }

  // dropPiece() {
  //   this.piece.state.y++;
  //   this.downSteps = 0;
  // }

  update(timestamp = 0) {
    // console.log(`TIMESTAMP: ${timestamp}`);
    // console.log(`BEGIN TIME ${this.beginTime}`);
    // const deltaTime = timestamp - this.beginTime;
    // this.downSteps += deltaTime;
    // console.log(`${deltaTime}`);
    // if (this.downSteps > this.intervalTime) {
    //   this.dropPiece();
    // }
    //
    // this.beginTime = timestamp;
    this.draw();
    requestAnimationFrame(this.update.bind(this));
  }

  start() {
    // this.draw();

    this.update();
  }
}
