
import {Board} from "./Board";


let board = new Board();

board.initGame();
board.logBoard();
board.logMeta();

board.selectFigure(7,6);
board.move(f(6,5));
board.logBoard();
board.move(f(6,5));
board.logBoard();
board.move(f(5,5));
board.logBoard();




function f(x:number,y:number) {
    return board.getField(x,y);
}
