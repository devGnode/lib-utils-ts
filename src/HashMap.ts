import {collection, consumer, iterator, List, Map, MapEntries, Set, spliterator} from "./Interface";
import {Consumer} from "./Consumer";
import {RuntimeException, UnsupportedOperationException} from "./Exception";
import {Iterator} from "./Iterator";
import {AbstractMap} from "./AbtsractHashMap";
import {AbstractSet} from "./AbstractSet";
import {Spliterators} from "./Spliterators";
import {ArrayList} from "./ArrayList";
/***
 *
 */
interface Node<K,V> extends MapEntries<K,V> {
    key:K;
    value:V;
    next:Node<K,V>
}
/***
 *
 */
class EntrySet<E> extends AbstractSet<E> implements Set<E>{

    protected value: E[];

    public addAll(collection: collection<E>): boolean {
        return false;
    }

    iterator(): iterator<E> {throw new UnsupportedOperationException("not supported !");}

    size(): number {return 0;}

    spliterator(): spliterator<E> {
        return undefined;
    }

    public toString(): string {return Object.toString(this);}

}

export class HashMap<K,V> extends AbstractMap<K,V> implements Map<K, V>{

    protected sizeOf: number = 0;
    protected value: Node<K, V>;

    private lastMapEntries: MapEntries<K, V>[] = [];

    public put(key: K, value: V): V {
        let exists:boolean = false;

       // console.log(key, value);
        if(Object.isNull(this.value)) this.value = new HashMap.Node<K,V>(key,value);
        else{
            let tmp:Node<K, V> = this.value;
            while ( tmp ){
                if(Object.isNull(tmp.next)) {
                    tmp.next = new HashMap.Node<K,V>(key,value);
                    break;
                }
                if( ( exists= (tmp = tmp.next).key.equals(key) ) && !tmp.value.equals(value) ) {
                    tmp.setValue(value);
                    break;
                }
            }
        }
        if(!exists)this.sizeOf++;
        return value;
    }

    public get(key: Object): V {
        let found:boolean= false,
            tmp:Node<K, V>;

        if(this.sizeOf===0) return null;
        if(this.sizeOf===1) return this.value.key.equals(key) ? this.value.value : null;
        else{
            tmp = this.value;
            while ( tmp ){
                if( tmp.key.equals(key) ) {
                    found=true;
                    break;
                }
                // next
                if(Object.isNull(tmp.next)) break;
                tmp = tmp.next;
            }
        }
        return found?tmp.value:null;
    }
    /****
     *
     */
    private static Node = class Node<K,V> implements MapEntries<K,V>{
        key:K;
        value:V;
        next:Node<K,V>

        public constructor(key:K, value:V, next:Node<K, V> = null ) {
            this.key    = key
            this.value  = value;
            this.next   = next;
        }

        getKey(): K {return this.key;}

        getValue(): V {return this.value;}

        setValue(value: V): V {return this.value=value;}

        equals(o:Object):boolean{
            return null;
        }

        toString():string{
            return `${this.key} = ${this.value}`;
        }

    }
    /****
     *
     */
    private static EntrySet = class EntrySet<E> extends AbstractSet<E> implements Set<E>{

        protected value: E[];

        public addAll(collection: collection<E>): boolean {
            return false;
        }
        /***
         *
         */
        public size(): number {return null;}
        /***
         *
         */
        public spliterator(): spliterator<E> {return new Spliterators.ArraySpliterator(this.value,0,null, null);}
        /***
         *
         */
        public toString(): string {return Object.toString(this);}

    }

    public remove(o: Object): V {
        let found:boolean= false,
            last:Node<K, V>,current:Node<K, V>, next:Node<K, V>;

        if(this.sizeOf===0) return null;
        if(this.sizeOf===1) {
            if( this.value.value.equals(o) ){
                let value:V = this.value.value;
                if( this.value.next ) this.value =  this.value.next ? this.value.next : null;
                --this.sizeOf;
                return value;
            }
        } else{
            current = this.value;
            while ( current ){
                if( current.value.equals(o) ) {
                    found=true;
                    break;
                }
                // next
                last = current;
                if(Object.isNull(current.next)) break;
                current = current.next;
            }
            next = current.next;
            console.log(found, "founder", last, "CURENT", current, "NEXT" ,next )
            if(found){
                if(Object.isNull(last)&&current){
                    console.log("herere")
                    if(next) this.value = next;
                    else this.value = null;

                }
                if(last!=current&&next&&last){
                    console.log("herere---11")
                    last.next = next;
                }
                else if(last!==current&&Object.isNull(next)&&last){
                    last.next = null;
                }else{
                    throw new RuntimeException(``);
                }
                --this.sizeOf;
                current.next = null;
            }
        }
        return null;
    }

    /****
     *
     */
    private nodeToArray():MapEntries<K, V>[]{
        let tmp:Node<K, V>, out:MapEntries<K, V>[] = [];

        if(this.lastMapEntries.length===this.sizeOf) return this.lastMapEntries;
        if(this.sizeOf===0) return [];
        if(this.sizeOf===1) return [this.value];
        else{
            tmp = this.value;
            while ( tmp ){
                out.push(tmp);
                // next
                if(Object.isNull(tmp.next)) break;
                tmp = tmp.next;
            }
        }
        // temporize
        return this.lastMapEntries=out;
    }

    public entrySet(): Set<MapEntries<K, V>> {
        let slf:this = this;
        return  new class EntrySet extends HashMap.EntrySet<MapEntries<K, V>> implements Set<MapEntries<K, V>>{

                constructor() {
                    super();
                   this.value = slf.nodeToArray();
                }

                remove(value: Object): boolean {
                    slf.remove(value);
                    return true;
                }

                public size(): number {return slf.sizeOf;}

                public forEach(consumer: consumer<MapEntries<K, V>>) {
                    Object.requireNotNull(consumer);
                    if(typeof consumer === "function") consumer = Consumer.of(consumer);
                    if(!Object.isNull(slf)){
                        let tmp:Node<K, V> = slf.value;

                        while ( tmp ){
                            consumer.accept(tmp)
                            // next
                            tmp = tmp.next;
                        }
                    }
                }
                /***/
        };
    }

    public keySet(): Set<K> {
        let slf:this = this, tmp: K[] = [];
        let itr:iterator<MapEntries<K, V>> = new Iterator( this.lastMapEntries );
        while(itr.hasNext())tmp.push(itr.next().getKey());
        return new class SetEntry extends AbstractSet<K> implements Set<K>{

            protected value: K[] = tmp;

            public size(): number {return slf.sizeOf;}

            public addAll(collection: collection<K>): boolean {
                return false;
            }

            public spliterator(): spliterator<K> {return new Spliterators.ArraySpliterator(tmp);}

            public toString(): string {
                throw new Error("Method not implemented.");
            }

        }
    }

    public valueCollection(): collection<V> {
        let tmp:Node<K, V>, out: List<V> = new ArrayList();

        if(this.sizeOf===0) return out;
        else{
            tmp = this.value;
            while ( tmp ){
                out.add(tmp.value);
                if(Object.isNull(tmp.next)) break;
                tmp = tmp.next;
            }
        }
        return out;
    }

}