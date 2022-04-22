import {collection, MapEntries, Map, Set, iterator, List} from "../Interface";
import {ArrayList} from "./ArrayList";
import {Objects} from "../type/Objects";

interface Node<K,V> extends MapEntries<K,V> {
    key:K;
    value:V;
    next:Node<K,V>
}

export abstract class AbstractMap<K,V> implements Map<K, V>{

    protected abstract sizeOf:number;
    protected abstract value:Node<K,V>;
    /***
     *
     */
    public clear(): void {
        let sItr: iterator<MapEntries<K, V>> = this.entrySet().iterator();
        while (sItr.hasNext()){
            sItr.next();
            sItr.remove();
        }
        this.sizeOf = 0;
    }
    /***
     *
     * @param {K} key
     * @returns {boolean}
     */
    public containsKey(key: K): boolean {
        if(this.sizeOf===0) return false;
        let entry: iterator<MapEntries<K, V>> = this.entrySet().iterator(),
        isNull:boolean = Objects.isNull(key), value:K;

        while (entry.hasNext()){
            value = entry.next().getKey();
            if(isNull){
                if(value===null) return true;
            }else if(value.equals(key)) {
                return true;
            }
        }
        return false;
    }
    /***
     *
     * @param {V} value
     * @returns {boolean}
     */
    public containsValue(value: V): boolean {
        if(this.sizeOf===0) return false;
        let entry: iterator<MapEntries<K, V>> = this.entrySet().iterator(),
            isNullValue:boolean = Objects.isNull(value), tmp:V;

        while (entry.hasNext()){
            tmp = entry.next().getValue();
            if(isNullValue){
                if(tmp===null) return true;
            }else if(tmp.equals(value)) return true;
        }
        return false;
    }
    /***
     *
     * @returns {Set<MapEntries<K, V>>}
     */
    public abstract entrySet(): Set<MapEntries<K, V>>
    /***
     *
     * @param {Object} key
     * @returns {V}
     */
    public abstract get(key: Object): V;

    /***
     *
     * @returns {boolean}
     */
    public isEmpty(): boolean {return this.sizeOf === 0;}

    keySet(): Set<K> {
        let setMap:Set<MapEntries<K, V>> = this.entrySet();
        let itr:iterator<MapEntries<K,V>> =  setMap.iterator();
        while(itr.hasNext()){

        }
        return undefined;
    }
    /***
     *
     * @param {K} key
     * @param {V} value
     * @returns {V}
     */
    public abstract put(key: K, value: V): V;
    /***
     *
     * @param {Object} o
     * @returns {V}
     */
    public abstract remove(o: Object): V;

    /***
     *
     */
    public putAll( map:Map<K, V> ): void{
        let itr: iterator<MapEntries<K, V>> = map.entrySet().iterator(),
        tmp: MapEntries<K, V>;
        while(itr.hasNext()){
            tmp = itr.next();
            this.put(tmp.getKey(),tmp.getValue());
        }
    }
    /***
     *
     * @returns {number}
     */
    public size(): number {return this.sizeOf;}
    /****
     *
     * @returns {collection<V>}
     */
    public valueCollection(): collection<V> {
        let tmp:Node<K, V>, out: List<V> = new ArrayList();

        if(this.sizeOf===0) return out;
        else{
            tmp = this.value;
            while ( tmp ){
                out.add(tmp.value);
                if(Objects.isNull(tmp = tmp.next)) break;
            }
        }
        return out;
    }
}
//Object.package(this);