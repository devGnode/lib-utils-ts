import {
    array,
    Collection, List,
    ListKey, NativeExportable,
    Cloneable, ArrayListInterfaceA,
    Map, MapType, MapEntries,
    Set, streamLambdaK
} from "./Interface";
import {IndexOfBoundException, NullPointerException} from "./Exception";
import {ObjectStream, Stream} from "./stream";
import {Iterator, ListIterator} from "./Iterator";
import {Define} from "./Define";
/***
 * public AbstractCollection<E>
 */
export abstract class AbstractCollection<E> implements Collection<E>{
    /***
     *
     */
    protected value : array<E> = null;
    /***
     *
     * @param value
     */
    protected constructor( value : array<E> ) {this.value = value;}
    /***
     *
     * @param value
     */
    public add(value: E): boolean {this.value.push(value);return true;}
    /***
     *
     * @param collection
     */
    public addAll( collection : Collection<E> ): boolean {
        let tmp : Iterator<E> = collection.iterator();
        try{ while (tmp.hasNext()) this.value[this.value.length] = tmp.next();}catch (e) {
            return false;
        }
        return true;
    }
    /***
     *
     */
    public clear(): void {
        let itr : Iterator<E> = this.iterator();
        while( itr.hasNext() ) this.value.pop();
    }
    /***
     *
     * @param o
     */
    public contains(o: Object): boolean {
        let itr : Iterator<E> = this.iterator();
        while( itr.hasNext() ) if( itr.next() === (<E>o) ) return true;
        return false;
    }
    /***
     *
     * @param collection
     */
    public containsAll(collection: Collection<E>): boolean {
        let itr : Iterator<E> = collection.iterator();
        while( itr.hasNext() ) if( !this.contains(itr.next()) )return false;
        return true;
    }
    /***
     *
     * @param o
     */
    public equals(o: object): boolean {return this.value === o;}
    /***
     *
     */
    public isEmpty(): boolean {return this.size()===0;}
    /***
     *
     */
    public iterator(): Iterator<E> { return new Iterator<E>(this.value); }
    /***
     *
     * @param value
     */
    public remove(value: E): boolean {
        let to : number = this.value.indexOf(value);
        this.value = this.value
            .slice(0,Math.abs(to))
            .concat(this.value.slice( ( to<0? this.value.length-to:to )+1, this.value.length));
        return true;
    }
    /****
     *
     */
    public size( ) : number {return this.value?.length; }
    /**
     * @param
     */
     public toArray( ): array<E> {return this.value;}
    /***
     *
     */
    public toString( ):string{return this.value.toString();}
    /***
     *
     */
    public toJson(): MapType<any, any>{return {};}
}
/***
 * AbstractList<E>
 */
export abstract class AbstractList<E> extends AbstractCollection<E> implements List<E>,NativeExportable<E>{
    /***
     *
     */
    protected modCount : number = 0;
    /***
     *
     * @param value
     */
    protected constructor( value : array<E> ) {super(value);}
    /**
     *
     * @param index
     */
    public get(index: number): E {
        if( this.value[index]===undefined ) throw new IndexOfBoundException(`element ${index} not found`);
        return this.value[index];
    }
    /***
     *
     * @param value
     */
    public indexOf(value: object ): number {return this.value.indexOf((<any>value));}
    /***
     *
     * @param value
     */
    public lasIndexOf(value: object): number {return this.indexOf(value)-1;}
    /**
     * @param index
     * @param element
     */
    public set(index: number, element: E): E {
        Define.of<E>(element).orElseThrow(new NullPointerException("Element value is null"));
        this.get(index); // IndexOfBoundException
        return this.value[index] = element;
    }
    /***
     *
     */
    public listIterator( ): ListIterator<E> {return new ListIterator<E>(this.value);}
    /***
     *
     * @param from
     * @param to
     */
    public subList(from: number, to: number): List<E> {
        if( to === undefined ) to = from;
        this.value = this.value
            .slice(0,Math.abs(from))
            .concat(this.value.slice( ( to<0? this.value.length-to:to )+1, this.value.length));
        return this;
    }
    /***
     *
     */
    public shift( ) : E { return this.value.shift();}
    /***
     *
     */
    public pop( ): E{ return this.value.pop(); }
    /***
     *
     */
    public stream(): Stream<E> {return new Stream<E>(this.value);}
}

/***
 * ArrayList<E> 
 */
export class ArrayList<E> extends AbstractList<E> implements Cloneable<E>,List<E>,ArrayListInterfaceA<E>{
    /***
     *
     * @param value
     */
    constructor( value?: array<E>) {super(value||new Array<E>());}
    /****
     *
     */
    public clone(): ArrayList<E> {
        let out : ArrayList<E> = new ArrayList<E>(), itr : Iterator<E> = this.iterator();
        while(itr.hasNext())out.add(itr.next());
        return out;
    }
    /***
     *
     * @param value
     */
    public add(...value: E[]): boolean {
        let tmp : Iterator<E> = new Iterator(value);
        while (tmp.hasNext()) this.value[this.value.length] = tmp.next();
        return true;
    }
    /**
     *
     */
    public static of<T>( value : array<T>) : ArrayList<T>{ return new ArrayList<T>(value); }

}
/***
 * AbstractSet<E>
 */
export abstract class AbstractSet<E> extends AbstractCollection<E> implements Set<E>{
    /**
     * @param value
     */
    protected constructor( value : array<E>) {super(value);}
}
/**
 *
 */
export class SetList<E> extends AbstractSet<E>{
    constructor(value : array<E>) {super(value);}
}
/***
 *
 */
export class MapEntry<K,V> implements MapEntries<K,V>{
    /***
     *
     */
    private readonly key: K;
    private readonly value : V;
    /***
     *
     * @param key
     * @param value
     */
    constructor(key: K, value: V) {
        this.key    =key;
        this.value  =value;
    }
    /***
     *
     */
    public getKey(): K {return this.key;}
    /***
     *
     */
    public getValue(): V {return this.value;}
}

export abstract class AbstractMap<K extends string|number,V> implements Map<K,V>{
    /***
     *
     */
    protected value : MapType<K,V> = null;
    protected length : number = 0;
    /***
     *
     * @param value
     */
    protected constructor( value : MapType<K,V> ) {this.value = value;}
    /***
     *
     */
    public clear(): void {this.value = <any>{};}
    /***
     *
     * @param key
     */
    public containsKey(key: Object): boolean {
        return Stream.of(this.keySet().toArray())
            .anyMatch(value=>value===key);
    }
    /****
     *
     * @param value
     */
    public containsValue(value : V): boolean {
        return Stream.of(this.entrySet().toArray())
            .anyMatch( map=> map.getValue()===value);
    }
    /***
     *
     */
    public keySet(): Set<K> {
        let out : List<K> = new ArrayList();
        this.each((dummy, key)=>{out.add(key);});
        return new SetList<K>(out.toArray());
    }
    /***
     *
     * @param o
     */
    public equals(o: Object): boolean {return this.value===o;}
    /***
     *
     * @param callback
     */
    public each(callback : streamLambdaK<V,K>): V{
        let tmp : any,ret : any;
        try{for(tmp in this.value)if((ret = callback(this.value[tmp],tmp)))break;}catch (e) {
            console.warn(e)
        }
        return <V>ret;
    }
    /***
     *
     * @param key
     */
    public get(key: Object): V { this.length++; return this.value[<any>key];}
    /***
     *
     */
    public isEmpty(): boolean {return this.size()<=0;}
    /***
     *
     */
    public entrySet(): Set<MapEntry<K, V>> {
        let out : List<MapEntry<K,V>> = new ArrayList();
        this.each((value, key)=>{out.add(new MapEntry<K,V>(key,value));});
        return new SetList<MapEntry<K, V>>(out.toArray());
    }
    /***
     *
     * @param key
     * @param value
     */
    public put(key: K, value: V): V { this.length++; return this.value[key] = value;}
    /***
     *
     * @param o
     */
    public remove(o: Object): V {
       return this.each((value ,key)=>{
           if(String(o).equals(String(key))){
               let find : V = value;
               delete this.value[key];
               this.length--;
               return find;
           }
       });
    }
    /***
     *
     */
    public size(): number {return this.length;}
    /***
     *
     * for get a ArrayList just cast this value
     * like (<ArrayList<T>>valueCollection())
     */
    public valueCollection(): Collection<V> {
        let out : V[] = [];
        this.each(value=>{out.push(value);});
        return new ArrayList(out);
    }
    /**
     *
     */
    public stream(): ObjectStream<K, V> {return new ObjectStream(this.value);}

}

export class HashMap<K extends ListKey,V> extends AbstractMap<K , V>{
    /**
     *
     * @param value
     */
    constructor( value : MapType<K, V> ) {super(value);}
    /*
     *
     */
    public toJson(): MapType<any, any>{
        let out : MapType<any, any> = {}, tmp : MapEntry<K, V>,
            itr : Iterator<MapEntry<K, V>> = this.entrySet().iterator();
        while( itr.hasNext() ){
            tmp = itr.next();
            if( tmp.getValue() instanceof HashMap) out[tmp.getKey()] =(<any>tmp.getValue()).toJson();
            else if( tmp.getValue() instanceof ArrayList) out[tmp.getKey()]= (<any>tmp.getValue()).toArray();
            else{
                out[tmp.getKey()]=tmp.getValue();
            }
        }
        return out;
    }
    /***
     *
     */
    public static of<K  extends ListKey,V>( value : any ): HashMap<K, V> { return new HashMap<K,V>(value); }
}