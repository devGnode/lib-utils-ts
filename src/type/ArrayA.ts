import {ArrayList} from "../List";
/***
 *
 */
export abstract class ArrayA<T> extends Array<T>{
    /***
     *
     */
    public asList<T>( value : T[] ): ArrayList<T> {return new ArrayList<T>(value);}
}