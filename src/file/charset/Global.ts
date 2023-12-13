/***
 * @writer   maroder
 * @version 1.0-R-JSTrip
 */
export interface EncoderTo {
    to(charset:string):EncoderString;
}
/***
 *
 */
export interface EncoderString {
    encode(code:number):string;
    encodeLoop(str:string):string[];
}