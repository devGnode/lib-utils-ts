import {IllegalArgumentException, RuntimeException} from "../Exception";
import {Objects} from "../type/Objects";
import {Arrays} from "../type/Arrays";
import {ENCODING} from "../file/charset/ENCODING";
import {Encoder} from "../file/charset/Encoder";
import {Convert} from "./Convert";
import {Byte} from "./Byte";
import {InputStream} from "../file/InputStream";
import {EOFException} from "../file/EOFException";
/***
 * @writer     maroder
 * @version    1.0-R-JSTrip
 */
export class BinaryBuffer extends InputStream {
    /***/
    // fr.wikipedia.org/wiki/Table_des_caractères_Unicode_(0000-0FFF)
    private readonly value:number[];
    private character: number = 0x00;
    private offset:number     = 0;

    public constructor(value: number[] = null, opts:number = 0x01) {
        super();
        this.value      = value || [];
        this.character  = opts;
    }

    mark(offset: number): void {
    }


    public read(): number {
        if(this.value[this.offset]==null||this.value[this.offset++]==null) throw new EOFException();
        return this.value[this.offset-1];
    }

    public safe(state: boolean): void {if (state) this.character |= 0x01; else this.character ^= 0x01;}

    public getSafe(): string {
        let out: string = "";
        for (let i = 0; i < this.value.length; i++) out += BinaryBuffer.getChar(this.value[i]);
        return out;
    }

    public get():string {return this.value.join('');}

    public peekCode(key:number):number{return this.value[key]==null?null:this.value[key];}

    public peekChar(key:number):string{return this.value[key]==null?null:BinaryBuffer.getChar(this.value[key]);}

    public peekByte(key:number):Byte{ return Byte.mk(this.peekCode(key)); }

    public append(value: string | number, charsetFrom:ENCODING = ENCODING.BINARY ): BinaryBuffer {
        //
        if (typeof value === "number"||value.length==1){
            let chr:string = BinaryBuffer.getChar(
                    typeof value === "number" ?value:value.charCodeAt(0),
                    charsetFrom || ENCODING.BINARY
                );
            chr.split('')
                .map(char=> this.value.push(char.charCodeAt(0)));
        } else{
            if (Boolean(this.character & 0x01)){
                for(let i = 0; i < value.length; i++ )
                    Arrays.merge(
                        this.value,
                        BinaryBuffer.getCodes(BinaryBuffer.getChar(value[i].charCodeAt(0), charsetFrom || ENCODING.BINARY))
                    );
            }else {
                Arrays.merge(this.value, value.split("").map(v => v.charCodeAt(0)));
            }
        }
        return this;
    }
    /**
     * @param {BinaryBuffer} bIn
     * @return {BinaryBuffer}
     */
    public concat(bIn:BinaryBuffer):BinaryBuffer{return BinaryBuffer.concat(this,bIn);}
    /**
     * @param {BinaryBuffer} bIn
     * @param {BinaryBuffer} bOut
     * @return {BinaryBuffer}
     */
    public static concat(bIn:BinaryBuffer, bOut:BinaryBuffer):BinaryBuffer{
        Arrays.merge(bIn.toIntArray(), bOut.toIntArray());
        return bIn;
    }
    /***
     * @return {number}
     */
    public sizeOf():number{ return this.value.length; }
    /**
     * @return {number[]}
     */
    public toIntArray():number[]{return this.value;}
    /**
     * @return {string[]}
     */
    public toArray():string[]{ return this.value.map(char=>BinaryBuffer.getChar(char)); }
    /***
     * @return {string}
     */
    public toString():string{ return this.value.map(value=>BinaryBuffer.getChar(value)).join("");}
    /**
     * @return {string}
     */
    public toHex():string{
        return this.value
            .map(char=> Convert.To.hexBinary( char, 0x01))
            .join('');
    }
    /***
     * @param {Object} o
     * @return {boolean}
     */
    public equals(o:Object):boolean{
        if(o==null) return false;
        return (o instanceof BinaryBuffer || typeof o === "string") ?
            this.toString().equals(o.toString()) :
            false;
    }
    /***
     * @param {string} chr
     * @return {number[]}
     */
    private static getCodes(chr:string):number[]{
        let value:number;
        if((value=chr.charCodeAt(0))<=0xFF) return [value];
        return [((value&0xFF00 >> 4)),  value&0xFF];
    }
    /***
     * getChar return
     *  in( ÿ ) => UTF => out( 00ÿ )
     *  in( UTF-CHAR  ) => ISO-8851-1 => ÿÿ
     * @param {number} code
     * @param {ENCODING} charsetFrom
     * @return {string}
     */
    public static getChar(code: number, charsetFrom:ENCODING = ENCODING.BINARY):string {
        if(code==null)return Encoder.getNullByte();
        switch (Objects.requireNotNull(charsetFrom)) {
            case ENCODING.BINARY:   return Encoder.from("ISO-8851-1").encode(code);
            case ENCODING.UTF_8:    return Encoder.from("UTF-8").to("ISO-8851-1").encode(code);
        }
        throw new RuntimeException(`Unknown encoding ${charsetFrom}`);
    }

    public static getCode(chr:string, charsetFrom:ENCODING = ENCODING.BINARY):number{
       let out:number = null;
        if(chr==null) return 0;
        /*if(charsetFrom.equals(ENCODING.BINARY)) out = BinaryBuffer.charsISO8851.indexOf(chr);
        if(charsetFrom.equals(Encoding.UTF8)) out = BinaryBuffer.UTF16_LATIN.indexOf(chr);
        if(out==null||out.equals(-1)) throw new RuntimeException(`char( ${chr} ) is not a binary encoding`);*/
        return 0; //this.getChar(chr.charCodeAt(0),charsetFrom);
    }

    public static of(value: string[] | string = null, charsetFrom:ENCODING = ENCODING.BINARY ): BinaryBuffer {
        if(typeof value === "string") value=value.split("");
        let strIn:number[] = [];
        if(!Objects.requireNotNull(charsetFrom).equals(ENCODING.BINARY)){
            let tmp:string;
            for(let i = 0; i < value.length; i++){
                tmp = BinaryBuffer.getChar(value[i].charCodeAt(0),charsetFrom);
                if(tmp.length==1) strIn.push(tmp.charCodeAt(0));
                else{
                    tmp.split("").map(v=>strIn.push(v.charCodeAt(0)));
                }
            }
        }else{
            value.map(v=>strIn.push(v.charCodeAt(0)));
        }
        return new BinaryBuffer(strIn);
    }
    /**
     * @param {string} hex
     * @return {BinaryBuffer}
     */
    public static fromHex(hex:string):BinaryBuffer{
        let strIn:number[] = [];
        if(hex.length%2 == 1||!(/^[a-fA-F0-9]+$/.test(hex))) throw new IllegalArgumentException(`Invalid hexadecimal input value '${hex}' !`);
        for(let i = 0; i < hex.length; i+=2) strIn.push(Convert.To.hexToNumber(hex[i]+hex[i+1]));
        return new BinaryBuffer(strIn);
    }
    /**
     * @param {string} base64
     * @return {BinaryBuffer}
     */
    public static from64(base64:string):BinaryBuffer{
        let tmp:string;
        try{tmp=atob(base64);}catch (e) {
            throw new IllegalArgumentException(`Invalid base64 input '${base64}' !`)
        }
        return this.of(tmp);
    }

}
Object.package(this);