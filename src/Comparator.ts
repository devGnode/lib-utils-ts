import {comparable, comparator, comparatorFn} from "./Interface";

export class Comparator<T> implements comparator<T>{

    private readonly value:T;

    constructor(value?:T) {this.value = value;}

    public compare(o1: T, o2: T) : number {
        switch ((this.value||o1).getClass().getType()) {
            case "number": return Number(this.value||o1) - Number(o2);
            case "string": return String(this.value||o1).length - String(o2).length ;
            // @ts-ignore
            case "Date": return (this.value||o1).compareTo( o2 );
            default:
        }
        return 0;
    }
    /***
     *
     */
    public equals(o: Object): boolean {return this.value.equals(o);}
    /***
     *
     * @param comparatorFn
     */
    public static comparing<T,U extends comparable<T>>( comparatorFn: comparatorFn<T,U> ): Comparator<T>{
        Object.requireNotNull(comparatorFn,"comparatorFn is Null !")
        return new class extends Comparator<T>{
            constructor( ) {super();}
            // @override
            public compare(o1: T, o2: T): number {
                return comparatorFn.call(o1,o1).compareTo(comparatorFn.call(o2,o2));
            }
        }
    }
    /***
     *
     * @param comparatorFn
     * @param comparator
     */
    public static comparingA<T,U extends comparable<T>>( comparatorFn: comparatorFn<T,U>, comparator: comparator<T> ): Comparator<T>{
        Object.requireNotNull(comparatorFn,"comparatorFn is Null !");
        Object.requireNotNull(comparator,"comparator is Null !");
        return new class extends Comparator<T>{
            constructor( ) {super();}
            // @override
            public compare(o1: T, o2: T): number {
                return comparator.compare(comparatorFn.call(o2,o2), comparatorFn.call(o1,o1));
            }
        }
    }


}