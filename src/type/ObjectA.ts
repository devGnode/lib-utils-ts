import {HashMap} from "../List";
import {Define} from "../Define";
import {NullPointerException} from "../Exception";
import {comparator} from "../Interface";
import {flombok} from "../flombok";
/***
 * @ObjectA : Proxy class, allow to extend the prototype of the native Object.
 * Dont forget to implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 *
 */
export abstract class ObjectA extends Object implements comparator<Object>{
    /***
     * @equals: condition check integrity of constructor & prototype of an Object.
     * This method will be override for Boolean, Number, String.
     */
    @flombok.ENUMERABLEFUNC(false)
    public equals(object:Object):boolean{ return ObjectA.equals(this,object); }
    /***
     * @nonNull : remove all null value un a object
     */
    @flombok.ENUMERABLEFUNC(false)
    public static nonNull(obj:Object):boolean{
        return HashMap.of<string,Object>(obj)
            .stream()
            .anyMatch(value=> value !== null && value !== undefined );
    }
    /***
     * @requireNotNull<T> :
     */
    @flombok.ENUMERABLEFUNC(false)
    public static requireNotNull<T>( other: T, message?: string ) :T { return Define.of<T>(other).orElseThrow(new NullPointerException(message||'')); }
    /***
     * @isNull
     */
    @flombok.ENUMERABLEFUNC(false)
    public static isNull( value : Object):boolean { return Define.of<Object>(value).isNull(); }
    /***
     * @toString :
     */
    @flombok.ENUMERABLEFUNC(false)
    public static toString( o :Object):string { console.log( o); return !Define.of(o).isNull() ? o.toString() : null; }
    /***
     * @toString :
     */
    @flombok.ENUMERABLEFUNC(false)
    public static compare(o1: Object, o2: Object): number {
        if(Define.of(o1).isNull()&&Define.of(o2).isNull()) return 0;
        return !ObjectA.equals(o1, o2) ? 0 : 1;
    }
    /****
     *  @equals : this method check equality between 2 objects
     *  integrity between 2 object should have same constructor
     * @param o1
     * @param o2
     */
    @flombok.ENUMERABLEFUNC(false)
    public static equals( o1: Object, o2:Object ):boolean{
        if(Define.of(o1).isNull()&&Define.of(o2).isNull()) return true;
        return o1.constructor === o2.constructor &&
            o1.constructor.prototype === o2.constructor.prototype &&
            o1.constructor.name === o2.constructor.name;
    }
    /****
     * @deepEquals
     * @param o1
     * @param o2
     */
    @flombok.ENUMERABLEFUNC(false)
    public static deepEquals( o1: Object, o2:Object ):boolean{
       if(Object.equals(o1, o2)) {
           let tmp: string;
           for (tmp in o1) {
               if(( typeof o1[tmp] !== "function" && typeof o2[tmp] === "function") || typeof o1[tmp] === "function" && typeof o2[tmp] !== "function" ) return false;
               else if (typeof o1[tmp] !== "function" && typeof o2[tmp] !== "function") {
                   if (o1[tmp] !== o2[tmp]) return false;
               }
               if( typeof o1[tmp]!=="object"&&typeof o1[tmp]==="object"||typeof o1[tmp]==="object"&&typeof o1[tmp]!=="object" ) return false;
               else if(typeof o1[tmp]==="object"&&typeof o1[tmp]==="object") ObjectA.deepEquals(o1[tmp],o2[tmp]);
               // other
           }
           return true;
       }
       return false;
    }
}