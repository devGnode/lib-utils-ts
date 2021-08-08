import {predicate, predicateFn} from "./Interface";
import {Define} from "./Define";
/****
 * Predicate class :
 */
export class Predication<T> implements predicate<T>{

    public test: predicateFn<T>;
    /***
     *
     * @param other
     */
    public and( other :  predicate<T> ) : predicate<T>{
        Object.requireNotNull(other,"Predication [ other ] argument is null !");
        let predication: predicateFn<T> = (value)=> this.test(value)&& Define.of<predicateFn<T>>(other.test).orNull(()=>false).call(other,value);

        return new class extends Predication<T> implements predicate<T>{
            public test: predicateFn<T> = predication;
        };
    }
    /***
     *
     * @param other
     */
    public or( other : predicate<T> ) : predicate<T>{
        Object.requireNotNull(other,"Predication [ other ] argument is null !");
        let predication :  predicateFn<T> = (value:T) => this.test(value)||Define.of<predicateFn<T>>(other.test).orNull(()=>false).call(other,value);

        return new class extends Predication<T> implements predicate<T>{
            public test: predicateFn<T> = predication;
        }
    }
    /***
     *
     */
    public negate(): predicate<T> {return Predication.of<T>((value:T)=> !this.test(value));}
    /***
     *
     * @param object
     */
    public static isEqual<T>(object: Object): predicate<T> {
        let p: predicate<T> = new Predication();
        p.test = object===null?
            Object.isNull :
            (value:T)=> value.equals(object);
        return p;
    }
    /***
     *
     * @param test
     */
    public static of<T>( test: predicateFn<T> ): predicate<T> {
        return new class extends Predication<T> implements predicate<T>{
            public test: predicateFn<T> = test;
        };
    }
}