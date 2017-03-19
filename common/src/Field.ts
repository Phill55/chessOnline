import {Figure} from "./Figure";
/**
 * Created by Philipp on 19.03.2017.
 */
export class Field {

    x: number;
    y: number;
    figure: Figure;


    constructor(x: number, y: number) {
        this.x= x;
        this.y = y;
    }


    isEmpty() {
        return this.figure == null;
    }

    setFigure(figure : Figure) {
        this.figure = figure;
    }

    getFigure() {
        return this.figure;
    }

    equals(other : Field) {
        if (this.x == other.x && this.y == other.y) return true;
        return false;
    }


}