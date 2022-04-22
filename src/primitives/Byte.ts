import {Operator} from "./Operator";
import {PrimitiveNumber} from "./PrimitiveNumber";
import {BYTE} from "./Globals";
import {Int8} from "./Int8";
import {Uint8} from "./Uint8";
/****
 * @Byte : Unsigned number, limit 0 < x >= 255
 * @IOException
 * @NumericOverflowException
 */
export class Byte extends PrimitiveNumber.Unsigned8 implements BYTE{

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
    public static mk(value:number=null):Byte{return new Byte(value);}
    /****
     *
     */
    public static random(min:  Byte = null, max:  Byte = null): Byte {
        return Byte.mk(Byte.mk(0).random(min, max).valueOf());
    }
}
Object.package(this);