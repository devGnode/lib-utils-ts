import { lambdaType, OptionalInterface, OptionalMapInterface, predication, streamLambda } from "./Interface";
export declare class Optional<T> implements OptionalInterface<T>, OptionalMapInterface<T, Optional<T>> {
    protected value: T;
    constructor(value: T);
    isPresent(): boolean;
    isEmpty(): boolean;
    equals(obj: Object): boolean;
    get(): T;
    map(callback: streamLambda<T>): Optional<T>;
    mapTo<U>(callback: lambdaType<T, U>): Optional<U>;
    filter(predicate: predication<T>): Optional<T>;
    orElse(other: T): T;
    orElseThrow(other: any): T;
    static of<T>(value: T): Optional<T>;
    static ofNullable<T>(value: T): Optional<T>;
}
