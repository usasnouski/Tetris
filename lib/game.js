import Piece from './piece';
import Grid from './grid';

export default class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = new Grid(this.ctx)
    this.piece = new Piece(this.ctx, 2000, this.dropPiece.bind(this));

    this.handleKeyPress = this.handleKeyPress.bind(this);

    document.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.keyCode === 37) {
      this.piece.moveLeft();
    } else if (event.keyCode === 39) {
      this.piece.moveRight();
    } else if (event.keyCode === 40) {
      this.dropPiece();
    } else if (event.keyCode === 38) {
      this.piece.rotate();
    }
  }

  collide() {
    const { piece } = this.piece;
    const pos = this.piece.state;
    const { grid } = this.grid;
    // debugger;
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        // debugger;
        if (piece[y][x] !== 0 &&
          (grid[y + pos.y] &&
          grid[y + pos.y][x + pos.x]) !== 0) {
            return true;
          }
      }
    }

    return false;
  }

  drawBackground() {
    this.ctx.fillStyle = "#B0C4DE";
    this.ctx.fillRect(0, 0, 200, 400);
  }

  draw() {
    this.ctx.clearRect(0, 0, 200, 400);
    // this.drawBackground();
    this.grid.drawGrid();
    this.piece.drawPiece();

  }

  dropPiece() {
    this.piece.state.y++;
    if (this.collide()) {
      this.piece.state.y--;
    }
  }


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
