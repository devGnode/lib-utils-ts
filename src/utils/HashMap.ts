import {collection, consumer, iterator, ListKey, Map, MapEntries, MapType, Set, spliterator} from "../Interface";
import {Consumer} from "../Consumer";
import {MethodNotFoundException, RuntimeException, UnsupportedOperationException} from "../Exception";
import {Iterator} from "./Iterator";
import {AbstractMap} from "./AbtsractMap";
import {AbstractSet} from "./AbstractSet";
import {Spliterators} from "./Spliterators";
import {Arrays} from "../type/Arrays";
import {Objects} from "../type/Objects";
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
    protected offset: number = 0;

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

    public constructor() {super();}

    public put(key: K, value: V): V {
        let exists:boolean = false;

        if(Objects.isNull(this.value)) this.value = new HashMap.Node<K,V>(key,value);
        else{
            let tmp:Node<K, V> = this.value;
            while ( tmp ){
                if(Objects.isNull(tmp.next)) {
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
            if(Objects.isNull(key)){
                tmp = this.value;
                while ( tmp ){
                    if( tmp.key === null ) {
                        found=true;
                        break;
                    }
                    if(Objects.isNull(tmp = tmp.next)) break;
                }
            }else{
                tmp = this.value;
                while ( tmp ){
                    if( tmp.key.equals(key) ) {
                        found=true;
                        break;
                    }
                    // next
                    if(Objects.isNull(tmp = tmp.next)) break;
                }
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
        next:Node<K,V>;

        public constructor(key:K, value:V, next:Node<K, V> = null ) {
            this.key    = key;
            this.value  = value;
            this.next   = next;
        }

        public getKey(): K {return this.key;}

        public getValue(): V {return this.value;}

        public setValue(value: V): V {return this.value=value;}

        public equals(o:Object):boolean{
            if(Objects.isNull(o)) return false;
            if( o instanceof Node )if(this.key.equals(o.key)&&this.value.equals(o.value)) return true;
            return false;
        }

        public toString():string{return `${this.key} = ${this.value}`;}

    }
    /****
     *
     */
    private static EntrySet = class EntrySet<E> extends AbstractSet<E> implements Set<E>{

        protected value: E[];
        protected offset: number = 0;
        /***
         *
         */
        public size(): number {return null;}
        /***
         *
         */
        public spliterator(): spliterator<E> {return new Spliterators.ArraySpliterator(this.value,0,this.size());}
        /***
         *
         */
        public toString(): string {
           let out:string = "", tmp:string, j:number=0,
                i:number= -1, itr: iterator<E> = this.iterator(),
                value:E, carry:boolean =false;

            if(this.size()===0) return "{}";
            while(itr.hasNext()){
                if( i > 80 ) { carry =true; i = 0; }
                value = itr.next();
                out += ( tmp = ( value ? value.toString() : "NULL" )+( itr.hasNext() ? ", " :"")+( i === 0 ?"\n":""));
                i += tmp.length;
                if(j++>=655535 ) break;
            }
            if(j==655535&&this.size()-655535>0) out +=`... and more ${this.size()-655535} elements` ;

            return "[ "+(carry?"\n":"")+ out.replace(/,\s*$/,"")+(carry?"\n":" ")+"]";
        }

    }

    public remove(o: Object): V {
        let found:boolean= false,
            last:Node<K, V>,current:Node<K, V>, next:Node<K, V>;

        if(this.sizeOf===0) return null;
        if(this.sizeOf===1) {
            if( this.value.value.equals(o) ){
                let value:V = this.value.value;
                this.value =  null;
                --this.sizeOf;
                return value;
            }
        } else{
            current = this.value;
            let isNull:boolean = Objects.isNull(o);
            while ( current ){
                if(isNull){
                    if(current.value===null) found = true;
                }else if( current.value.equals(o) ) {
                    found=true;
                    break;
                }
                // next
                last = current;
                if(Objects.isNull(current.next)||found) break;
                current = current.next;
            }
            next = current.next;
            if(found){
                if(Objects.isNull(last)&&current){
                    if(next) this.value = next;
                    else this.value = null;
                }
                else if(last!=current&&next&&last){
                    last.next = next;
                }
                else if(last!==current&&Objects.isNull(next)&&last){
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
    /***
     * @nodeToArray
     * @returns {MapEntries<K, V>[]}
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
                if(Objects.isNull(tmp = tmp.next)) break;
            }
        }
        // temporize
        return this.lastMapEntries=out;
    }
    /***
     * @entrySet
     * @returns {Set<MapEntries<K, V>>}
     */
    public entrySet(): Set<MapEntries<K, V>> {
        let slf: this = this;
        return new class EntrySet extends HashMap.EntrySet<MapEntries<K, V>> implements Set<MapEntries<K, V>> {

            constructor() {
                super();
                this.value = slf.nodeToArray();
                this.offset = 0;
            }

            public remove(value: Object): boolean {
                let c: MapEntries<K, V> = <MapEntries<K, V>>value;
                if (Objects.isNull(c.getKey) || Objects.isNull(c.getValue)) throw new MethodNotFoundException(`Bad implementation of interface MapEntries`);
                if (super.remove(value)) {
                    slf.lastMapEntries = Arrays.copyOfRange(this.value, 0, this.value.length);
                    return true;
                }
                return false;
            }

            public size(): number {return slf.sizeOf;}

            public forEach(consumer: consumer<MapEntries<K, V>>) {
                Objects.requireNotNull(consumer);
                if (typeof consumer === "function") consumer = Consumer.of(consumer);
                if (!Objects.isNull(slf)) {
                    let tmp: Node<K, V> = slf.value;

                    while (tmp) {
                        consumer.accept(tmp);
                        tmp = tmp.next;
                    }
                }
            }

            public iterator(): iterator<MapEntries<K, V>> {
                let slfSet: this = this;
                return new class extends Iterator<MapEntries<K, V>> implements iterator<MapEntries<K, V>> {

                    constructor() {
                        super(slfSet.value, 0, slfSet.offset);
                    }

                    /***
                     * @override
                     */
                    public remove(): void {
                        let lenCtrl: number = slfSet.value.length,
                            key: number = this.iteration;

                        if (this.iteration - 1 >= 0) --key;
                        console.log("999999", this.list);
                        //   slf.remove(this.get(key).getValue());

                        // slfSet.value = this.list;
                        slf.remove(this.get(key).getValue());
                        super.remove();
                        slf.lastMapEntries = slfSet.value = Arrays.remove(slfSet.value, key);
                        if (lenCtrl - slfSet.value.length === 1) --slfSet.offset;

                    }
                }
            }

            lasIndexOf(value: object): number {
                return 0;
            }
        };
    }
    /***
     * @keySet
     * @returns {Set<K>}
     */
    public keySet(): Set<K> {
        let slf:this = this, tmp: K[] = [];
        let itr:iterator<MapEntries<K, V>> = new Iterator(this.nodeToArray());
        while(itr.hasNext())tmp.push(itr.next().getKey());
        return new class SetEntry extends AbstractSet<K> implements Set<K>{

            protected value: K[]     = tmp;
            protected offset: number = 0;

            public spliterator(): spliterator<K> {return new Spliterators.ArraySpliterator(tmp);}

            public remove(value: Object): boolean {
                if( super.remove(value) ){
                    slf.remove(slf.get(value));
                    //slf.lastMapEntries = this.value;
                    return true;
                }
                return false;
            }

            public size(): number {return slf.sizeOf;}

            lasIndexOf(value: object): number {
                return 0;
            }

        }
    }
    /***
     * @toString
     * @returns {string}
     */
    public toString():string{return this.entrySet().toString();}
    /****
     *
     * @param {MapType<K, V>} value
     * @returns {HashMap<K, V>}
     */
    public static of<K extends ListKey, V>(value:MapType<K, V>):HashMap<K, V>{
        let hash:HashMap<K, V> = new HashMap(), tmp:K;
        for( tmp in value)hash.put(tmp,value[tmp]);
        return hash;
    }
}
Object.package(this);