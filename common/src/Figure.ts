import {FigureType} from "./FigureType";
import {Field} from "./Field";
import {Side} from "./Side";

export class Figure {
    x: number;
    y: number;
    type : FigureType;
    field : Field;
    side : Side;
    hasMoved : boolean;


    constructor(x: number,y:number,type:FigureType,field:Field,side : Side) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.field = field;
        this.side = side;
        this.hasMoved = false;
    }



}

