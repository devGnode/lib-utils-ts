console.log("DOWN globalUtils-25")
import {Constructor} from "../Constructor";
console.log("DOWN globalUtils-25")
import {flombok} from "../flombok";
/***
 * @FunctionA : Proxy class, allow to extend the prototype of the native Object.
 * Dont forget to implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 */
export abstract class FunctionA extends Function{
    /***
     *
     */
    @flombok.ENUMERABLEFUNC(false)
    public class<T extends Object>(): Constructor<T>{return new Constructor<T>(this);}
}