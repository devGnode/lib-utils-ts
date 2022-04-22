import { RuntimeException} from "../Exception";
import {Spliterators} from "../utils/Spliterators";
import { predicate, primitiveArray, spliterator, Stream} from "../Interface";
import {StreamSupport} from "../stream/StreamSupport";
import {Spliterator} from "../utils/Spliterator";
import {Objects} from "./Objects";
/***
 * @Arrays
 * @Abstract
 */
export abstract class Arrays{
    /***
     *
     */
    public static readonly OUT_OF_HEAP:number = 100000000;
    /**
     * @copyOfRange
     * @Throwable IOException
     */
    public static copyOfRange<T>(source:T[], from:number, to:number ):T[]{
        let out:T[] = [], offset:number=0;

        Objects.requireNotNull(from);
        if(Objects.isNull(to)) to = source.length;
        if( to-from < 0 && from < 0 && to > source.length && from >= source.length ) return out;
        while (from<to)out[ offset++ ] = source[from++];

        return out;
    }
    /**
     * @merge
     * @Throw NullPointerException
     * @Throw RuntimeException
     */
    public static merge<T>( dst:T[], source:T[] ):T[]{
        let offset:number,len:number,i:number=0;

        Objects.requireNotNull(dst);
        if(Objects.isNull(source)) return dst;
        try{
            offset=dst.length;
            len= source.length;
            while (i<len)dst[ offset+i ] = source[i++];
        }catch (e) {
            throw new RuntimeException("HEAP OVERFLOW");
        }
        return dst;
    }
    /**
     * @fill
     * @Throw NullPointerException
     */
    public static fill<T>(source:T[], len:number = null, value:T ):T[]{
        Objects.requireNotNull(source);
        if(len===null||len===undefined) len= source.length;
        let i:number=0;
        while(i<len) source[i++] = Objects.isNull(value) ? null : value;
        return source;
    }
    /**
     * @clear
     * @Throw NullPointerException
     */
    public static clear<T>(source:T[]):T[]{
        Objects.requireNotNull(source);
        let i:number=0, len:number = source.length;
        for(; i < len; i++) source[i]=null;
        return source;
    }
    /**
     * @remove
     * @Throw NullPointerException
     */
    public static remove<T>(source:T[], index:number = null ):T[]{
        if(index>=source.length||index<0||Objects.isNull(index)) return source;
        Objects.requireNotNull(source);
        let i:number=0, j:number=0, len:number= source.length, dst:T[]= [];
        while(i<len) {
            if (i !== index) dst[j++] = source[i];
            i++;
        }
        return dst;
    }
    /**
     * @remove
     * @Throw NullPointerException
     */
    public static removeIf<T>(source:T[], predicate:predicate<T> ):T[]{
        Objects.requireNotNull(source);
        let i:number=0, j:number=0, len:number= source.length, dst:T[]= [];
        while(i<len) {
            if (!predicate.test(source[i])) dst[j++] = source[i];
            i++;
        }
        return dst;
    }
    /**
     * @reverse
     * @Throw NullPointerException
     */
    public static reverse<T>(source:T[]  ):T[]{
        Objects.requireNotNull(source);
        let i:number=0, middle:number= Math.floor(source.length/2);
        while(i < middle) {
            this.swap(source, i, source.length-1 - i );
            i++;
        }
        return source;
    }
    /**
     * @swap
     * @Throw NullPointerException
     */
    public static swap<T>(source:T[], i:number = 0, j:number = 0  ):T[]{
        if( i >= 0 && i <= source.length-1 && j >= 0 && j <= source.length-1 ) {
            Objects.requireNotNull(source);
            let tmp: T = source[i];
            source[i] = source[j];
            source[j] = tmp;
        }
        return source;
    }
    /**
     * @deepEquals<T>
     */
    public static deepEquals( a1:Object[], a2:Object[] ):boolean {
        let i: number = 0;
        if (!a1.length.equals(a2.length)) return false;
       do{ if(!Objects.deepEquals(a1[i] , a2[i])) return false; } while (i++ < a1.length);
    return true;
    }
    /**
     * @equals
     */
    public static equals( a1:primitiveArray, a2:primitiveArray ):boolean {
        let i: number = 0;
        if (!a1.length.equals(a2.length)) return false;
        do{ if (a1[i] !== a2[i]) return false; } while (i++ < a1.length);
        return true;
    }
    /**
     * @intSpliterator
     */
    public static intSpliterator(value:number[]|Number[], from:number = 0, to:number = null ):spliterator<number>{
        return new Spliterators.IntArraySpliterator(<number[]>value,from,to);
    }
    /***
     *
     */
    public static stream<T>(array:T[],  from:number = 0, to:number = null ):Stream<T>{
        return StreamSupport.stream(Arrays.spliterator(array,from,to));
    }
    /**
     * @Spliterator
     */
    public static spliterator<T>(value:T[], from:number = 0, to:number = null ):Spliterator<T>{
        return new Spliterators.ArraySpliterator(value,from,to);
    }
}
Object.package(this);