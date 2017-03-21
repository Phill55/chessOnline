"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("./Board");
var board = new Board_1.Board();
board.initGame();
board.logBoard();
board.logMeta();
board.replace(f(0, 2), f(4, 5));
board.logBoard();
board.selectFigure(4, 5);
console.log(board.getPossibleMovesFor(f(4, 5)));
board.move(f(7, 7));
function f(x, y) {
    return board.getField(x, y);
}
