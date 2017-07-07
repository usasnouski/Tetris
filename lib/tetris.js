import Game from './game';

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("tetris");
  const ctx = canvas.getContext("2d");

  ctx.scale(20, 20);

  new Game(ctx).start();
});
