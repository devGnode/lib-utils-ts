import {PrimitiveString} from "./PrimitiveString";
import {BitsType, cString} from "./Globals";
import {Pointer} from "./Pointer";
import {Optional} from "../utils/Optional";
import {Types} from "./Types";
/***
 * @writer     maroder
 * @version    1.0-R-JSTrip
 */
export class CString extends PrimitiveString.CString implements cString{
    /**
     *
     */
    constructor(value:string = "",sizeof: number|Pointer<BitsType> = Types.VOID.sizeOf()) {
        super(Optional.ofNullable(value).orElse(""), sizeof);
    }
    /**
     *
     */
    public valueOf(): string {return this.toString();}
    /**
     *
     */
    public static of(value:string = "", sizeof: number|Pointer<BitsType> = Types.VOID.sizeOf()){return new CString(value, sizeof);}
}
Object.package(this);