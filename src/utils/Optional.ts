import {Func, optional, predication, consumer, supplier} from "../Interface";
import {Predication} from "./Predication";
import {Objects} from "../type/Objects";
import {Consumer} from "../Consumer";
/****
 * @class Optional<T>
 * @interface optional<T>
 */
export class Optional<T> implements optional<T>{
    /**
     */
    private static readonly EMPTY = new Optional(void 0);

    protected value : T;

    constructor( value : T ) {this.value = value;}
    /***
     *  @isPresent
     */
    public isPresent( ){return this.value!==null&&this.value!==undefined;}
    /***
     * @ifPresent
     */
    public ifPresent(consumer:consumer<T>):void{
        if( typeof consumer === "function") consumer = Consumer.of(consumer);
        if(this.isPresent()) consumer.accept(this.value);
    }
    /***
     *  @isEmpty
     */
    public isEmpty( ){return !this.isPresent();}
    /***
     *  @equals
     */
    public equals( obj : Object ): boolean {return this.value===obj;}
    /***
     *  @get
     */
    public get(): T { return this.value; }
    /***
     *  @map
     */
    public map<T,U>( callback:Func<T,U> ): Optional<U> {
        return Optional.ofNullable<U>(callback.call(null, this.value ));
    }
    /***
     * @deprecated
     * @alternatives map
     * @param callback
     */
    //public mapTo<T, U>( callback:Func<T,U> ): Optional<U> {return this.map(callback);}
    /***
     *  @filter
     */
    public filter( predicate: predication<T> ): Optional<T> {
        if( !(predicate instanceof  Predication) )  predicate = Predication.of(predicate);
        if(this.isEmpty()) return this;
        return new Optional<T>(predicate.test(this.value) ?this.value:null );
    }
    /***
     *  @orElse
     */
    public orElse(other: T): T {return !this.isEmpty() ? this.value:other;}
    /***
     *  @orElseThrow
     */
    public orElseThrow<U extends Error>( other : U ): T {
        if(!this.isEmpty()) return this.value;
        throw other;
    }
    /***
     *  @orElseGet
     */
    public orElseGet(other: supplier<T> ):T{
        if(!this.isEmpty()) return this.value;
        else {
            return other.get();
        }
    }
    /***
     *  @orElseGet
     */
    public orElseThrowSupplier<U extends Error>(supplier :supplier<U>){
        if(!this.isEmpty()) return this.value;
        else{
            throw supplier.get();
        }
    }
    /***
     *  @of
     */
    public static of<T>( value : T ) : Optional<T>{
        return new Optional<T>(Objects.requireNotNull(value,"Optional value is null use ofNullable method"));
    }
    /***
     *  @ofNullable
     */
    public static ofNullable<T>(  value : T ): Optional<T>{return new Optional<T>( value );}
    /***
     * @empty
     */
    public static empty<T>():Optional<T>{return Optional.EMPTY;}
    /***
     *  @valueOf
     */
    public valueOf( ):Object{return <Object>this.value; }
    /***/
    public toString( ):string{
        return this.isPresent() ? `Optional[${this.value}]` : "Optional.empty";
    }
}
Object.package(this);