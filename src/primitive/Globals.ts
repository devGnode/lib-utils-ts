import "lib-utils-ts/src/globalUtils"
import {Byte} from "./Byte";
//import {Pointer} from "./Pointer";

import {Operator} from "./Operator";
import {IConsumer} from "../Interface";
/***
 * Enum : Bits size
 */
export enum SZB {
    /*SIZEBITS*/
    DB = 0x08,
    WD = 0x10,
    DW = 0x20,
    QW = 0x40
}
// Bits Limit
export enum LIMIT {
    /*LIMITBITS*/
    DB = 0xFF,
    WD = 0xFFFF,
    DW = 0xFFFFFFFF,
    QW = 0xFFFFFFFFFFFFFFFF
}
//Enum all types supported
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

export type consumerFnResult<T,R> = ( o: T ) => R | void
export interface ConsumerResult<T,R> extends IConsumer<T>{
    accept:consumerFnResult<T,R>
    /***
     *
     */
    get( ):R
    /***
     *
     */
    clear():void
}
export interface spliteratorResult<T,R>{
    /***
     *
     */
    tryAdvance( action: ConsumerResult<T,R> ):boolean
    forEachRemaining(action:  ConsumerResult<T,R>):void
}

export interface ConvertReserved<T,R> extends spliteratorResult<T,R>{

}
/***
 *
 */
export interface convert {
    /***
     *
     */
    hex(a:number)
    /***
     *
     */
    octal(value:number):string
    /***
     *
     */
    bin(value:number):string
    /***
     *
     */
    base(value:number, radix:number, consumer:ConsumerResult<number,string>):string
}
/***
 * @primitiveNumber
 */
export interface primitiveNumber extends Number{
    /***
     *
     */
    isOverflow( ):boolean
    /***
     *
     */
    signed():boolean
    /***
     *
     */
    isPositive( ):boolean
    /***
     *
     */
    sizeOf( ):number
    /***
     *
     */
    endian( ):primitiveNumber
    /***
     *
     */
    random( min:primitiveNumber, max:primitiveNumber):primitiveNumber
    /***
     *
     */
    overflowThrow( message:string ):void
    /***
     *
     */
    getType():string
    /***
     *
     */
    orThrow( message:string  ):primitiveNumber
    /***
     *
     */
    newer(value:Number ):primitiveNumber
    /***
     *
     */
    valueOf():number
    /***
     *
     */
    toHex():string
    /***
     *
     */
    toBin():string
    /***
     *
     */
    toOctal():number
    /***
     *
     */
    int2Str():string
    /***
     *
     */
    toUnsigned():primitiveNumber
    /***
     *
     */
    hasFloat():boolean
}
/****
 * @BYTE interface
 */
export interface BYTE {
    /***
     */
    toInt8():int8
    /***
     */
   // operators( ):Operator<BYTE>
    /***
     */
    endian():BYTE
}
/****
 * @uint8 interface
 */
export interface uint8 extends BYTE{}
/****
 * @int8 interface
 */
export interface int8 extends primitiveNumber{
    /***
     *
     */
    toUint8():Byte

}
/****
 * @int8 interface
 */
export interface WORD extends primitiveNumber{
    /***
     *
     */
    toInt16():int16
    operators( ):Operator<WORD>
    endian():WORD
}
/****
 * @int16 interface
 */
export interface int16 extends primitiveNumber{
    /***
     *
     */
    toUint16():WORD
    operators( ):Operator<int16>
    endian():int16
}
/****
 * @DWORD interface
 */
export interface DWORD extends primitiveNumber{
    /***
     *
     */
    toInt32():int32
    operators( ):Operator<DWORD>
    toFloat():float
}
export interface uint32 extends DWORD{}
/****
 * @int32 interface
 */
export interface int32 extends primitiveNumber{
    /***
     *
     */
    toUint32():DWORD
    operators( ):Operator<int32>
}

/**
 * @float
 */
export interface float extends primitiveNumber{
    /***
     *
     */
    toUint32():DWORD
    operators( ):Operator<float>
}
/***
 * @QWORD
 */
export interface QWORD extends primitiveNumber{
    /***
     *
     */
    toInt64():int64
    operators( ):Operator<QWORD>
}
/***
 * @int64
 */
export interface int64 extends primitiveNumber{
    /***
     *
     */
    toUint64():QWORD
    operators( ):Operator<int64>
}
/***
 * @double
 */
export interface double extends primitiveNumber{
    /***
     *
     */
    toQword():QWORD
    operators( ):Operator<double>
    toQword( ):QWORD
}

/***
 * @operators<T extends Number,U>
 */
export interface operators<T extends Number,U> {
    /***
     *
     */
    add( a:T, b:T ):U
    /***
     *
     */
    mul( a:T, b:T ):U
    /***
     *
     */
    div( a:T, b:T ):U
    /***
     *
     */
    sous( a:T, b:T ):U
    /***
     *
     */
    inc( a:T ):U
    /***
     *
     */
    dec( a:T ):U
    /***
     *
     */
    and( a:T, b:T ):U
    /***
     *
     */
    or( a:T, b:T ):U
    /***
     *
     */
    xor( a:T, b:T ):U
}
/***
 *
 */
export interface primitiveString {
    sizeOf():number
    getType():string
}
/***
 *
 */
export interface char extends primitiveString{
    toUint8( ):uint8
    valueOf(): string
}
/***
 *
 */
export interface cString extends primitiveString{
    hasPointer( ):boolean
    getPointer():any //Pointer<BitsType>
    valueOf():string
}
/***
 *
 */
export interface pointer<T> extends primitiveString{
    pointerName():string
    getRange( ):number
    getValue( ):T
}
/****
 *
 */
declare global {
    interface Array<T> {
        sum( ):number
    }
}


/****
 * Types
 */
export type BitsType    = (BYTE|int8|uint8|WORD|int16|DWORD|int32|uint32|QWORD|int64|float|double) & primitiveNumber
export type BitsTypeStr = (char|pointer<BitsType|BitsTypeStr>|cString) & primitiveString

export type s_bits      = { [ index:string]:number }
export type pvoidStruct = { [ index: string]:primitiveNumber|BitsType|BitsTypeStr|s_bits|Function };

export type LITTLE_ENDIAN   = 0x00;
export type BIG_ENDIAN      = 0x01;
export type ENDIAN          = LITTLE_ENDIAN | BIG_ENDIAN
/****
 * Extends
 */
Array.prototype.sum = function( ){
    let i:number = 0,  sum:number = 0,
        len:number = this.length;
    try{
        for(; i < len; i++ ) sum += typeof parseInt( this[ i ] ) === "number" ? parseInt( this[ i ] )  : 0;
    }catch(e){}
    return sum;
};






