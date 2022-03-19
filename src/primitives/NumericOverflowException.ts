import {Exception} from "../Exception";
/****
 * @NumericOverflowException
 */
export class NumericOverflowException extends Exception{
    /****
     *
     */
    name = NumericOverflowException.class().getName();
    /****
     *
     */
    constructor(ex) {super(ex);}
}
Object.package(this);