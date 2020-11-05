/****
 * Array
 */
import {ArrayList, HashMap} from "./List";
import {Stream} from "./stream";
import {Predication} from "./Predication";
import {Optional} from "./Optional";
import {Iterator, ListIterator} from "./Iterator";
import {InputStreamReader, OutputStreamWriter} from "./file/IOStream";
import {Define} from "./Define";
import {Response} from "./net/Http";
/**
 * typeOf
 */
export type NullType       = null | undefined
export type Null<T>        = T | NullType
type PrimAscii             = number|string
export type ascii          = Number|String|PrimAscii
export type lambda         = ((value : any ,key?: ascii)=> void ) | Function /*...*/;
/***
 * List<T>
 */
export type optional<T,V>                   = T & {__sizeof__:V};
export type ListKey                         = number | string;
export type array<T>                        = T[] | Array<T> | null
export type MapType<K extends ListKey,V>    = { [J in K] : V };
/***
 * PredicateFn return Boolean
 * in this version predication
 * look like to Comparator
 */
export type predicateFnA<T> = ( value : T, key? : ascii )=> Boolean;
export type predicateFn<T> = predicateFnA<T> & Function
export type predicationKA<K,V> = ( value :V, key : K, ) => Boolean
export type predicationK<K,V> = predicationKA<K,V> & Function
export type predication<T> = predicateFn<T> | Predication<T> | PredicationConstructor<T>
/**/
export type streamLambda<T>     = ( value : T, key?: ascii ) => T | void
export type streamLambdaK<V,K>  = ( value : V, key?: K ) => V | void
export type streamLambdaTo<T,U> = ( value : T, key?: ascii ) => U | void
export type lambdaType<T,U>     = streamLambdaTo<T,U> | streamLambda<T> | streamLambdaK<T,U>
export type asyncStreamLambdaTo<T,U> = ( value : T, key?: ascii ) => Promise<U>
/***
 * Global Extended native object prototype
 */

declare global {

    interface String {
        equals( value : string  ) : boolean
        equalsIgnoreCase( value : string ) : boolean
        regExp( regExp : RegExp, callback : Function ) : string
        contains( value : string|RegExp ): boolean
        format( ... args : any[] ) : string
        isEmpty( ) : boolean
        explodeAsList( separator : string|RegExp ) : ArrayList<string>
        exec( regExp :  RegExp ) : string[]
        orDefault( value : string ): string
        stripSlashes() :string
    }
    interface StringConstructor{
        repeatString(char : string, loop : number ) : string
    }
    interface Number {
        equals( value : number ) : boolean
    }
    interface NumberConstructor{
        of( value: Object) : number
    }
    interface Date {
        plusDays( days : number ) : Date
        lessDays( days : number ) : Date
        plusYears( years : number ) : Date
        lessYears( years : number ) : Date
        dateFormat( patter : string ) : String
        elapsedTime( date : Date ) : number
    }
    interface DateConstructor {
        dateFormat( patter : string ) : String
    }
    interface Boolean {
        state( expectTrue : any, orElse : any ) : any
        equals( value: boolean ) : boolean
    }
    interface BooleanConstructor{
        of(value: Object) : boolean
    }
    interface ArrayConstructor {
        asList<T>(value: T[]): ArrayList<T>
    }

}
/***
 *
 */
export interface PredicationConstructor<T> extends Function{
    /***
     */
    ( value : T, key? : ascii ) : boolean
    /***
     */
    test( value : T ) : boolean
    /***
     */
    and( Predicate : predicate<T>) : predicate<T>
    /**
     */
    or( other : predicate<T> ) : predicate<T>
    /**
     */
    negate(): predicate<T>
}
/**
 *
 */
export interface predicate<T> {
    /***
     * @param value
     */
    test : predicateFn<T>
    /***
     * @param other
     */
    and( other : predicate<T> ) : predicate<T>
    
    or( other: predicate<T> ): predicate<T>

    negate( ): predicate<T>

}
/***
 */
export interface Iterable<T> {
    /**
     * iterate object element
     */
    iterator( ): Iterator<T>
}
export interface Collection<E> extends Iterable<E> {
    /***
     */
    add( value : E ) : boolean
    /***
     */
    add(...value: E[]): boolean
    /***
     */
    addAll( collection : Collection<E> ) : boolean
    /***
     */
    clear( ) :void
    contains( o : object  ) : boolean
    /***
     */
    containsAll( collection : Collection<E> ) : boolean
    /***
     */
    equals( o : object ) : boolean
    /***
     */
    remove( value : E ) : boolean
    /***
     */
    isEmpty( ) : boolean
    /***
     */
    size( ) :number
    /***
     */
    toArray( ) : array<E>
    /***
     */
    toJson( ) : MapType<any, any>
}

export interface Set<E> extends Collection<E>{

}

export interface List<E> extends Collection<E>{
    /***
     */
    get( index : number ) : E
    /***
     */
    indexOf( value : object  ) : number
    /***
     */
    lasIndexOf( value : object ) : number
    /***
     */
    set( index : number, element : E): E
    /***
     */
    listIterator( ) : ListIterator<E>
    /***
     */
    subList( from : number, to : number ): List<E>
    /***
     */
    stream( ) : Stream<E>
    /***
     */
}
/***
 *
 */
export interface Cloneable<E> {
    /***
     *
     */
    clone( ) : ArrayList<E>
}
/***
 *
 */
export interface NativeExportable<T> {
    /***
     *
     */
    shift() : T
    /***
     *
     */
    pop() : T
}
/***
 *
 */
export interface ArrayListInterfaceA<E> {
    /***
     * Extend ArrayList
     */
}

/***
 *
 */
export interface Sortable<T> {
    compareTo( obj : T )
}

/***
 * Iterator interfaces
 * E => array<T> => T[] | Array<T>
 */
export interface IteratorInterface<E> {
    /***
     *
     */
    hasNext( ) : boolean
    /***
     *
     */
    next( ) : E
}
export interface listIteratorInterface<E> {
    /***
     */
    hasPrevious( ) : boolean
    /***
     */
    nextIndex( ) : number
    /***
     */
    previous( ) : E
    /***
     */
    set( e  : E ) : void
    /***
     */
    add( e : E ) : void
    /***
     */
}

export interface Map<K extends string|number,V> {
    /***
     */
    clear( ): void
    /***
     */
    containsKey( key : K ) : boolean
    /***
     */
    containsValue( value : V ): boolean
    /***
     */
    entrySet() : Set<MapEntries<K,V>>
    /***
     */
    equals( o : Object ) : boolean
    /***
     */
    get( key : Object ) : V
    /***
     */
    isEmpty( ) : boolean
    /***
     */
    keySet( ) : Set<K>
    /***
     */
    put( key : K, value : V ) : V
    /***
     */
    remove( o : Object ): V
    /***
     */
    size( ) : number
    /***
     */
    valueCollection( ) : Collection<V>
    /***
     */
    each( callback : streamLambda<V> ): void
    /***
     */
    stream( ) : StreamAble<K,V>
    /***
     */
}
/***
 * 
 */
export interface MapEntries<K,V> {
    getKey() : K
    getValue( ) : V
}
/***
 * 
 */
export interface Enumeration<E> {
    hasMoreElement( ) :boolean
    next(): E
}
/****
 * 
 */
export interface OptionalMapInterface<T,U> {
    /**
     * @param callback
     */
    map( callback : streamLambda<T> ) : U
}
/**
 *
 */
export interface OptionalInterface<T> {
    /***
     *
     */
    equals( obj : Object ) : boolean
    /***
     *
     */
    get( ) : T
    /**
     * @param predicate
     */
    filter( predicate : predication<T> ) : Optional<T>
    /***
     *
     */
    isEmpty(): boolean
    /***
     *
     */
    isPresent():boolean
    /***
     * @param other
     */
    orElse(other: T) : T
    /***
     * @param other
     */
    orElseThrow( other : Object ) : T

}
/***
 *
 */
export interface StreamAble<K extends string|number,V> {
    /***
     */
    each( callback : lambda ) : StreamAble<K,V>
    /***
     */
    limit( limit: number) : StreamAble<K,V>
    /***
     */
    allMatch( callback : predication<V>) : boolean
    /***
     */
    anyMatch( callback : predication<V> ) : boolean
    /***
     */
    noneMatch( callback : predication<V> ) : boolean
    /***
     */
    filter( predicate : predication<V> ) : StreamAble<K,V>
    /***
     */
    findFirst( ) : Optional<V>
    /***
     */
    findAny( ) : Optional<V>
    /***
     */
    count() : number
}

export interface ArrayStream<T> extends StreamAble<number,T>{
    /***
     */
    hasPeer( callback : predication<T> ) : boolean
    /***
     */
    mapToInt( callback : streamLambda<T> ) : ArrayStream<Number>
    /***
     */
    sum() : Optional<Number>
    /***
     */
    min() : Optional<Number>
    /***
     */
    max() : Optional<Number>
    /***
     */
    sorted( ) : void
    /***
     */
    iterator() : Iterator<T>
    /***
     */
    listIterator() : ListIterator<T>
    /***
     */
    toArray() : array<T>
    /***
     */
    getList() :  ArrayList<T>
}
/***
 */
export interface objectStream<K extends string|number,V> extends StreamAble<K,V>{
    valueOfOptional( ): Optional<MapType<K,V>>
}
/****
 * <Definer null value>
 * */
export interface IDefine<T>{
    /***
     *
     */
    isNullable():boolean
    /***
     *
     */
    isNull(): boolean
    /***
     *
     */
    orNull( value : T ): T
    /***
     *
     */
    orElseThrow( exception : Error|TypeError ): T
    /***
     *
     */
    orThrow( exception : Object ): Define<T>
    /***
     *
     */
    getType( ): string
    /***
     *
     */
    valueOf( ): T
}
export interface path {
    getPath():string
    getFileName( ):string
}
/***
 * Properties
 */
export interface IPropertiesFile<K extends string|number,V>{
    /***
     *
     * @param key
     * @param value
     */
    setProperty( key : K, value : V ) : void
    /***
     *
     * @param key
     * @param defaultValue
     */
    getProperty( key: K, defaultValue?: V ) : V
}
/***
 *
 */
export interface IPropertiesFileA extends IPropertiesFile<string, Object>{}
/***
 */
export interface properties<V> extends  IPropertiesFile<string, V>{
    /***
     */
    hasKey( key : string ):boolean
    /***
     */
    load( input : InputStreamReader ) : void
    /***
     */
    stringPropertiesName( ) : Set<string>
    /***
     */
    store( output: OutputStreamWriter ) : void
    /***
     *
     */
    update( ) :void
}
/****
 *
 */
export interface reader {
    /***
     *
     */
    read( ): string
    /***
     *
     */
    getLines(): List<string>
    /***
     *
     */
    getIterator( ) :Iterator<string>
    /***
     *
     */
    size( ):number
    /***
     *
     */
    reset( ): void
}
/****
 *
 */
export interface writer {
    /***
     *
     */
    write( l:string): void
}
/***
 *
 */
export interface fileStream {
    /***
     *
     */
    getPath( ): string
    /***
     *
     */
    getFileName( ):string
}
/***
 * Interface net/
 */
export interface restHttp{
    /***
     * Get protocol used in string value http or http(s)
     */
    getProto( ): string
    /***
     * get http headers like an object
     */
    getHeaderAsObject( ) : HashMap<string,any>
    /***
     *  GetDataAsObject return the response body request like an anonymous
     *  object. This method follow response query.
     */
    getDataAsObject( ) :any
    /***
     * GetData return the response body like a string value. This method follow
     * response query.
     */
    getData( ): string
    /***
     */
    setData( data : string ) :void
    /***
     *
     */
    setHeader( header: HashMap<string,any> ):void
    /***
     * Allow to send the http request
     */
    request( ) : Promise<Response>
    /***
     * Allows to define how the block buffer should be encoding to output
     */
    setEncoding( encoding:BufferEncoding):restHttp
    /***
     */
    getEncoding( ):BufferEncoding
    /***
     *
     */
    setLoader( pipe:loader): restHttp
    /***
     */
    getLoader( ):loader
}
/***
 *
 */
export interface wrapHeader<T> {
    build( ) : T
}
/***
 *
 */
export interface loader{
    /***
     */
    setSizeOf( size:number ): loader
    /***
     */
    start( endingMessage : string ): loader
    /***
     */
    add( value:number ):void
    /***
     */
    end():void
    /***
     */
    error( message:string ):void
}