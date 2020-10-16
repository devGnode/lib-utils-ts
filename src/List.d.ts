import { array, Collection, List, ListKey, NativeExportable, Cloneable, ArrayListInterfaceA, Map, MapType, MapEntries, Set, streamLambdaK, StreamAble } from "./Interface";
import { Stream } from "./stream";
import { Iterator, ListIterator } from "./Iterator";
/***
 * public AbstractCollection<E>
 */
export declare abstract class AbstractCollection<E> implements Collection<E> {
    /***
     *
     */
    protected value: array<E>;
    /***
     *
     * @param value
     */
    protected constructor(value: array<E>);
    /***
     *
     * @param value
     */
    add(value: E): boolean;
    /***
     *
     * @param collection
     */
    addAll(collection: Collection<E>): boolean;
    /***
     *
     */
    clear(): void;
    /***
     *
     * @param o
     */
    contains(o: Object): boolean;
    /***
     *
     * @param collection
     */
    containsAll(collection: Collection<E>): boolean;
    /***
     *
     * @param o
     */
    equals(o: object): boolean;
    /***
     *
     */
    isEmpty(): boolean;
    /***
     *
     */
    iterator(): Iterator<E>;
    /***
     *
     * @param value
     */
    remove(value: E): boolean;
    /****
     *
     */
    size(): number;
    /**
     * @param
     */
    toArray(): array<E>;
    /***
     *
     */
    toString(): string;
    /***
     *
     */
    toJson(): MapType<any, any>;
}
/***
 * AbstractList<E>
 */
export declare abstract class AbstractList<E> extends AbstractCollection<E> implements List<E>, NativeExportable<E> {
    /***
     *
     */
    protected modCount: number;
    /***
     *
     * @param value
     */
    protected constructor(value: array<E>);
    /**
     *
     * @param index
     */
    get(index: number): E;
    /***
     *
     * @param value
     */
    indexOf(value: object): number;
    /***
     *
     * @param value
     */
    lasIndexOf(value: object): number;
    /**
     * @param index
     * @param element
     */
    set(index: number, element: E): E;
    /***
     *
     */
    listIterator(): ListIterator<E>;
    /***
     *
     * @param from
     * @param to
     */
    subList(from: number, to: number): List<E>;
    /***
     *
     */
    shift(): E;
    /***
     *
     */
    pop(): E;
    /***
     *
     */
    stream(): Stream<E>;
}
/***
 * ArrayList<E>
 */
export declare class ArrayList<E> extends AbstractList<E> implements Cloneable<E>, List<E>, ArrayListInterfaceA<E> {
    /***
     *
     * @param value
     */
    constructor(value?: array<E>);
    /****
     *
     */
    clone(): ArrayList<E>;
    /***
     *
     * @param value
     */
    add(...value: E[]): boolean;
    /**
     *
     */
    static of<T>(value: array<T>): ArrayList<T>;
}
/***
 * AbstractSet<E>
 */
export declare abstract class AbstractSet<E> extends AbstractCollection<E> implements Set<E> {
    /**
     * @param value
     */
    protected constructor(value: array<E>);
}
/**
 *
 */
export declare class SetList<E> extends AbstractSet<E> {
    constructor(value: array<E>);
}
/***
 *
 */
export declare class MapEntry<K, V> implements MapEntries<K, V> {
    /***
     *
     */
    private readonly key;
    private readonly value;
    /***
     *
     * @param key
     * @param value
     */
    constructor(key: K, value: V);
    /***
     *
     */
    getKey(): K;
    /***
     *
     */
    getValue(): V;
}
export declare abstract class AbstractMap<K extends string | number, V> implements Map<K, V> {
    /***
     *
     */
    protected value: MapType<K, V>;
    protected length: number;
    /***
     *
     * @param value
     */
    protected constructor(value: MapType<K, V>);
    /***
     *
     */
    clear(): void;
    /***
     *
     * @param key
     */
    containsKey(key: Object): boolean;
    /****
     *
     * @param value
     */
    containsValue(value: V): boolean;
    /***
     *
     */
    keySet(): Set<K>;
    /***
     *
     * @param o
     */
    equals(o: Object): boolean;
    /***
     *
     * @param callback
     */
    each(callback: streamLambdaK<V, K>): V;
    /***
     *
     * @param key
     */
    get(key: Object): V;
    /***
     *
     */
    isEmpty(): boolean;
    /***
     *
     */
    entrySet(): Set<MapEntry<K, V>>;
    /***
     *
     * @param key
     * @param value
     */
    put(key: K, value: V): V;
    /***
     *
     * @param o
     */
    remove(o: Object): V;
    /***
     *
     */
    size(): number;
    /***
     *
     * for get a ArrayList just cast this value
     * like (<ArrayList<T>>valueCollection())
     */
    valueCollection(): Collection<V>;
    /**
     *
     */
    stream(): StreamAble<K, V>;
}
export declare class HashMap<K extends ListKey, V> extends AbstractMap<K, V> {
    /**
     *
     * @param value
     */
    constructor(value: MapType<K, V>);
    toJson(): MapType<any, any>;
    /***
     *
     */
    static of<K extends ListKey, V>(value: any): HashMap<K, V>;
}
