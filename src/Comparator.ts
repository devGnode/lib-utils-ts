import {comparable, comparator, comparatorFn, comparatorFnA} from "./Interface";
import {Comparators} from "./Comparators";
import {Collections} from "./Collections";
import {Objects} from "./type/Objects";

export class Comparator<T> implements comparator<T>{
    /***
     *
     */
    protected readonly value:T;
    /***
     *
     */
    public constructor(value?:T) { this.value = value;}
    /***
     *
     */
    public equals(o: Object): boolean {return this.value.equals(o);}
    /***
     *
     */
    public reversed?(): comparator<T>{
        return <any>Collections.reverseOrder();
    }
    /***
     *
     * @param comparator
     */
    public thenComparing?( comparator: comparator<T> ): comparator<T>{
        Objects.requireNotNull(comparator);
        let out: Comparator<T> = new Comparator<T>();
        out.compare = (o1: T, o2: T): number =>{
            let res:number = this.compare(o1,o2);
            return res != 0 ? res : comparator.compare(o1,o2);
        };
        return out;
    }
    /***
     *
     * @param comparatorFn
     * @param comparator
     */
    public thenComparingFn?<T, U extends comparable<U>>( comparatorFn: comparatorFn<T,U>, comparator :comparator<U> = null ): comparator<T>{
        return Comparator.comparing(comparatorFn);
       // return null;
        /*return <comparator<T>>this.thenComparing<T>(Comparator.comparing<T,U>(comparatorFn)); Objects.isNull(comparator) ?
            this.thenComparing(Comparator.comparing(comparatorFn)) :
            this.thenComparing(Comparator.comparingA<T,U>(comparatorFn,comparator))*/

    }

    /***
     * @static nullsFirst
     */
    public static nullsFirst<T>( comparator: comparator<T> = null ): Comparator<T>{
        return <Comparator<T>>new Comparators.NullComparator<T>(true, comparator);
    }
    /***
     * @static nullsLast
     */
    public static nullsLast<T>( comparator: comparator<T> = null ): Comparator<T>{
        return <Comparator<T>>new Comparators.NullComparator<T>(false, comparator);
    }
    /***
     * @static naturalOrder
     */
    public static naturalOrder<T extends comparable<T>>( ): Comparator<T>{
        return <Comparator<T>>Comparators.naturalOrder;
    }
    /***
     *
     * @param comparatorFn
     */
    public static comparing<T,U extends comparable<U>>( comparatorFn: comparatorFn<T,U> ): comparator<T>{
        Objects.requireNotNull(comparatorFn,"comparatorFn is Null !")
        return new class extends Comparator<T> implements comparator<T>{
            constructor( ) {super();}
            /***
             * @override
             */
            public compare = (o1: T, o2: T): number => {
                let p:U, q:U,res:number;
                if(Object.compare(o1,o2).equals(0)) return 0;
                res = Object.compare(p=comparatorFn.call(o1, o1, o2),q=comparatorFn.call(o2, o2, o1));
                if(res!=0&&Objects.isNull(p)) res = 0;
                return res === 0 ? res : p.compareTo(q);
            }
            /***
             * @override
             */
            public  equals(o: Object): boolean {return super.equals(o);}
            /***
             * @override

            public thenComparing(comparator: comparator<T>): comparator<T> {
                Objects.requireNotNull(comparator);
                let out: Comparator<T> = new Comparator<T>();
                out.compare = (o1: T, o2: T): number =>{
                    let res:number = this.compare(o1,o2);
                    return res != 0 ? res : comparator.compare(o1,o2);
                };
                return out;
            }*/
        }
    }
    /***
     *
     * @param comparatorFn
     * @param comparator
     */
    public static comparingA<T,U>( comparatorFn: comparatorFnA<T,U>, comparator: comparator<T> ): Comparator<T>{
        Objects.requireNotNull(comparatorFn,"comparatorFn is Null !");
        Objects.requireNotNull(comparator,"comparator is Null !");
        return new class extends Comparator<T> implements Comparator<T>{
            constructor( ) {super();}
            /***
             * @override
             */
            public compare = (o1: T, o2: T): number =>{
                if(Object.compare(o1,o2).equals(0)) return comparator.compare(o1,o2);
                return comparator.compare(comparatorFn.call(o2, o2), comparatorFn.call(o1, o1));
            }
        }
    }

}
Object.package(this);