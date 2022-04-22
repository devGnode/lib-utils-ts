import {PrimitiveNumber} from "./PrimitiveNumber";
import {Operator} from "./Operator";
import {int16} from "./Globals";
import {Uint16} from "./Uint16";
/****
 * @Int16
 * @IOException
 * @NumericOverflowException
 */
export class Int16 extends PrimitiveNumber.Signed16 implements int16{
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
    public endian():Int16{return new Int16(super.endian().valueOf());}
    /****
     *
     */
    public operators( ):Operator<Int16>{return new Operator<Int16>(this);}
    /****
     *
     */
    public toUint16():Uint16 {return new Uint16(this.valueOf()&0xffff); }
    /****
     *
     */
    public static mk(value:number=null):Int16{return new Int16(value);}
    /****
     *
     */
    public static random(min: Int16 = null, max:Int16 = null): Int16 {
        return Int16.mk(Int16.mk(0).random(min, max).valueOf());
    }
}
Object.package(this);