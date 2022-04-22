import { RuntimeException} from "../Exception";
import {Objects} from "../type/Objects";
import {Arrays} from "../type/Arrays";
import {ENCODING} from "../file/charset/ENCODING";
import {Encoder} from "../file/charset/Encoder";

export class BinaryBuffer {
    /***/
    // fr.wikipedia.org/wiki/Table_des_caractères_Unicode_(0000-0FFF)
    private readonly value:string[];
    private character: number = 0x00;

    public constructor(value: string[] = null, opts: number = 0x01) {
        this.value      = value || [];
        this.character  = opts;
    }

    public safe(state: boolean): void {if (state) this.character |= 0x01; else this.character ^= 0x01;}

    public getSafe(): string {
        let out: string = "";
        //for (let i = 0; i < this.value.length; i++) out += BinaryBuffer.getChar(BinaryBuffer.assert(this.value[i].charCodeAt(0),"encoding 8859-1"));
        return out;
    }

    public get(): string {return this.value.join();}

    public append(value: string | number, charsetFrom:ENCODING = ENCODING.BINARY ): BinaryBuffer {
        //
        if (typeof value === "number"||value.length==1){
            let v:number = typeof value === "number" ?value:value.charCodeAt(0);
            this.value.push(BinaryBuffer.getChar(v, charsetFrom || ENCODING.BINARY));
        } else{
            // safeMode
            if (Boolean(this.character & 0x01)){
                for(let i = 0; i < value.length; i++ )this.value.push(BinaryBuffer.getChar(value[i].charCodeAt(0), charsetFrom || ENCODING.BINARY) );
            }else
                Arrays.merge(this.value,  value.split(""));
        }
        return this;
    }

    public sizeOf():number{ return this.value.length; }

    public toString():string{return `Buffer( charset encoding = '${ENCODING.ISO_8851_1}', length = ${this.value.length} )`;}

    public static getChar(code: number, charsetFrom:ENCODING = ENCODING.BINARY): string {
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
        if(!Objects.requireNotNull(charsetFrom).equals(ENCODING.BINARY)){
            let strIn:string[] = [];
            for(let i = 0; i < value.length; i++) strIn.push(BinaryBuffer.getChar(value[i].charCodeAt(0),charsetFrom));
            value = strIn;
        }
        return new BinaryBuffer(value);
    }

}
Object.package(this);