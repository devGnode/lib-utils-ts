import {Constructor} from "../Constructor";

export abstract class FunctionA extends Function{
    /***
     *
     */
    public class<T extends Object>(): Constructor<T>{return new Constructor<T>(this);}
}
Object.defineProperty(FunctionA.prototype,"class",{enumerable: false, writable: true, configurable: true});