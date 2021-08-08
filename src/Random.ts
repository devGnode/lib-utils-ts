/****
 * Really simply basic class
 */
import {double, int} from "./Interface";

export class Random {
    constructor() {}
    /**
     @deprecated
     */
    public nextDouble( a: number = 100, b : number = 0  ):double{return (Math.random()*b)+a;}

    public static nextDouble( a: number = 100, b : number = 0  ):double{return (Math.random()*b)+a;}
    /**
     @deprecated
     */
    public nextInt( a: number = 100, b: number = 0 ):int{return Math.floor(this.nextDouble(a,b));}

    public static nextInt( a: number = 100, b: number = 0 ):int{return Math.floor(Random.nextDouble(a,b));}
}