import {Define} from "./Define";
import {comparable, comparator,comparatorFn} from "./Interface";
import {NullPointerException, RuntimeException} from "./Exception";
import {Collections} from "./Collections";
import {Comparator} from "./Comparator";
/****
 *  1 . By chance, I managed to see the source code so I have decided to stay ISO code
 */
//type reversed       = { new<T>(compare: comparator<T>): comparator<T> };
type NullComparator<T> = {  new<T>(nullFirst:boolean, comparator: comparator<T>): comparator<T> };
/****
 *
 */
export abstract class Comparators<T> {
    /****
     *
     */
    private constructor() { throw new RuntimeException("no usage inside !"); }
    /****
     *
     */
    public static Reversed = class Reversed<T>  implements comparator<T>{

        readonly comparator: comparator<T>;

        constructor(comparator:comparator<T>) { this.comparator = comparator;}


        public compare(o1: T, o2: T): number {
            return Object.isNull(this.comparator) ? 0 : -this.comparator.compare(o1,o2);
        }

        public reversed<T>(): comparator<T>{return <comparator<T>><comparator<Object>>Comparators.naturalOrder;}

        public thenComparing<U extends T>( other: comparator<T> ):Reversed<T>{
            return new Reversed<T>( Object.isNull(other) ? other : this.comparator );
        }

        public thenComparingFn<T, U extends comparable<U>>(comparatorFn: comparatorFn<T, U>, comparator: comparator<T> = null ): comparator<T> {
            return undefined;
        }
    }
    /***
     *
     */
    public static naturalOrder:comparator<comparable<Object>> = new class NaturalOrder<T> implements comparator<comparable<Object>>{
        /***
         * @throws NullPointerException : when compareTo is not defined
         */
        public compare(o1: comparable<Object>, o2: comparable<Object>): number {
            if(Object.isNull(o1)&&Object.isNull(o2)||Object.isNull(o1)||Object.isNull(o2)) return 0;
            if(Object.isNull(o2.compareTo)) throw new NullPointerException(`${o2.getClass().getName()} class doesn't not implement comparable interface`);
            return o1.compareTo(o2);
        }

        public reversed<T extends comparable<T>>(): comparator<comparable<T>> {return <comparator<comparable<Object>>>Collections.reverseOrder<T>();}
        /***
         * @thenComparing?<U extends T>
         * @thenComparingFn?<T, U extends comparable<U>>
         */
    };
    /****
     *
     */
    public static NullComparator:NullComparator<Object> = class NullComparators<T> implements comparator<T>{

        private readonly nullFirst:boolean;
        private readonly comparator: comparator<T>;

        constructor(nullFirst:boolean, comparator:comparator<T>) {
            this.nullFirst  = nullFirst;
            this.comparator = comparator;
        }

        public compare(o1: T, o2: T): number {
            let a:Define<T> = Define.of(o1),
                b:Define<T> = Define.of(o2);
            if(a.isNull()) return b.isNull() ? 0 : ( this.nullFirst ? -1 : 1 );
            else if( b.isNull() ){
                return this.nullFirst ? 1 : -1;
            }else{
                return Define.of(this.comparator ).isNull() ? 0 : this.comparator.compare(o1,o2);
            }
        }

        public reversed<U extends T>(): comparator<T>{
            return new NullComparators<T>(!this.nullFirst, Object.isNull(this.comparator) ? null : this.comparator.reversed());
        }

        public thenComparing?<U extends T>( other: comparator<T> ):NullComparators<T>{
             Object.requireNotNull(other);
            return new NullComparators<T>(this.nullFirst, Object.isNull(other) ? other : this.comparator );
        }

        public thenComparingFn?<T, U extends comparable<U>>(comparatorFn: comparatorFn<T, U>, comparator: comparator<T> = null): comparator<T> {
            return undefined;
        }

    }
    /***/
}