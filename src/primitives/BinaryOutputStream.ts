import {BinaryBuffer} from "./BinaryBuffer";
import {BitsType, primitiveNumber, primitiveString, pvoidStruct, s_bits} from "./Globals";
import {BinArray} from "./BinArray";
import {PrimitiveNumber} from "./PrimitiveNumber";
import {PrimitiveString} from "./PrimitiveString";
import {Encoder} from "../file/charset/Encoder";
import {CString} from "./CString";
import {Objects} from "../type/Objects";
import {RuntimeException} from "../Exception";
import {Convert} from "./Convert";
/***
 * @writer     maroder
 * @version    1.0-R-JSTrip
 */
export class BinaryOutputStream {

    private buffer:BinaryBuffer = new BinaryBuffer();

    public constructor() {this.buffer.safe(false);}

    /***
     * @bit2chr:
     *  Manage 64bits but, Voila ( by slice of 32 bits ) ....
     *
     * @param pSubStruct { fb:7, sb:1, tb:3, eb:3 }
     * @param pVoiSubStruct { fb:3, sb:1, tb:2, ef:2 }
     * @return "Ã¿"
     */
    public bit2chr( pSubStruct: s_bits, pVoiSubStruct: s_bits  ):string{
        let key:string, len:number, tLen:number = 0, n:number = 0, out:string = "";

        Objects.requireNotNull(pSubStruct,"missing pSubStruct args");
        Objects.requireNotNull(pVoiSubStruct, "missing pVoidSubStruct args");
        for( key in pVoiSubStruct ){

            Objects.requireNotNull(pSubStruct[key], `Structure element not found : ${key}`);
            len = pVoiSubStruct[key];
            if( pSubStruct[key] >= 0 && pSubStruct[key] < Math.pow( 2, len ) ){

                // overflow int 32 bit QWORD not supported
                // by slice of 32bits
                if( Math.pow( 2, ( tLen += len ) ) > Math.pow( 2, 0x20 /*SZB.DW*/ ) ){
                    out += Convert.To.int2Str(n);
                    tLen = n = 0;
                }
                n = ( n > 0 ) ? (( n << len ) | pSubStruct[key] ) : pSubStruct[key];
            }else{
                throw new RuntimeException(`Bits Structure Overflow : ${key} use ${len} bit(s)`);
            }
        }
        return out + Convert.To.int2Str(n);
    }

    public toBuffer( pStruct: pvoidStruct, pVoidStruct: pvoidStruct = null ):BinaryBuffer{
        let pType: primitiveNumber|primitiveString|BinArray<BitsType>|Function|s_bits,
            key:string;

        if(this.buffer.sizeOf()!=0) return this.buffer;
        for( key in pStruct ){

            pType = pStruct[key];
            // Primitive type
            if( pType instanceof PrimitiveNumber.PrimitiveNumberBuilder ) this.buffer.append((<primitiveNumber>pType).toString());
            // CONSTANT STRING
            else if( pType instanceof PrimitiveString.PrimitiveStrBuilder ){
                let end:string = Encoder.getNullByte();

                // check Ptr DWORD check Len ADD ÿ ending
                if( pType instanceof CString && pType.hasPointer() ){
                    let b:number = 0;

                    if( pType.valueOf().length%pType.getPointer().getRange() > 0 ){
                        b = pType.getPointer().getRange() - (pType.valueOf().length%pType.getPointer().getRange());
                    }
                    end += String.repeatString("ÿ",b).toString();
                }
                this.buffer.append( pType.valueOf() + end );
            }
            else if(pType instanceof BinArray){ pType.map(value=>this.buffer.append( value.toString()) ); }
            // Sub bits structure
            // {}
            else if(typeof pType ==="object"&&!(pType instanceof Function)){
                this.buffer.append( this.bit2chr(<s_bits>pType,<s_bits>pVoidStruct[key] ) );
            }
        }

        return this.buffer;
    }


}