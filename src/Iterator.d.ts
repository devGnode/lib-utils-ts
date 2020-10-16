import { array, IteratorInterface, listIteratorInterface } from "./Interface";
/***
 * @Iterator
 */
export declare class Iterator<E> implements IteratorInterface<E> {
    /***
     *
     */
    protected iteration: number;
    /***
     *
     */
    protected list: array<E>;
    /***
     *
     * @param value
     */
    constructor(value: array<E>);
    /***
     *
     * @param key
     */
    protected get(key: number): E;
    /***
     *
     */
    hasNext(): boolean;
    /***
     *
     */
    next(): E;
}
/***
 * @ListIterator
 */
export declare class ListIterator<E> extends Iterator<E> implements listIteratorInterface<E> {
    /***
     *
     * @param listIterate
     */
    constructor(listIterate: array<E>);
    /***
     *
     * @param e
     */
    add(e: E): void;
    /***
     *
     */
    hasPrevious(): boolean;
    /***
     *
     */
    nextIndex(): number;
    /***
     *
     */
    previous(): E;
    /***
     *
     * @param e
     */
    set(e: E): void;
}
