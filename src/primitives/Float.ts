import {Operator} from "./Operator";
import {PrimitiveNumber} from "./PrimitiveNumber";
import {float} from "./Globals";
import {Uint32} from "./Uint32";
import {Int32} from "./Int32";
/***
 * @Float
 */
export class Float extends PrimitiveNumber.Float32 implements float{

    constructor(value:Number=null) {
        super(value);
        this.assert();
    }

    public endian():Float {return this.toUint32().endian().toFloat();}

    public operators( ):Operator<Float>{return new Operator<Float>(this);}

    public toUint32():Uint32 {
        let valueOf:number = this.valueOf(),
            signed:number = Math.abs( (valueOf<0?1:0) << 31 ),
            i:number = 0, j:number = 0,
            exp:number, mantis:number;

        if(this.valueOf().equals(0))return Uint32.mk(0);
        valueOf = Math.abs(valueOf);
        while(true){
            j = valueOf>=1?i:-i;
            if(Math.floor( exp = valueOf/Math.pow(2, j)) === 1 && Math.pow( 2, j)*exp === valueOf) break;
            i++;
        }
        mantis = (exp-Math.floor(exp)) * Math.pow(2,23);

        return Uint32.mk( signed + ( ( 127 + j ) << 23 ) + Math.floor(mantis) );
    }

    public toString(radix?: number): string {return this.toUint32().toString(radix);}

    public static mk(value:number=null):Float{return new Float(value);}

    public static random(min: Float = null, max: Float = null): Float {
        return Float.mk(Int32.mk(0).random(min, max).valueOf());
    }
}
Object.package(this);