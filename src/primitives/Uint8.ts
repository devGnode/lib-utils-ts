import {PrimitiveNumber} from "./PrimitiveNumber";
import {BYTE} from "./Globals";
import {Operator} from "./Operator";
import {Int8} from "./Int8";
import {Byte} from "./Byte";
/****
 * @Uint8 : Unsigned number, limit 0 < x >= 255
 * @IOException
 * @NumericOverflowException
 */
export class Uint8 extends PrimitiveNumber.Unsigned8 implements BYTE{

    constructor(value:Number=null) {
        super(value);
        this.assert();
    }
    /****
     *
     */
    public endian():Uint8{return Uint8.mk(super.endian().valueOf())}
    /****
     *
     */
    public operators( ):Operator<Uint8>{return new Operator<Uint8>(this);}
    /****
     *
     */
    public toInt8():Int8 {return Int8.mk((( this.valueOf() << 24 ) >> 24)); }
    /****
     *
     */
    public static mk(value:number=null):Uint8{return new Uint8(value);}
    /****
     *
     */
    public static random(min: Uint8 = null, max: Uint8 = null): Uint8 {
        return  Uint8.mk(Byte.mk(0).random(min, max).valueOf());
    }
}
Object.package(this);