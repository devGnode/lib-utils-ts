import {PrimitiveNumber} from "./PrimitiveNumber";
import {QWORD} from "./Globals";
import {Operator} from "./Operator";
import {Double} from "./Double";
import {Int64} from "./Int64";

export class Qword extends PrimitiveNumber.Unsigned64 implements QWORD{

    constructor(value: Number = null) {
        super(value);
        this.assert();
    }

    public endian(): Qword {return Qword.mk(super.endian().valueOf())}

    public operators(): Operator<Qword> {return new Operator<Qword>(this);}

    public toInt64(): Int64 {return new Int64(0);}

    public toDouble(  ):Double{
        let value:number    = this.valueOf(),
            signed:number   = (value/Math.pow( 2, 63))&0x01,
            exp:number      = Math.floor(value/Math.pow( 2, 52))&0x7ff,
            mantis:number   = Math.floor(value-(exp*Math.pow( 2, 52))-(signed*Math.pow( 2, 63)));

        signed = signed.equals(1) ? -signed : 1;
        let k:number = (mantis/Math.pow( 2, 51))+1;

        return Double.mk(signed*k*Math.pow( 2, exp-1023));
    }

    public static mk(value: number = null): Qword {return new Qword(value);}

    public static random(min: Qword = null, max: Qword = null): Qword {
        return Qword.mk(Qword.mk(0).random(min, max).valueOf());
    }
}
Object.package(this);