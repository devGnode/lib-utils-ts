import {operators, primitiveNumber} from "./Globals";
import {RuntimeException} from "../Exception";
import {Objects} from "../type/Objects";

/***
 * @Operators<T  extends Number>
 */
export abstract class Operators<T  extends Number> implements operators<T,Number>{
    /***
     *
     */
    public add( a:T, b:T ):Number{return a.valueOf() + b.valueOf();}
    public mul( a:T, b:T ):Number{return a.valueOf() * b.valueOf();}
    public div( a:T, b:T ):Number{return a.valueOf() / b.valueOf();}
    public sous( a:T, b:T ):Number{return a.valueOf() - b.valueOf();}
    public inc( a:T ):Number{return a.valueOf()+1;}
    public dec( a:T ):Number{return a.valueOf()-1;}
    public and( a:T, b:T ):Number{return a.valueOf()&b.valueOf();}
    public or( a:T, b:T ):Number{return a.valueOf()|b.valueOf();}
    public xor( a:T, b:T ):Number{return a.valueOf()^b.valueOf();}
    /***
     * @PrimitiveOperators
     */
    public static PrimitiveOperators = class PrimitiveOperator extends Operators<primitiveNumber> implements operators<primitiveNumber,primitiveNumber>{

        public add(a: primitiveNumber, b: primitiveNumber):primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            return a.newer( super.add(a, b)  ).orThrow(null);
        }
        /***
         *
         */
        public and(a: primitiveNumber, b: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            return a.newer( super.and(a, b)  ).orThrow(null);
        }
        /***
         *
         */
        public dec(a: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            return a.newer( super.dec(a)  ).orThrow(null);
        }
        /***
         *
         */
        public div(a: primitiveNumber, b: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            if(b.valueOf().equals(0)) throw new RuntimeException("prohibited to divide by zero");
            return a.newer( super.div(a, b)  ).orThrow(null);
        }
        /***
         *
         */
        public inc(a: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            return a.newer( super.inc(a)  ).orThrow(null);
        }
        /***
         *
         */
        public mul(a: primitiveNumber, b: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            return a.newer( super.mul(a, b) ).orThrow(null);
        }
        /***
         *
         */
        public or(a: primitiveNumber, b: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            return a.newer( super.or(a, b)  ).orThrow(null);
        }
        /***
         *
         */
        public sous(a: primitiveNumber, b: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            return a.newer( super.sous(a, b)  ).orThrow(null);
        }
        /***
         *
         */
        public xor(a: primitiveNumber, b: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            return a.newer( super.xor(a, b)  ).orThrow(null);
        }
    }

}