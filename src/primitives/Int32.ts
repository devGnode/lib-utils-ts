import {Operator} from "./Operator";
import {PrimitiveNumber} from "./PrimitiveNumber";
import {int32} from "./Globals";
import {Uint32} from "./Uint32";
import {Convert} from "./Convert";
/***
 * @Int32
 * @IOException
 * @NumericOverflowException
 */
export class Int32 extends PrimitiveNumber.Signed32 implements int32{

    constructor(value:Number=null) {
        super(value);
        this.assert();
    }

    public endian():Int32{return new Int32(super.endian().valueOf())}

    public operators( ):Operator<Int32>{return new Operator<Int32>(this);}

    public toUint32():Uint32 {
        return Uint32.mk(Convert.arrayToNumber( PrimitiveNumber.slice32(this.valueOf()) ));
    }

    public static mk(value:number=null):Int32{return new Int32(value);}

    public static random(min: Int32 = null, max: Int32 = null): Int32 {
        return Int32.mk(Int32.mk(0).random(min, max).valueOf());
    }
}
Object.package(this);