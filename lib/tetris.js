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

  function collide(well, player) {
    const [m, o] = [player.matrix, player.pos]

    for (let y = 0; y < m.length; y++) {
      for (let x = 0; x < m[y].length; x++) {
        if (m[y][x] !== 0 && (well[y + o.y] && well[y + o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
    
    return false;
  }

  const createMatrix = (w, h) => {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }

    return matrix;
  };


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

  function merge(well, player) {
    player.matrix.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) {
          well[y + player.pos.y][x + player.pos.x] = val
        }
      })
    });
  }

  const playerDrop = () => {
    player.pos.y++;
    if (collide(well, player)) {
      player.pos.y--;
      merge(well, player);
      player.pos.y = 0;
    }
    dropCounter = 0;
  };

  let dropCounter = 0;
  let dropInterval = 900;
  let lastTime = 0;

  function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
      player.pos.y++;
      dropCounter = 0;
    }
    draw();
    requestAnimationFrame(update);
  }

  const well = createMatrix(12, 20);

  const player = {
    matrix: tPiece,
    pos: {x: 5, y: 5}
  };

  const draw = () => {
    context.fillStyle = 'gray';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawPiece(player.matrix, player.pos);
  }

  document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
      player.pos.x--;
    } else if (event.keyCode === 39) {
      player.pos.x++;
    } else if (event.keyCode === 40) {
      playerDrop();
    }
  });

  update();
});
