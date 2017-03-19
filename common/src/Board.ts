/**
 * Created by Philipp on 19.03.2017.
 */
import {Figure} from "./Figure";
import {FigureType} from "./FigureType";
import {Field} from "./Field";
import {Side} from "./Side";
/**
 * Created by Philipp on 19.03.2017.
 */

export class Board {

    private board: Field[][];
    private playerTurn: Side;

    private WIDTH: number = 8;
    private HEIGHT: number = 8;

    initGame() {

        this.playerTurn = Side.WHITE;

        this.board = [];

        for (let x = 0; x < this.HEIGHT; x++) {

            this.board[x] = [];

            for (let y = 0; y < this.WIDTH; y++) {

                this.board[x][y] = new Field(x, y);

                if ((x == 0 && y == 0) || (x == 0 && y == 7)) {
                    let figure = new Figure(x, y, FigureType.TOWER, this.board[x][y], Side.BLACK);
                    this.board[x][y].setFigure(figure);
                }

                if ((x == 7 && y == 0) || (x == 7 && y == 7)) {
                    let figure = new Figure(x, y, FigureType.TOWER, this.board[x][y], Side.WHITE);
                    this.board[x][y].setFigure(figure);
                }

                if ((x == 0 && y == 1) || (x == 0 && y == 6)) {
                    let figure = new Figure(x, y, FigureType.HORSE, this.board[x][y], Side.BLACK);
                    this.board[x][y].setFigure(figure);
                }

                if ((x == 7 && y == 1) || (x == 7 && y == 6)) {
                    let figure = new Figure(x, y, FigureType.HORSE, this.board[x][y], Side.WHITE);
                    this.board[x][y].setFigure(figure);
                }

                if ((x == 0 && y == 2) || (x == 0 && y == 5)) {
                    let figure = new Figure(x, y, FigureType.RUNNER, this.board[x][y], Side.BLACK);
                    this.board[x][y].setFigure(figure);
                }

                if ((x == 7 && y == 2) || (x == 7 && y == 5)) {
                    let figure = new Figure(x, y, FigureType.RUNNER, this.board[x][y], Side.WHITE);
                    this.board[x][y].setFigure(figure);
                }

                if (x == 0 && y == 3) {
                    let figure = new Figure(x, y, FigureType.QUEEN, this.board[x][y], Side.BLACK);
                    this.board[x][y].setFigure(figure);
                }

                if (x == 7 && y == 3) {
                    let figure = new Figure(x, y, FigureType.QUEEN, this.board[x][y], Side.WHITE);
                    this.board[x][y].setFigure(figure);
                }

                if (x == 0 && y == 4) {
                    let figure = new Figure(x, y, FigureType.KING, this.board[x][y], Side.BLACK);
                    this.board[x][y].setFigure(figure);
                }

                if (x == 7 && y == 4) {
                    let figure = new Figure(x, y, FigureType.KING, this.board[x][y], Side.WHITE);
                    this.board[x][y].setFigure(figure);
                }

                else if (x == 1) {
                    let figure = new Figure(x, y, FigureType.FARMER, this.board[x][y], Side.BLACK);
                    this.board[x][y].setFigure(figure);
                }

                if (x == 6) {
                    let figure = new Figure(x, y, FigureType.FARMER, this.board[x][y], Side.WHITE);
                    this.board[x][y].setFigure(figure);
                }

            }

        }
    }

    getField(x: number, y: number): Field {
        return this.board[x][y];
    }


    move(from: Field, to: Field) {
        if (this.isValidMove(from, to)) {
            let figure = this.board[from.x][from.y].getFigure();
            this.board[from.x][from.y].setFigure(null);
            this.board[to.x][to.y].setFigure(figure);
            this.switchTurn();
            return true;
        }
        return false;
    }

    switchTurn() {
        this.playerTurn = Side.WHITE ?  Side.BLACK : Side.WHITE;
    }

    isValidMove(from: Field, to: Field) {

        if (from.x > this.WIDTH - 1 || from.x < 0 || to.x > this.WIDTH - 1 || to.x < 0 || from.y > this.HEIGHT - 1 || from.y < 0 || to.y > this.HEIGHT - 1 || to.y < 0) {
            return false;
        }

        let figure = this.board[from.x][from.y].getFigure();
        let validFields: Field[] = [];

        if (figure.type == FigureType.TOWER) {
            validFields = this.getValidTowerMoves(from);
        }


        //check if validFields contains to-Field
        console.log(validFields);
        for (let i = 0; i < validFields.length; i++) {
            if (validFields[i].equals(to)) return true;
        }

        return true;

    }

    getValidTowerMoves(from: Field) {
        let validFields: Field[] = [];
        //add all right field
        for (let i = from.x + 1; i < this.WIDTH; i++) {
            let actField = this.board[i][from.y];
            if (actField.isEmpty()) {
                validFields[validFields.length] = actField;
            } else {
                validFields[validFields.length] = actField;
                break;
            }
        }

        //add all left fields
        for (let i = from.x - 1; i >= 0; i--) {
            let actField = this.board[i][from.y];
            if (actField.isEmpty()) {
                validFields[validFields.length] = actField;
            } else {
                validFields[validFields.length] = actField;
                break;
            }
        }

        //get all up fields
        for (let i = from.y + 1; i < this.HEIGHT; i++) {
            let actField = this.board[from.x][i];
            if (actField.isEmpty()) {
                validFields[validFields.length] = actField;
            } else {
                validFields[validFields.length] = actField;
                break;
            }
        }

        //get all down fields
        for (let i = from.y - 1; i >= 0; i--) {
            let actField = this.board[from.x][i];
            if (actField.isEmpty()) {
                validFields[validFields.length] = actField;
            } else {
                validFields[validFields.length] = actField;
                break;
            }
        }


        return validFields;
    }

    logBoard() {
        let print = "";

        for (let i = 0; i < this.board.length; i++) {

            for (let j = 0; j < this.board[i].length; j++) {

                let figure = this.board[i][j].getFigure();

                if (figure == null) {
                    print += " ";
                } else {
                    if (figure.type == FigureType.TOWER) {
                        print += "T";
                    }

                    if (figure.type == FigureType.HORSE) {
                        print += "H";
                    }

                    if (figure.type == FigureType.RUNNER) {
                        print += "R";
                    }

                    if (figure.type == FigureType.QUEEN) {
                        print += "Q";
                    }

                    if (figure.type == FigureType.KING) {
                        print += "K";
                    }

                    if (figure.type == FigureType.FARMER) {
                        print += "F";
                    }
                }

                print += "|";

            }

            print += '\n';

        }

        console.log(print);

    }

    logTeam() {
        let print = "";

        for (let i = 0; i < this.board.length; i++) {

            for (let j = 0; j < this.board[i].length; j++) {

                //print += i + "";
                //print += j + "";
                let figure = this.board[i][j].getFigure();

                if (figure == null) {
                    print += " "
                } else {
                    print += figure.side;
                }
                print += "|";
            }

            print += '\n';

        }

        console.log(print);
    }

    logMeta() {
        let print = "";

        for (let i = 0; i < this.board.length; i++) {

            for (let j = 0; j < this.board[i].length; j++) {

                let field = this.board[i][j];
                print += field.x + "";
                print += field.y + "";
                print += "|";
            }

            print += '\n';

        }

        console.log(print);
    }

}

