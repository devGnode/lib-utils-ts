import { ArrayList } from "./List";
import { array, ArrayStream, lambdaType, objectLikeArray, OptionalMapInterface, predication, StreamAble, streamLambda } from "./Interface";
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
export declare class ObjectStream<T> implements StreamAble<T, ObjectStream<T>>, OptionalMapInterface<T, ObjectStream<T>> {
    private readonly list;
    private findLimit;
    constructor(value?: objectLikeArray<T>);
    map(callback: streamLambda<T>): ObjectStream<T>;
    allMatch(callback?: predication<T>): boolean;
    anyMatch(callback?: predication<T>): boolean;
    count(): number;
    each(callback: streamLambda<T>): ObjectStream<T>;
    filter(predicate?: predication<T>): ObjectStream<T>;
    findAny(): Optional<T>;
    findFirst(): Optional<T>;
    limit(): Stream<T>;
    noneMatch(callback?: predication<T>): boolean;
}
