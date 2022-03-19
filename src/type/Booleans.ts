import {flombok} from "../flombok";

/***
 * @Booleans Proxy class, allow to extend the prototype of the native Object.
 * Dont forget to implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 */
import {comparable, comparator} from "../Interface";

export abstract class Booleans extends Boolean implements comparator<boolean>, comparable<boolean>{
    /***
     *
     */
    @flombok.ENUMERABLEFUNC(false)
    public state(  expectTrue : any, orElse : any ) : any {return this.valueOf()? expectTrue : orElse;}
    /***
     *
     */
    public compareTo(obj: boolean): number {return this.compare(this.valueOf(),obj);}
    /***
     *
     */
    public static compare(o1: boolean, o2: boolean): number {return o1 === o2 ? 0  : ( o1? 1 : -1 )}
    /***
     *
     */
    public static of(  value : Object ) : boolean {return value===true||value === "true"||value===1;}
}
Object.package(this);