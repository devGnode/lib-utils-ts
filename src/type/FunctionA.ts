import {Constructor} from "../Constructor";
/***
 * @FunctionA : Proxy class, allow to extend the prototype of the native Object.
 * Dont forget to implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 */
export abstract class FunctionA extends Function{
    /***
     *
     */
    public class<T extends Object>(): Constructor<T>{return new Constructor<T>(this);}
}
Object.defineProperty(FunctionA.prototype,"class",{enumerable: false, writable: true, configurable: true});