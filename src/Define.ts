/***
 *
 */
import {IDefine} from "./Interface";
/***
 *
 */
export class Define<T> implements IDefine<T>{
    /***
     *
     */
    private readonly value : T = null;
    /***
     *
     * @param value
     */
    constructor(value : T) {this.value = value;}
    /***
     *
     */
    public isNullable(): boolean{ return this.isNull();}
    /***
     *
     */
    public isNull() : boolean{return this.value===null||this.value===undefined;}
    /***
     *
     * @param value
     */
    public orNull( value : T ): T{return this.isNull()?value:this.value;}
    /***
     *
     * @param exception
     */
    public orElseThrow( exception : Error|TypeError ): T{
        if( this.isNull() ) throw  exception;
        return this.value;
    }
    /***
     *
     */
    public getType( ){ return typeof this.value; }
    /***
     *
     */
    public valueOf( ):T{ return this.value; }
    /***
     *
     */
    public toString( ) :string{return String(this.value);}
    /***
     *
     * @param value
     */
    public static of<T>( value : T ): Define<T>{return new Define<T>(value);}
}