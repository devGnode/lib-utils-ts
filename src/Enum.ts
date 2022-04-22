import {ClassNotFoundException} from "./Exception";
import {Objects} from "./type/Objects";
import {Optional} from "./utils/Optional";
import {Comparators} from "./Comparators";
import {AnnotationTarget} from "./annotation/Interfaces";
import {EnumBuilder} from "./annotation/EnumBuilder";
import {Field} from "./Reflect/Field";
/***
 * @AbstractClassEnum
 */
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
    public static set<T extends Enum>(annotation: AnnotationTarget<Field>, args:Object[]):T{
        let o:Object = annotation.getReflector().getDeclaringConstructor().newInstance(...args);
        (<Enum>o).enum          =   annotation.getProperty();
        (<Enum>o).ordinalValue  =   annotation.getReflector().getDeclaringConstructor().getEnumConstants().length;
        return <T>o;
    }
    /***
     * @valueOf
     * @throws ClassNotFoundException
     */
    public static valueOf<T extends Enum>(value:string):T{
        let enumF:T[];

        if( ( enumF = this.class<T>()
            .getEnumConstants()
            .filter(v=>v.name().equals(value))
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
    public static args<T extends Enum>( ...args:Object[] ):any{return EnumBuilder.enums(...args);}
}
Object.package(this);

