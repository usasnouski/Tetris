// import View from './view';

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
          context.fillStyle = "pink";
          context.fillRect(offset.x + x, offset.y + y, 1, 1);
        }
      });
    });
  }

  let dropCounter = 0;
  let dropInterval = 900;
  let lastTime = 0;

  function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    console.log(deltaTime);
    if (dropCounter > dropInterval) {
      player.pos.y++;
      dropCounter = 0;
    }
    draw();
    requestAnimationFrame(update);
  }

  const player = {
    piece: tPiece,
    pos: {x: 5, y: 5}
  };

  const draw = () => {
    context.fillStyle = 'gray';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawPiece(player.piece, player.pos);
  }

  document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
      player.pos.x--;
    } else if (event.keyCode === 39) {
      player.pos.x++;
    }
  });

  update();
});
