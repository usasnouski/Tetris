import Game from './game';

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("tetris");
  const ctx = canvas.getContext("2d");

  ctx.scale(30, 30);

  // let game = new Game(ctx);
  let gameStart = false;

  const modal = document.getElementById("modal");

  document.addEventListener("keydown", event => {
    if (event.keyCode === 13) {
      gameStart = (gameStart ? false : true);

      if (gameStart) {
        modal.classList.remove("modal-on");
        modal.classList.add("modal-off");
      } else {
        modal.classList.remove("modal-off");
        modal.classList.add("modal-on");
      }

      if (gameStart) {
        new Game(ctx, gameStart).start();
      }
    }
  });




});
