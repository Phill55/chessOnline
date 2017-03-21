
import {Board} from "./Board";


let board = new Board();

board.initGame();
board.logBoard();
board.logMeta();

board.replace(f(0,2),f(4,5));
board.logBoard();
board.selectFigure(4,5);
console.log(board.getPossibleMovesFor(f(4,5)));
board.move(f(7,7));


function f(x:number,y:number) {
    return board.getField(x,y);
}
