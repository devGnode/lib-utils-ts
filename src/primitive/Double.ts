import {PrimitiveNumber} from "./PrimitiveNumber";
import {Operator} from "./Operator";
import {double, QWORD} from "./Globals";
import {Qword} from "./Qword";

export class Double extends PrimitiveNumber.Unsigned64 implements double{

    constructor(value: Number = null) {
        super(value);
        this.orThrow();
    }

    public endian(): Double {return Double.mk(super.endian().valueOf())}

    public operators(): Operator<Double> {return new Operator<Double>(this);}

    public toQword( ):QWORD{
        let bit:number = (this.valueOf()<0?1:0)*Math.pow(2,63),
            exp:number,i:number = 0,j:number = 0, mantis:number,
            tmp:number = this.valueOf();

        if(this.valueOf().equals(0))return Qword.mk(0);
        tmp = Math.abs(tmp);
        while ( true ){
            j = tmp>=1?i:-i;
            if(Math.floor( exp = tmp/Math.pow( 2, j))===1)break;
            i++;
        }

        mantis = Math.round( (exp - Math.floor(exp))* (Math.pow( 2, 51)) );

        return Qword.mk(bit + ((1023+j)*Math.pow(2,52)) + mantis );
    }

    public static mk(value: number = null): Double {return new Double(value);}

    public static random(min: Double = null, max: Double = null): Double {
        return Double.mk(Double.mk(0).random(min, max).valueOf());
    }
}