import {AbstractSet} from "./AbstractSet";
import {collection,  Set, spliterator} from './Interface';
import {Spliterators} from "./Spliterators";
import {Arrays} from "./type/Arrays";
import {AbstractCollection} from "./AbstractCollection";
/****
 * @HashSet :
 *
 * @class HashSet
 * @extends AbstractSet<E>
 * @interface Set<E>
 */
export class HashSet<E> extends AbstractSet<E> implements Set<E>{
    /****
     *
     */
    protected value: E[]    = [];
    /***
     * @offset: allows to calculate size of array.
     */
    protected offset:number = 0;
    /**
     *
     * @param
     */
    constructor(value:number|E[]|collection<E>) {
        super();
        if(typeof  value === "number") this.value = Arrays.fill([],value,null);
        if(value instanceof AbstractCollection ) this.addAll(value);
        if(!Object.isNull(value)&& value instanceof Array ) {
            this.value = value;
            this.offset= value.length;
        }
    }
    /****
     * @toRefactor
     */
    public spliterator(from?: number, to?: number): spliterator<E> {return new Spliterators.ArraySpliterator(this.value,from,to||this.offset);}
    /****
     * @static constructor
     */
    public static of<T>(value:number|T[]|collection<T>):HashSet<T>{ return new HashSet<T>(value); }
}