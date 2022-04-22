import {Enum} from "../Enum";
import {Random} from "./Random";

class Type extends Enum{

    @Enum.args()
    static readonly ALPHANUMERIC;

    @Enum.args()
    static readonly NUMERIC;

    @Enum.args()
    static readonly ALPHA;

    @Enum.args()
    static readonly HEX;

    protected constructor() {super();}

    private hex( ):string{ return this.numeric()+this.alpha().substring(0,6); }

    private numeric( begin:string = null ):string{
        let out:string[] = [];
        for(let i = 0; i < 9; i++) out[i] = String.fromCharCode(48+i);
        return (begin!=null?begin:"")+out.join("");
    }

    private alpha( begin:string = null ):string{
        let out:string[] = [];
        for(let i = 0; i < 26; i++) out[i] = String.fromCharCode(97+i);
        for(let i = 0; i < 26; i++) out[26+i] = String.fromCharCode(65+i);
        return (begin!=null?begin:"")+out.join("");
    }

    public toString(): string {
        switch (this) {
            case Type.ALPHA: return this.alpha();
            case Type.NUMERIC: return this.numeric();
            case Type.HEX: return this.hex();
            case Type.ALPHANUMERIC:
            default:
                return this.alpha(this.numeric());
        }
    }
}

export abstract class RandString {
    private constructor() {}

    public static readonly Type = Type;

    public static rand(length:number, type:Type ):string{
            let symbols:string = type.toString(), out:string[] = [];
            do{}while ( out.length < length && (out[out.length]=symbols[Random.nextInt(0,symbols.length)]) );
            return out.join("");
    }

    public static numeric( length: number ):string{return this.rand(length, Type.NUMERIC );}

    public static alpha( length: number ):string{return this.rand(length, Type.ALPHA );}

    public static alphaNumeric( length: number ):string{return this.rand(length, Type.ALPHANUMERIC );}

    public static hex( length: number ):string{return this.rand(length, Type.HEX ); }
    /***
     * Pattern :
     *  %a  : alpha
     *  %n  : numeric
     *  %h  : hex
     *  %s  : alpha-numric
     *  {}  : size
     *  %h{4}-%s-%a{5} => c1c1-j-dGSXP
     * @param {string} pattern
     * @return {string}
     */
    public static pattern(pattern:string):string{
        return pattern.regExp(/(\%(a|n|h|s)?(\{(\d+)\}|))/gi, function () {
            if(this[2]=="a") return RandString.alpha(parseInt(this[4])||1);
            if(this[2]=="n") return RandString.numeric(parseInt(this[4])||1);
            if(this[2]=="h") return RandString.hex(parseInt(this[4])||1);
            if(this[2]=="s") return RandString.alphaNumeric(parseInt(this[4])||1);
            return "";
        });
    }
}
Object.package(this);