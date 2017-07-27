import Piece from './piece';
import Grid from './grid';

export default class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = new Grid(this.ctx)
    this.speed = 1000;
    this.score = this.grid.swipedRows;
    this.level = 0;
    this.gameRun = true;

    this.spawnPiece();

    this.handleKeyPress = this.handleKeyPress.bind(this);

    document.addEventListener("keydown", this.handleKeyPress);
  }

  avoidCollision() {
    let { x } = this.piece.state;
    const { grid } = this.grid;
    let oldX = x;
    let cycleCounter = 0;

    while (this.collide()) {
      if (grid[x + 1] === 0) {
        this.piece.state.x++;
        x++;
      } else if (grid[x - 1] === 0) {
        this.piece.state.x--;
        x--;
      }
      cycleCounter++;

      if (x > 2 || x < -2 || cycleCounter > 5) {
        this.piece.state.x = oldX;
        this.piece.rotateCounterClockwise();
      }
    }
  }


  checkTheBorders(x) {
    if (this.collide()) {
      this.piece.state.x -= x;
    }
  }

  handleKeyPress(event) {
    event.preventDefault();
    switch (event.keyCode) {
      case 37:
        this.performMove('left');
        break;
      case 38:
        this.performRotation();
        break;
      case 39:
        this.performMove('right');
        break;
      case 40:
        this.dropPiece();
        break;
      case 32:
        this.quickDrop();
        break;
    }
  }

  spawnPiece() {
    if (this.piece) { this.piece.clearInterval(); }
    this.piece = new Piece(this.ctx, this.speed, this.dropPiece.bind(this));
    this.handleGameOver();
  }

  collide() {
    const { piece } = this.piece;
    const { grid } = this.grid;
    const pos = this.piece.state;

    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
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
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    this.ctx.fillRect(0, 0, 200, 400);
  }

  draw() {
    this.ctx.clearRect(0, 0, 200, 400);
    this.drawBackground();
    this.grid.drawGrid();
    this.piece.drawPiece();
  }

  dropCollision() {
    this.piece.state.y--;
    this.grid.updateGrid(this.piece);
    this.score = this.grid.swipedRows;
    this.updateDropSpeed();
    this.spawnPiece();
  }

  dropPiece() {
    this.piece.state.y++;
    if (this.collide()) {
      this.dropCollision();
    }
  }

  gameOver() {
    return this.grid.checkTopRow();
  }

  handleGameOver() {
    if (this.collide()) {
      // this.grid = new Grid(this.ctx);
      // cancelAnimationFrame();
      this.gameRun = false;
    }
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
    this.checkTheBorders(x);
  }

  performRotation() {
    this.piece.rotateClockwise();
    this.avoidCollision();
  }

  quickDrop() {
    while(!this.collide()) {
      this.piece.state.y++;
    }
    this.dropCollision();
  }

  showLevel() {
    const el = document.getElementById("level");
    el.innerHTML = `${this.level}`;
  }

  showScore() {
    const el = document.getElementById("score");
    el.innerHTML = `${this.score}`;
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
    this.showScore();
    this.showLevel();
    if (this.gameRun) {
      requestAnimationFrame(this.update.bind(this));
    }
  }

  updateDropSpeed() {
    this.updateLevel();
    this.speed = 1000 - (this.level * 150);
  }

  updateLevel() {
    this.level = Math.floor(this.score / 100);
  }


  start() {
    this.update();
  }
}
