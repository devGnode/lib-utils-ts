import { array, IteratorInterface, listIteratorInterface } from "./Interface";
export declare class Iterator<E> implements IteratorInterface<E> {
    protected iteration: number;
    protected list: array<E>;
    constructor(value: array<E>);
    protected get(key: number): E;
    hasNext(): boolean;
    next(): E;
}
export declare class ListIterator<E> extends Iterator<E> implements listIteratorInterface<E> {
    constructor(listIterate: array<E>);
    add(e: E): void;
    hasPrevious(): boolean;
    nextIndex(): number;
    previous(): E;
    set(e: E): void;
}
