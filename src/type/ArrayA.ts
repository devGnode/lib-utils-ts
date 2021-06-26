import {ArrayList} from "../List";
/***
 *
 */
export abstract class ArrayA extends Array{
    /***
     *
     */
    public asList<T>( value : T[] ): ArrayList<T> {return new ArrayList<T>(value);}
}