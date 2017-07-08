/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grid__ = __webpack_require__(3);



class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = new __WEBPACK_IMPORTED_MODULE_1__grid__["a" /* default */](this.ctx)
    this.piece = new __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */](this.ctx, 2000, this.dropPiece.bind(this));

    this.handleKeyPress = this.handleKeyPress.bind(this);

    document.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.keyCode === 37) {
      this.piece.moveLeft();
    } else if (event.keyCode === 39) {
      this.piece.moveRight();
    } else if (event.keyCode === 40) {
      this.dropPiece();
    } else if (event.keyCode === 38) {
      this.piece.rotate();
    }
  }

  collide() {
    const { piece } = this.piece;
    const pos = this.piece.state;
    const { grid } = this.grid;
    // debugger;
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        // debugger;
        if (piece[y][x] !== 0 &&
          (grid[y + pos.y] &&
          grid[y + pos.y][x + pos.x]) !== 0) {
            return true;
          }
      }
    }

    return false;
  }

  drawBackground() {
    this.ctx.fillStyle = "#B0C4DE";
    this.ctx.fillRect(0, 0, 200, 400);
  }

  draw() {
    this.ctx.clearRect(0, 0, 200, 400);
    // this.drawBackground();
    this.grid.drawGrid();
    this.piece.drawPiece();

  }

  dropPiece() {
    this.piece.state.y++;
    if (this.collide()) {
      this.piece.state.y--;
      this.grid.updateGrid(this.piece);
      this.piece.clearInterval();
      this.piece = new __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */](this.ctx, 700, this.dropPiece.bind(this));
    }
  }

  update(timestamp = 0) {
    // console.log(`TIMESTAMP: ${timestamp}`);
    // console.log(`BEGIN TIME ${this.beginTime}`);
    // const deltaTime = timestamp - this.beginTime;
    // this.downSteps += deltaTime;
    // console.log(`${deltaTime}`);
    // if (this.downSteps > this.intervalTime) {
    //   this.dropPiece();
    // }
    //
    // this.beginTime = timestamp;
    this.draw();

    requestAnimationFrame(this.update.bind(this));
  }


  start() {
    this.update();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Piece {
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

  rotate() {
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
    rotatedPiece.forEach(row => row.reverse());
    this.piece = rotatedPiece;
  }

  randomPiece() {
   const pieceType = "ILJOSZT"[Math.floor(Math.random() * 7)];
   return PIECES[pieceType];
 }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Piece;


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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);


document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("tetris");
  const ctx = canvas.getContext("2d");

  ctx.scale(20, 20);

  new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctx).start();
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Grid {
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

  updateGrid(piece) {
    // debugger;
    const tetrimino = piece.piece;
    tetrimino.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) {
          this.grid[y + piece.state.y][x + piece.state.x] = val;
        }
      });
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Grid;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map