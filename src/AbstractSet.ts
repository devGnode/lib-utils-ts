import {AbstractCollection} from "./AbstractCollection";
import {Set,iterator} from "./Interface";
import {Iterator} from "./Iterator";

/****
 * @value : protected T array
 */
export abstract class AbstractSet<V> extends AbstractCollection<V> implements Set<V>{


    constructor(){ super(); }
    /**
     * @add
     */
    public add(value: V): boolean {
        if(!this.contains(value)) this.value[this.size()] = value;
        return false;
    }

    public remove(value: Object): boolean {
        return super.remove(value);
    }
    /**
     * @iterator
     */
    public iterator(): iterator<V> {return new Iterator(this.value);}
}