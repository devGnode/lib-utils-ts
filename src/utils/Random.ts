import {double, int} from "../Interface";

export class Random {
    constructor() {}
    /**
     @deprecated (end - start + 1) + start
     */
    public nextDouble( a: number = 100, b : number = 0  ):double{return Math.random() * ( a - b + 1 ) + b;}

    public static nextDouble( a: number = 100, b : number = 0  ):double{return Math.random() * ( a - b + 1 ) + b ;}
    /**
     @deprecated
     */
    public nextInt( a: number = 100, b: number = 0 ):int{return Math.floor(this.nextDouble(a,b));}

    public static nextInt( a: number = 100, b: number = 0 ):int{return Math.floor(Random.nextDouble(a,b));}
}
Object.package(this);