import Piece from './piece';

export default class Game {
  constructor(ctx) {
    this.ctx = ctx;

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
    } else if (event.keyCode === 40) {
      this.piece.dropPiece();
    } else if (event.keyCode === 38) {
      this.piece.rotate();
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
    this.update();
  }
}
