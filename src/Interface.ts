/****
 * Array
 */
import {Predication} from "./utils/Predication";
import {Iterator, ListIterator} from "./utils/Iterator";
import {Define} from "./Define";
import {Response} from "./net/Http";
import {Class} from "./Class";
import {Constructor} from "./Constructor";
import {Comparator} from "./Comparator";
import {BiConsumer, Consumer, IntConsumer} from "./Consumer";
import {OptionalInt} from "./utils/OptionalInt";
import {Integer} from "./type/Integer";
import {Method} from "./Reflect/Method";
import {Field} from "./Reflect/Field";
import {Path} from "./file/Path";
import {InputStreamReader} from "./file/InputStreamReader";
import {OutputStream} from "./file/OutputStream";
import {Package} from "./lang/Package";
import {InputStream} from "./file/InputStream";
import {Optional} from "./utils/Optional";
import {ENCODING} from "./file/charset/ENCODING";
import {Annotation} from "./annotation/Annotation";
/**
 * typeOf
 */
export type primitiveArray          = number[]|string[]|boolean[]|Number[]|String[]|Boolean[]
export type PrimitiveTypes          = "function" |  "object" | "number" | "string"
type PrimAscii                      = number|string
export type int                     = number
export type double                  = number
export type ascii                   = Number|String|PrimAscii

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
export type predication<T>           = predicateFn<T> | Predication<T> | PredicationConstructor<T>
export type intPredicate             =  predication<number>
/**/
/**@v3.0.0.*/
/***@v3.0.0*/
export type Func<A,R>                = (...args:A[]) => R
/*@comparatorFunc*/
export type comparatorFn<T,V extends comparable<V>> = ( other1: T, other2: T ) => V
export type comparatorFnA<T,V> = ( other1: T, other2: T ) => V
/**/
export type consumerFn<T>   = ( o: T ) => void
export type consumer<T>     = IConsumer<T> |consumerFn<T> | Consumer<T>
/*@biConsumerFn*/
export type biConsumerFn<T,P> = (p:T, q:P ) => void;
/*@supplierFn*/
export type supplierFn<R> = () => R;
export type decoratorSupplierFn<T,P,R> = (p:T, q:P )=>R;
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
        toArray():string[]
        getBytes(charsetTo?:ENCODING, charsetFrom?: ENCODING):string[]
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
        sum( a:number, b:number):number
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
        sum( ): number
    }

    interface ObjectConstructor {
        equals(o1:Object, o2:Object):boolean
        package(o:Object):void
        toString( o: Object ): string
    }

    interface Object {
        getClass<T>(): Class<T>
        equals(o1:Object):boolean
        compare( o1: Object, o2: Object ) : number
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
export interface decoratorSupplier<T,P,R> {
    get:decoratorSupplierFn<T,P,R>
}
/***@objIntConsumer*/
export interface ObjIntConsumer<T> {
    accept?( t:T, value:number ):void
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
    /***/
    estimateSize():number
}
/***@classLoader<T>*/
export interface classLoader<T>{
    /***
     */
    setMethod(method:Method): classLoader<T>
    /**
     */
    setField(field:Field):classLoader<T>
    /***
     */
    instance(...argArray: Object[]): T

    setAnnotation(annotation:Annotation):Annotation[]
}
export interface ClassLoader {
    getParent():IClassLoader
    getResourceAsStream(name:string):InputStream
    loadClass(name:String):Class<any>
}
export interface IClassLoader extends ClassLoader{
}
/***
 *
 */
export interface ObjectStructure<T> {
    /***
     * @getName : return name of Class
     */
    getName():string
    getFullName():string
    /**/
    isAnonymousClass():boolean
    /***/
    isEnum():boolean
    /**/
    isArray():boolean
    /**/
    isAnnotation():boolean
    /**/
    isPrimitive():boolean
    /**/
    getPackage():Package
    /***/
    getFields(type:number):Field[]
    /**/
    getField(name:string, type:number):Field
    /***/
    getMethod(name:string, type:number):Method
    /**/
    getMethods( ):Method[]
    /***
     * @getType
     */
    getType(): string
    /***
     * @newInstance return new Instance
     * @args : Object[]
     */
    newInstance(...args: Object[]): T
}
/***
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
 *
 */
export interface intStream{

    mapToObj<R>(supplier: Func<number,R>):Stream<R>

    map(supplier:Func<number,number>): intStream

    each(consumer: IntConsumer): void

    limit(value:number):intStream

    filter(predicate: predicateFn<number>): intStream

    allMatch(predicate: intPredicate): boolean

    anyMatch(predicate: intPredicate): boolean

    noneMatch(predicate: intPredicate):boolean

    findAny():OptionalInt

    findFirst(): OptionalInt

    average(): OptionalInt

    count():number

    sum():number

    min():OptionalInt

    max():OptionalInt

    boxed( ):Stream<Integer>

    reduce(op:Function):OptionalInt

    reduceIdentity(identity:number, op:Function):number

    collect<R>(supplier: supplier<R>, consumer?:ObjIntConsumer<R>, finisher?:BiConsumer<R,R>): R

    collector<R>(collector:collector<number, R, R>):R
}
export interface ToTypeFunction<T,R> {
    applyAs(type:T):R
}
/**MOCK*/
export interface Stream<T> {

    allMatch(predicate:predication<T>):boolean

    anyMatch(predicate:predication<T>):boolean

    filter(predicate:predication<T>):Stream<T>

    noneMatch(predicate:predication<T>):boolean

    collector<R,A>(collector:collector<T,A,R>):R

    limit(maxValue:number):Stream<T>

    reduce(accumulator:Function ):Optional<T>

    min(comparator:comparator<T>):Optional<T>

    max(comparator:comparator<T>):Optional<T>

    findAny( ):optional<T>

    findFirst():optional<T>

    flatMap<R extends Stream<R>>(mapper: Func<T, R>): Stream<R>

    count():number

    map<R>(mapper:Func<T, R>):Stream<R>

    mapToInt(mapper:ToTypeFunction<T, number>):intStream

    each(consumer:consumer<T>):void

    sort( comparator: comparator<T> ):Stream<T>

    toObjectArray():Object[]

    toArray():T[]
}
/**@IntBinaryOperator*/
export interface IntBinaryOperator {
    applyAsInt(left:number, right:number):number
}
/**BiFunction*/
export interface BiFunction<T,U,R> {
    apply(a:T, b:U):R;
    //andThen<V>( func: Func<R, V>):BiFunction<T, U, V>
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
    stream(): Stream<E>
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
/***@Runnable*/
export interface Runnable {
    run():void
}
/**@LuhnFormattedText*/
export interface LuhnFormattedText {
    check():boolean;
    get():string;
}
/***
 * Properties
 */
export interface propertiesF{
    /***
     *
     * @param key
     * @param value
     */
    setProperty( key : Object, value : Object ) : void
    /***
     *
     * @param key
     * @param defaultValue
     */
    getProperty( key: string, defaultValue?: Object ) : Object
}
/***
 */
export interface properties extends  propertiesF{
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
    store( output: OutputStream ) : void

}
/****
 * @toDelete
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
    getFileName( ):Path
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