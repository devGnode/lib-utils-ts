import {ClassNotFoundException} from "./Exception";
import {Objects} from "./type/Objects";
import {Optional} from "./Optional";
import {DecoratorImpl} from "./decorator/DecoratorImpl";
import {DecoratorAttributes} from "./decorator/DecoratorAttributes";
import {Comparators} from "./Comparators";
/***
 * @AbstractClassEnum
 */
import {Func} from "./Interface";
export interface AttributeProperties<T> {
    setEnumerable(state:boolean):AttributeProperties<T>
    setWrite(state:boolean):AttributeProperties<T>
    setConfigurable(state:boolean):AttributeProperties<T>
    setValue(value:T):AttributeProperties<T>
    readOnly():AttributeProperties<T>
    final():AttributeProperties<T>
    propertyName(consumer:Func<string, string>):AttributeProperties<T>
    setMethod(value:Function):AttributeProperties<T>
    getSink():any
}
export abstract class Enum{
    /***
     *
     */
    private enum:string;
    /***/
    private ordinalValue:number;
    /***
     *  @Enum<T> : create a new object
     */
    private static getInstance<T>(enumName:string, target:Function, args:Object[]):T{
        let o:Object = target.class<T>().newInstance.apply(target.class<T>(),args);
        (<Enum>o).enum          =   enumName;
        (<Enum>o).ordinalValue  =   target.class<T>().getStaticEntries().length;
        return <T>o;
    }
    /***
     * @valueOf
     * @throws ClassNotFoundException
     */
    public static valueOf<T>(value:string):T{
        let enumF:T[];

        if( ( enumF = this.class<T>()
            .getEnumConstants()
            .filter(v=>v.toString().equals(value))
            ).length === 0 )
            throw new ClassNotFoundException(`Enum.ValueOf : Unknown Enumeration '${value}', not definition.`);

        return enumF[0];
    }
    /***
     *
     */
    public static values<T>():T[]{return this.class<T>().getEnumConstants();}
    /***
     *
     */
    public ordinal():number{return this.ordinalValue;}
    /***
     *
     */
    public name():string{ return this.enum; }
    /***/
    public compareTo(enumeration:Enum):number{ return Comparators.naturalOrder.compare(this.ordinalValue,enumeration.ordinal()); }
    /***
     * @override
     */
    public equals(o:Object):boolean{
        if(typeof o === "string") return this.enum.equals(String(o));
        if(!( o instanceof Enum))return false;
        if(this==o) return  true;
        return Objects.deepEquals(this,o) && this.enum === (<Enum>o).enum;
    }
    /***
     * @override
     */
    public toString():string{ return Optional.ofNullable(this.enum).orElse(Objects.toString(this)); }
    /***
     * @decorationHandler
     * @args ... args: Object[]
     */
    public static args<T extends Object>( ...args:Object[] ):any{
        return DecoratorImpl
            .attributeDecoratorPipe<T>(DecoratorAttributes.empty<T>().setEnumerable(true).setDecorator("ENUM").final())
            .get((prop:AttributeProperties<T>,target:any,key:string) => prop.setValue(Enum.getInstance<T>(key,target,Array.from(args))));
    }
}
Object.package(this);

