import {Define} from "./Define";
import {comparable, comparator} from "./Interface";
import {Comparator} from "./Comparator";
import {RuntimeException} from "./Exception";
/****
 *
 */
type reversed       = { new<T>(compare: comparator<T>): comparator<T> };
type NullComparator = { new<T>(nullFirst:boolean, comparator: comparator<T>): comparator<T> };
/****
 *
 */
export abstract class Comparators<T> {
    /****
     *
     */
    private constructor() { throw new RuntimeException("no usage"); }
    /****
     *
     */
    public static reversed:reversed = class reversed<T> implements comparator<T>{
        private readonly comparator: comparator<T>;

        constructor( compare: comparator<T>) {this.comparator = compare;}

        public compare(o1: T, o2: T): number {
            return Define.of(this.comparator).isNull() ? 0 : -this.comparator.compare(o1,o2);
        }

    }
    /***
     *
     */
    public static naturalOrder:comparator<comparable<Object>> = new class implements comparator<comparable<Object>>{
        // @override
        public compare(o1: comparable<Object>, o2: comparable<Object>): number {
            return o1.compareTo(o2);
        }
    };
    /****
     *
     */
    public static NullComparator:NullComparator = class NullComparators<T> implements comparator<T>{

        private readonly nullFirst:boolean;
        private readonly comparator: Comparator<T>;

        constructor(nullFirst:boolean, comparator: Comparator<T>) {
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

        public thenComparing<T>( other: Comparator<T> ):NullComparators<T>{
             Object.requireNotNull(other);
            return new NullComparators(this.nullFirst, other );
        }
    }
    /***/
}