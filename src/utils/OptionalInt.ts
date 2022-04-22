import {supplier} from "../Interface";
/***
 * @OptionalInt
 */
export class OptionalInt {
    /**
     */
    private static readonly EMPTY = new OptionalInt(void 0);
    /**
     */
    private readonly present:boolean;
    private readonly value:number;

    protected constructor(value:number) {
        this.value = value;
        this.present =  this.value!==null&&this.value!==undefined;
    }
    /***
     * @isPresent
     */
    public isPresent():boolean{return this.present;}
    /***
     * @getAsInt
     */
    public getAsInt():number{return Math.round(this.value);}
    /***
     * @getAsDouble
     */
    public getAsDouble():number{ return this.value;}
    /***
     * @orElse
     */
    public orElse(other:number):number{return this.present ? this.value : other;}
    /***
     * @orElseThrow
     */
    public orElseThrow<X extends Error>(supplier:supplier<X>):number|Error{return this.present ? this.value : supplier.get();}
    /***
     * @of
     */
    public static of(value:number):OptionalInt{return new OptionalInt(value);}
    /***
     * @empty
     */
    public static empty():OptionalInt{return OptionalInt.EMPTY;}
    /***
     * @equals
     */
    public equals( obj:Object ):boolean{
        if( this == obj ) return true;
        if( !( obj instanceof OptionalInt ) )return false;
        return this.present && obj.isPresent() ?
            this.value == obj.getAsInt() : this.present == obj.isPresent();
    }
    /***
     * @toString
     * @override
     */
    public toString( ):string{
        return this.present ? `OptionalInt[${this.value}]` : "Optional.empty";
    }
}
Object.package(this);