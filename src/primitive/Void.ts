import {primitiveNumber} from "./Globals";
import {PrimitiveNumber} from "./PrimitiveNumber";
/***
 * @VOID
 * ANY type
 * let value:VOID = Int8.mk(5);
 */
export class VOID extends PrimitiveNumber.VOID implements primitiveNumber{
    constructor(value:void = void 0) {super(value);}
    public static mk(value:number= void 0):VOID{return new VOID(void 0);}
}