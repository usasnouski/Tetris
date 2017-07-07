export default class Piece {
  constructor(ctx, interval) {
    this.ctx = ctx;
    this.state = {x: 4, y: 4};
    this.interval = interval;
    this.tPiece = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ];
    this.dropPiece = this.dropPiece.bind(this);

    this.intervalId = setInterval(this.dropPiece, this.interval);
  }

  drawPiece() {
    this.tPiece.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) {
          this.pieceStyle();
          this.ctx.fillRect(x + this.state.x,
                       y + this.state.y,
                       1, 1);
          this.ctx.strokeRect(x + this.state.x,
                         y + this.state.y,
                         1, 1);
        }
      });
    });
  }

  dropPiece() {
    this.state.y++;
  }

  pieceStyle() {
    this.ctx.lineWidth="0.1";
    this.ctx.strokeStyle="black";
    this.ctx.fillStyle = 'pink';
  }

  moveRight() {
    this.state.x += 1;
  }

  moveLeft() {
    this.state.x += -1;
  }
}
