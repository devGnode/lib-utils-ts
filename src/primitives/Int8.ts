import {PrimitiveNumber} from "./PrimitiveNumber";
import {int8} from "./Globals";
import {Operator} from "./Operator";
import {Uint8} from "./Uint8";
/****
 * @Int8 Signed number, limit -128 < x >= 127
 * @IOException
 * @NumericOverflowException
 */
export class Int8 extends PrimitiveNumber.Signed8 implements int8{

    constructor(value:Number=null) {
        super(value);
        this.assert();
    }
    /****
     *
     */
    public endian():Int8{return new Int8(super.endian().valueOf())}
    /****
     *
     */
    public operators( ):Operator<Int8>{return new Operator<Int8>(this);}
    /****
     *
     */
    public toUint8(): Uint8 {return new Uint8(this.valueOf()&0xff);}
    /****
     *
     */
    public static mk(value:number=null):Int8{return new Int8(value);}
    /****
     *
     */
    public static random(min: Int8 = null, max: Int8 = null): Int8 {
        return Int8.mk(Int8.mk(0).random(min, max).valueOf());
    }
}
Object.package(this);