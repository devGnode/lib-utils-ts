import {Operator} from "./Operator";
import {PrimitiveNumber} from "./PrimitiveNumber";
import {DWORD} from "./Globals";
import {Float} from "./Float";
import {Word} from "./Word";
import {Int32} from "./Int32";
/***
 * @Dword
 * @IOException
 * @NumericOverflowException
 */
export class Dword extends PrimitiveNumber.Unsigned32 implements DWORD{

    constructor(value:Number=null) {
        super(value);
        this.assert();
    }

    public endian():Dword{return new Dword(super.endian().valueOf())}

    public operators( ):Operator<Dword>{return new Operator<Dword>(this);}

    public toInt32():Int32 {return Int32.mk(this.valueOf()&0xFFFFFFFF ); }

    public toFloat(): Float {
        let valueOf:number = this.valueOf(),
            signed:number  = ( valueOf >> 31 )&0x01,
            exp:number     = ( valueOf&0x7f800000 ) >> 23,
            mantis:number  = ( valueOf&0x7fffff);

        mantis = ( mantis / Math.pow( 2, 23 )) + 1;

        return Float.mk( (signed === 1 ? -signed : 1 ) * mantis *  Math.pow(2, exp-127 ) );
    }

    public static mk(value:number=null):Dword{return new Dword(value);}

    public static random(min: Dword = null, max: Dword = null): Dword {
        return Dword.mk(Word.mk(0).random(min, max).valueOf());
    }
}
Object.package(this);