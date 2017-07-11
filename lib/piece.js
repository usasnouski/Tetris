export default class Piece {
  constructor(ctx, interval, dropPiece) {
    this.ctx = ctx;
    this.state = {x: 4, y: 0};
    this.interval = interval;
    this.piece = this.randomPiece()
    this.drop = dropPiece;
    this.dropPiece = this.dropPiece.bind(this);

    this.intervalId = setInterval(this.dropPiece, this.interval);
  }

  clearInterval() {
    clearInterval(this.intervalId);
  }

  drawPiece() {
    this.piece.forEach((row, y) => {
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
    this.drop();
  }

  moveRight() {
    this.state.x += 1;
  }

  moveLeft() {
    this.state.x += -1;
  }

  pieceStyle() {
    this.ctx.lineWidth="0.1";
    this.ctx.strokeStyle="black";
    this.ctx.fillStyle = 'pink';
  }

  rotateStep() {
    const l = this.piece.length;
    if (l === 2) { return; }

    let rotatedPiece = (l === 3 ? [[],[],[]] : [[],[],[],[]]);

    for (let y = 0; y < l; y++) {
      for(let x = 0; x < l; x++) {
        [
          rotatedPiece[x][y],
          rotatedPiece[y][x],
        ] = [
          this.piece[y][x],
          this.piece[x][y]
        ];
      }
    }
    return rotatedPiece;
  }

  rotateClockwise() {
    const rotatedPiece = this.rotateStep();
    rotatedPiece.forEach(row => row.reverse());
    this.piece = rotatedPiece;
  }

  rotateCounterClockwise() {
    const rotatedPiece = this.rotateStep();
    rotatedPiece.reverse();
    this.piece = rotatedPiece;
  }

  randomPiece() {
   const pieceType = "ILJOSZT"[Math.floor(Math.random() * 7)];
   return PIECES[pieceType];
 }

}

const PIECES = {
  "I": [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  "L": [
    [0, 2, 0],
    [0, 2, 0],
    [0, 2, 2],
  ],
  "J": [
    [0, 3, 0],
    [0, 3, 0],
    [3, 3, 0],
  ],
  "O": [
    [4, 4],
    [4, 4],
  ],
  "Z": [
    [5, 5, 0],
    [0, 5, 5],
    [0, 0, 0],
  ],
  "S": [
    [0, 6, 6],
    [6, 6, 0],
    [0, 0, 0],
  ],
  "T": [
    [0, 7, 0],
    [7, 7, 7],
    [0, 0, 0],
  ]
}
