/****
 * Array
 */
import {List} from "./List";
import {Stream} from "./stream";
import {Predication} from "./Predication";
import {Optional} from "./Optional";
import {Iterator, ListIterator} from "./Iterator";
/**
 * typeOf
 */
export type ascii          = Number|number|String|string
export type lambda         = ((value : any ,key?: ascii)=> void ) | Function /*...*/;
/***
 * List<T>
 */
export type array<T>            = T[] | Array<T> | null
export type objectLikeArray<T>  = {length:0}
export type ListKey             = number | string;
/***
 * PredicateFn return Boolean
 * in this version predication
 * look like to Comparator
 */
export type predicateFn<T> = ( value : T, key? : ascii )=> Boolean;
export type predication<T> = predicateFn<T> | Predication<T> | PredicationConstructor<T>
/**/
export type streamLambda<T>     = ( value : T, key?: ascii ) => T | void
export type streamLambdaTo<T,U> = ( value : T, key?: ascii ) => U | void
export type lambdaType<T,U>     = streamLambdaTo<T,U> | streamLambda<T>
/***
 * Global Extended native object prototype
 */
declare global {

    interface String {
        equals( value : string  ) : boolean
        equalsToIgnoreCase( value : string ) : boolean
        regExp( regExp : RegExp, callback : Function ) : string
        contains( value : string ): boolean
    }
    interface Object {
       // stream( ) : Stream<T>
    }
    interface Number {
        equals( value : number ) : boolean
    }
    interface Date {
        plusDays( days : number ) : Date
        lessDays( days : number ) : Date
        plusYears( years : number ) : Date
        lessYears( years : number ) : Date
        dateFormat( patter : string ) : String
    }
    interface DateConstructor {
        dateFormat( patter : string ) : String
    }

}

export interface PredicationConstructor<T> {
    ( value : T, key? : ascii ) : boolean
    test?( value : T ) : boolean
    and?( Predicate : predication<T>) : Predication<T>
}

export interface PredicateInterfaces<T> {
    test( value : T ) : boolean
    and( Predicate : predication<T>) : Predication<T>
}
/***
 *
 */
export interface ArrayListInterface<T> {

    get(key: ListKey) : T
    clear() : void
    size() : number
    isEmpty() : boolean
    toString() : string
    stream() : Stream<T>
    remove( from : number, to? : number ) : void
    contains( o : Object ) : boolean
    indexOf( object : Object ) : number
    clone( ) : List<T>
    iterator() : Iterator<T>
    listIterator( index?: number ) : ListIterator<T>
    set( key : number, value : T ) : T

    //to-do implement
    // remove( o : number | Object ) : boolean
    // ....
    toArray( ) : T[] | Array<T>
}

export interface LinkedListInterface<V> {
    get( key : ListKey ) : V
    put(key: ListKey, value: V) : void
    delete( key : ListKey ) : void
    count() : number
    each(callback : streamLambda<V>) : void
}

export interface Sortable<T> {
    compareTo( obj : T )
}

/***
 * Iterator interfaces
 * E => array<T> => T[] | Array<T>
 */
export interface IteratorInterface<E> {
    hasNext( ) : boolean
    next( ) : E
}
export interface listIteratorInterface<E> {
    hasPrevious( ) : boolean
    nextIndex( ) : number
    previous( ) : E
    set( e  : E ) : void
    add( e : E ) : void
}
export interface MapEntries<K,V> {
    getKey() : K
    getValue( ) : V
}

export interface Collection {
    
}

export interface OptionalMapInterface<T,U> {
    map( callback : streamLambda<T> ) : U
}

export interface OptionalInterface<T> {

    equals( obj : Object ) : boolean
    get( ) : T

    filter( predicate : predication<T> ) : Optional<T>
    isEmpty(): boolean
    isPresent():boolean
    orElse(other: T) : T
    orElseThrow( other : Object ) : T

}

export interface StreamAble<T,U> {

    each( callback : lambda ) : U
    limit() : Stream<T>
    allMatch( callback : predication<T>) : boolean
    anyMatch( callback : predication<T> ) : boolean
    noneMatch( callback : predication<T> ) : boolean
    filter( predicate : predication<T> ) : U
    findFirst( ) : Optional<T>
    findAny( ) : Optional<T>
    count() : number
}

export interface ArrayStream<T> {

    each( callback : lambda ) : Stream<T>
    limit() : Stream<T>
    allMatch( callback : predication<T>) : boolean
    anyMatch( callback : predication<T> ) : boolean
    noneMatch( callback : predication<T> ) : boolean
    hasPeer( callback : predication<T> ) : boolean
    mapToInt( callback : lambda ) : Stream<Number>
    filter( predicate : predication<T> ) : Stream<T>
    findFirst( ) : Optional<T>
    findAny( ) : Optional<T>
    count() : number
    sum() : Optional<Number>
    min() : Optional<Number>
    max() : Optional<Number>
    sorted( ) : void
    iterator() : Iterator<T>
    listIterator() : ListIterator<T>
    toArray() : array<T>
    getList() :  List<T>

}