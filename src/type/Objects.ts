import {NullPointerException} from "../Exception";
import {comparator, PrimitiveTypes, Serial} from "../Interface";
import {flombok} from "../flombok";
import {Arrays} from "./Arrays";
/***
 * @Objects : Proxy class, allow to extend the prototype of the native Object.
 * Dont forget to implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 *
 */
export abstract class Objects extends Object implements comparator<Object>{
    /***
     * @SERIAL_CST
     */
    private static SERIAL_CST:number =  0x01 >>> 1;
    /***
     * @ObjectAttribute
     */
    public static ObjectAttributes = class ObjectAttribute<T> implements PropertyDescriptor {
        enumerable?: boolean;
        writable?: boolean;
        configurable?: boolean;
        value?: T;

        constructor(enumerable: boolean = true, writable: boolean = true, configurable: boolean = true, value: T = null) {
            this.enumerable = enumerable;
            this.writable = writable;
            this.configurable = configurable;
            if (!Objects.isNull(value)) this.value = value;
        }

        get?(): T;

        set?(v: T): void;

    };
    /***
     * @equals: condition check integrity of constructor & prototype of an Object.
     * This method will be override for Boolean, Number, String.
     */
    @flombok.ENUMERABLEFUNC(false)
    public equals(object:Object):boolean{ return Objects.equals(this,object); }
    /***
     * @nonNull : remove all null value un a object
     */
    /***@toFix*/
    @flombok.ENUMERABLEFUNC(false)
    public static nonNull(obj:Object):boolean{
        return obj != null;
    }
    /***
     * @requireNotNull<T> :
     */
   // @flombok.ENUMERABLEFUNC(false)
    public static requireNotNull<T>( other: T, message?: string ) :T {
        if(!Objects.isNull(other))return other;
        throw new NullPointerException(message||'');
    }
    /***
     * @isNull
     */
    @flombok.ENUMERABLEFUNC(false)
    public static isNull( value : Object ):boolean { return value===null||value===undefined; }
    /***
     * @toString :
     */
    @flombok.ENUMERABLEFUNC(false)
    public static toString( o :Object ):string {
        if(Objects.isNull(o)) return "NULL";
        if(!Objects.typeof(o).equals("function"))
        return o.getClass().getFullName() + "@"+ o.hash().toString(16);
    }
    /***
     * @hash :
     * @test
     *  This Hash allows to trace all objects,
     *  but is not an unique number.
     */
   // @flombok.ENUMERABLEFUNC(false)
    public static hash(  ):number{
        if(Objects.isNull((<Serial>this).__serial__)){
            let randSerial:number = new Date().getTime() + (Objects.SERIAL_CST = (Objects.SERIAL_CST+1)%65536) * 549755813888;
            Object.defineProperty(this,"__serial__",new Objects.ObjectAttributes<number>(false,false,false,randSerial));
            return randSerial;
        }
        return (<Serial>this).__serial__;
    }
    /***
     * @toString :
     */
    @flombok.ENUMERABLEFUNC(false)
    public static compare(o1: Object, o2: Object): number {
        if(Objects.isNull(o1)&&Objects.isNull(o2)) return 0;
        return Objects.equals(o1, o2) ? 0 : 1;
    }
    /****
     *  @equals : this method check equality between 2 objects
     *  integrity between 2 object should have same constructor.
     *  because o1 == o2 return false, same if it share same prototype
     *  JS :
     *  new X( 5 ) == new X( 5 ) ==> false
     *
     * @param o1
     * @param o2
     */
    @flombok.ENUMERABLEFUNC(false)
    public static equals( o1: Object, o2:Object ):boolean{
        if(Objects.isNull(o1)&&Objects.isNull(o2)) return true;
        if(Objects.isNull(o1)||Objects.isNull(o2)) return false;
        return o1 === o2;
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

        if(Objects.isNull(o1)&&Objects.isNull(o2)) return true;
        if(Objects.isNull(o1)||Objects.isNull(o2)) return false;

        let t1:string[] = o1.getClass().getStaticEntries();
        let t2:string[] = o2.getClass().getStaticEntries();
        if(!Arrays.equals(t1,t2))return false;

        let tmp: string;
        for (tmp of t1) {
            p = Objects.typeof((<any>o1)[tmp]);
            q = Objects.typeof((<any>o2)[tmp]);

            if (p.equals("object") && q.equals("object")) {
                if (!Objects.deepEquals((<any>o1)[tmp], (<any>o2)[tmp])) return false;
            } else if (!Objects.typeof((<any>o1)[tmp]).equals("function") && !Objects.typeof((<any>o1)[tmp]).equals("object")) {
                if ((<any>o1)[tmp] !== (<any>o2)[tmp]) return false;
            } else if(p.equals("function") && q.equals("function")) void 0;
            else {
                return false;
            }
        }
        return true;
    }
}
Object.package(this);