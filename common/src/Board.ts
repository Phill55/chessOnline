/**
 * Created by Philipp on 19.03.2017.
 */
import {Figure} from "./Figure";
import {FigureType} from "./FigureType";
import {Field} from "./Field";
import {Side} from "./Side";
import {GameState} from "./GameState";
import {userInfo} from "os";
import {platform} from "os";
/**
 * Created by Philipp on 19.03.2017.
 */

export class Board {

    private board: Field[][];
    private playerTurn: Side;
    private selectedFigure: Figure;
    private gameState: GameState;

    private WIDTH: number = 8;
    private HEIGHT: number = 8;

    constructor() {
        this.WIDTH=8;
    }

    public initGame(): void {

        this.playerTurn = Side.WHITE;
        this.gameState = GameState.NORMAL;

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

    public getField(x: number, y: number): Field {
        if (this.board[x] == null) {
            return null;
        }

        if (this.board[x][y] == null) {
            return null;
        }

        return this.board[x][y];
    }

    public selectFigure(x: number, y: number): void {
        let field = this.getField(x, y);
        if (field != null && !field.isEmpty()) {
            let figure: Figure = field.getFigure();
            if (figure.side == this.playerTurn) {
                this.selectedFigure = figure;
            }
        }
    }

    public move(to: Field): boolean {
        let from: Field;
        if (this.selectedFigure != null) {
            from = this.selectedFigure.field;
        } else {
            return false;
        }

        if (this.isValidMove(from, to)) {
            this.board[from.x][from.y].setFigure(null);
            this.board[to.x][to.y].setFigure(this.selectedFigure);
            this.selectedFigure = null;
            this.switchTurn();
            return true;
        }
        return false;
    }

    public isValidMove(from: Field, to: Field): boolean {

        if (from.x > this.WIDTH - 1 || from.x < 0 || to.x > this.WIDTH - 1 || to.x < 0 || from.y > this.HEIGHT - 1 || from.y < 0 || to.y > this.HEIGHT - 1 || to.y < 0) {
            return false;
        }

        let figure = from.getFigure();
        let validFields: Field[] = [];

        switch (figure.type) {
            case FigureType.TOWER :
                validFields = this.getValidTowerMoves(from);
                break;
            case FigureType.HORSE :
                validFields = this.getValidHorseMoves(from);
                break;
            case FigureType.RUNNER :
                validFields = this.getValidRunnerMoves(from);
                break;
            case FigureType.QUEEN :
                validFields = this.getValidQueenMoves(from);
                break;
            case FigureType.KING :
                validFields = this.getValidKingMoves(from);
                break;
            case FigureType.FARMER :
                validFields = this.getValidFarmerMoves(from);
                break;
            default :
                return false;
        }

        return validFields.indexOf(to) > -1;
    }

    public getPossibleMovesFor(field: Field): Field[] {
        if (field.isEmpty()) return [];

        let figure: Figure = field.getFigure();
        let ret: Field[] = [];

        switch (figure.type) {
            case FigureType.TOWER :
                ret = this.getValidTowerMoves(field);
                break;
            case FigureType.HORSE :
                ret = this.getValidHorseMoves(field);
                break;
            case FigureType.RUNNER :
                ret = this.getValidRunnerMoves(field);
                break;
            case FigureType.KING:
                ret = this.getValidKingMoves(field);
                break;
            case FigureType.QUEEN:
                ret = this.getValidQueenMoves(field);
                break;
            case FigureType.FARMER:
                ret = this.getValidFarmerMoves(field);
                break;
            default :
                return [];
        }

        return ret;

    }

    public getValidTowerMoves(from: Field): Field[] {
        let validFields: Field[] = [];
        //add all right field
        for (let i = from.x + 1; i < this.WIDTH; i++) {
            let actField = this.board[i][from.y];
            if (actField.isEmpty()) {
                validFields[validFields.length] = actField;
            } else {
                if (this.isEnemyFigure(actField.getFigure())) {
                    validFields[validFields.length] = actField;
                }
                break;
            }
        }

        //add all left fields
        for (let i = from.x - 1; i >= 0; i--) {
            let actField = this.board[i][from.y];
            if (actField.isEmpty()) {
                validFields[validFields.length] = actField;
            } else {
                if (this.isEnemyFigure(actField.getFigure())) {
                    validFields[validFields.length] = actField;
                }
                break;
            }
        }

        //get all up fields
        for (let i = from.y + 1; i < this.HEIGHT; i++) {
            let actField = this.board[from.x][i];
            if (actField.isEmpty()) {
                validFields[validFields.length] = actField;
            } else {
                if (this.isEnemyFigure(actField.getFigure())) {
                    validFields[validFields.length] = actField;
                }
                break;
            }
        }

        //get all down fields
        for (let i = from.y - 1; i >= 0; i--) {
            let actField = this.board[from.x][i];
            if (actField.isEmpty()) {
                validFields[validFields.length] = actField;
            } else {
                if (this.isEnemyFigure(actField.getFigure())) {
                    validFields[validFields.length] = actField;
                }
                break;
            }
        }


        return validFields;
    }

    public getValidHorseMoves(from: Field): Field[] {

        let validFields: Field[] = [];

        validateForField(this.getField(from.x + 2, from.y - 1), this.playerTurn);
        validateForField(this.getField(from.x + 2, from.y + 1), this.playerTurn);
        validateForField(this.getField(from.x - 2, from.y - 1), this.playerTurn);
        validateForField(this.getField(from.x - 2, from.y + 1), this.playerTurn);
        validateForField(this.getField(from.x - 1, from.y - 2), this.playerTurn);
        validateForField(this.getField(from.x + 1, from.y - 2), this.playerTurn);
        validateForField(this.getField(from.x - 1, from.y + 2), this.playerTurn);
        validateForField(this.getField(from.x + 1, from.y + 2), this.playerTurn);

        function validateForField(field: Field, playerTurn: Side) {
            if (field != null) {
                if (field.isEmpty()) {
                    validFields[validFields.length] = field;
                } else {
                    let enemyFigure : boolean = playerTurn != field.getFigure().side;
                    if (enemyFigure) {
                        validFields[validFields.length] = field;
                    }
                }
            }
        }


        return validFields;
    }

    public getValidRunnerMoves(from: Field): Field[] {

        let ret: Field[] = [];

        let actX = from.x;
        let actY = from.y;
        let field = this.getField(actX + 1, actY + 1);
        while (field != null) {
            if (field.isEmpty()) {
                ret.push(field);
                actX++;
                actY++;
                field = this.getField(actX, actY);
            } else {
                if (this.isEnemyFigure(field.getFigure())) {
                    ret[ret.length] = field;
                }
                break;
            }
        }

        actX = from.x;
        actY = from.y;
        field = this.getField(actX - 1, actY - 1);
        while (field != null) {
            if (field.isEmpty()) {
                ret[ret.length] = field;
                actX--;
                actY--;
                field = this.getField(actX, actY);
            } else {
                if (this.isEnemyFigure(field.getFigure())) {
                    ret[ret.length] = field;
                }
                break;
            }
        }

        actX = from.x;
        actY = from.y;
        field = this.getField(actX + 1, actY - 1);
        while (field != null) {
            if (field.isEmpty()) {
                ret[ret.length] = field;
                actX++;
                actY--;
                field = this.getField(actX, actY);
            } else {
                if (this.isEnemyFigure(field.getFigure())) {
                    ret[ret.length] = field;
                }
                break;
            }
        }

        actX = from.x;
        actY = from.y;
        field = this.getField(actX - 1, actY + 1);
        while (field != null) {
            if (field.isEmpty()) {
                ret[ret.length] = field;
                actX--;
                actY++;
                field = this.getField(actX, actY);
            } else {
                if (this.isEnemyFigure(field.getFigure())) {
                    ret[ret.length] = field;
                }
                break;
            }
        }

        return ret;
    }

    public getValidQueenMoves(from: Field): Field[] {
        return this.getValidRunnerMoves(from).concat(this.getValidTowerMoves(from));
    }

    public getValidKingMoves(from: Field): Field[] {
        let ret: Field[] = [];
        let possibleMoves: Field[] = [
            this.getField(from.x + 1, from.y),
            this.getField(from.x - 1, from.y),
            this.getField(from.x, from.y + 1),
            this.getField(from.x, from.y - 1),
            this.getField(from.x - 1, from.y - 1),
            this.getField(from.x - 1, from.y + 1),
            this.getField(from.x + 1, from.y + 1),
            this.getField(from.x + 1, from.y - 1)
        ];

        possibleMoves.forEach(field => {
            if (field != null) {
                if (field.isEmpty()) {
                    ret[ret.length] = field;
                } else {
                    if (!(field.getFigure().side == this.playerTurn)) {
                        ret[ret.length] = field;
                    }
                }
            }
        });

        return ret;
    }

    public getValidFarmerMoves(from: Field): Field[] {
        let ret: Field[] = [];


        if (this.playerTurn == Side.WHITE) {

            if (this.getField(from.x - 1, from.y) != null && this.getField(from.x - 1, from.y).isEmpty()) {
                ret.push(this.getField(from.x - 1, from.y));
            }

            if (this.getField(from.x - 1, from.y + 1) != null && !(this.getField(from.x - 1, from.y + 1).isEmpty())) {
                if (this.isEnemyFigure(this.getField(from.x - 1, from.y + 1).getFigure())) {
                    ret.push(this.getField(from.x - 1, from.y + 1));
                }
            }

            if (this.getField(from.x - 1, from.y - 1) != null && !(this.getField(from.x - 1, from.y - 1).isEmpty())) {
                if (this.isEnemyFigure(this.getField(from.x - 1, from.y - 1).getFigure())) {
                    ret.push(this.getField(from.x - 1, from.y - 1));
                }
            }
        } else {

            if (this.getField(from.x + 1, from.y) != null && this.getField(from.x + 1, from.y).isEmpty()) {
                ret.push(this.getField(from.x + 1, from.y));
            }

            if (this.getField(from.x + 1, from.y + 1) != null && !(this.getField(from.x + 1, from.y + 1).isEmpty())) {
                if (this.isEnemyFigure(this.getField(from.x - 1, from.y + 1).getFigure())) {
                    ret.push(this.getField(from.x - 1, from.y + 1));
                }
            }

            if (this.getField(from.x + 1, from.y - 1) != null && !(this.getField(from.x + 1, from.y - 1).isEmpty())) {
                if (this.isEnemyFigure(this.getField(from.x - 1, from.y - 1).getFigure())) {
                    ret.push(this.getField(from.x - 1, from.y - 1));
                }
            }
        }


        return ret;
    }


    //public helpers
    public logBoard(): void {
        let print = "Player: " + (this.playerTurn == Side.WHITE ? "White" : "Black") + "\n";
        print += "Selected: " + (this.selectedFigure != null ? "" + this.selectedFigure.x + "|" + this.selectedFigure.y : "not selected") + "\n";

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

    public logTeam(): void {
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

    public logMeta(): void {
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

    public replace(from: Field, to: Field) {
        let fig: Figure = this.getField(from.x, from.y).getFigure();
        this.board[from.x][from.y].setFigure(null);
        this.board[to.x][to.y].setFigure(fig);
    }


    //private helpers
    private switchTurn(): void {
        this.playerTurn = Side.WHITE ? Side.BLACK : Side.WHITE;
    }

    private isEnemyFigure(figure: Figure): boolean {
        return this.playerTurn != figure.side;
    }

    private omputeGameState(): void {
        let king: Field = this.getKingField(this.playerTurn);
        let checkingFields: Field[] = this.getCheckingFieldsFor(king);

        if (checkingFields.length < 1) {
            this.playerTurn == Side.WHITE ? this.gameState = GameState.CHECK_WHITE : this.gameState = GameState.CHECK_BLACK;
        } else {
            this.gameState = GameState.NORMAL;
        }

        //TODO:check for checkmate

    }

    private getCheckingFieldsFor(king: Field): Field[] {
        let ret: Field[] = [];

        let horseMoves: Field[] = this.getValidHorseMoves(king);
        ret.concat(this.getFieldsForFigureType(horseMoves, FigureType.HORSE));

        let towerMoves: Field[] = this.getValidTowerMoves(king);
        ret.concat(this.getFieldsForFigureType(towerMoves, FigureType.TOWER));

        let runnerMoves: Field[] = this.getValidRunnerMoves(king);
        ret.concat(this.getFieldsForFigureType(runnerMoves, FigureType.RUNNER));

        let queenMoves: Field[] = this.getValidQueenMoves(king);
        ret.concat(this.getFieldsForFigureType(queenMoves, FigureType.QUEEN));

        let farmerMoves: Field [];

        if (this.playerTurn == Side.WHITE) {
            farmerMoves.push(this.getField(king.x - 1, king.y - 1));
            farmerMoves.push(this.getField(king.x - 1, king.y + 1));
        } else {
            farmerMoves.push(this.getField(king.x + 1, king.y - 1));
            farmerMoves.push(this.getField(king.x + 1, king.y + 1));
        }
        ret.concat(this.getFieldsForFigureType(farmerMoves, FigureType.FARMER));

        return ret;

    }

    /**
     * checks if one of the given fields contains a figure of the given figure type
     */
    private getFieldsForFigureType(fields: Field[], figureType: FigureType) {
        let ret: Field[] = [];

        fields.forEach(field => {
            if (field != null && !field.isEmpty()) {
                if (field.getFigure().type == figureType && field.getFigure().side != this.playerTurn) {
                    ret.push(field);
                }
            }
        });

        return ret;
    }

    private getKingField(side: Side): Field {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (!(this.board[i][j].isEmpty())) {
                    if ((this.board[i][j].getFigure().type == FigureType.KING) && (this.board[i][j].getFigure().side == side)) {
                        return this.getField(i, j);
                    }
                }
            }
        }
        return null;
    }
    public getBoard() : Field[][] {
        return this.board;
    }


}

