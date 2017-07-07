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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(2);


class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalTime = 900;
    this.beginTime = 0;
    this.downSteps = 0;
    // this.tPiece = [
    //   [0, 0, 0],
    //   [1, 1, 1],
    //   [1, 1, 1]
    // ]
    this.allPieces = [new __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */](this.ctx, 400)];
    this.piece = this.allPieces[0];

    this.handleKeyPress = this.handleKeyPress.bind(this);

    document.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.keyCode === 37) {
      this.piece.moveLeft();
    } else if (event.keyCode === 39) {
      this.piece.moveRight();
    }
  }

  drawBackground() {
    this.ctx.fillStyle = "#B0C4DE";
    this.ctx.fillRect(0, 0, 240, 400);
  }

  draw() {
    this.ctx.clearRect(0, 0, 240, 400);
    this.drawBackground();
    this.piece.drawPiece();
  }

  // dropPiece() {
  //   this.piece.state.y++;
  //   this.downSteps = 0;
  // }

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
    // this.draw();

    this.update();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Piece {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Piece;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map