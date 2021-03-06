import {comparable, comparator, comparatorFn} from "./Interface";
import {Comparators} from "./Comparators";
import {Collection} from "./Collection";
/***
 * @AComparator<T> : usage as proxy interface for add some method
 *
 */
export interface AComparator<T> extends comparator<T>{
    reversed<U extends T>(): comparator<T>
}

export abstract class AComparator<T>  implements AComparator<T>{
    /***
     *
     */
    protected readonly value:T;
    /***
     *
     */
    protected constructor(value?:T) { this.value = value;}
    /****
     * @default
     * @param o1
     * @param o2
     */
    public compare: (o1: T, o2: T) => number

    reversed<T extends comparable<T>>(): comparator<T> {return Collection.reverseOrder<T>();}

}

export class Comparator<T> extends AComparator<T> implements AComparator<T>{
    /***
     *
     */
    constructor(value?:T) { super(value); }
    /***
     *
     */
    public equals(o: Object): boolean {return this.value.equals(o);}
    /***
     *
     */
    public reversed(): Comparator<T>{
        return <Comparator<T>>new Comparators.reversed<T>(this);
    }
    /***
     *
     */
    public static nullsFirst<T>( comparator: comparator<T> ): Comparator<T>{
        return <Comparator<T>>new Comparators.NullComparator<T>(true, comparator);
    }
    /***
     *
     */
    public static nullsLast<T>( comparator: comparator<T> ): Comparator<T>{
        return <Comparator<T>>new Comparators.NullComparator<T>(false, comparator);
    }
    /***
     *
     */
    public static naturalOrder<T extends comparable<T>>( ): Comparator<T>{
        return <Comparator<T>>Comparators.naturalOrder;
    }
    /***
     *
     * @param comparatorFn
     */
    public static comparing<T,U extends comparable<U>>( comparatorFn: comparatorFn<T,U> ): Comparator<T>{
        Object.requireNotNull(comparatorFn,"comparatorFn is Null !")
        return new class extends Comparator<T> implements comparator<T>{
            constructor( ) {super();}
            // @override
            public compare = (o1: T, o2: T): number => comparatorFn.call(o1, o1).compareTo(comparatorFn.call(o2, o2));
        }
    }
    /***
     *
     * @param comparatorFn
     * @param comparator
     */
    public static comparingA<T,U extends comparable<U>>( comparatorFn: comparatorFn<T,U>, comparator: comparator<T> ): Comparator<T>{
        Object.requireNotNull(comparatorFn,"comparatorFn is Null !");
        Object.requireNotNull(comparator,"comparator is Null !");
        return new class extends Comparator<T> implements comparator<T>{
            constructor( ) {super();}
            // @override
            public compare = (o1: T, o2: T): number => comparator.compare(comparatorFn.call(o2, o2), comparatorFn.call(o1, o1));
        }
    }
}