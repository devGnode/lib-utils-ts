import {Constructor} from "../Constructor";
import {flombok} from "../flombok";
/***
 * @Functions : Proxy class, allow to extend the prototype
 * of the native Object. Dont forget to implement your
 * method in global interface ObjectConstructor, Location
 * of this interface is in Interfaces.ts
 */
export abstract class Functions extends Function{
    /***
     *
     */
    @flombok.ENUMERABLEFUNC(false)
    public class<T extends Object>(): Constructor<T>{return new Constructor<T>(this);}
}
Object.package(this);