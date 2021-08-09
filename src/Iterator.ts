import {iterator, listIteratorInterface,consumer} from "./Interface";
import {NoSuchElementException} from "./Exception";
import {Consumer} from "./Consumer";
import {Arrays} from "./type/Arrays";
/***
 * @Iterator
 * @interface iterator<E>
 */
export class Iterator<E> implements iterator<E>{
    /***
     *
     */
   protected iteration : number = 0;
    /***
     *
     */
    protected list : E[] = [];
    /***
     *
     * @param value
     */
    constructor( value : E[] ) {this.list = value;}
    /***
     *
     * @param key
     */
    protected get( key : number ) : E{
        if(this.list[key]===undefined) throw new NoSuchElementException(`elements [ ${key} ] is not defined`);
        return this.list[key];
    }
    /***
     *
     */
    public hasNext(): boolean {
        return this.iteration < this.list.length;
    }
    /***
     *
     */
    public next(): E {
        return this.get(this.iteration++);
    }
    /***
     *
     */
    public remove():void {
        this.list = Arrays.remove(this.list, this.iteration-1);
    }
    /***
     *
     */
    public forEachRemaining(consumer: consumer<E>): void {
        Object.requireNotNull(consumer);
        if(typeof consumer === "function") consumer = Consumer.of(consumer);
        while(this.hasNext()) consumer.accept(this.next());
    }
}
/***
 * @ListIterator
 */
export class ListIterator<E> extends Iterator<E> implements listIteratorInterface<E>{
    /***
     *
     * @param e
     */
    public add(e: E) : void{
        this.list[this.iteration++] = e;
    };
    /***
     *
     */
    public hasPrevious() : boolean{
        try{this.get(this.iteration-1);return true;}catch (e) {
            return false;
        }
    }
    /***
     *
     */
    public nextIndex() : number {
        try{this.get(this.iteration);return this.iteration;}catch (e) {
            return null;
        }
    };
    /***
     *
     */
    public previousIndex() : number {
        try{this.get(this.iteration-1);return this.iteration-1;}catch (e) {
            return null;
        }
    };
    /***
     *
     */
    public previous() :E{
        this.iteration--;
        return this.get(this.iteration);
    }
    /***
     *
     * @param e
     */
    public set (e: E) : void{
        this.list[this.iteration-1]= e;
    }
}