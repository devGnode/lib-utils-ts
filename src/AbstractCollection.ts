import {collection, consumer, iterator, MapType, predicate, spliterator} from "./Interface";
import {UnsupportedOperationException} from "./Exception";
import {Consumer} from "./Consumer";
/***
 * @abstract
 * @AbstractCollection
 */
export abstract class AbstractCollection<T> implements collection<T> {

    protected abstract value:T[];
    /***
     *
     */
    constructor() {}
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
    }
    /***
     * @contains
     */
    public contains(o: Object): boolean {
        let itr: iterator<T> = this.iterator();
        if (o === null) {
            while (itr.hasNext()) if (Object.isNull(itr.next())) return true;
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
        if (Object.isNull(value)) {
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
    public abstract spliterator(): spliterator<T>;
    /***
     *  @toArray
     */
    public toArray(): T[] {
        let itr: iterator<T> = this.iterator(),
            out: T[] = [], i: number = 0;
        while (itr.hasNext()) out[i++] = itr.next();
        return out;
    }
    /***
     * @toJson
     */
    public toJson(): MapType<any, any> {throw new UnsupportedOperationException(`toJson not implemented !`);}
    /***
     * @toString
     */
    public abstract toString(): string
    /****/
    public forEach(consumer: consumer<T>): void {
        Object.requireNotNull(consumer);
        if(typeof consumer == "function")consumer=Consumer.of(consumer);
        let itr: iterator<T> = this.iterator();
        while(itr.hasNext())consumer.accept(itr.next());
    }
}