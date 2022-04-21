import {PrimitiveNumber} from "./PrimitiveNumber";
import {WORD} from "./Globals";
import {Operator} from "./Operator";
import {Int16} from "./Int16";
/****
 * @Word Unsigned number, limit 0 < x >= 655535
 * @IOException
 * @NumericOverflowException
 */
export class Word extends PrimitiveNumber.Unsigned16 implements WORD{
    /****
     *
     */
    constructor(value:Number=null) {
        super(value);
        this.assert();
    }
    /****
     *
     */
    public endian():Word{return new Word(super.endian().valueOf())}
    /****
     *
     */
    public operators( ):Operator<Word>{return new Operator<Word>(this);}
    /****
     *
     */
    public toInt16():Int16 {return Int16.mk(( this.valueOf() << 16 ) >> 16 ); }
    /****
     *
     */
    public static mk(value:number=null):Word{return new Word(value);}
    /****
     *
     */
    public static random(min: Word = null, max: Word = null): Word {
        return Word.mk(Word.mk(0).random(min, max).valueOf());
    }
}
Object.package(this);