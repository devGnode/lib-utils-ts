import {Int32} from "./Int32";
import {Operator} from "./Operator";
import {PrimitiveNumber} from "./PrimitiveNumber";
import {DWORD} from "./Globals";
import {Dword} from "./Dword";
import {Float} from "./Float";
/***
 * @Uint32
 * @IOException
 * @NumericOverflowException
 */
export class Uint32 extends PrimitiveNumber.Unsigned32 implements DWORD{

    constructor(value:Number=null) {
        super(value);
        this.assert();
    }

    public endian():Uint32{return new Uint32(super.endian().valueOf())}

    public operators( ):Operator<Uint32>{return new Operator<Uint32>(this);}

    public toInt32():Int32 {return Int32.mk(this.valueOf()&0xFFFFFFFF ); }

    public toFloat(): Float { return Dword.mk(this.valueOf()).toFloat(); }

    public static mk(value:number=null):Uint32 {return new Uint32(value);}

    public static random(min: Uint32 = null, max: Uint32 = null): Uint32 {
        return Uint32.mk(Dword.mk(0).random(min, max).valueOf());
    }
}
Object.package(this);