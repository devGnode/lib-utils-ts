/***
 * @PrimitiveNumber
 */
import {IOException, RuntimeException} from "../Exception";
import {NumericOverflowException} from "./NumericOverflowException";
import {Optional} from "../Optional";
import {Random} from "../Random";
import {primitiveNumber} from "./Globals";
import {Convert} from "./Convert";
import {Objects} from "../type/Objects";
export enum Types{
    /***
     * 1 Bytes
     */
    VOID    = 0x00,
    BYTE    = 0x01,
    uint8   = Types.BYTE,
    char    = Types.BYTE,
    boolean = Types.BYTE,
    /***
     * 2 Bytes
     */
    WORD    = 0x02,
    uint16  = Types.WORD,
    u_short = Types.WORD,
    /***
     * 4 Bytes
     */
    DWORD   = 0x04,
    uint32  = Types.DWORD,
    /***
     * 8 Bytes
     */
    QWORD   = 0x08,
    u_long  = Types.QWORD,
    /***
     * 1 Bytes
     */
    int8    = 0x11,
    int16   = 0x12,
    int32   = 0x14,
    int64   = 0x18,
    /***
     * 4 Bytes
     */
    float   = 0x34,
    /***
     * 2 Bytes
     */

    double  = 0x38
}
// Bits Limit
export enum LIMIT {
    /*LIMITBITS*/
    DB = 0xFF,
    WD = 0xFFFF,
    DW = 0xFFFFFFFF,
    QW = 0xFFFFFFFFFFFFFFFF
}

export abstract class PrimitiveNumber{
    /***
     * @evaluate
     */
    private static evaluate(maxValue: number, min: boolean, signed: boolean): number {
        return signed ? min ? -Math.floor(maxValue / 2)-1 : Math.floor(maxValue / 2) : min ? 0 : maxValue;
    }
    /***
     * @slice32
     * @value: unsigned number max 32bits
     */
    public static slice32(value:number):number[]{
        return [( value >> 24 )&0xff, ( value >> 16 )&0xff, ( value >> 8 )&0xff, value&0xff]
    }

    public static isFloat(value:number):boolean{return value-Math.round(value) > 0;}

    public static PrimitiveNumberBuilder = class PrimitiveNumberBuilder extends Number implements primitiveNumber {
        /*
        *
        */
        readonly type: number;
        /***
         *
         */
        readonly MAX: number;
        readonly MIN: number;
        /***
         *
         * @param value
         * @param maxValue
         * @param typeCode
         */
        protected constructor(value: Number, maxValue: number, typeCode: number) {
            super(value)
            this.type = typeCode;
            this.MIN = PrimitiveNumber.evaluate(maxValue, true, this.signed());
            this.MAX = PrimitiveNumber.evaluate(maxValue, false, this.signed());
        }
        /***
         * @equals
         * @override
         */
        public equals(o:Object):boolean{return this.valueOf().equals((<primitiveNumber>o).valueOf());}

        /***
         *
         */
        public getType():string{ return this.getClass().getName(); }
        /***
         * @newer
         */
        public newer(value: Number): primitiveNumber {throw new RuntimeException("Method not implemented.");}
        /***
         * @orThrow
         */
        public orThrow(message: string = null): primitiveNumber {
            if(!this.signed()&&!this.isPositive()) throw new IOException(`${this.getClass().getName()} is not a ${!this.signed() ? "s" : "uns"}igned number : [ ${this.valueOf()} ]`);
            if (this.isOverflow()) throw new NumericOverflowException(message || `${this.signed() ? "S" : "Uns"}igned ${this.getClass().getName()} overflow  ${this.sizeOf()} byte(s) out of memory : [ ${this.valueOf()} ]`);
            if(!this.hasFloat()&&PrimitiveNumber.isFloat(this.valueOf())) throw new IOException(`${this.getClass().getName()} is not a float number !`);
            return this;
        }
        /***
         * @overflowThrow
         */
        public overflowThrow(message: string = null): void {this.orThrow(message);}
        /***
         * @isOverflow
         */
        public isOverflow(): boolean {
            return (this.valueOf() < this.MIN) || (this.valueOf() > this.MAX);
        }
        /***
         * @signed
         */
        public signed(): boolean {return Boolean((this.type & 0x10) >> 4);}
        /***
         * @isPositiveType
         */
        public isPositive(): boolean {return this.valueOf() >= 0;}
        /***
         * @sizeOf
         */
        public sizeOf(): number {return this.type & 0x0f;}
        /***
         * @endian
         */
        public endian():primitiveNumber { throw new RuntimeException("not implemented !") }
        /****
         *
         */
        public hasFloat(): boolean { return Boolean( (this.type & 0x20 ) >> 5 );  }
        /****
         * @random
         */
        public random(min: primitiveNumber = null, max: primitiveNumber = null ): primitiveNumber {
            if(Objects.isNull(min)&&Objects.isNull(max)){
                let i:number = this.sizeOf(), out:number = 0;
                let k: number = this.sizeOf()*8;
                do{ out += ( 1 << (k-=8) )*Random.nextInt(0,255); }while ( i-- > 0);
            }
            if(Objects.isNull(min)) min = this.newer(this.MIN);
            if(Objects.isNull(max)) max= this.newer(this.MAX);
            return this.hasFloat() ?
                this.newer(Random.nextDouble(min.valueOf(),max.valueOf())) :
                this.newer(Random.nextInt(min.valueOf(),max.valueOf()));
        }

        public toUnsigned():primitiveNumber{
            if(this.signed()&&!this.isPositive()){
                switch (this.sizeOf()) {
                    case Types.BYTE: return new PrimitiveNumber.Unsigned8(this.valueOf()&0xFF);
                    case Types.WORD: return new PrimitiveNumber.Unsigned16(this.valueOf()&0xFFFF);
                    case Types.DWORD:return new PrimitiveNumber.Unsigned32(Convert.arrayToNumber(PrimitiveNumber.slice32(this.valueOf())));
                    case Types.QWORD:
                    default:
                        throw new RuntimeException("unsupported !")
                }
            }
            return this;
        }
        /***
         * @toBin
         */
        public toBin(opts:number = Convert.RD ): string {
            let value:number = this.valueOf();
            if(this.signed()&&!this.isPositive()) value = this.toUnsigned().valueOf();
            return Convert.To.binBinary(value,this.sizeOf(),opts);
        }
        /***
         * @toBin
         */
        public toHex(opts:number = /*.RD*/0 ): string {
            let value:number = this.valueOf();
            if(this.signed()&&!this.isPositive()) value = this.toUnsigned().valueOf();
            return Convert.To.hexBinary(value,this.sizeOf(),opts);
        }
        /***
         * @toOctal
         */
        public toOctal(): number {return Number(Convert.To.octal(this.valueOf()));}
        /***
         * @int2Str
         */
        public int2Str(): string {
            let value:number = this.valueOf();
            if(this.signed()&&!this.isPositive()) value = this.toUnsigned().valueOf();
            return Convert.To.int2Str(value);
        }
        /***
         * @override
         */
        public toString(radix?: number): string {
            return Objects.isNull(radix) ?
                this.int2Str() :
                radix.equals(2) ? this.toBin() :
                radix.equals(16 ) ? this.toHex(Convert.X2)  :
                this.int2Str();
        }
    }
    /***
     *
     *
     *
     */
    public static VOID = class VOID extends PrimitiveNumber.PrimitiveNumberBuilder{

        constructor(value:void = void 0) {super(void 0, Types.VOID, Types.VOID);}

        public endian(): VOID {return new VOID( void 0 );}

        public newer( value:Number ):VOID{return new PrimitiveNumber.VOID(void 0); }

        public valueOf(): number {return void 0;}
    }
    /***
     *
     *
     *
     */
    public static Unsigned8 = class Unsigned8 extends PrimitiveNumber.PrimitiveNumberBuilder{

        constructor(value:Number = LIMIT.DB ) {super( Optional.ofNullable(value).orElse(LIMIT.DB), LIMIT.DB, Types.uint8);}

        public endian(): Unsigned8 {return <Unsigned8>new Unsigned8( this.valueOf() );}

        public newer( value:Number ):Unsigned8{return new PrimitiveNumber.Unsigned8(value); }

    }

    /***
     *
     *
     *
     */
    public static Signed8 = class Signed8 extends PrimitiveNumber.PrimitiveNumberBuilder{

        constructor(value:Number = -1 ) {super(Optional.ofNullable(value).orElse(-1), LIMIT.DB, Types.int8);}

        public endian(): Signed8 {return new Signed8( this.valueOf() );}

        public newer( value:Number ):Signed8{return new PrimitiveNumber.Signed8(value); }

    }
    /***
     *
     *
     *
     */
    public static  Unsigned16 = class Unsigned16 extends PrimitiveNumber.PrimitiveNumberBuilder{

        constructor(value:Number = LIMIT.WD ) {super(Optional.ofNullable(value).orElse(LIMIT.WD), LIMIT.WD,Types.u_short);}

        public endian(): Unsigned16 {
            let v:number = this.valueOf();
            return new Unsigned16( ( v&0xFF ) << 8 | ( ( v >> 8 )&0xFF )&0xFFFF );
        }

        public newer( value:Number ):Unsigned16{return new PrimitiveNumber.Unsigned16(value); }
    }
    /***
     *
     *
     *
     */
    public static Signed16 = class Signed16 extends PrimitiveNumber.PrimitiveNumberBuilder{

        constructor(value:Number = -1 ) {super(Optional.ofNullable(value).orElse(-1), LIMIT.WD, Types.int16);}

        public endian(): Signed16 {
            let v:number = this.valueOf();
            return new Signed16( ( v&0xFF ) << 8 | ( ( v >> 8 )&0xFF )&0xFFFF );
        }

        public newer( value:Number ):Signed16{return new PrimitiveNumber.Signed16(value); }
    }
    /***
     *
     *
     *
     */
    public static Unsigned32 = class Unsigned32 extends PrimitiveNumber.PrimitiveNumberBuilder{

        constructor(value:Number = LIMIT.DW ) {super(Optional.ofNullable(value).orElse(LIMIT.DW), LIMIT.DW,Types.uint32);}

        /****
         *  @endian :
         *  with bitwise method for 4294967295 equals -1
         */
        public endian(): Unsigned32 {
            return new Unsigned32( /*Convert.arrayToNumber(PrimitiveNumber.slice32(this.valueOf()).reverse()) */0);
        }

        public newer( value:Number ):Unsigned32{return new PrimitiveNumber.Unsigned32(value); }
    }
    /***
     *
     *
     *
     */
    public static Signed32 = class Signed32 extends PrimitiveNumber.PrimitiveNumberBuilder{

        constructor(value:Number = -1 ) {super(Optional.ofNullable(value).orElse(-1), LIMIT.DW, Types.int32);}

        public endian(): Signed32 {
            let v:number = this.valueOf();
            return new Signed32( ( v&0xFF ) << 24 | ( ( v >> 8 )&0xFF ) << 16 | ( ( v >> 16 )&0xFF ) << 8 | (v>>24)&0xFF );
        }

        public newer( value:Number ):Signed32{return new PrimitiveNumber.Signed32(value); }
    }
    /***
     *
     *
     *
     */
    public static Float32 = class Float32 extends PrimitiveNumber.PrimitiveNumberBuilder{

        constructor(value:Number = -1 ) {super(Optional.ofNullable(value).orElse(-1), LIMIT.DW, Types.float);}

        public newer( value:Number ):Float32{return new PrimitiveNumber.Float32(value); }
    }
    /***
     *
     *
     *
     */
    public static Unsigned64 = class Unsigned64 extends PrimitiveNumber.PrimitiveNumberBuilder{

        readonly hight:number;

        constructor(value:Number = LIMIT.DW ) {
             // let high:number = BigInt(value) - (BigInt(value) / BigInt("4294967296"));
             // let low: number = BigInt(value) - BigInt(high);

            super(Optional.ofNullable(value).orElse(LIMIT.QW), LIMIT.QW, Types.u_long);
        }

        public endian(): Unsigned64 { return null;}

        public newer( value:Number ):Unsigned64{return new PrimitiveNumber.Unsigned64(value); }

        public valueOf(): number {
            return 0;
        }
    }
    /***
     *
     *
     *
     */
    public static Signed64 = class Signed64 extends PrimitiveNumber.PrimitiveNumberBuilder{

        constructor(value:Number = -1 ) {super(Optional.ofNullable(value).orElse(-1), LIMIT.QW, Types.int64);}

        public newer( value:Number ):Signed64{return new PrimitiveNumber.Signed64(value); }

        public endian(): Signed64 {return null}
    }
}
// package
Object.package(this);