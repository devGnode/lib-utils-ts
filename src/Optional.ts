import {lambdaType, OptionalInterface, OptionalMapInterface, predication, streamLambda} from "./Interface";
import {Predication} from "./Predication";
import {NullPointerException} from "./Exception";
import {flombok} from "./flombok";

export class Optional<T> implements OptionalInterface<T>,OptionalMapInterface<T,Optional<T>>{

    @flombok.ENUMERABLE(false)
    protected value : T;

    constructor( value : T ) {this.value = value;}

    public isPresent( ){return this.value!==null&&this.value!==undefined;}

    public isEmpty( ){return !this.isPresent();}

    public equals( obj : Object ): boolean {return this.value===obj;}

    public get(): T { return this.value; }

    public map( callback: streamLambda<T> ): Optional<T> {return this.mapTo<T>(callback);}

    public mapTo<U>( callback: lambdaType<T,U> ): Optional<U> {
        return new Optional<U>(callback.call(null, this.value ));
    }

    public filter( predicate: predication<T> ): Optional<T> {
        let state : Boolean;
        if(predicate instanceof  Predication )  state = predicate.test(this.value);
        else state = predicate(this.value);
        return new Optional<T>(state === true?this.value:null);
    }

    public orElse(other: T): T {return !this.isEmpty() ? this.value:other;}

    public orElseThrow( other : any ): T {
        if(!this.isEmpty()) return this.value;
        throw other;
    }

    public static of<T>( value : T ) : Optional<T>{
        if(value===null) throw new NullPointerException("Optional value argument is null use ofNullable method");
        return new Optional<T>(value)
    }

    public static ofNullable<T>(  value : T ): Optional<T>{return new Optional<T>( value );}

    public valueOf( ):Object{return <Object>this.value; }
}
