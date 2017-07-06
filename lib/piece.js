export default class Piece {
  constructor(ctx) {
    this.ctx = ctx;

    this.tPiece = [
      [0, 0, 0],
      [1, 1, 1],
      [1, 1, 1]
    ]
  }

  draw(piece) {
    piece.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) {
          ctx.fillStyle = "red";
          ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }
}
