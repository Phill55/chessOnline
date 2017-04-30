/**
 * Created by Philipp on 22.03.2017.
 */
import {Board} from "../common/src/Board";
import {FigureType} from "../common/src/FigureType";
import {Field} from "../common/src/Field";
import {Side} from "../common/src/Side";
import {GameState} from "../common/src/GameState";

//TODO: make board an field variables global!!!!

document.addEventListener("DOMContentLoaded", function(event) {
    let printBoard : Board = new Board();
    printBoard.initGame();
    let printField : Field[][] = printBoard.getBoard();
    printHtmlBoard(printBoard,printField);
    initOnClickListener(printBoard,printField);
});


function printHtmlBoard(printBoard : Board, printField:Field[][]) {
    let html: string = "<table id='field' border='1px solid black' style='border-style: solid;'>";

    let color = "white";

    for (let i = 0; i < printField.length; i++) {
        html += "<tr>";
        for (let j = 0; j < printField[i].length; j++) {
            let value = " ";
            let id = i+""+j;

            if (!printBoard.getField(i,j).isEmpty()) {
                value = getFigureTypeRepresentation(printField[i][j].getFigure().type,printField[i][j].getFigure().side);
                html+="<td><div id='"+id+"' style='height: 50px;width: 50px; background-color: "+color+";'><img src='"+value+"' style='width: 100%;height: 100%;'></div></td>";
            } else {
                html+="<td><div id='"+id+"' style='height: 50px;width: 50px; background-color: "+color+";'></div></td>";
            }
            color = swapColor(color);

        }
        color = swapColor(color);
        html += "</tr>";
    }


    html += "</table>";
    document.getElementById("content").innerHTML=html;
}


function initOnClickListener(printBoard:Board,printField:Field[][]) {

    for (let i =0; i< printField.length;i++) {
        for (let j = 0; j < printField[i].length; j++) {

            let id = i+""+j;
            let fieldElement = document.getElementById(id);
            let field : Field = printBoard.getField(i,j);
            fieldElement.onclick = function(e) {
                if (field.getFigure() != null && (field.getFigure().side === printBoard.getPlayerTurn()))
                onFieldSelect(field,printBoard,printBoard.getBoard());
            };
        }
    }

}

function onFieldSelect(selectedField : Field,printBoard:Board,printField:Field[][]) {
    printBoard.selectFigure(selectedField.x,selectedField.y);
    let selectedFieldElement = document.getElementById(selectedField.x+""+selectedField.y);
    selectedFieldElement.style.backgroundColor="green";
    selectedFieldElement.onclick = function(e) {
        printHtmlBoard(printBoard,printBoard.getBoard());
        initOnClickListener(printBoard,printBoard.getBoard());
    };


    let fields = printBoard.getPossibleMovesFor(selectedField);

    for (let i = 0; i<fields.length;i++) {
        let field : Field = fields[i];
        let id : string = field.x +""+field.y;
        let fieldElement = document.getElementById(id);
        fieldElement.style.backgroundColor = "blue";
        fieldElement.onclick = function(e) {
            onMove(printBoard,printBoard.getBoard(),field.x,field.y);
        }

    }

}

function onMove(printBoard:Board,printField:Field[][],x,y) {
    printBoard.move(printBoard.getField(x,y));
    printBoard.logBoard();
    if (printBoard.getGameState() === GameState.CHECKMATE) {
        document.getElementById("messages").innerText = printBoard.getMessage();
    }
    printBoard.logGameState();
    printHtmlBoard(printBoard,printBoard.getBoard());
    initOnClickListener(printBoard,printBoard.getBoard());
}

function getFigureTypeRepresentation(figureType,side) {

    if (side===Side.BLACK) {
        switch (figureType) {
            case FigureType.TOWER :
                return "pics/tower_black.png";
            case FigureType.HORSE :
                return "pics/horse_black.PNG";
            case FigureType.RUNNER :
                return "pics/runner_black.PNG";
            case FigureType.KING:
                return "pics/king_black.PNG";
            case FigureType.QUEEN:
                return "pics/queen_black.PNG";
            case FigureType.FARMER:
                return "pics/farmer_black.PNG";
            default :
                return " ";
        }
    } else {
        switch (figureType) {
            case FigureType.TOWER :
                return "pics/tower_white.png";
            case FigureType.HORSE :
                return "pics/horse_white.PNG";
            case FigureType.RUNNER :
                return "pics/runner_white.PNG";
            case FigureType.KING:
                return "pics/king_white.PNG";
            case FigureType.QUEEN:
                return "pics/queen_white.PNG";
            case FigureType.FARMER:
                return "pics/farmer_white.PNG";
            default :
                return " ";
        }
    }

}

function swapColor(color) {
    if (color==="white") {
        return "grey"
    } else {
        return "white";
    }
}