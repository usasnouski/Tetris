import View from './view';

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("tetris");
  canvas.width = 300;
  canvas.height = 500;

  const context = canvas.getContext("2d");
  context.scale(20, 20);

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

  function update() {
    draw();
    requestAnimationFrame(update);
  }

  const player = {
    piece: tPiece,
    pos: {x: 5, y: 5}
  };

  const draw = () => {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawPiece(player.piece, player.pos);
  }

  update();
});
