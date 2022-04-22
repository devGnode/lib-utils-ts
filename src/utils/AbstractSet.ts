import {AbstractCollection} from "./AbstractCollection";
import {Set, iterator, collection} from "../Interface";
import {Iterator} from "./Iterator";
import {Arrays} from "../type/Arrays";
/****
 * @value : protected T array
 */
export abstract class AbstractSet<V> extends AbstractCollection<V> implements Set<V>{
    /****
     *
     */
    constructor(){ super(); }
    /**
     * @add
     */
    public add(value: V): boolean {
        if(!this.contains(value)) {
            this.value[this.offset++] = value;
            return true;
        }
        return false;
    }
    /****
     *
     */
    public addAll(collection: collection<V>): boolean {
        let itr: iterator<V> = this.iterator(),
            dup:boolean=false;
        while (itr.hasNext()) if( !this.add(itr.next()) ) dup = true;

        return dup;
    }
    /**
     * @iterator
     * used by superclass for some task so do not
     * use remove method in them.
     */
    public iterator(): iterator<V> {
        let slf:this = this;
        return new class extends Iterator<V> implements iterator<V>{

            constructor() {super(slf.value, 0, slf.offset);}
            /***
             * @override
             */
            public remove(): void {
                let lenCtrl:number = slf.value.length;

                slf.value = Arrays.remove(slf.value, this.iteration - 1 );
                if(lenCtrl-slf.value.length === 1 ) {
                    --this.end;
                    --this.iteration;
                    --slf.offset;
                }
            }
        }
    }
    /***
     *
     * @returns {number}
     */
    public size(): number {return this.offset;}

}
Object.package(this);