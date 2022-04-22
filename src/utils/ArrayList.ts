import {Arrays} from "../type/Arrays";
import {collection, IConsumer, iterator,List, spliterator} from "../Interface";
import {Iterator, ListIterator} from "./Iterator";
import {Spliterators} from "./Spliterators";
import {IndexOfBoundException} from "../Exception";
import {AbstractArrayList} from "./AbstractArrayList";
import {Collections} from "../Collections";
import {AbstractCollection} from "./AbstractCollection";
/***
 * @ArrayList<T>
 * @interface List<T>
 */
export class ArrayList<T> extends AbstractArrayList<T> implements List<T>{
    /**
     *
     */
    protected value:T[]         = [];
    protected offset:number     = 0;
    /***
     *
     * @param value
     */
    public constructor(value:T[]|collection<T>|number = null ) {
        super();

        if(typeof value === "number")this.value  = Arrays.fill([],value,null);
        if(value instanceof AbstractCollection ) this.addAll(value);
        if(value instanceof Array ){
            this.value  = Arrays.copyOfRange(value,0,value.length);
            this.offset = value.length;
        }
    }
    /***
     * @subList
     * @param from
     * @param to
     */
    public subList(from: number, to: number): List<T> {return new ArrayList(Arrays.copyOfRange(this.value,from,to));}
    /***
     * @add
     * @param value
     */
    public add(value: T): boolean {
        // gown : JS no limit capacity
        this.value[this.offset++] = value;
        return true;
    }
    /****
     * @addAll
     * @param collection
     */
    public addAll(collection: collection<T>): boolean {
        let list: List<T> = this;
        collection
            .spliterator()
            .forEachRemaining(new class implements IConsumer<T>{
                accept = (value:T) => list.add(value);
            });
        return true;
    }
    /**
     * @iterator
     * @throws IndexOfBoundException
     */
    public iterator(): iterator<T> {
        let list: this = this;
        return new class Itr extends Iterator<T> implements iterator<T> {
            /***
             */
            constructor() {super(list.value);}
            /***
             * @override
             */
            public remove(): void {
                let lenCtrl:number = this.list.length;

                super.remove();
                list.value = this.list;
                if(lenCtrl-list.value.length === 1 )--list.offset;
            }
        }
    }
    /***
     * @size
     */
    public size(): number {return this.offset;}
    /**
     * @spliterator
     */
    public spliterator(from?:number, to?:number): spliterator<T> {return new Spliterators.ArraySpliterator<T>(this.value, from, to);}
    /***
     * @set
     * @param index
     * @param value
     */
    public set(index: number, value: T): void {
        if(index > this.value.length /*!this.contains(value)*/) this.add(value);
        else{
            this.value[index] = value;
        }
    }
    /**
     * @get
     * @param index
     */
    public get(index: number): T {
        if(index<0&&index>this.size()) throw new IndexOfBoundException(`${this.getClass().getName()} out of range : ${index}`);
        return this.value[index];
    }
    /***
     * @reverse
     */
    public reverse():void{Collections.reverse(this);}
    /****
     *
     */
    public clone():List<T>{return new ArrayList<T>(Arrays.copyOfRange(this.value,0,this.size()));}
    /****
     *
     */
    public listIterator(): ListIterator<T> {
        let list: this = this;
        return new class ListItr extends ListIterator<T> implements iterator<T> {
            /***
             */
            constructor() {super(list.value);}
            /**
             * @override
             */
            public add(e: T) {
                super.add(e);
                list.value = this.list;
                list.offset++;
            }
            /***
             * @override
             */
            public remove(): void {
                let lenCtrl:number = list.value.length;

                super.remove();
                list.value = this.list;
                if(lenCtrl-list.value.length === 1 ) --list.offset;
            }
        }
    }
    /***
     *
     * @param value
     */
    public static of<T>(value:T[]|number|collection<T>):List<T>{
        return new ArrayList<T>(value);
    }
}
Object.package(this);