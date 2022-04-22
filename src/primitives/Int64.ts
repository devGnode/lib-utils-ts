import {PrimitiveNumber} from "./PrimitiveNumber";
import {int64} from "./Globals";
import {Operator} from "./Operator";
import {Qword} from "./Qword";
/***
 * @to-do : js not supported 64 bits number natively
 * implement bigInt object in this Object ...
 */
export class Int64 extends PrimitiveNumber.Signed64 implements int64{

    constructor(value: Number = null) {
        super(value);
        this.assert();
    }

    public endian():Int64 {return Int64.mk(super.endian().valueOf())}

    public operators(): Operator<Int64> {return new Operator<Int64>(this);}

    public toUint64(): Qword {return Qword.mk(0);}

    public static mk(value: number = null): Int64 {return new Int64(value);}

    public static random(min: Int64 = null, max: Int64 = null): Int64 {
        return Int64.mk(Int64.mk(0).random(min, max).valueOf());
    }
}
Object.package(this);