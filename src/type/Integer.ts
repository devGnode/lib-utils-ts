import {comparable, comparator} from "../Interface";
import {Optional} from "../utils/Optional";
import {NumberFormatException} from "./NumberFormatException";
import {Objects} from "./Objects";
/***
 * @Integer : Proxy class, allow to extend the prototype of the native Number Object.
 * Dont forget to implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 */
export class Integer extends Number implements comparator<number>,comparable<number>{
    /***
     * @param value
     */
    public constructor(value?:number) {
        super(Optional.ofNullable(value).orElse(0));
    }
    /***
     *
     */
    public compareTo(another:number):number{ return Number.compare(this.valueOf(),another); }
    /***
     *
     */
    private static compareNumber:comparator<number> = new class implements comparator<number>{
        public compare(o1: number, o2: number): number {
            if(Objects.isNull(o1)&&Objects.isNull(o2)||Objects.isNull(o1)||Objects.isNull(o2)) return 0;
            return ( o1 > o2 ) ? 1 : o1 == o2 ? 0 :  -1;
        }
    };
    /**
     *
     */
    public static sum(a:number, b:number):number{
        return Objects.requireNotNull(a)+Objects.requireNotNull(b);
    }
    /***
     *
     */
    public compare( x :number, y:number):number{ return Integer.compareNumber.compare(x,y); }
    /***
     *
     */
    public isPrime(): boolean {
        let n:number = parseInt(this.toFixed( )),
            sqrt:number,i:number;
        
        if( n == 2 ) return true;
        else if( (n%2) === 0 || n < 2 ) return false;
        if( ( sqrt = Math.sqrt( n ) ) == parseInt( String(sqrt) ) ) return false;
        try{for( i = 3; i < sqrt; i+=2 ) if( (n%i) == 0 ) return false; }catch(e){
            return false;
        }
        return true;
    }
    /***
     *
     */
    public static of( value : Object ):number{
        try {return parseInt(<string>value);}catch (e) {
            throw new NumberFormatException();
        }
    }
}
Object.package(this);