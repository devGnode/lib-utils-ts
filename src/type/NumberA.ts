import {Comparator} from "../Comparator";
import {comparable, comparator} from "../Interface";
/***
 * @NumberA : Proxy class, allow to extend the prototype of the native Number Object.
 * Dont forget to implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 */
export abstract class NumberA extends Number implements comparator<number>,comparable<number>{
    /***
     *
     */
    public compareTo(another:number):number{ return Number.compare(this.valueOf(),another); }
    /***
     *
     */
    private static compareNumber:comparator<number> = new class implements comparator<number>{
        public compare(o1: number, o2: number): number {
            return o1 - o2;
        }
    }
    /***
     *
     */
    public compare( x :number, y:number):number{ return NumberA.compareNumber.compare(x,y); }
    /***
     *
     */
    public isPrime(): boolean {
        let n:number = parseInt(this.toFixed( )),
            sqrt:number,i:number;
        if( n == 2 ) return true;
        else if( n%2 === 0 || n < 2 ) return false;
        if( ( sqrt = Math.sqrt( n ) ) == parseInt( String(sqrt) ) ) return false;
        try{for( i = 3; i < sqrt; i+=2 ) if( n%i == 0 ) return false; }catch(e){
            return false;
        }
        return true;
    }
    /***
     *
     */
    public static of( value : Object ):number{return parseInt(<string>value);}
}