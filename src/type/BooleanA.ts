import {flombok} from "../flombok";

/***
 * @BooleanA Proxy class, allow to extend the prototype of the native Object.
 * Dont forget to implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 */
export abstract class BooleanA extends Boolean{
    /***
     *
     */
    @flombok.ENUMERABLEFUNC(false)
    public state(  expectTrue : any, orElse : any ) : any {return this.valueOf()? expectTrue : orElse;}
    /***
     *
     */
    public static of(  value : Object ) : boolean {return value===true||value === "true"||value===1;}
}