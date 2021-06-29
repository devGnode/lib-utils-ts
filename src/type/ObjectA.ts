import { HashMap} from "../List";
import {Define} from "../Define";
import {NullPointerException} from "../Exception";
import {comparator, PrimitiveTypes} from "../Interface";
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
    public static toString( o :Object):string { return !Object.isNull(o) ? o.toString() : null; }
    /***
     * @toString :
     */
    @flombok.ENUMERABLEFUNC(false)
    public static compare(o1: Object, o2: Object): number {
        if(Object.isNull(o1)&&Object.isNull(o2)) return 0;
        return !ObjectA.equals(o1, o2) ? 0 : 1;
    }
    /****
     *  @equals : this method check equality between 2 objects
     *  integrity between 2 object should have same constructor.
     *  because o1 == o2 return false, same if it share same prototype
     *
     * @param o1
     * @param o2
     */
    @flombok.ENUMERABLEFUNC(false)
    public static equals( o1: Object, o2:Object ):boolean{
        if(Object.isNull(o1)&&Object.isNull(o2)) return true;
        return o1.constructor === o2.constructor &&
            o1.constructor.prototype === o2.constructor.prototype &&
            o1.constructor.name === o2.constructor.name;
    }

    public static typeof( o: Object ):PrimitiveTypes{
        return <PrimitiveTypes>typeof o;
    }
    /****
     * @deepEquals : This method will check properties of an object only.
     *  If are both is null, it will return true. If one property of o1
     *  is different to o2 property, it will return false.
     *
     * @param o1
     * @param o2
     */
    @flombok.ENUMERABLEFUNC(false)
    public static deepEquals( o1: Object, o2:Object ):boolean{
       let p:string, q:string;

       if(Object.equals(o1, o2)) {
           let tmp: string;
           for (tmp in o1) {
               p = Object.typeof(o1[tmp]);
               q = Object.typeof(o2[tmp]);

               if(p.equals("object")&&q.equals("object")){
                   if(!ObjectA.deepEquals(o1[tmp],o2[tmp])) return false;
               }
               else if(p.equals("function")&&q.equals("function")) void 0;
               else if (!Object.typeof(o1[tmp]).equals("function") && !Object.typeof(o1[tmp]).equals("object")) {
                   if (o1[tmp] !== o2[tmp]) return false;
               }else {
                   return false;
               }
           }
           return true;
       }
       return false;
    }
}