/****
 * Really simply basic class
 */
import {int} from "./Interface";

export class Random {
    constructor() {}

    public nextDouble( a: number = 100, b : number = 0  ):int{return (Math.random()*a)+b;}

    public nextInt( a: number = 100, b: number = 0 ):int{return Math.floor(this.nextDouble(a,b));}
}