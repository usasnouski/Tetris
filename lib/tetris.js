import View from './view';

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("tetris");
  canvas.width = 300;
  canvas.height = 500;

  const context = canvas.getContext("2d");
  context.scale(20, 20);

  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  const tPiece = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ];


  const drawPiece = (piece, offset) => {
    piece.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) {
          context.fillStyle = "red";
          context.fillRect(offset.x + x, offset.y + y, 1, 1);
        }
      });
    });
  }

  const player = {
    piece: tPiece,
    pos: {x: 0, y: 0}
  };

  drawPiece(player.piece, player.pos;

});
