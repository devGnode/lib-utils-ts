import {ENCODING} from "./ENCODING";
import {Objects} from "../../type/Objects";
import {IllegalArgumentException} from "../../Exception";
import {Convert} from "../../primitives/Convert";
import {EncoderString, EncoderTo} from "./Global";
/***
 * @writer   maroder
 * @version 1.0-R-JSTrip
 */
export class Encoder implements EncoderTo,EncoderString{

    // cache ISO-8851-1 page code
    protected static readonly charsISO8851: string[] = [
        "\x00", "\x01", "\x02", "\x03", "\x04", "\x05", "\x06", "\x07", "\x08", "\x09", "\x0a", "\x0b", "\x0c", "\x0d", "\x0e", "\x0f",
        "\x10", "\x11", "\x12", "\x13", "\x14", "\x15", "\x16", "\x17", "\x18", "\x19", "\x1a", "\x1b", "\x1c", "\x1d", "\x1e", "\x1f",
        "\x20", "\x21", "\x22", "\x23", "\x24", "\x25", "\x26", "\x27", "\x28", "\x29", "\x2a", "\x2b", "\x2c", "\x2d", "\x2e", "\x2f",
        "\x30", "\x31", "\x32", "\x33", "\x34", "\x35", "\x36", "\x37", "\x38", "\x39", "\x3a", "\x3b", "\x3c", "\x3d", "\x3e", "\x3f",
        "\x40", "\x41", "\x42", "\x43", "\x44", "\x45", "\x46", "\x47", "\x48", "\x49", "\x4a", "\x4b", "\x4c", "\x4d", "\x4e", "\x4f",
        "\x50", "\x51", "\x52", "\x53", "\x54", "\x55", "\x56", "\x57", "\x58", "\x59", "\x5a", "\x5b", "\x5c", "\x5d", "\x5e", "\x5f",
        "\x60", "\x61", "\x62", "\x63", "\x64", "\x65", "\x66", "\x67", "\x68", "\x69", "\x6a", "\x6b", "\x6c", "\x6d", "\x6e", "\x6f",
        "\x70", "\x71", "\x72", "\x73", "\x74", "\x75", "\x76", "\x77", "\x78", "\x79", "\x7a", "\x7b", "\x7c", "\x7d", "\x7e", "\x7f",
        "\x80", "\x81", "\x82", "\x83", "\x84", "\x85", "\x86", "\x87", "\x88", "\x89", "\x8a", "\x8b", "\x8c", "\x8d", "\x8e", "\x8f",
        "\x90", "\x91", "\x92", "\x93", "\x94", "\x95", "\x96", "\x97", "\x98", "\x99", "\x9a", "\x9b", "\x9c", "\x9d", "\x9e", "\x9f",
        "\xa0", "\xa1", "\xa2", "\xa3", "\xa4", "\xa5", "\xa6", "\xa7", "\xa8", "\xa9", "\xaa", "\xab", "\xac", "\xad", "\xae", "\xaf",
        "\xb0", "\xb1", "\xb2", "\xb3", "\xb4", "\xb5", "\xb6", "\xb7", "\xb8", "\xb9", "\xba", "\xbb", "\xbc", "\xbd", "\xbe", "\xbf",
        "\xc0", "\xc1", "\xc2", "\xc3", "\xc4", "\xc5", "\xc6", "\xc7", "\xc8", "\xc9", "\xca", "\xcb", "\xcc", "\xcd", "\xce", "\xcf",
        "\xd0", "\xd1", "\xd2", "\xd3", "\xd4", "\xd5", "\xd6", "\xd7", "\xd8", "\xd9", "\xda", "\xdb", "\xdc", "\xdd", "\xde", "\xdf",
        "\xe0", "\xe1", "\xe2", "\xe3", "\xe4", "\xe5", "\xe6", "\xe7", "\xe8", "\xe9", "\xea", "\xeb", "\xec", "\xed", "\xee", "\xef",
        "\xf0", "\xf1", "\xf2", "\xf3", "\xf4", "\xf5", "\xf6", "\xf7", "\xf8", "\xf9", "\xfa", "\xfb", "\xfc", "\xfd", "\xfe", "\xff"
    ];
    /***
     * Charset Encoding From
     */
    private readonly charset:ENCODING;
    /***
     * Charset Encoding To
     */
    private charsetTo:ENCODING;

    private constructor(charset:ENCODING = ENCODING.UTF_8) {this.charset  = charset;}
    /***
     * utf8 -> utf8 = from *
     * ISO  --> ISO = []
     * utf8 -> ISO  => Word *
     *
     * ISO  --> utf8 = from *
     *
     * @param {number} code
     * @return {string}
     */
    //
    public encode(code:number):string{
        if(code==null) return Encoder.getNullByte();
        if(this.charsetTo==null) this.charsetTo=this.charset;
        switch (this.charset) {
            case ENCODING.ISO_8851_1:
            case ENCODING.BINARY:
            case ENCODING.ASCII:;
                return this.charsetTo.equals(ENCODING.UTF_8) ?
                    String.fromCharCode(Encoder.assertUtf(code, this.charsetTo.toString())) :
                    Encoder.charsISO8851[Encoder.assertBinary(code, this.charset.toString())];
            default:
            case ENCODING.UTF_8:
                Encoder.assertUtf(code, this.charset.toString());
                return this.charsetTo.equals(this.charset) ?
                    String.fromCharCode(code) :
                    Convert.To.int2Str(code,2);
        }
        return null;
    }

    public encodeLoop(str:string):string[]{
        let out:string[] = [],chunk:string = "";

        if(this.charsetTo.equals(ENCODING.UTF_8)){
            for(let i = 0; i < str.length; i++ ){
                chunk += str[i];
                if(i%2 == 1) {
                    out.push(this.encode(Convert.To.strToNumber(chunk)));
                    chunk="";
                }
            }
        }else{
            for(let i = 0; i < str.length; i++ ){
                out.push(this.encode(str[i].charCodeAt(0)));
            }
        }

        return out;
    }

    public to(charset:string): EncoderString {
        this.charsetTo = ENCODING.valueOf(Objects.requireNotNull(charset).toUpperCase());
        return this;
    }

    public toString():string{return "Buffer Charset "+this.charset.toString(); }

    private static assertBinary(code: number, message:string = ""):number{
        if (code<0x00||code>0xFF)
            throw new IllegalArgumentException(`Unknown ${message} char code( ${code} ) overflow Byte`);
        return code;
    }

    private static assertUtf(code: number, message:string = ""):number{
        if (code<0x0000||code>0x0FFF)
            throw new IllegalArgumentException(`Unknown ${message} char code( 0x${Convert.To.hex(code)} ) Uint16 overflow`);
        return code;
    }

    public static getNullByte():string{ return this.charsISO8851[0]; }

    public static from(str:string):Encoder{return new Encoder(ENCODING.valueOf(Objects.requireNotNull(str).toUpperCase()));}
}
Object.package(this);