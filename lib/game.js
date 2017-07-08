import Piece from './piece';
import Grid from './grid';

export default class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = new Grid(this.ctx)
    this.piece = new Piece(this.ctx, 110, this.dropPiece.bind(this));

    this.handleKeyPress = this.handleKeyPress.bind(this);

    document.addEventListener("keydown", this.handleKeyPress);
  }

  avoidCollision(x) {
    if (this.collide()) {
      console.log('col');
      this.piece.state.x -= x;
    }
  }

  handleKeyPress(event) {
    if (event.keyCode === 37) {
      this.performMove('left');
    } else if (event.keyCode === 39) {
      this.performMove('right');
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
    if (this.gameOver()) {
      this.grid = new Grid(this.ctx);
    }
    this.grid.drawGrid();
    this.piece.drawPiece();

  }

  dropPiece() {
    this.piece.state.y++;
    if (this.collide()) {
      this.piece.state.y--;
      this.grid.updateGrid(this.piece);
      this.piece.clearInterval();
      this.piece = new Piece(this.ctx, 700, this.dropPiece.bind(this));
    }
  }

  gameOver() {
    return this.grid.checkTopRow();
  }

  performMove(move) {
    let x;
    if (move === 'left') {
      this.piece.moveLeft();
      x = -1;
    } else {
      this.piece.moveRight();
      x = 1;
    }
    this.avoidCollision(x);
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
