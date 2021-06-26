import {Comparator} from "../Comparator";

export abstract class NumberA extends Number{
    /***
     *
     */
    public compareTo(another:number):number{ return Number.compare(this.valueOf(),another); }
    /***
     *
     */
    public compare( x :number, y:number):number{ return new Comparator<number>().compare(x,y); }
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