/****
 * Array
 */
import {Stream} from "./Stream";
import {Predication} from "./Predication";
import {Optional} from "./Optional";
import {Iterator, ListIterator} from "./Iterator";
import {InputStreamReader, OutputStreamWriter} from "./file/IOStream";
import {Define} from "./Define";
import {Response} from "./net/Http";
import {Class} from "./Class";
import {Constructor} from "./Constructor";
import {Comparator} from "./Comparator";
import {Consumer} from "./Consumer";
/**
 * typeOf
 */
export type primitiveArray          = number[]|string[]|boolean[]|Number[]|String[]|Boolean[]
export type PrimitiveTypes          = "function" |  "object" | "number" | "string"
export type NullType                = null | undefined
export type Null<T>                 = T | NullType
type PrimAscii                      = number|string
export type int                     = number
export type double                  = number
export type ascii                   = Number|String|PrimAscii
export type lambda                  = ((value : any ,key?: ascii)=> void ) | Function /*...*/;
/***
 * List<T>
 */
export type primitiveOptional<T,V>          = T & {__sizeof__:V};
export type ListKey                         = number | string;
export type array<T>                        = T[] | Array<T> | null
export type MapType<K extends ListKey,V>    = { [J in K] : V };
/***
 * PredicateFn return Boolean
 * in this version predication
 * look like to Comparator
 */
export type predicateFnA<T>          = ( value : T, key? : ascii )=> boolean;
export type predicateFn<T>           = predicateFnA<T> & Function
export type predicationKA<K,V>       = ( value :V, key : K, ) => boolean
export type predicationK<K,V>        = predicationKA<K,V> & Function
export type predication<T>           = predicateFn<T> | Predication<T> | PredicationConstructor<T>

export type intPredicate             =  predication<number>
/**/
export type streamLambda<T>          = ( value : T, key?: ascii ) => T | void
export type streamLambdaK<V,K>       = ( value : V, key?: K ) => V | void
export type streamLambdaTo<T,U>      = ( value : T, key?: ascii ) => U | void
export type lambdaType<T,U>          = streamLambdaTo<T,U> | streamLambda<T> | streamLambdaK<T,U>
export type asyncStreamLambdaTo<T,U> = ( value : T, key?: ascii ) => Promise<U>
export type asyncStreamLambda<T>     = ( value : T, key?: ascii ) => Promise<T> | void
/**@v3.0.0.*/

/**/
export type newConstructor<E>        = { new( ... args: Object[ ] ) :E }
export type newConstructorFunc<E>    = { (... args: Object[ ] ): E }
export type newConstructorA<E>       = newConstructor<E> & newConstructorFunc<E>
export type functionAConstructor     = (... args : Object[] ) => void
export type constructorFunction      = Function
/***@v3.0.0*/
export type Func<A,R> = (...args:A[]) => R
/*@comparatorFunc*/
export type comparatorFunc<T>                       = ( other1: T, other2: T ) => number
export type comparatorFn<T,V extends comparable<V>> = ( other1: T, other2: T ) => V
export type comparatorFnA<T,V> = ( other1: T, other2: T ) => V
/**/
export type consumerFn<T>   = ( o: T ) => void
export type consumer<T>     = IConsumer<T> |consumerFn<T> | Consumer<T>
/*@biConsumerFn*/
export type biConsumerFn<T,P> = (p:T, q:P ) => void;
/*@supplierFn*/
export type supplierFn<R> = () => R;

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
        explodeAsList( separator : string|RegExp ) : List<string>
        exec( regExp :  RegExp ) : string[]
        orDefault( value : string ): string
        stripSlashes() :string
        compareTo( another: string ): number
    }
    interface StringConstructor{
        repeatString(char : string, loop : number ) : string
    }
    interface Number {
        equals( value : number ) : boolean
        compareTo( another : number ): number
        compare( x :number, y:number):number
        isPrime():boolean
    }
    interface NumberConstructor{
        of( value: Object) : number
        compare( x:number, y:number):number
    }
    interface Date{
        plusDays( days : number ) : Date
        lessDays( days : number ) : Date
        plusYears( years : number ) : Date
        lessYears( years : number ) : Date
        dateFormat( patter : string ) : String
        elapsedTime( date : Date ) : number
        compareTo( date: Date ): number
    }
    interface DateConstructor {
        dateFormat( patter : string ) : String
    }
    interface Boolean {
        state( expectTrue : any, orElse : any ) : any
        compareTo(obj: boolean): number
        equals( value: boolean ) : boolean
    }
    interface BooleanConstructor{
        of(value: Object) : boolean
        compare(o1:boolean,o2:boolean):number
    }
    interface ArrayConstructor {
        asList<T>( value: T[]):List<T>
        list<T>( ... value : T[] ):List<T>
        newList<T>( ... value : T[] ):List<T>
        sum( ): number
    }
    interface Array<T>{
        equals(o:Array<T>)
    }
    /****
     * Test implementation
     */
    interface ObjectConstructor {
        isNull( value : Object ):boolean
        requireNotNull<T>( other: T, message?: string ) :T
        equals(o1:Object, o2:Object):boolean
        nonNull( obj: Object ): boolean
        toString( o: Object ): string
    }

    interface Object {
        getClass<T>(): Class<T>
        equals(o1:Object):boolean
        compare( o1: Object, o2: Object ) : number
        deepEquals( o1: Object, o2:Object ):boolean
        typeof(o:Object):PrimitiveTypes
        hash():number
    }
    
    interface Function {
        class<T extends Object>(): Constructor<T>
    }
}
/***@v3.0.0*/
export interface Serial {
    __serial__?:number
}
/***@Supplier*/
export interface supplier<T> {
    get: supplierFn<T>
}
/***@biConsumer*/
export interface biConsumer<T,P> {
    accept?(p:T, q:P ): void
}
/***@collector*/
export interface collector<T, A, R>{
    supplier():supplier<A>
    accumulator():biConsumer<A, T>
    finisher( ):Func<A, R>
}
/***@spliterator*/
export interface spliterator<T> {
    /***/
    tryAdvance( action: consumer<T> ):boolean
    /***/
    forEachRemaining(action:  consumer<T>):void
    /***/
    trySplit():spliterator<T>
}
/***@classLoader<T>*/
export interface classLoader<T> extends constructor<T>{
    /***
     */
    setPrototype(proto: Function | Object): classLoader<T>
    /***
     */
    setMethod(name :string, proto: Function): classLoader<T>
    /***
     */
    instance(...argArray: Object[]): T
}
/***
 *
 */
export interface constructor<T> {
    /***
     * @getName : return name of Class
     */
    getName():string
    /***
     * @getType
     */
    getType(): string
    /***
     * @getEntries : get Array of Object (this)
     */
    getEntries( ): [any, string ][]
    /***
     * @getKeys
     */
    getKeys( ): string[]
    /***
     * @newInstance return new Instance
     * @args : Object[]
     */
    newInstance(...args: Object[]): T
    /***
     * @getResourcesAsStream
     * @args file path
     */
    getResourcesAsStream( name: string): InputStreamReader
    /***
     *
     */
    getStaticEntries( ):string[]
}
/***
 * @interface: classA
 */
export interface classInterface<T> extends constructor<T>{
    /***
     * @getInstance : give back instance of T
     */
    getInstance( ):T
    /***
     * @cast
     */
    cast( other: Object ):T
    /***
     * @notNull : return an anonymous object without any null value
     */
    notNullProperties( ) : MapType<string, Object>
}
/***
 * @deprecated
 * @Alternative classInterface<T>
 * */
export interface classA<T> extends classInterface<T>{}
/***
 *
 */
export interface PredicationConstructor<T> extends Function{
    /***
     */
    ( value : T, key? : ascii ) : boolean
    /***
     */
    test?( value : T ) : boolean
    /***
     */
    and?( Predicate : predicate<T>) : predicate<T>
    /**
     */
    or?( other : predicate<T> ) : predicate<T>
    /**
     */
    negate?(): predicate<T>
}
/**@predicate<T>*/
export interface predicate<T> {
    /***
     */
    test : predicateFn<T>
    /***
     */
    and?( other : predicate<T> ) : predicate<T>
    /***
     */
    or?( other: predicate<T> ): predicate<T>
    /***
     */
    negate?( ): predicate<T>

}
/****
 **************************************************************
 */
export interface intStream{
    each(consumer: consumerFn<number>): void

    filter(predicate: predicateFn<number>): intStream

    allMatch(predicate: intPredicate)

    anyMatch(predicate: intPredicate)

    average(): Optional<number>

    collect<R>(supplier: supplier<number>): R
}
/***@IConsume*/
export interface IConsumer<T>{
    accept:consumerFn<T>
}
/***@IntConsumerImpl*/
export interface IntConsumerImpl extends IConsumer<number>{}
/***@IStreamBuilder*/
export interface IStreamBuilder<T,R> extends IConsumer<T>{
    add(t: T ): void
    build():R
}
/***@IntStreamBuilder*/
export interface IntStreamBuilder extends IStreamBuilder<number,intStream>{
    add(t: number ): IntStreamBuilder
}
/***@Iterable<T> */
export interface Iterable<T> {
    iterator( ): iterator<T>
    forEach?(consumer:consumer<T>):void
}
/**
 * @V3.0.0
 * @collection<E>
 * */
export interface collection<E> extends Iterable<E> {
    /***
     */
    add( value : E ) : boolean
    /***
     */
    addAll( collection : collection<E> ) : boolean
    /***
     */
    clear( ) :void
    /**
     */
    contains( o : Object  ) : boolean
    /***
     */
    containsAll( collection : collection<E> ) : boolean
    /***
     */
    equals( o : Object ) : boolean
    /***
     */
    remove( value : E ) : boolean
    /***
     */
    removeAll(value: Object):boolean
    /***
     */
    retainAll(value: Object):boolean
    /***
     */
    removeIf(predicate:predicate<E>):boolean
    /***
     */
    isEmpty( ) : boolean
    /***
     */
    size( ) :number
    /***
     */
    toArray( ) : E[]
    /***
     */
    spliterator(from?:number, to?:number):spliterator<E>
    /***
     */
    toJson( ) : MapType<any, any>
    /***
     */
    toString():string
}
/***@Set<E>*/
export interface Set<E> extends collection<E>{}
/***
 *
 */
export interface SortedSet<E> extends Set<E>{
    comparator():comparator<E>
    first():E
    last():E
    headSet():E
    spliterator():spliterator<E>
    subSet(from:E,to:E):SortedSet<E>
    tailSet():SortedSet<E>
}
/**@v3.0.0*/
export interface List<E> extends collection<E> {
    /***
     */
    get(index:number):E
    /***
     */
    set(index:number,value:E):void
    /***
     */
    indexOf(o:Object):number
    //lastIndexOf(Object o)
    /***
     */
    replaceAll(oldValue:E, newValue:E):void
    /***
     */
    listIterator( ): ListIterator<E>
    /***
     */
    stream(): Stream<E>
    /***
     */
    sort(comparator?:Comparator<E>):void
    /***
     */
    reverse():void
    /***
     */
    subList( from:number, to:number ):List<E>
    /***
     */
    clone():List<E>
}
/***
 *
 * *****************************************************
export interface NativeExportable<T> {
    /***
     *

    shift() : T
    /***
     *

    pop() : T
}
/***
 *
 ****************************************************
export interface ArrayListInterfaceA<E> {
    /***
     * Extend ArrayList

}***************************************************/
/***
 * @comparable
 * @comparator
 * @comparatorImpl
 */
/****/
export interface comparable<T> {
    compareTo( obj : T ) :number
}
/**/
export interface comparator<T> {
    /***
     */
    compare(o1: T, o2: T ): number
    /***
     */
    equals(o:Object):boolean
    /***
     */
    reversed?<U extends T>(): comparator<T>
    reversed?(): comparator<T>
    /**
     */
    //thenComparing?( comparator: comparator<T> ): comparator<T>
    //thenComparingFn?<T, U extends comparable<U>>( comparator: comparatorFn<T,U> ): comparator<T>
}
/***
 * @AComparator<T> : usage as proxy interface for add some method
 *
 */
 interface IComparator<T> extends comparator<T>{
    reversed<U extends T>(): comparator<T>
   // reversed<T>(): Comparator<T>
    //thenComparing<T>(comparator: IComparator<T> ):IComparator<T>
   // thenComparing<U extends T>(comparator: IComparator<T> ):IComparator<T>
   // thenComparingFn<T, U extends comparable<U>>(comparatorFn: comparatorFn<T,U>, comparator: comparator<T> ):IComparator<T>

}
/***
 * @Iterator
 * @iteratorImp
 * @listIteratorInterface
 */
/***
 *
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
/*3.0.0.0 Refactor*/
/*@iterator*/
export interface iterator<E> extends IteratorInterface<E>{
    /***
     *
     */
    forEachRemaining?(consumer:consumer<E>): void
    remove?():void
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
    previousIndex() : number
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

export interface Map<K,V> {
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
    valueCollection( ) : collection<V>
    /***
     */
   // stream( ) : StreamAble<K,V>
}
/***
 * 
 */
export interface MapEntries<K,V> {
    getKey() : K
    getValue( ) : V
    setValue(value:V):V
}
/***
 * 
 */
export interface Enumeration<E> {
    hasMoreElement( ) :boolean
    next(): E
}
/****
 * @toDelete
 */
export interface OptionalMapInterface<T,U> {
    /**
     * @param callback
     */
    map<T,U>( callback : Func<T,U> ) : U
}
/**
 *
 */
export interface optional<T> {
    /**/
    equals( obj : Object ) : boolean
    /**/
    get( ) : T
    /**/
    filter( predicate : predication<T> ) : optional<T>
    /**/
    map<T, U>( callback : Func<T,U> ) : optional<U>
    /**/
    isEmpty(): boolean
    /**/
    isPresent():boolean
    /***/
    ifPresent(consumer:consumer<T>):void
    /**/
    orElse(other: T) : T
    /**/
    orElseThrow<U extends Error>( other : U ) : T
    /**/
    orElseGet(other: supplier<T> ):T
    /***/
    orElseThrowSupplier<U extends Error>(supplier :supplier<U>)
}
/**@deprecated*/
interface OptionalInterface<T> extends  optional<T>{}
/***@Define*/
export interface define<T>{
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
   // findLast( ) : Optional<V>
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
     * @sorted : use native sort method of Array
     */
    sorted( compareFn : (a: T, b: T) => number ) : Stream<T>
    /***
     *
     */
    sort( comparatorFn: IComparator<T> ): Stream<T>
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
    getList() :  List<T>
}
/***
 */
export interface objectStream<K extends string|number,V> extends StreamAble<K,V>{
    valueOfOptional( ): Optional<MapType<K,V>>
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
    /***@toFix*/
    getHeaderAsObject( ) : any //HashMap<string,any>
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
    /***@toFix*/
    setHeader( header: /*HashMap<string,any>*/any ):void
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
    /***
     */
    withFollowRedirect(state:boolean):restHttp
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