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
            return a.newer( super.add(a, b)  ).assert(null);
        }
        /***
         *
         */
        public and(a: primitiveNumber, b: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            return a.newer( super.and(a, b)  ).assert(null);
        }
        /***
         *
         */
        public dec(a: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            return a.newer( super.dec(a)  ).assert(null);
        }
        /***
         *
         */
        public div(a: primitiveNumber, b: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            if(b.valueOf().equals(0)) throw new RuntimeException("prohibited to divide by zero");
            return a.newer( super.div(a, b)  ).assert(null);
        }
        /***
         *
         */
        public inc(a: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            return a.newer( super.inc(a)  ).assert(null);
        }
        /***
         *
         */
        public mul(a: primitiveNumber, b: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            return a.newer( super.mul(a, b) ).assert(null);
        }
        /***
         *
         */
        public or(a: primitiveNumber, b: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            return a.newer( super.or(a, b)  ).assert(null);
        }
        /***
         *
         */
        public sous(a: primitiveNumber, b: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            return a.newer( super.sous(a, b)  ).assert(null);
        }
        /***
         *
         */
        public xor(a: primitiveNumber, b: primitiveNumber): primitiveNumber {
            Objects.requireNotNull(a);
            Objects.requireNotNull(b);
            return a.newer( super.xor(a, b)  ).assert(null);
        }
    }

}
Object.package(this);