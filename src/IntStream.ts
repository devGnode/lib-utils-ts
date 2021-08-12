import {
    predicate,
    supplier,
    predication,
    streamLambda,
    IntStreamBuilder,
    intStream,
    consumerFn,
    intPredicate,
    predicateFn
} from "./Interface";
import {Predication} from "./Predication";
import {pathToFileURL} from "url";
import {Streams} from "./Streams";
import {Optional} from "./Optional";


export class Consumer<T>{

    public accept:consumerFn<T>;

    public static of<T>( consumer: consumerFn<T> ):Consumer<T>{
        return new class extends Consumer<T>{
            accept = consumer
        };
    }
}

export abstract class AbstractIntStream implements intStream{

    allMatch(predicate: intPredicate) {
    }

    anyMatch(predicate: intPredicate) {
    }

    average(): Optional<number> {
        return undefined;
    }

    builder() {
    }

    collect<R>(supplier: supplier<number>): R {
        return undefined;
    }

    each(consumer: consumerFn<number>): void {
    }

    filter(predicate: predicateFn<number>): intStream {
        return undefined;
    }


}

export class IntStream {

    private readonly value: Array<number>;
    private limitC:number;

    private readonly promise:Consumer<number>;

    constructor( value:Array<number>, supplier:Consumer<number> = null ) {
        this.value  = value;
        this.promise = supplier;
        console.log(supplier, "--", this.promise)
    }

    /***
     *
     * @param limit
     */
    public limit( limit : number = null ): IntStream {
        this.limitC = limit;
        return this;
    }

    public filter( predicate : predication<number> ):void /*IntStream*/ {
        console.log("dkskmksmkfmldskmflkml");
       /* return new IntStream(this.value,
            Consumer.of<number>((value:number)=> {
                let out:number;
               // if( !Object.isNull(this.promise) ) out = <number>this.promise.accept(value);
                return out || ( predicate instanceof Predication ? predicate.test(value) ? value : null : predicate.call(null,value) ? value : null );
        }));*/
    }

    private iterator( ){

    }

    public map( lambda: streamLambda<number> ): void /*IntStream*/ {
        /*return new IntStream(this.value,
            Consumer.of<number>((value:number)=> {
                let out:number;
               // if( !Object.isNull(this.promise) ) out = <number>this.promise.accept(value);
               // console.log(lambda)
                return Object.isNull(out) ? out  : lambda(out);
            }));*/
    }

    public each( consumer: Consumer<number> ):IntStream{

        let tmp:string, ctrl: number, out:Array<number> = new Array<number>();
        console.log(this.value)
        for( tmp in this.value ){
           // console.log("---------------------",tmp)
          // if( !Object.isNull( ctrl = <number>this.promise.accept(this.value[tmp]) ) ) consumer.accept(ctrl);
        }

        return null;
    }

    public static iterate( n:number, c:Consumer<number> ):IntStream{

        return null;
    }
    /****
     *
     */
    public static builder():IntStreamBuilder{return  new Streams.IntStreamBuilder();}
}
