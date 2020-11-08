import {predicate, predicateFn} from "./Interface";
import {Define} from "./Define";
import {NullPointerException} from "./Exception";
/****
 * Predicate class :
 */
export class Predication<T> implements predicate<T>{

    public test: predicateFn<T>;

    public and( other :  predicate<T> ) : predicate<T>{
        Define.of(other).orThrow(new NullPointerException("[ other ] argument is null !"));
        let p: predicate<T> = new Predication(),
            q: predicateFn<T> = (value)=> this.test(value)&& Define.of<predicateFn<T>>(other.test).orNull(()=>false).call(other,value);
        p.test = q;
        return p;
    }

    public or( other : predicate<T> ) : predicate<T>{
        Define.of(other).orThrow(new NullPointerException("[ other ] argument is null !"));
        let p: predicate<T> = new Predication(),
            q: predicateFn<T> =  (value) =>this.test(value)||Define.of<predicateFn<T>>(other.test).orNull(()=>false).call(other,value);
        p.test = q;
        return p;
    }

    public negate(): predicate<T> {
        let p: predicate<T> = new Predication();
        p.test = (value)=> !this.test(value);
        return p;
    }

    public static isEqual<T>(object: Object): predicate<T> {
        let p: predicate<T> = new Predication();
        p.test = object===null?
            Object.isNull :
            (value)=> value.equals(Object);
        return p;
    }

    public static of<T>( test: predicateFn<T> ): predicate<T> {
        return new class extends Predication<T>{
            test: predicateFn<T> = test;
        };
    }
}