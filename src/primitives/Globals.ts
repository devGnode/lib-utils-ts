import {Byte} from "./Byte";
import {Operator} from "./Operator";
import {IConsumer} from "../Interface";
import {Pointer} from "./Pointer";
import {BinArray} from "./BinArray";
import {ENCODING} from "../file/charset/ENCODING";

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
/**/
export interface ConvertReserved<T,R> extends spliteratorResult<T,R>{}
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
    assert( message:string  ):primitiveNumber
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
    toHex(opts:number):string
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
    toHex():string
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
    getCharset():ENCODING
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
/***
 */
export interface primitiveString {
    sizeOf():number
    getType():string
}
/***
 */
export interface char extends primitiveString{
    toUint8( ):uint8
    valueOf(): string
}
/***
 */
export interface cString extends primitiveString{
    hasPointer( ):boolean
    getPointer():Pointer<BitsType>
    valueOf():string
}
/***
 */
export interface pointer<T> extends primitiveString{
    pointerName():string
    getRange( ):number
    getValue( ):T
}
/****
 * Types
 */
export type BitsType    = (BYTE|int8|uint8|WORD|int16|DWORD|int32|uint32|QWORD|int64|float|double) & primitiveNumber
export type BitsTypeStr = (char|pointer<BitsType|BitsTypeStr>|cString) & primitiveString
export type BitsTypeArr = BinArray<BitsType>
//
export type s_bits      = { [ index:string]:number }
export type pvoidStruct = { [ index: string]:primitiveNumber|BitsType|BitsTypeStr|s_bits|BitsTypeArr|Function };




