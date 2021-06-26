import {ArrayList} from "../List";
/***
 *
 */
export abstract class ArrayA<T> extends Array<T>{
    /***
     *
     */
    public asList<T>( value : T[] ): ArrayList<T> {return new ArrayList<T>(value);}
    /***
     *
     */
    public newList<T>( ... value : T[] ): ArrayList<T> {return new ArrayList<T>(Array.from(value));}
    /***
     * @test
     */
    public sum( ): number{return Number(new ArrayList<T>(this).stream().sum().orElse(-1));};
}