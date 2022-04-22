import {primitiveNumber} from "./Globals";
import {PrimitiveNumber} from "./PrimitiveNumber";
/***
 * @VOID
 * ANY type
 * let value:VOID = Int8.mk(5);
 */
export class Void extends PrimitiveNumber.VOID implements primitiveNumber{
    /**
     * @param {void} value
     */
    constructor(value:void = void 0) {super(value);}
    /***
     * @param {number} value
     * @return {Void}
     */
    public static mk(value:number= void 0):Void{return new Void(void 0);}
}
Object.package(this);