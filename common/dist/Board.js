"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Philipp on 19.03.2017.
 */
var Figure_1 = require("./Figure");
var FigureType_1 = require("./FigureType");
var Field_1 = require("./Field");
var Side_1 = require("./Side");
var GameState_1 = require("./GameState");
/**
 * Created by Philipp on 19.03.2017.
 */
var Board = (function () {
    function Board() {
        this.WIDTH = 8;
        this.HEIGHT = 8;
    }
    Board.prototype.initGame = function () {
        this.playerTurn = Side_1.Side.WHITE;
        this.gameState = GameState_1.GameState.NORMAL;
        this.board = [];
        for (var x = 0; x < this.HEIGHT; x++) {
            this.board[x] = [];
            for (var y = 0; y < this.WIDTH; y++) {
                this.board[x][y] = new Field_1.Field(x, y);
                if ((x == 0 && y == 0) || (x == 0 && y == 7)) {
                    var figure = new Figure_1.Figure(x, y, FigureType_1.FigureType.TOWER, this.board[x][y], Side_1.Side.BLACK);
                    this.board[x][y].setFigure(figure);
                }
                if ((x == 7 && y == 0) || (x == 7 && y == 7)) {
                    var figure = new Figure_1.Figure(x, y, FigureType_1.FigureType.TOWER, this.board[x][y], Side_1.Side.WHITE);
                    this.board[x][y].setFigure(figure);
                }
                if ((x == 0 && y == 1) || (x == 0 && y == 6)) {
                    var figure = new Figure_1.Figure(x, y, FigureType_1.FigureType.HORSE, this.board[x][y], Side_1.Side.BLACK);
                    this.board[x][y].setFigure(figure);
                }
                if ((x == 7 && y == 1) || (x == 7 && y == 6)) {
                    var figure = new Figure_1.Figure(x, y, FigureType_1.FigureType.HORSE, this.board[x][y], Side_1.Side.WHITE);
                    this.board[x][y].setFigure(figure);
                }
                if ((x == 0 && y == 2) || (x == 0 && y == 5)) {
                    var figure = new Figure_1.Figure(x, y, FigureType_1.FigureType.RUNNER, this.board[x][y], Side_1.Side.BLACK);
                    this.board[x][y].setFigure(figure);
                }
                if ((x == 7 && y == 2) || (x == 7 && y == 5)) {
                    var figure = new Figure_1.Figure(x, y, FigureType_1.FigureType.RUNNER, this.board[x][y], Side_1.Side.WHITE);
                    this.board[x][y].setFigure(figure);
                }
                if (x == 0 && y == 3) {
                    var figure = new Figure_1.Figure(x, y, FigureType_1.FigureType.QUEEN, this.board[x][y], Side_1.Side.BLACK);
                    this.board[x][y].setFigure(figure);
                }
                if (x == 7 && y == 3) {
                    var figure = new Figure_1.Figure(x, y, FigureType_1.FigureType.QUEEN, this.board[x][y], Side_1.Side.WHITE);
                    this.board[x][y].setFigure(figure);
                }
                if (x == 0 && y == 4) {
                    var figure = new Figure_1.Figure(x, y, FigureType_1.FigureType.KING, this.board[x][y], Side_1.Side.BLACK);
                    this.board[x][y].setFigure(figure);
                }
                if (x == 7 && y == 4) {
                    var figure = new Figure_1.Figure(x, y, FigureType_1.FigureType.KING, this.board[x][y], Side_1.Side.WHITE);
                    this.board[x][y].setFigure(figure);
                }
                else if (x == 1) {
                    var figure = new Figure_1.Figure(x, y, FigureType_1.FigureType.FARMER, this.board[x][y], Side_1.Side.BLACK);
                    this.board[x][y].setFigure(figure);
                }
                if (x == 6) {
                    var figure = new Figure_1.Figure(x, y, FigureType_1.FigureType.FARMER, this.board[x][y], Side_1.Side.WHITE);
                    this.board[x][y].setFigure(figure);
                }
            }
        }
    };
    Board.prototype.getField = function (x, y) {
        if (this.board[x] == null) {
            return null;
        }
        if (this.board[x][y] == null) {
            return null;
        }
        return this.board[x][y];
    };
    Board.prototype.selectFigure = function (x, y) {
        var field = this.getField(x, y);
        if (field != null && !field.isEmpty()) {
            var figure = field.getFigure();
            if (figure.side == this.playerTurn) {
                this.selectedFigure = figure;
            }
        }
    };
    Board.prototype.move = function (to) {
        var from;
        if (this.selectedFigure != null) {
            from = this.selectedFigure.field;
        }
        else {
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
    };
    Board.prototype.isValidMove = function (from, to) {
        if (from.x > this.WIDTH - 1 || from.x < 0 || to.x > this.WIDTH - 1 || to.x < 0 || from.y > this.HEIGHT - 1 || from.y < 0 || to.y > this.HEIGHT - 1 || to.y < 0) {
            return false;
        }
        var figure = from.getFigure();
        var validFields = [];
        switch (figure.type) {
            case FigureType_1.FigureType.TOWER:
                validFields = this.getValidTowerMoves(from);
                break;
            case FigureType_1.FigureType.HORSE:
                validFields = this.getValidHorseMoves(from);
                break;
            case FigureType_1.FigureType.RUNNER:
                validFields = this.getValidRunnerMoves(from);
                break;
            default:
                return false;
        }
        return validFields.indexOf(to) > -1;
    };
    Board.prototype.getPossibleMovesFor = function (field) {
        if (field.isEmpty())
            return [];
        var figure = field.getFigure();
        var ret = [];
        switch (figure.type) {
            case FigureType_1.FigureType.TOWER:
                ret = this.getValidTowerMoves(field);
                break;
            case FigureType_1.FigureType.HORSE:
                ret = this.getValidHorseMoves(field);
                break;
            case FigureType_1.FigureType.RUNNER:
                ret = this.getValidRunnerMoves(field);
                break;
            default:
                return [];
        }
        return ret;
    };
    Board.prototype.getValidTowerMoves = function (from) {
        var validFields = [];
        //add all right field
        for (var i = from.x + 1; i < this.WIDTH; i++) {
            var actField = this.board[i][from.y];
            if (actField.isEmpty()) {
                validFields[validFields.length] = actField;
            }
            else {
                if (this.isEnemyFigure(actField.getFigure())) {
                    validFields[validFields.length] = actField;
                }
                break;
            }
        }
        //add all left fields
        for (var i = from.x - 1; i >= 0; i--) {
            var actField = this.board[i][from.y];
            if (actField.isEmpty()) {
                validFields[validFields.length] = actField;
            }
            else {
                if (this.isEnemyFigure(actField.getFigure())) {
                    validFields[validFields.length] = actField;
                }
                break;
            }
        }
        //get all up fields
        for (var i = from.y + 1; i < this.HEIGHT; i++) {
            var actField = this.board[from.x][i];
            if (actField.isEmpty()) {
                validFields[validFields.length] = actField;
            }
            else {
                if (this.isEnemyFigure(actField.getFigure())) {
                    validFields[validFields.length] = actField;
                }
                break;
            }
        }
        //get all down fields
        for (var i = from.y - 1; i >= 0; i--) {
            var actField = this.board[from.x][i];
            if (actField.isEmpty()) {
                validFields[validFields.length] = actField;
            }
            else {
                if (this.isEnemyFigure(actField.getFigure())) {
                    validFields[validFields.length] = actField;
                }
                break;
            }
        }
        return validFields;
    };
    Board.prototype.getValidHorseMoves = function (from) {
        var validFields = [];
        validateForField(this.getField(from.x + 2, from.y - 1), this.playerTurn);
        validateForField(this.getField(from.x + 2, from.y + 1), this.playerTurn);
        validateForField(this.getField(from.x - 2, from.y - 1), this.playerTurn);
        validateForField(this.getField(from.x - 2, from.y + 1), this.playerTurn);
        validateForField(this.getField(from.x - 1, from.y - 2), this.playerTurn);
        validateForField(this.getField(from.x + 1, from.y - 2), this.playerTurn);
        validateForField(this.getField(from.x - 1, from.y + 2), this.playerTurn);
        validateForField(this.getField(from.x + 1, from.y + 2), this.playerTurn);
        function validateForField(field, playerTurn) {
            if (field != null) {
                if (field.isEmpty()) {
                    validFields[validFields.length] = field;
                }
                else {
                    if (this.isEnemyFigure(field.getFigure())) {
                        validFields[validFields.length] = field;
                    }
                }
            }
        }
        return validFields;
    };
    Board.prototype.getValidRunnerMoves = function (from) {
        var ret = [];
        var actX = from.x;
        var actY = from.y;
        var field = this.getField(actX + 1, actY + 1);
        while (field != null) {
            if (field.isEmpty()) {
                ret.push(field);
                actX++;
                actY++;
                field = this.getField(actX, actY);
            }
            else {
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
            }
            else {
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
            }
            else {
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
            }
            else {
                if (this.isEnemyFigure(field.getFigure())) {
                    ret[ret.length] = field;
                }
                break;
            }
        }
        return ret;
    };
    Board.prototype.getValidQueenMoves = function (from) {
        return this.getValidRunnerMoves(from).concat(this.getValidTowerMoves(from));
    };
    Board.prototype.getValidKingMoves = function (from) {
        var _this = this;
        var ret = [];
        var possibleMoves = [
            this.getField(from.x + 1, from.y),
            this.getField(from.x - 1, from.y),
            this.getField(from.x, from.y + 1),
            this.getField(from.x, from.y - 1),
            this.getField(from.x - 1, from.y - 1),
            this.getField(from.x - 1, from.y + 1),
            this.getField(from.x + 1, from.y + 1),
            this.getField(from.x + 1, from.y - 1)
        ];
        possibleMoves.forEach(function (field) {
            if (field != null) {
                if (field.isEmpty()) {
                    ret[ret.length] = field;
                }
                else {
                    if (!(field.getFigure().side == _this.playerTurn)) {
                        ret[ret.length] = field;
                    }
                }
            }
        });
        return ret;
    };
    Board.prototype.getValidFarmerMoves = function (from) {
        var ret = [];
        if (this.playerTurn == Side_1.Side.WHITE) {
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
        }
        else {
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
    };
    //public helpers
    Board.prototype.logBoard = function () {
        var print = "Player: " + (this.playerTurn == Side_1.Side.WHITE ? "White" : "Black") + "\n";
        print += "Selected: " + (this.selectedFigure != null ? "" + this.selectedFigure.x + "|" + this.selectedFigure.y : "not selected") + "\n";
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                var figure = this.board[i][j].getFigure();
                if (figure == null) {
                    print += " ";
                }
                else {
                    if (figure.type == FigureType_1.FigureType.TOWER) {
                        print += "T";
                    }
                    if (figure.type == FigureType_1.FigureType.HORSE) {
                        print += "H";
                    }
                    if (figure.type == FigureType_1.FigureType.RUNNER) {
                        print += "R";
                    }
                    if (figure.type == FigureType_1.FigureType.QUEEN) {
                        print += "Q";
                    }
                    if (figure.type == FigureType_1.FigureType.KING) {
                        print += "K";
                    }
                    if (figure.type == FigureType_1.FigureType.FARMER) {
                        print += "F";
                    }
                }
                print += "|";
            }
            print += '\n';
        }
        console.log(print);
    };
    Board.prototype.logTeam = function () {
        var print = "";
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                //print += i + "";
                //print += j + "";
                var figure = this.board[i][j].getFigure();
                if (figure == null) {
                    print += " ";
                }
                else {
                    print += figure.side;
                }
                print += "|";
            }
            print += '\n';
        }
        console.log(print);
    };
    Board.prototype.logMeta = function () {
        var print = "";
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                var field = this.board[i][j];
                print += field.x + "";
                print += field.y + "";
                print += "|";
            }
            print += '\n';
        }
        console.log(print);
    };
    Board.prototype.replace = function (from, to) {
        var fig = this.getField(from.x, from.y).getFigure();
        this.board[from.x][from.y].setFigure(null);
        this.board[to.x][to.y].setFigure(fig);
    };
    //private helpers
    Board.prototype.switchTurn = function () {
        this.playerTurn = Side_1.Side.WHITE ? Side_1.Side.BLACK : Side_1.Side.WHITE;
    };
    Board.prototype.isEnemyFigure = function (figure) {
        return this.playerTurn != figure.side;
    };
    return Board;
}());
exports.Board = Board;
