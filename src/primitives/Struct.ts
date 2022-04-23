import {BitsType, BitsTypeStr, primitiveNumber, primitiveString, pvoidStruct, s_bits} from "./Globals";
import {BinaryInputStream} from "./BinaryInputStream";
import {Objects} from "../type/Objects";
import {PrimitiveNumber} from "./PrimitiveNumber";
import {Byte} from "./Byte";
import {Word} from "./Word";
import {Dword} from "./Dword";
import {RuntimeException} from "../Exception";
import {Qword} from "./Qword";
import {PrimitiveString} from "./PrimitiveString";
import {CString} from "./CString";
import {BinArray} from "./BinArray";
import {Iterator} from "../utils/Iterator";
import {Field} from "../Reflect/Field";
import {iterator} from "../Interface";
/***
 * @writer   maroder
 * @version  5.0
 */
export abstract class Struct {

    private constructor() {}
    /****
     * @memSet: Initialize a structure
     *
     * @Throwable: RuntimeException
     * @param pVoidStruct
     * @param value
     */
    public static memSet<T extends pvoidStruct>( pVoidStruct: pvoidStruct, value:Byte = Byte.mk(0x00) ):T{
        let fieldL:iterator<Field> = new Iterator(Objects.requireNotNull(pVoidStruct).getClass().getFields()),
            field:Field;
        Objects.requireNotNull(value);
        try{
            while (fieldL.hasNext()){
                field = fieldL.next();
                // primitive number
                if(field.getValue() instanceof PrimitiveNumber.PrimitiveNumberBuilder)
                    field.setValue(
                        field
                        .getValue()
                        .getClass()
                        .newInstance(value.valueOf())
                    );
                // primitive String
                if(field.getValue() instanceof PrimitiveString.PrimitiveStrBuilder ){
                    if(field.getValue().getClass().equals("CString")){
                        let c:CString = <CString>field.getValue();
                        field.setValue(c.getClass().newInstance(String.repeatString(value.toString(), c.sizeOf()), c.sizeOf()));
                    }
                    field.setValue(field.getValue().getClass().newInstance(value.valueOf()));
                }
            }
        }catch (e) {
            throw new RuntimeException(e.message);
        }
        return <T>pVoidStruct;
    }
    /***
     * @sizeOf: Return size of a structure
     *
     * @param pVoidStruct
     * @param deep
     * @return: number
     */
    protected static sizeOfA( pVoidStruct: pvoidStruct|s_bits|BitsType|BitsTypeStr, deep:boolean = false ):number{
        let key:string, value:BitsType|BitsTypeStr|s_bits|BinArray<BitsType>|Function|number, sizeof:number = 0;

        if(Objects.isNull(pVoidStruct)) return 0;
        if( (pVoidStruct instanceof PrimitiveNumber.PrimitiveNumberBuilder) ||
            (pVoidStruct instanceof PrimitiveString.PrimitiveStrBuilder) )
            return pVoidStruct.sizeOf();

        try {
            for (key in pVoidStruct) {

                value = pVoidStruct[String(key)];
                sizeof +=   typeof value === "number" && deep ? value :
                    // Type Number : BYTE, WORD, DWORD
                    (value instanceof PrimitiveNumber.PrimitiveNumberBuilder || value instanceof PrimitiveString.PrimitiveStrBuilder || value instanceof BinArray) ? value.sizeOf() :
                    // Sub bits structure
                    typeof value === "object" && !(value instanceof PrimitiveNumber.PrimitiveNumberBuilder) && !(value instanceof PrimitiveString.PrimitiveStrBuilder) && !(value instanceof BinArray) ?
                    Struct.sizeOfA(value, true) :
                    // SubStruct
                    value instanceof Function ? Struct.sizeOf(value.call(null)) :
                    // No Value found
                    0;
            }
        }catch (e) {
            throw new RuntimeException(e.stack);
        }
        return deep ? ( sizeof>8? Math.round(sizeof/8) :  1) : sizeof;
    }
    /***
     *
     * @param pVoidStruct
     */
    public static sizeOf( pVoidStruct: pvoidStruct|s_bits|BitsType|BitsTypeStr ):number {return Struct.sizeOfA(pVoidStruct,false );}
    /***
     * @param {BinaryInputStream} buffer
     * @param {pvoidStruct} pVoidStruct
     * @param {number} endian
     * @return {pvoidStruct}
     */
    public static readBuffer<T extends pvoidStruct>(buffer: BinaryInputStream, pVoidStruct: pvoidStruct, endian: number = 0x00): T {
        let key: string, pType: primitiveNumber|primitiveString|BinArray<BitsType>|s_bits|Function;

        for (key in pVoidStruct) {
            pType = Objects.requireNotNull(pVoidStruct[key]);
            /****
             * Primitive number
             */
            if (pType instanceof PrimitiveNumber.PrimitiveNumberBuilder) {
                let nValue: number = buffer.charToInt((<primitiveNumber>pType).sizeOf());
                //
                switch ((<primitiveNumber>pType).getType()) {
                    case "Int8":    pVoidStruct[key] = Byte.mk(nValue).toInt8();    break;
                    case "Int16":   pVoidStruct[key] = Word.mk(nValue).toInt16();   break;
                    case "Int32":   pVoidStruct[key] = Dword.mk(nValue).toInt32();  break;
                    case "Int64":   throw new RuntimeException("not implemented yet"); /*pVoidStruct[key] = Qword.mk(nValue).toInt64();*/  break;
                    // float, double
                    // @fix Endian
                    case "Float":   pVoidStruct[key] = Dword.mk(nValue).toFloat();  break;
                    case "Double":  pVoidStruct[key] = Qword.mk(nValue).toDouble(); break;
                    default:
                        // otherwise unsigned number : Byte, WORD, DWORD, QWORD, ...
                        pVoidStruct[key] = pType.getClass<BitsType>().newInstance(nValue);
                }
                // Endian
                if (endian.equals(0x01) )pVoidStruct[key] = (<primitiveNumber>pVoidStruct[key]).endian();

            }else if(pType instanceof BinArray){
                let tOff:number = buffer.getOffset(),
                    range:number, nValue: number,
                    len:number = tOff;

                range = pType.getRange();
                len  +=  pType.sizeOf();
                while( tOff < len ) {
                    nValue = buffer.charToInt(
                        range       // sizeOf
                    );
                    pType.add(nValue);
                    tOff+=range;
                }
            }else if (pType instanceof PrimitiveString.PrimitiveStrBuilder) {
                let nValue: CString;
                // STRING
                // sizeof != length
                // SIZEOF = STR + [  NULLBYTE || RANGE ]
                // LENGTH = REAL LENGTh OF STR
                nValue = buffer.stringBuffer(pVoidStruct, <BitsTypeStr>pVoidStruct[key] );
                pVoidStruct[key] = pType.getClass<BitsTypeStr>().newInstance(nValue.valueOf(), nValue.sizeOf());

            }else if (typeof pType === "object") {
                // {}
                pVoidStruct[key] = buffer.chr2bit(<s_bits>pType);
            }
        }
        return <T>pVoidStruct;
    }

    public static toBuffer(buffer: string = null, pStruct: pvoidStruct, pVoidStruct: pvoidStruct = null){

    }
}
Object.package(this);