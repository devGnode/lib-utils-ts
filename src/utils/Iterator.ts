import {iterator, listIteratorInterface, consumer, collection} from "../Interface";
import {NoSuchElementException} from "../Exception";
import {Consumer} from "../Consumer";
import {Arrays} from "../type/Arrays";
import {Objects} from "../type/Objects";
/***
 * @Iterator
 * @interface iterator<E>
 */
export class Iterator<E> implements iterator<E>{
    /***
     *
     */
    protected iteration : number;
    protected end : number = 0;
    /***
     *
     */
    protected list : E[] = [];
    /***
     *
     * @param value
     * @param start
     * @param end
     */
    constructor( value : E[], start:number = null, end:number = null ) {
        this.list       = value;
        this.iteration  = start || 0;
        this.end        = end || value.length || 0;
    }
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
        return this.iteration < this.end;
    }
    /***
     *
     */
    public next(): E {
        return this.get(this.iteration++);
    }
    /***
     * @toOverride
     */
    public remove():void {
        let arrLen:number = this.list.length;

        this.list = Arrays.remove(this.list, this.iteration-1);
        if( arrLen-this.list.length == 1 ){  --this.end; --this.iteration; }
    }
    /***
     *
     */
    public forEachRemaining(consumer: consumer<E>): void {
        Objects.requireNotNull(consumer);
        if(typeof consumer === "function") consumer = Consumer.of(consumer);
        while(this.hasNext()) consumer.accept(this.next());
    }
}
/***
 * @ListIterator
 */
export class ListIterator<E> extends Iterator<E> implements listIteratorInterface<E>{

    protected test: collection<E>;
    /***
     * @toOverride
     * @param e
     */
    public add(e: E) : void{
        let merge:E[] = Arrays.copyOfRange(this.list, 0,this.iteration-1);
        merge[merge.length] = e;
        this.list = Arrays.merge(merge, Arrays.copyOfRange(this.list, this.iteration+1, this.end));
        this.end++;
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
       --this.iteration;
        return this.get(this.iteration);
    }
    /***
     *
     * @param e
     */
    public set (e: E) : void{
        this.list[this.iteration-1] = e;
    }
}
//Object.package(this);