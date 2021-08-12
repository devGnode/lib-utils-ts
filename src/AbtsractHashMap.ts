import {collection, MapEntries, Map, Set, iterator} from "./Interface";

interface Node<K,V> extends MapEntries<K,V> {
    key:K;
    value:V;
    next:Node<K,V>
}

export abstract class AbstractMap<K,V> implements Map<K, V>{

    protected abstract sizeOf:number;
    protected abstract value:Node<K,V>;


    public clear(): void {
        let node:Node<K, V>; let i :number=0;
        while( (node = <Node<K, V>>this.value.next) ){
            node.setValue(null);
            this.sizeOf--;
            i++;
        }
    }

    containsKey(key: K): boolean {
        if(this.sizeOf===0) return false;
        /*   let node:Node<K, V>; let i :number=0;
           while( (node = <Node<K, V>>this.value[i]) ){
               if( Object.equals( node.getKey(), key ) )return true;
               i++;
           }
           return false;*/
        return false;
    }

    containsValue(value: V): boolean {
        /*  if(this.value.length===0) return false;
          let node:Node<K, V>; let i :number=0;
          while( (node = <Node<K, V>>this.value[i]) ){
              if( Object.equals( node.getKey(), value ) )return true;
              i++;
          }
          return false;*/
        return false;
    }

    public abstract entrySet(): Set<MapEntries<K, V>>

    get(key: Object): V {
        return undefined;
    }

    public isEmpty(): boolean {return this.sizeOf === 0;}

    keySet(): Set<K> {
        let setMap:Set<MapEntries<K, V>> = this.entrySet();
        let itr:iterator<MapEntries<K,V>> =  setMap.iterator();
        while(itr.hasNext()){

        }
        return undefined;
    }

    put(key: K, value: V): V {
        if(this.containsKey(key)){}
        return undefined;
    }

    remove(o: Object): V {
        return undefined;
    }

    public size(): number {return this.sizeOf;}

    valueCollection(): collection<V> {
        return undefined;
    }

}