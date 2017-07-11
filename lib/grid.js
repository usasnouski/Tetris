export default class Grid {
  constructor(ctx) {
    this.ctx = ctx;
    this.swipedRows = 0;
    this.grid = this.createGrid();
    this.full = this.full.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
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

  deleteRow(num){
    this.grid.splice(num, 1);
    this.grid.unshift(new Array(10).fill(0));
  }

  drawGrid() {
    this.grid.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val === 0) {
          this.ctx.lineWidth="0.01";
          this.ctx.strokeStyle="black";
          this.ctx.strokeRect(x, y, 1, 1);
        } else {
          this.gridStyle(val);
          this.ctx.fillRect(x, y, 1, 1);
          this.ctx.strokeRect(x, y, 1, 1);
        }
      });
    });
  }

  full(el, i, grid) {
    return el !== 0;
  }

  gridStyle(val) {
    this.ctx.lineWidth="0.1";
    this.ctx.strokeStyle="black";
    this.ctx.fillStyle = colors[val];
  }

  inspectRows(y, piece) {
    if (this.grid[y + piece.state.y].every(this.full)) {
      this.deleteRow(y + piece.state.y);
      this.swipedRows += 10;
    }
  }

  updateGrid(piece) {
    const tetrimino = piece.piece;

    tetrimino.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) {
          this.grid[y + piece.state.y][x + piece.state.x] = val;
          this.inspectRows(y, piece);
        }
      });
    });
  }
}


const colors = [
  null,
  "#FC5667",
  "#FC8DB3",
  "#FC8DB3",
  "#898794",
  "#454455",
  "#58BFC5",
  "#7B5CA5"
]
