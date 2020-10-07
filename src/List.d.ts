import { array, ArrayListInterface, LinkedListInterface, ListKey, objectLikeArray, streamLambda } from "./Interface";
import { Stream } from "./stream";
import { Iterator, ListIterator } from "./Iterator";
declare class AbstractArrayList<T> implements ArrayListInterface<T> {
    protected list: array<T>;
    constructor(list?: array<T>);
    get(key?: ListKey): T;
    clear(): void;
    size(): number;
    isEmpty(): boolean;
    stream(): Stream<T>;
    remove(from: number, to?: number): void;
    iterator(): Iterator<T>;
    listIterator(index?: number): ListIterator<T>;
    contains(o: Object): boolean;
    indexOf(object: Object): number;
    clone(): ArrayList<T>;
    toArray(): array<T>;
    set(key: number, value: T): T;
    static of<T>(list: array<T>): List<T>;
    toString(): string;
}
export declare class ArrayList<T> extends AbstractArrayList<T> {
    constructor(list?: array<T>);
    add(...value: T[]): void;
}
export declare type List<T> = ArrayList<T>;
/***
 * LinkedList
 */
export declare class LinkedList<V> implements LinkedListInterface<V> {
    protected list: objectLikeArray<V>;
    protected length: number;
    /***
     * Constructor
     */
    constructor();
    put(key: ListKey, value: V): void;
    delete(key: ListKey): void;
    count(): number;
    each(callback: streamLambda<V>): void;
    clear(): void;
    static of<V>(list: array<V> | {}): LinkedList<V>;
    get(key: string | number): V;
}
export declare class HashMap<V> extends LinkedList<V> {
    constructor();
    static of<V>(list: array<V> | {}): HashMap<V>;
}
export {};
