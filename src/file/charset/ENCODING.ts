import {Enum} from "../../Enum";
import {IllegalArgumentException} from "../../Exception";
/***
 * @writer   maroder
 * @version 1.0-R-JSTrip
 *
 * js not support utf-16
 * formCharCode manage - 0x0000 - 0x0FFF
 */
export class ENCODING extends Enum{
    //
    @Enum.args(null)            static readonly ASCII:ENCODING;
    @Enum.args(null)            static readonly BINARY:ENCODING;
    @Enum.args("ISO-8851-1")    static readonly ISO_8851_1:ENCODING;
    @Enum.args("UTF-8")         static readonly UTF_8:ENCODING;
    /***
     */
    private readonly stringName:string;
    /***
     * @param {string} name
     */
    private constructor(name:string) {super();this.stringName = name;}
    /***
     * @return {string}
     */
    public toString(): string {return this.stringName==null ? super.toString() : this.stringName;}
    /***
     * @param {string} value
     * @return {T}
     */
    public static valueOf<T extends Enum>(value:string):T{
        try {return super.valueOf(value.replace(/-/gi, "_"));}catch (e) {
            throw new IllegalArgumentException(`Unknown charset encoding '${value}'`);
        }
    }
}
Object.package(this);