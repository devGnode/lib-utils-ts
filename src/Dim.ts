
interface dimension2d {
    getHeight():number
    getWidth():number
    setSize(dimension2D : dimension2d):void
    setSize(width:number,height:number):void
}

export abstract class Dimension2D implements dimension2d{

    protected constructor() {}

    getHeight(): number {
        return 0;
    }

    getWidth(): number {
        return 0;
    }

    setSize(dimension2D: dimension2d): void;
    setSize(width: number, height: number): void;
    setSize(dimension2D: dimension2d | number, height?: number): void {
    }
}

export class Dimension extends Dimension2D {

    constructor() {
        super();
    }
}