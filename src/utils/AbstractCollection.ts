import {collection, consumer, iterator, MapType, predicate, spliterator, Stream} from "../Interface";
import {UnsupportedOperationException} from "../Exception";
import {Consumer} from "../Consumer";
import {StreamSupport} from "../stream/StreamSupport";
import {Spliterator} from "./Spliterator";
import {Arrays} from "../type/Arrays";
import {Objects} from "../type/Objects";
/***
 * @abstract
 * @AbstractCollection
 */
export abstract class AbstractCollection<T> implements collection<T> {
    /***
     *
     */
    protected abstract value:T[];
    /***
     *
     */
    protected abstract offset:number;
    /***
     *
     */
    protected constructor() {}
    /***
     *
     */
    public abstract add(value: T): boolean
    /***
     *
     */
    public abstract addAll(collection: collection<T>): boolean
    /***
     *
     */
    public clear(): void {
        let itr: iterator<T> = this.iterator();
        while (itr.hasNext()) {
            itr.next();
            itr.remove();
        }
        this.offset=0;
    }
    /***
     * @contains
     */
    public contains(o: Object): boolean {
        let itr: iterator<T> = this.iterator();
        if (o === null) {
            while (itr.hasNext()) if (Objects.isNull(itr.next())) return true;
        } else {
            while (itr.hasNext()) if (o.equals(itr.next())) return true;
        }
        return false;
    }
    /***
     * @containsAll
     */
    public containsAll(collection: collection<T>): boolean {
        let itr: iterator<T> = collection.iterator();
        while (itr.hasNext()) if (!this.contains(itr.next())) return false;
        return true;
    }
    /***
     * @isEmpty
     */
    public isEmpty(): boolean {return this.size().equals(0);}
    /***
     * @iterator
     */
    public abstract iterator(): iterator<T>
    /***
     * @remove
     */
    public remove(value: Object): boolean {
        let itr: iterator<T> = this.iterator();
        if (Objects.isNull(value)) {
            while (itr.hasNext()) {
                if (itr.next() === null) {
                    itr.remove();
                    return true;
                }
            }
        } else
            while (itr.hasNext()) {
                let tmp:T;
                if (value.equals( tmp = itr.next())) {
                    itr.remove();
                    return true;
                }
            }
        return false;
    }
    /***
     * @removeAll
     */
    public removeAll(value: Object):boolean{
        return this.removeIf(new class implements predicate<T>{
            test = (o:T) => value.equals(o)
        });
    }
    /***
     * @removeAll
     */
    public retainAll(value: Object):boolean{
        return this.removeIf(new class implements predicate<T>{
            test = (o:T) => !value.equals(o)
        });
    }
    /***
     * @removeIf
     */
    public removeIf(predicate:predicate<T>):boolean{
        let itr: iterator<T> = this.iterator(),
            modified:boolean = false;

        while (itr.hasNext()) {
            if (predicate.test(itr.next())) {
                itr.remove();
                modified = true;
            }
        }
        return modified;
    }
    /***
     * @size
     */
    public abstract size(): number
    /***
     * @spliterator
     */
    public abstract spliterator(from?:number, to?:number): spliterator<T>;
    /***
     * @forEach
     */
    public forEach(consumer: consumer<T>): void {
        Objects.requireNotNull(consumer);
        if(typeof consumer == "function")consumer=Consumer.of(consumer);
        let itr: iterator<T> = this.iterator();
        while(itr.hasNext())consumer.accept(itr.next());
    }
    /**
     * */
    public stream(): Stream<T> {return StreamSupport.stream(<Spliterator<T>>this.spliterator(0));}
    /***
     *  @toArray
     */
    public toArray(): T[] {
        let itr: iterator<T> = this.iterator(),
            out: T[] = [], i: number = 0;
        while (itr.hasNext()) out[i++] = itr.next();
        //return out;
        return Arrays.copyOfRange(this.value,0,this.size());
    }
    /***
     * @toJson
     */
    public toJson(): MapType<any, any> {throw new UnsupportedOperationException(`toJson not implemented !`);}
    /***
     * @toString
     * @returns {string}
     */
    public toString(): string {
        let out:string = "", tmp:string, j:number=0,
            i:number= -1, itr: iterator<T> = this.iterator(),
            value:T, carry:boolean =false;

        if(this.size()===0) return "{}";
        while(itr.hasNext()){
            if( i > 80 ) { carry =true; i = 0; }
            value = itr.next();
            out += ( tmp = `${j++} = `+( value ? value.toString() : "NULL" )+( itr.hasNext() ? ", " :"")+( i === 0 ?"\n":""));
            i += tmp.length;
            if(j>=655535 ) break;
        }
        if(j==655535&&this.size()-655535>0) out +=`... and more ${this.size()-655535} elements` ;

        return "[ "+(carry?"\n":"")+ out.replace(/,\s*$/,"")+(carry?"\n":" ")+"]";
    }
}
Object.package(this);