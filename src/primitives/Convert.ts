import {ConsumerResult, convert} from "./Globals";
import {PrimitiveNumber} from "./PrimitiveNumber";
import {IOException, RuntimeException} from "../Exception";
import {Objects} from "../type/Objects";
import {Encoder} from "../file/charset/Encoder";
import {Types} from "./Types";
/***
 *  @Convert: Public abstract class
 *  @ConvertConsumer
 *  @ConvertConsumerRoundedHex
 *  @ConvertConsumerRounded
 *  @ConvertConsumerRoundedHex
 *  @ConvertHexBinaryConsumer
 *  @ConvertIntToStr
*/
export enum ENDIAN {
    BIG     = 0x00,
    LITTLE  = 0x01
}
export abstract class Convert{
    /***
     * Constant
     */
    public static readonly BIN:number = 0x02;
    public static readonly HEX:number = 0x10;
    public static readonly OCT:number = 0x08;
    //
    public static readonly NO:number    = 0x00;
    public static readonly RD:number    = 0x01;
    public static readonly X2:number    = Convert.NO;
    public static readonly UPPER:number = 0x02;

    //
    public static readonly BIG_ENDIAN:number    = ENDIAN.BIG;
    public static readonly LITTLE_ENDIAN:number =  ENDIAN.LITTLE;
    /***
     * @convert
     */
    protected static convert( value:number, base:number, consumer:ConsumerResult<number,string> ): ConsumerResult<number,string>{
        let t:number = 0;

        if(value<0) throw new IOException(`value is a negative number : only an absolute value number can be converted`);
        try{
            if( value === 0 )  consumer.accept( 0);
            while( Math.floor( value ) > 0 ){
                t = Math.floor( value%base );
                value/= base;
                consumer.accept(t);
            }
        }catch(e){throw new RuntimeException(e);}
        return consumer;
    }
    /***
     * @reversedToNumber
     */
    protected static reversed<T>( value:T[], radix:number, action:ConsumerResult<T,number>):number{
        let out:number = 0, len:number = value.length,
            i:number  = len-1, accepted:number;

        for (; i >= 0; --i) {
            if (!Objects.isNull(accepted = <number>action.accept(value[(len - 1) - i]))) {
                out += radix.equals(2) ? Math.pow(radix, i) :
                    accepted * Math.pow(radix, i);
            }
        }

        return out;
    }
    /***
     * @ConvertConsumer: void consumer ready to convert.
     *
     */
    private static ConvertConsumer = class ConvertConsumer implements ConsumerResult<number,string>{

        protected value:string = "";

        accept(a: number): void{this.value += String(a);}

        get( ):string{return this.value.split("").reverse().join("");}

        clear():void {this.value=""}

        protected static round( value: string, sizeOf:number = null):string{
            return  value.length< sizeOf && sizeOf-value.length>0  ?
                String.repeatString("0",Math.abs(sizeOf-value.length))+value :
                value;
        }
    }
    /***
     * @ConvertHexConsumer: made a concat for hex values
     */
    private static ConvertHexConsumer = class ConvertHexConsumer  extends Convert.ConvertConsumer implements ConsumerResult<number,string>{
        /***
         * @override
         */
        accept(a:number): void{this.value +=  a < 10 ? String(a) : ("abcdef")[ a-10 ];}
    }
    /***
     * @ConvertConsumerRounded: void consumer
     *
     * @option "NO" for none will be return a value not round,
     * 2 Bytes number 27 dec => 1B hex.
     *
     * @options "X2" allows to convert all these bytes correctly
     * in String value should must to rounded for have a good
     * value "\xFF\xFF" not "\xFF".
     *
     */
    private static ConvertConsumerRounded = class ConvertConsumerRounded
        extends Convert.ConvertConsumer
        implements ConsumerResult<number,string>{

        public static readonly NO:number    = Convert.NO;
        public static readonly X2:number    = Convert.X2;
        public static readonly UPPER:number = Convert.UPPER;

        protected readonly characteristics:number;
        protected readonly sizeof:number;

        constructor(opts:number = 0x00, sizeof:number) {
            super();
            this.characteristics    = opts;
            this.sizeof             = sizeof;
        }
        /***
         * @override
         */
        get( ):string{
            let value:string =
                !(this.characteristics&0x1) ? super.get().replace(/^0*/,"")
                : Convert.ConvertConsumerRounded.round(super.get(),this.sizeof.equals(1)? 2 : this.sizeof);
            return ((this.characteristics&0x2) >> 1) ? value.toUpperCase() : value;
        }

    }
    /***
     * @ConvertConsumerRoundedHex
     */
    private static ConvertConsumerRoundedHex = class ConvertHexBinaryConsumer
        extends Convert.ConvertConsumerRounded
        implements ConsumerResult<number,string>{

        constructor(opts:number = Convert.X2, sizeof:number) {super(opts, sizeof*2);}
        /***
         * @override
         */
        accept(a: number): void{this.value +=  a < 10 ? String(a) : ("abcdef")[ a-10 ];}
    }
    /***
     * @ConvertHexBinaryConsumer:
     *
     */
    private static ConvertHexBinaryConsumer = class ConvertHexBinaryConsumer
        extends Convert.ConvertConsumerRounded
        implements ConsumerResult<number,string>{

        constructor(opts:number = Convert.X2, sizeof:number) {super(opts, sizeof*2);}
        /***
         * @override
         */
        accept(a: number) {this.value += ConvertHexBinaryConsumer.round(Convert.To.hex(a));}
    }
    /***
     * @ConvertBinConsumer
     */
    private static ConvertBinConsumer = class ConvertBinConsumer
        extends Convert.ConvertConsumerRounded
        implements ConsumerResult<number,string>{

        constructor(opts:number = Convert.RD, sizeof:number) {super(opts, sizeof);}
        /***
         * @override
         */
        get( ):string{
            return !(this.characteristics&0x1) ?
                super.get().replace(/^0*/,"") :
                Convert.ConvertConsumerRounded.round(super.get(),this.sizeof*8);
        }
    }
    /***
     * @ConvertIntToStr
     */
    private static ConvertIntToStr = class ConvertIntStr
        extends Convert.ConvertConsumer
        implements ConsumerResult<number,string>{

        protected readonly characteristics:number;
        protected readonly sizeOf:number;

        constructor(opts:number, sizeOf: number ) {
            super();
            this.characteristics = opts;
            this.sizeOf          = sizeOf;
        }
        /***
         * @override
         */
        accept(a: number) {this.value += Encoder.from("ISO-8851-1").encode(a);}
        /***
         * @param c
         * @return {string}
         */
        bound(c:number):string{return c<0 ? "" : String.repeatString("\x00", c);}
        /***
         * @override
         */
        get(): string {return this.bound(this.sizeOf - this.value.length) + (this.characteristics.equals(ENDIAN.BIG) ? super.get() : this.value);}
    }

    /***
     * @UnConvertConsumer
     */
    private static UnConvertConsumer = class UnConvertConsumer implements ConsumerResult<string,number>{

        protected value:number = 0;

        accept(value: string): number{
            if(isNaN(parseInt(value))) throw new IOException(`Bad numeric value : ${value}`);
            return parseInt(value);
        }

        get( ):number{return this.value;}

        clear():void {this.value=0;}
    }
    /***
     * @Convert.To: Exported class access via Convert.To
     */
    public static To = new class To implements convert{
        /***
         * @Convert.To: binary, value should be less than 0x00FFFFFFFFFFFF
         * and equals pr greater than 0.
         *
         * @IOException
         * if is a negative number cast it in unsigned number
         */
        public bin(value:number):string{return Convert.convert(Objects.requireNotNull(value), Convert.BIN, new Convert.ConvertConsumer() ).get();}
        /***
         * @Convert.To: octal
         * @IOException
         * if is a negative number cast it in unsigned number
         */
        public octal(value:number):string{return Convert.convert(Objects.requireNotNull(value), Convert.OCT, new Convert.ConvertConsumer() ).get();}
        /***
         * @Convert.To: hex
         * @IOException
         * if is a negative number cast it in unsigned number
         */
        public hex(value:number):string{return Convert.convert(Objects.requireNotNull(value), Convert.HEX, new Convert.ConvertHexConsumer() ).get();}
        /***
         * @binBinary
         * @IOException
         */
        public binBinary(value:number, sizeof:number, opts:number= Convert.RD ):string{
            return Convert.convert(Objects.requireNotNull(value), Convert.BIN, new Convert.ConvertBinConsumer( opts, Objects.requireNotNull(sizeof) ) ).get();
        }
        /***
         * @Convert.To: hexBinary
         * @IOException
         * Allows to convert a positive or a negative number.
         * limit 32bits
         */
        public hexBinary(value:number, sizeof:number, opts:number= Convert.RD ):string{
            Objects.requireNotNull(value);
            if(value<0){
                let i:number=0, slice:number[], tmp: ConsumerResult<number,string>;

                tmp = new Convert.ConvertHexBinaryConsumer(opts,Objects.requireNotNull(sizeof));
                slice = PrimitiveNumber.slice32(value).reverse();
                do{tmp.accept(slice[i]);}while (slice[i++]&&i<sizeof);

                return tmp.get();
            }
            return Convert.convert(value, Convert.HEX, new Convert.ConvertConsumerRoundedHex(opts,sizeof)).get();
        }
        /***
         * @int2Str
         * @IOException
         * @opts 0 = BIG_ENDIAN ; 1 = LITTLE_ENDIAN
         * I have found this way, most quickly than old limited
         * method with the bitwise operators it was been limited
         * in 32 bits values.
         */
        public int2Str( value:number, sizeof:number = null, opts:ENDIAN = Convert.BIG_ENDIAN ):string{
            return Convert.convert(Objects.requireNotNull(value), Types.BYTE.getLimit() + 1, new Convert.ConvertIntToStr(opts, sizeof) ).get();
        }
        /****
         * @base
         * @IOException
         */
        public base(value:number, radix:number, consumer:ConsumerResult<number,string>):string{
            return Convert.convert(Objects.requireNotNull(value), Objects.requireNotNull(radix), consumer ).get();
        }
        /***
         * @binToNumber
         */
        public binToNumber(value:string):number{
            return Convert.reversed(Objects.requireNotNull(value).split(''), Convert.BIN, new class extends Convert.UnConvertConsumer implements ConsumerResult<string, number>{
                /***
                 * @override
                 */
                accept(o: string): number {
                    let v:number;
                    if( (v = super.accept(o)) < 0 || v > 1 ) throw new IOException(`Bad input binary value : ${o}`);
                    return v.equals(0) ? null : 0;
                }
            });
        }
        /***
         * @binToNumber
         */
        public hexToNumber(value:string):number{
            return Convert.reversed(Objects.requireNotNull(value).split(''), Convert.HEX, new class extends Convert.UnConvertConsumer implements ConsumerResult<string, number>{
                /***
                 * @override
                 */
              accept(o: string): number {
                  let value:number;

                  if(isNaN(parseInt(o = o.toLowerCase()))){
                      if( ( value = ["a","b","c","d","e","f"].indexOf(o)) === -1) throw new IOException(`Bad hexadecimal format [0-9A-F] : ${o}`);
                      return value + 10;
                  }
                  return parseInt(o);
              }

            });
        }
        /***
         * @binToNumber
         */
        public octalStringToNumber(value:string):number{
            return Convert.reversed(Objects.requireNotNull(value).split(''), Convert.HEX, new  Convert.UnConvertConsumer());
        }
        /***
         * @binToNumber
         * @param value: String
         * This method return a unsigned number
         * 0 >= x <= 0x07FFFFFFFFFFFFFF
         */
        public strToNumber(value:string):number{
            return Convert.reversed(Objects.requireNotNull(value).split(''), Types.BYTE.getLimit() + 1, new class extends Convert.UnConvertConsumer implements ConsumerResult<string, number>{
                /***
                 * @override
                 */
                accept(o: string): number {
                    let v:number;
                    if( ( v = o.charCodeAt(0) ) < 0 && v > 0xFF ) throw  new IOException(`Bad encoding use a binary buffer ISO/CEI 8859-1`);
                    return v;
                }

            });
        }

    }
    /**
     * @arrayToNumber
     * @param value: Byte array
     * This method return a unsigned number
     * 0 >= x <= 0x07FFFFFFFFFFFFFF
     */
    public static arrayToNumber(value:number[]):number{
        return Convert.reversed(Objects.requireNotNull(value), Types.BYTE.getLimit() + 1, new class implements ConsumerResult<number, number>{
            /***
             * @override
             */
            accept(o: number): number {
                if( o  < 0 && o > 0xFF ) throw  new IOException(`Bad encoding use a binary buffer ISO/CEI 8859-1`);
                return o;
            }
            clear(): void {}
            get(): number {return undefined;}

        });
    }
}
Object.package(this);