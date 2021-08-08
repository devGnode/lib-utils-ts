import {comparable, comparator, comparatorFn, comparatorFnA} from "./Interface";
import {Comparators} from "./Comparators";
import {Collection} from "./Collection";


interface IComparator<T> extends comparator<T> {
    reversed<U extends T>(): comparator<T>
    reversed<T extends comparable<T>>(): comparator<T>
}

export abstract class AComparator<T>  implements IComparator<T>{
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

    /***
     *
     */
    reversed<T extends comparable<T>>(): comparator<T> {return Collection.reverseOrder<T>();}
    /***
     *
     */
    /* public thenComparing<U extends T>(comparator: comparator<T>):Comparator<T>{
         Object.requireNotNull(comparator);
         let out: Comparator<T> = new Comparator<T>();
             out.compare = (o1: T, o2: T): number =>{
                 let res:number = this.compare(o1,o2);
                 return res != 0 ? res : comparator.compare(o1,o2);
             };
         return out;
     }*/

    // public thenComparingFn<T, U extends comparable<U>>(comparatorFn: comparatorFn<T, U>, comparator: comparator<T>): IComparator<T> {throw new RuntimeException("not implemented !");}

    /*thenComparing<U extends T>(comparator: comparator<T>): IComparator<T> {
        return undefined;
    }*/



}

export class Comparator<T> extends AComparator<T> {
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
    /*public reversed<T extends comparable<T>>(): Comparator<T>{
        return <Comparator<T>> Collection.reverseOrder<T>();
    }*/
    /***
     *
     */
    public static nullsFirst<T>( comparator: comparator<T> = null ): Comparator<T>{
        return <Comparator<T>>new Comparators.NullComparator<T>(true, comparator);
    }
    /***
     *
     */
    public static nullsLast<T>( comparator: comparator<T> = null ): Comparator<T>{
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
            public compare = (o1: T, o2: T): number => {
                let p:U, q:U,res:number;
                if(Object.compare(o1,o2).equals(0)) return 0;
                res = Object.compare(p=comparatorFn.call(o1, o1, o2),q=comparatorFn.call(o2, o2, o1));
                return res === 0 ? res : p.compareTo(q);
            }
        }
    }
    /***
     *
     * @param comparatorFn
     * @param comparator
     */
    public static comparingA<T,U>( comparatorFn: comparatorFnA<T,U>, comparator: comparator<T> ): Comparator<T>{
        Object.requireNotNull(comparatorFn,"comparatorFn is Null !");
        Object.requireNotNull(comparator,"comparator is Null !");
        return new class extends Comparator<T> implements Comparator<T>{
            constructor( ) {super();}
            // @override
            public compare = (o1: T, o2: T): number =>{
                let res:number;
                if(Object.compare(o1,o2).equals(0)) return comparator.compare(o1,o2);
                return comparator.compare(comparatorFn.call(o2, o2), comparatorFn.call(o1, o1));
            }
        }
    }

    public thenComparing<U extends T>( comparator: comparator<T> ): Comparator<T>{
        Object.requireNotNull(comparator);
        let out: Comparator<T> = new Comparator<T>();
        out.compare = (o1: T, o2: T): number =>{
            let res:number = this.compare(o1,o2);
            return res != 0 ? res : comparator.compare(o1,o2);
        };
        return out;
    }

    public thenComparingFn<T, U extends comparable<U>>(comparatorFn: comparatorFnA<T,U>, comparator: IComparator<T> = null ):Comparator<T>{
        return null //this.thenComparing(<any>Comparator.comparing<T,U>(comparatorFn)) //Object.isNull(comparator) ?
        //this.thenComparing<T>(Comparator.comparing(comparatorFn))// :
        // this.thenComparing<T>(Comparator.comparingA<T,U>(comparatorFn,comparator));
    }

}