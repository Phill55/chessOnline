"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Philipp on 19.03.2017.
 */
var Field = (function () {
    function Field(x, y) {
        this.x = x;
        this.y = y;
    }
    Field.prototype.isEmpty = function () {
        return this.figure == null;
    };
    Field.prototype.setFigure = function (figure) {
        this.figure = figure;
    };
    Field.prototype.getFigure = function () {
        return this.figure;
    };
    Field.prototype.equals = function (other) {
        if (this.x == other.x && this.y == other.y)
            return true;
        return false;
    };
    return Field;
}());
exports.Field = Field;
