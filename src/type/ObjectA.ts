import {HashMap} from "../List";
import {Define} from "../Define";
import {NullPointerException} from "../Exception";

export abstract class ObjectA extends Object{
    /***
     *
     */
    public equals(object:Object):boolean{ return this.constructor === object.constructor && (<any>this).prototype === (<any>object).prototype; }
    /***
     *
     */
    public static nonNull(obj:Object):boolean{
        return HashMap.of<string,Object>(obj)
            .stream()
            .anyMatch(value=> value !== null && value !== undefined );
    }
    /***
     *
     */
    public static requireNotNull<T>( other: T, message?: string ) :T { return Define.of<T>(other).orElseThrow(new NullPointerException(message||'')); }
    /***
     *
     */
    public static isNull( value : Object):boolean { return Define.of<Object>(value).isNull(); }
    /***
     *
     */
    public static toString( o :Object):string { return  o !== null ? o.toString() : null; }
}

Object.defineProperty(ObjectA,"toString",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(ObjectA.prototype,"getClass",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(ObjectA.prototype,"equals",{enumerable: false, writable: true, configurable: true});