export default class Grid {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.createGrid();
  }

  checkTopRow() {
    for (let i = 0; i < 10; i++) {
      if (this.grid[0][i] !== 0) {
        return true;
      }
    }

    return false;
  }

  createGrid() {
    const grid = [];
    for(let i = 0; i < 20; i++) {
      grid.push(new Array(10).fill(0));
    }

    return grid;
  }

  drawGrid() {
    this.grid.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val === 0) {
          this.ctx.fillStyle = "#B0C4DE";
          this.ctx.fillRect(x, y, 1, 1);
        } else {
          this.ctx.fillStyle = 'pink';
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  updateGrid(piece) {
    // debugger;
    const tetrimino = piece.piece;
    tetrimino.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) {
          this.grid[y + piece.state.y][x + piece.state.x] = val;
        }
      });
    });
  }

}
