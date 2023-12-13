/***
 * @Char
 */
import {PrimitiveString} from "./PrimitiveString";
import {char} from "./Globals";
import {Optional} from "../utils/Optional";
//
export class Char extends PrimitiveString.Char implements char{
    /**
     *
     */
    constructor(value:string|number = "") {
        super( ( typeof value === "string" ) ? Optional.ofNullable(value).orElse("\x00") : String.fromCharCode(value&0xff));
    }
    /**
     *
     */
    public valueOf(): string {return this.toString();}
    /**
     *
     */
    public static from(value:string|number = "" ){return new Char(value);}
}
Object.package(this);