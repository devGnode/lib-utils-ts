import {Arrays} from "./type/Arrays";
import {collection, IConsumer, iterator,List, spliterator} from "./Interface";
import {Iterator, ListIterator} from "./Iterator";
import {Spliterators} from "./Spliterators";
import {IndexOfBoundException} from "./Exception";
import {AbstractArrayList} from "./AbstractArrayList";
import {Collections} from "./Collections";
import {Consumer} from "./Consumer";
/***
 * @ArrayList<T>
 * @interface List<T>
 */
export class ArrayList<T> extends AbstractArrayList<T> implements List<T>{
    /**
     *
     */
    protected value:T[] = [];
    /***
     *
     * @param value
     */
    public constructor(value:T[]|number = null ) {
        super();
        if(!Object.isNull(value)&&typeof value != "number")this.value = value;
        if(typeof value === "number"){
            this.value = Arrays.fill([],value,null);
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
        this.value[this.size()] = value;
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
        let list: ArrayList<T> = this;
        return new class extends Iterator<T> implements iterator<T> {
            private delCounter: number = 0;
            /***
             */
            constructor() {super(list.value);}
            /***
             * @override
             */
            public remove(): void {
                list.value = Arrays.remove(list.value, this.iteration - (1 + this.delCounter));
                this.delCounter++;
            }
        }
    }
    /***
     * @size
     */
    public size(): number {return this.value.length;}
    /**
     * @spliterator
     */
    public spliterator(): spliterator<T> {return new Spliterators.ArraySpliterator<T>(this.value);}
    /***
     * @set
     * @param index
     * @param value
     */
    public set(index: number, value: T): void {this.value[index] = value;}
    /**
     * @get
     * @param index
     */
    public get(index: number): T {
        if(index<0&&index>this.size()) throw new IndexOfBoundException(`${this.getClass().getName()} out of range : ${index}`);
        return this.value[index];
    }
    /**
     * @toString
     */
    public toString(): string {
        let out:string = "", i:number=0;
        this.spliterator().forEachRemaining(Consumer.of((value:T)=>out +=(i++)+" = "+value.toString()+",\n"))
        return "[ \n"+out.replace(/\,\s*$/,"")+"\n]";
    }
    /***
     * @reverse
     */
    public reverse():void{Collections.reverse(this);}
    /****
     *
     */
    public clone():List<T>{
        return new ArrayList<T>(Arrays.copyOfRange(this.value,0,this.size()));
    }
    /****
     *
     */
    public listIterator(): ListIterator<T> {return new ListIterator<T>(this.value);}
    /***
     *
     * @param value
     */
    public static of<T>(value:T[]|number):List<T>{
        return new ArrayList<T>(value);
    }
}
