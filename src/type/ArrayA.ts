import {comparator, List} from "../Interface";
import {flombok} from "../flombok";
import {ArrayList} from "../utils/ArrayList";
/***
 * @ArrayA<T> Proxy class, allow to extend the prototype of the native Object.
 * Dont forget to implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 */
export abstract class ArrayA<T> extends Array<T> implements comparator<T>{
    /***
     *
     */
    public asList<T>( value : T[] ): List<T> {return new ArrayList<T>(value);}
    /***
     *
     */
    public newList<T>( ... value : T[] ): List<T> {return new ArrayList<T>(value);}
    /***
     *
     */
    public list<T>( ... value : T[] ): List<T> {return this.newList.apply(this,arguments);}
    /***
     * @test
     */
    public sum( ): number{return /*Number(new ArrayList<T>(this).stream().sum().orElse(-1))*/-1;};
    /***
     *
     */
    @flombok.ENUMERABLEFUNC(false)
    public equals(o: Array<T>): boolean {
        let current: Array<T> = <Array<T>>this.valueOf(), i:number=0;
        for(; i < current.length; i++)if(!o[i].equals(current[i])) return false;
        return true;
    }
}
Object.package(this);