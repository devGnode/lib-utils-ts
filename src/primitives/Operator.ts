import {Operators} from "./Operators";
import {primitiveNumber} from "./Globals";
import {PrimitiveNumber} from "./PrimitiveNumber";
import {IllegalArgumentException} from "../Exception";
/***
 *
 */
export class Operator<T extends primitiveNumber>{
    /***
     *
     */
    private readonly value:T;
    private readonly op: Operators<primitiveNumber> = new Operators.PrimitiveOperators();
    /***
     *
     */
    constructor(value:T) {this.value = value;}
    /***
     *
     */
    private cast( a: T|number ):T{
        if( !(a instanceof PrimitiveNumber.PrimitiveNumberBuilder ) ) return <T>this.value.getClass().newInstance(Number(a));
        if(!(<T>a).signed().equals(this.value.signed())) throw new IllegalArgumentException(`Bad Cast Operator : cannot cast ${(<T>a).signed()?"signed":"unsigned"} number to ${this.value.signed()?"signed":"unsigned"} number`)
        return <T>a;
    }
    /***
     *
     */
    private out(a: number ): Operator<T> {
        return new Operator<T>(<T>this.value.getClass().newInstance(a));
    }
    /***
     *
     */
    public add(a: T|number ): Operator<T> {
        return this.out(<number>this.op.add(this.value,this.cast(a)));
    }
    /***
     *
     */
    public mul(a: T|number): Operator<T> {
        return this.out(<number>this.op.mul(this.value,this.cast(a)));
    }
    /***
     *
     */
    public sous(a: T|number): Operator<T> {
        return this.out(<number>(this.op.sous(this.value,this.cast(a))));
    }
    /***
     *
     */
    public inc(): Operator<T>{
        return this.out(<number>(this.op.inc(this.value)));
    }
    /***
     *
     */
    public dec(): Operator<T> {
        return this.out(<number>(this.op.dec(this.value)));
    }
    /***
     *
     */
    public and(a: T|number): Operator<T> {
        return this.out(<number>(this.op.and(this.value,this.cast(a))));
    }
    /***
     *
     */
    public or(a: T|number): Operator<T> {
        return this.out(<number>(this.op.or(this.value,this.cast(a))));
    }
    /***
     *
     */
    public xor(a: T|number): Operator<T> {
        return this.out(<number>(this.op.xor(this.value,this.cast(a))));
    }
    /***
     *
     */
    public result():T{return this.value;}
}
Object.package(this);
