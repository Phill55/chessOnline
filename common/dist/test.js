"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("./Board");
var board = new Board_1.Board();
board.initGame();
board.logBoard();
board.logMeta();
board.selectFigure(7, 6);
board.move(f(6, 5));
board.logBoard();
board.move(f(6, 5));
board.logBoard();
board.move(f(5, 5));
board.logBoard();
function f(x, y) {
    return board.getField(x, y);
}
