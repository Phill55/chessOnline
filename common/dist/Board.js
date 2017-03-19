"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Philipp on 19.03.2017.
 */
var Figure_1 = require("./Figure");
var FigureType_1 = require("./FigureType");
var Field_1 = require("./Field");
var Side_1 = require("./Side");
/**
 * Created by Philipp on 19.03.2017.
 */
var Board = (function () {
    function Board() {
        this.WIDTH = 8;
        this.HEIGHT = 8;
    }
    Board.prototype.initGame = function () {
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
        return this.board[x][y];
    };
    Board.prototype.move = function (from, to) {
        if (this.isValidMove(from, to)) {
            var figure = this.board[from.x][from.y].getFigure();
            this.board[from.x][from.y].setFigure(null);
            this.board[to.x][to.y].setFigure(figure);
            return true;
        }
        return false;
    };
    Board.prototype.isValidMove = function (from, to) {
        if (from.x > this.WIDTH - 1 || from.x < 0 || to.x > this.WIDTH - 1 || to.x < 0 || from.y > this.HEIGHT - 1 || from.y < 0 || to.y > this.HEIGHT - 1 || to.y < 0) {
            return false;
        }
        var figure = this.board[from.x][from.y].getFigure();
        var validFields = [];
        if (figure.type == FigureType_1.FigureType.TOWER) {
            validFields = this.getValidTowerMoves(from);
        }
        //check if validFields contains to-Field
        console.log(validFields);
        for (var i = 0; i < validFields.length; i++) {
            if (validFields[i].equals(to))
                return true;
        }
        return true;
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
                validFields[validFields.length] = actField;
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
                validFields[validFields.length] = actField;
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
                validFields[validFields.length] = actField;
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
                validFields[validFields.length] = actField;
                break;
            }
        }
        return validFields;
    };
    Board.prototype.logBoard = function () {
        var print = "";
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
    return Board;
}());
exports.Board = Board;