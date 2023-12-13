import {InputStream} from "../file/InputStream";
import {BitsTypeStr, primitiveNumber, pvoidStruct, s_bits} from "./Globals";
import {Objects} from "../type/Objects";
import {Convert} from "./Convert";
import {IndexOfBoundException, RuntimeException} from "../Exception";
import {PrimitiveString} from "./PrimitiveString";
import {CString} from "./CString";
import {Define} from "../Define";
import {Struct} from "./Struct";
import {FileInputStream} from "../file/FileInputStream";
/***
 * @to-do: reimpl array
 */
export class BinaryInputStream extends InputStream{

    private readonly data:string;
    private readonly in:FileInputStream;
    private offset:number = 0;

    constructor(data:string|FileInputStream, offset?:number) {
        super();
        if(data instanceof FileInputStream) this.in = data;
        else this.data   = data;
        this.offset = offset||0;
    }

    public setOffset(offset:number):void{this.offset = offset;}

    public getOffset():number{ return this.offset;}

    public razOffset():void{ this.setOffset(0); }

    public mark(offset: number): void { this.setOffset(offset); }

    public read(buffer?: string[]): number {
        if(Objects.isNull(buffer)){
            let out:string;
            if((out = this.data[this.offset++]) != null ) return out.charCodeAt(0);
        }
        throw new IndexOfBoundException(``);
    }
    /***
     * @param {number} sizeOf
     * @return {number}
     */
    public charToInt(sizeOf:number):number{
        let offset:number = this.offset, end = this.offset+sizeOf, bTmp:string ="";
        if(offset>this.data.length||end>this.data.length)new IndexOfBoundException(`Buffer overflow index( ${this.data.length}  )`);
        if(this.data.length==sizeOf&&offset==0){
            bTmp=this.data;
            offset = end;
        }
        for(; offset < end; offset++,this.offset++)bTmp += this.data[offset];
        return Convert.To.strToNumber(bTmp);
    }
    /****
     * @chr2bit :
     *  buffer = > "Ã¿", off => 0, size => { fb:3, sb:1, tb:2, ef:2 } or
     *  buffer => "oÃ¿", off => 1, size =>....
     * @return { fb:7, sb:1, tb:3, eb:3 }
     */
    public chr2bit( pStruct:s_bits ): s_bits{
        let len:number = 0, i:number = 0, rol:number = 0, key:string,
            sizeof:Array<number> = Array(), data:number;
        pStruct = pStruct || {};
        try{
            /**
             *  try to evaluate the size
             *  of bits of an elements
             */
            for( key in pStruct ){
                sizeof.push( pStruct[ key ] );
                len += pStruct[ key ];
            }
            // get buffer
            len += (len%2);
            data = this.charToInt(parseInt( String( len/8 ) ) == 0 ? 1 : parseInt( String(len/8)) );
            /***
             * Build struct
             */
            for( key in pStruct ){
                rol = sizeof
                    .slice( i+1 )
                    .sum( );
                pStruct[ key ] = ( data >> rol )&(Math.pow( 2, pStruct[ key ] )-1);
                i++;
            }
        }catch (e) {
            throw new RuntimeException(e);
        }
        return pStruct;
    }
    /***
     * @stringBuffer:
     *
     * @param pVoidStruct
     * @param pValue
     */
    public stringBuffer(pVoidStruct:pvoidStruct,  pValue:BitsTypeStr ): CString{
        let out:string = "", tmp:number, len:Define<number> = Define.of(null), nullByte:number = 0;

        // Char, CString, ...
        if( pValue instanceof PrimitiveString.PrimitiveStrBuilder ) {
            if( pValue instanceof CString && pValue.hasPointer() ){
                // try to find pointer of struct
                let t:number = Define.of((<primitiveNumber>pVoidStruct[ pValue.getPointer().pointerName() ]))
                    .orElseThrow(new RuntimeException(`Structure pointer( ${pValue.getPointer().pointerName()} ) not found !`))
                    .valueOf();
                len = Define.of(t);
            }else{
                // CString with sizeof defined or
                // with no length or sizeof defined
                len = Define.of( pValue.sizeOf().equals(0)? null : pValue.sizeOf() );
            }
        }
        // Str with no length defined
        if( len.isNull() ) {
            while ((tmp =this.read())) {
                // Exclude NULL BYTES
                // noinspection JSDeprecatedSymbols
                if (tmp == 0 || (!len.isNullable() && this.offset >= len.get())) {
                    tmp == 0 ? nullByte++ : void 0;
                    break;
                }
                out += String.fromCharCode(tmp);
            }
        }else if(!len.isNull()){
            // more quick,but not real better way, no break if there is a null byte is in,
            // so some null byte can be hidden in your returned string
            let buff:string[] = [];
            this.readBytes(buff,this.offset,len.get());
            out = buff.join("");
        }
        // @deprecated use DwordArray
        if( pValue instanceof CString && pValue.hasPointer()){
            // Range is equals to : 1, 2, 4, 8
            // by block, multiple of 2
            nullByte += out.length%pValue.getPointer().getRange() > 0 ? pValue.getPointer().getRange()-(out.length%pValue.getPointer().getRange()) : 0;
        }

        return CString.of( out, out.length + nullByte );
    }
    /***
     *
     * @param {T} pVoidStruct
     * @return {T}
     */
    public readStruct<T extends pvoidStruct>(pVoidStruct:T):T{return Struct.readBuffer(this,pVoidStruct);}
    /***
     * @return {string}
     */
    public toString():string{return this.data;}
}
Object.package(this);