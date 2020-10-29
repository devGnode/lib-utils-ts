import { array, Collection, List, ListKey, NativeExportable, Cloneable, ArrayListInterfaceA, Map, MapType, MapEntries, Set, streamLambdaK, StreamAble } from "./Interface";
import { Stream } from "./stream";
import { Iterator, ListIterator } from "./Iterator";
export declare abstract class AbstractCollection<E> implements Collection<E> {
    protected value: array<E>;
    protected constructor(value: array<E>);
    add(value: E): boolean;
    addAll(collection: Collection<E>): boolean;
    clear(): void;
    contains(o: Object): boolean;
    containsAll(collection: Collection<E>): boolean;
    equals(o: object): boolean;
    isEmpty(): boolean;
    iterator(): Iterator<E>;
    remove(value: E): boolean;
    size(): number;
    toArray(): array<E>;
    toString(): string;
    toJson(): MapType<any, any>;
}
export declare abstract class AbstractList<E> extends AbstractCollection<E> implements List<E>, NativeExportable<E> {
    protected modCount: number;
    protected constructor(value: array<E>);
    get(index: number): E;
    indexOf(value: object): number;
    lasIndexOf(value: object): number;
    set(index: number, element: E): E;
    listIterator(): ListIterator<E>;
    subList(from: number, to: number): List<E>;
    shift(): E;
    pop(): E;
    stream(): Stream<E>;
}
export declare class ArrayList<E> extends AbstractList<E> implements Cloneable<E>, List<E>, ArrayListInterfaceA<E> {
    constructor(value?: array<E>);
    clone(): ArrayList<E>;
    add(...value: E[]): boolean;
    static of<T>(value: array<T>): ArrayList<T>;
}
export declare abstract class AbstractSet<E> extends AbstractCollection<E> implements Set<E> {
    protected constructor(value: array<E>);
}
export declare class SetList<E> extends AbstractSet<E> {
    constructor(value: array<E>);
}
export declare class MapEntry<K, V> implements MapEntries<K, V> {
    private readonly key;
    private readonly value;
    constructor(key: K, value: V);
    getKey(): K;
    getValue(): V;
}
export declare abstract class AbstractMap<K extends string | number, V> implements Map<K, V> {
    protected value: MapType<K, V>;
    protected length: number;
    protected constructor(value: MapType<K, V>);
    clear(): void;
    containsKey(key: Object): boolean;
    containsValue(value: V): boolean;
    keySet(): Set<K>;
    equals(o: Object): boolean;
    each(callback: streamLambdaK<V, K>): V;
    get(key: Object): V;
    isEmpty(): boolean;
    entrySet(): Set<MapEntry<K, V>>;
    put(key: K, value: V): V;
    remove(o: Object): V;
    size(): number;
    valueCollection(): Collection<V>;
    stream(): StreamAble<K, V>;
}
export declare class HashMap<K extends ListKey, V> extends AbstractMap<K, V> {
    constructor(value: MapType<K, V>);
    toJson(): MapType<any, any>;
    static of<K extends ListKey, V>(value: any): HashMap<K, V>;
}
