import {define} from "./Interface";
import {Optional} from "./utils/Optional";
/***
 * @class Define<T>
 * @extends Optional<T>
 * @interface define<T>
 * Check nullable value
 * isNull return true when obj is equals to undefined or null
 * older class v1.0.0, before Optional implementation,
 * stay here for upward compatibility of my dev.
 */
export class Define<T> extends Optional<T> implements define<T>{
    /***
     *
     * @param value
     */
    constructor(value : T) { super(value); }
    /***@deprecated*/
    public isNullable(): boolean{ return this.isNull();}
    /***
     *
     */
    public isNull(): boolean{return !super.isPresent();}
    /***
     *
     * @param value
     */
    public orNull( value : T ): T{return super.orElse(value); }
    /***
     *
     */
    public orThrow( exception : Error ): Define<T>{
        if(this.isNull()) this.orElseThrow(exception);
        return this;
    }
    /***
     */
    public getType( ):string{ return typeof this.value; }
    /***
     */
    public valueOf( ):T{ return this.value; }
    /***
     */
    public toString( ) :string{return this.value.toString(); }
    /***
     */
    public static of<T>( value : T ): Define<T>{return new Define<T>(value);}
}
Object.package(this);