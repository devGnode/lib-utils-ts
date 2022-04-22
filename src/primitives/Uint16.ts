import {PrimitiveNumber} from "./PrimitiveNumber";
import {WORD} from "./Globals";
import {Operator} from "./Operator";
import {Int16} from "./Int16";
import {Word} from "./Word";
/****
 * @Uint16
 * @IOException
 * @NumericOverflowException
 */
export class Uint16 extends PrimitiveNumber.Unsigned16 implements WORD{
    /****
     *
     */
    constructor(value:Number=null) {
        super(value);
        this.assert();
    }
    /****
     *
     */
    public endian():Uint16{return new Uint16(super.endian().valueOf())}
    /****
     *
     */
    public operators( ):Operator<Uint16>{return new Operator<Uint16>(this);}
    /****
     *
     */
    public toInt16():Int16 {return new Int16(( this.valueOf() << 16 ) >> 16 ); }
    /****
     *
     */
    public static mk(value:number=null):Uint16{return new Uint16(value);}
    /****
     *
     */
    public static random(min: Uint16 = null, max: Uint16  = null): Uint16 {
        return Uint16.mk(Word.mk(0).random(min, max).valueOf());
    }
}
Object.package(this);