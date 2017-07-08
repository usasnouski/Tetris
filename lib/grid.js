export default class Grid {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.createGrid();
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
        }
      });
    });
  }



}
