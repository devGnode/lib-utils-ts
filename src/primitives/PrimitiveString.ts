import {BitsType, char, cString, primitiveString, uint8} from "./Globals";
import {RuntimeException} from "../Exception";
import {Objects} from "../type/Objects";
import {Uint8} from "./Uint8";
import {Optional} from "../utils/Optional";
import {Pointer} from "./Pointer";
import {ENCODING} from "../file/charset/ENCODING";
import {Types} from "./Types";
/***
 *  @writer     maroder
 * @version     1.0-R-JSTrip
 */
export abstract class PrimitiveString {

    private static isOverflow(buffer:string, sizeof:number ):string{
        if(buffer.length > sizeof )throw new RuntimeException("String overflow");
        return buffer;
    }

    public static PrimitiveStrBuilder = class PrimitiveStrBuilder extends String implements primitiveString {

        readonly sizeof:number = Types.VOID.sizeOf();

        constructor(value:string, sizeof: number) {
            super(PrimitiveString.isOverflow(value, sizeof));
            this.sizeof = sizeof;
        }
        /***
         */
        public getType(): string {return this.getClass().getName();}
        /***
         *
         */
        public getCharset():ENCODING{ return null }
        /***
         */
        public sizeOf(): number {return this.sizeof}

        toHex(): string {
            return "";
        }
    }
    /***
     *
     */
    public static Char = class Char extends PrimitiveString.PrimitiveStrBuilder implements char {
        constructor(value:string) {super(value,Types.BYTE.sizeOf());}

        public toUint8(): uint8 {return new Uint8(this.toString().charCodeAt(0));}

        public getCharset():ENCODING{ return ENCODING.BINARY; }

        toHex(): string {
            return "";
        }
    }
    /***
     *
     */
    public static CString = class CString extends PrimitiveString.PrimitiveStrBuilder implements cString {

        readonly pointer:Pointer<BitsType>;
        readonly charset:ENCODING;
        /***
         * @param value
         * @param sizeof
         * @param charset
         */
        constructor(value:string, sizeof: number|Pointer<BitsType> = Types.VOID.sizeOf(), charset:ENCODING = ENCODING.UTF_8 ) {
            super(
                Optional.of(value).orElse(""),
                sizeof instanceof Pointer ? 0 : sizeof||value.length||Types.VOID.sizeOf()
            );
            if( sizeof instanceof Pointer )this.pointer = sizeof;
        }
        /***
         * @throw NullPointerException
         */
        public getPointer(): Pointer<BitsType> {return Objects.requireNotNull(this.pointer);}
        /***
         *
         * @return {ENCODING}
         */
        public getCharset():ENCODING{ return this.charset; }
        /***
         *
         */
        public hasPointer(): boolean {return !Objects.isNull(this.pointer);}
    }
}
Object.package(this);