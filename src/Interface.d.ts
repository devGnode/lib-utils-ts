import { ArrayList } from "./List";
import { Stream } from "./stream";
import { Predication } from "./Predication";
import { Optional } from "./Optional";
import { Iterator, ListIterator } from "./Iterator";
import { InputStreamReader, OutputStreamWriter } from "./file/IOStream";
export declare type NullType = null | undefined;
export declare type Null<T> = T | NullType;
declare type PrimAscii = number | string;
export declare type ascii = Number | String | PrimAscii;
export declare type lambda = ((value: any, key?: ascii) => void) | Function;
export declare type optional<T, V> = T & {
    __sizeof__: V;
};
export declare type ListKey = number | string;
export declare type array<T> = T[] | Array<T> | null;
export declare type MapType<K extends ListKey, V> = {
    [J in K]: V;
};
export declare type predicateFn<T> = (value: T, key?: ascii) => Boolean;
export declare type predicationK<K, V> = (value: V, key: K) => Boolean;
export declare type predication<T> = predicateFn<T> | Predication<T> | PredicationConstructor<T>;
export declare type streamLambda<T> = (value: T, key?: ascii) => T | void;
export declare type streamLambdaK<V, K> = (value: V, key?: K) => V | void;
export declare type streamLambdaTo<T, U> = (value: T, key?: ascii) => U | void;
export declare type lambdaType<T, U> = streamLambdaTo<T, U> | streamLambda<T> | streamLambdaK<T, U>;
export declare type asyncStreamLambdaTo<T, U> = (value: T, key?: ascii) => Promise<U>;
declare global {
    interface String {
        equals(value: string): boolean;
        equalsIgnoreCase(value: string): boolean;
        regExp(regExp: RegExp, callback: Function): string;
        contains(value: string | RegExp): boolean;
        format(...args: any[]): string;
        isEmpty(): boolean;
        explodeAsList(separator: string | RegExp): ArrayList<string>;
        exec(regExp: RegExp): string[];
        orDefault(value: string): string;
        stripSlashes(): string;
    }
    interface StringConstructor {
        repeatString(char: string, loop: number): string;
    }
    interface Number {
        equals(value: number): boolean;
    }
    interface NumberConstructor {
        of(value: Object): number;
    }
    interface Date {
        plusDays(days: number): Date;
        lessDays(days: number): Date;
        plusYears(years: number): Date;
        lessYears(years: number): Date;
        dateFormat(patter: string): String;
        elapsedTime(date: Date): number;
    }
    interface DateConstructor {
        dateFormat(patter: string): String;
    }
    interface Boolean {
        state(expectTrue: any, orElse: any): any;
        equals(value: boolean): boolean;
    }
    interface BooleanConstructor {
        of(value: Object): boolean;
    }
    interface ArrayConstructor {
        asList<T>(value: T[]): ArrayList<T>;
    }
}
export interface PredicationConstructor<T> {
    (value: T, key?: ascii): boolean;
    test?(value: T): boolean;
    and?(Predicate: predication<T>): Predication<T>;
}
export interface PredicateInterfaces<T> {
    test(value: T): boolean;
    and(Predicate: predication<T>): Predication<T>;
}
export interface Iterable<T> {
    iterator(): Iterator<T>;
}
export interface Collection<E> extends Iterable<E> {
    add(value: E): boolean;
    add(...value: E[]): boolean;
    addAll(collection: Collection<E>): boolean;
    clear(): void;
    contains(o: object): boolean;
    containsAll(collection: Collection<E>): boolean;
    equals(o: object): boolean;
    remove(value: E): boolean;
    isEmpty(): boolean;
    size(): number;
    toArray(): array<E>;
    toJson(): MapType<any, any>;
}
export interface Set<E> extends Collection<E> {
}
export interface List<E> extends Collection<E> {
    get(index: number): E;
    indexOf(value: object): number;
    lasIndexOf(value: object): number;
    set(index: number, element: E): E;
    listIterator(): ListIterator<E>;
    subList(from: number, to: number): List<E>;
    stream(): Stream<E>;
}
export interface Cloneable<E> {
    clone(): ArrayList<E>;
}
export interface NativeExportable<T> {
    shift(): T;
    pop(): T;
}
export interface ArrayListInterfaceA<E> {
}
export interface Sortable<T> {
    compareTo(obj: T): any;
}
export interface IteratorInterface<E> {
    hasNext(): boolean;
    next(): E;
}
export interface listIteratorInterface<E> {
    hasPrevious(): boolean;
    nextIndex(): number;
    previous(): E;
    set(e: E): void;
    add(e: E): void;
}
export interface Map<K extends string | number, V> {
    clear(): void;
    containsKey(key: K): boolean;
    containsValue(value: V): boolean;
    entrySet(): Set<MapEntries<K, V>>;
    equals(o: Object): boolean;
    get(key: Object): V;
    isEmpty(): boolean;
    keySet(): Set<K>;
    put(key: K, value: V): V;
    remove(o: Object): V;
    size(): number;
    valueCollection(): Collection<V>;
    each(callback: streamLambda<V>): void;
    stream(): StreamAble<K, V>;
}
export interface MapEntries<K, V> {
    getKey(): K;
    getValue(): V;
}
export interface Enumeration<E> {
    hasMoreElement(): boolean;
    next(): E;
}
export interface OptionalMapInterface<T, U> {
    map(callback: streamLambda<T>): U;
}
export interface OptionalInterface<T> {
    equals(obj: Object): boolean;
    get(): T;
    filter(predicate: predication<T>): Optional<T>;
    isEmpty(): boolean;
    isPresent(): boolean;
    orElse(other: T): T;
    orElseThrow(other: Object): T;
}
export interface StreamAble<K extends string | number, V> {
    each(callback: lambda): StreamAble<K, V>;
    limit(limit: number): StreamAble<K, V>;
    allMatch(callback: predication<V>): boolean;
    anyMatch(callback: predication<V>): boolean;
    noneMatch(callback: predication<V>): boolean;
    filter(predicate: predication<V>): StreamAble<K, V>;
    findFirst(): Optional<V>;
    findAny(): Optional<V>;
    count(): number;
}
export interface ArrayStream<T> extends StreamAble<number, T> {
    hasPeer(callback: predication<T>): boolean;
    mapToInt(callback: streamLambda<T>): ArrayStream<Number>;
    sum(): Optional<Number>;
    min(): Optional<Number>;
    max(): Optional<Number>;
    sorted(): void;
    iterator(): Iterator<T>;
    listIterator(): ListIterator<T>;
    toArray(): array<T>;
    getList(): ArrayList<T>;
}
export interface IDefine<T> {
    isNullable(): boolean;
    isNull(): boolean;
    orNull(value: T): T;
    orElseThrow(exception: Error | TypeError): T;
    getType(): string;
    valueOf(): T;
}
export interface path {
    getPath(): string;
    getFileName(): string;
}
export interface IPropertiesFile<K extends string | number, V> {
    setProperty(key: K, value: V): void;
    getProperty(key: K, defaultValue?: V): V;
}
export interface IPropertiesFileA extends IPropertiesFile<string, Object> {
}
export interface properties<V> extends IPropertiesFile<string, V> {
    hasKey(key: string): boolean;
    load(input: InputStreamReader): void;
    stringPropertiesName(): Set<string>;
    store(output: OutputStreamWriter): void;
    update(): void;
}
export interface reader {
    read(): string;
    getLines(): List<string>;
    getIterator(): Iterator<string>;
    size(): number;
    reset(): void;
}
export interface writer {
    write(l: string): void;
}
export interface fileStream {
    getPath(): string;
    getFileName(): string;
}
export {};
