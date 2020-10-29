import { ArrayList } from "./List";
import { array, ArrayStream, lambdaType, MapType, OptionalMapInterface, predication, StreamAble, streamLambda, streamLambdaK } from "./Interface";
import { Optional } from "./Optional";
import { Iterator, ListIterator } from "./Iterator";
export declare class Stream<T> implements ArrayStream<T>, OptionalMapInterface<T, Stream<T>> {
    private readonly list;
    private findLimit;
    constructor(value?: array<T>);
    each(callback: streamLambda<T>): Stream<T>;
    mapTo<U>(callback: lambdaType<T, U>): Stream<U>;
    map(callback: streamLambda<T>): Stream<T>;
    mapToInt(callback: streamLambda<T>): Stream<Number>;
    filter(callback?: predication<T>): Stream<T>;
    limit(limit?: Number): Stream<T>;
    findFirst(): Optional<T>;
    findAny(): Optional<T>;
    allMatch(callback?: predication<T>): boolean;
    anyMatch(callback?: predication<T>): boolean;
    noneMatch(callback?: predication<T>): boolean;
    hasPeer(): boolean;
    count(): number;
    sum(): Optional<Number>;
    min(): Optional<Number>;
    max(): Optional<Number>;
    sorted(): void;
    getList(): ArrayList<T>;
    toArray(): array<T>;
    iterator(): Iterator<T>;
    listIterator(): ListIterator<T>;
    static of<T>(list: array<T>): Stream<T>;
}
export declare abstract class AbstractObjectStream<K extends string | number, V> implements StreamAble<K, V> {
    private readonly list;
    private findLimit;
    protected constructor(value: MapType<K, V>);
    each(callback: streamLambdaK<V, K>): ObjectStream<K, V>;
    filter(predicate?: predication<V>): ObjectStream<K, V>;
    mapTo<U>(callback: streamLambdaK<U, K>): StreamAble<K, U>;
    map(callback: streamLambdaK<V, K>): StreamAble<K, V>;
    findAny(): Optional<V>;
    findFirst(): Optional<V>;
    limit(limit: number): ObjectStream<K, V>;
    noneMatch(callback: predication<V>): boolean;
    allMatch(callback: predication<V>): boolean;
    anyMatch(callback: predication<V>): boolean;
    count(): number;
    static of<K extends string | number, V>(list: MapType<K, V>): ObjectStream<K, V>;
}
export declare class ObjectStream<K extends string | number, V> extends AbstractObjectStream<K, V> {
    constructor(value: MapType<K, V>);
}
