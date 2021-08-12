import {
    consumerFn,
    intPredicate,
    intStream,
    IntStreamBuilder,
    predicateFn,
    predication,
    spliterator,
    supplier
} from "./Interface";
import {Optional} from "./Optional";
import {Streams} from "./Streams";
import {Spliterators} from "./Spliterators";
import { Spliterator } from "./Spliterator";

export interface intStreamA {
    each(consumer: consumerFn<number>): void

    filter(predicate: predicateFn<number>): intStreamA

    allMatch(predicate: intPredicate)

    anyMatch(predicate: intPredicate)

    average(): Optional<number>

    collect<R>(supplier: supplier<number>): R

}

export abstract class IntStreamsImpl implements intStream {

    protected source:spliterator<number>;

    protected previous:IntStreamsImpl;
    protected next:IntStreamsImpl;

    protected depth:number;

     protected constructor(value:Spliterator<number>|IntStreamsImpl) {
         console.log(value,  value instanceof  Spliterator)
        if( value instanceof  Spliterator ){
            // @ts-ignore
            this.source = value;
            this.depth  = 0;
            this.next = null;
            console.log("--------------------------- qdqsdqsd")
        }else if(value instanceof  IntStreamsImpl ){
            console.log("IMPL --------------------------- qdqsdqsd")
            value.next = this;
            this.previous = value
            this.source = value.source;
            this.depth = this.previous.depth + 1;
        }
     }

    allMatch(predicate: intPredicate) {
    }

    anyMatch(predicate: intPredicate) {
    }

    average(): Optional<number> {
        return undefined;
    }

    collect<R>(supplier: supplier<number>): R {
        return undefined;
    }

    each(consumer: consumerFn<number>): void {
        console.log("=========================================================================");
        console.log(this);
        let previous:IntStreamsImpl = this.previous;
        while( !(previous instanceof Head) ){
            previous = previous.previous;
        }
        console.log("Head ", previous);
       /* for(let i; i <3 ;i++){
            console.log(this)
        }*/
    }

    filter(predicate: predicateFn<number>): intStream {
        //let self:intStreamA = this;
        /*return new class tt extends IntStreamsPipe.StaleFull<number> implements intStreamA{
            constructor() {
                super(self);
            }

        };*/
        let self:IntStreamsImpl = new  IntStreamsPipe.StaleFull<number>(this);
        /***
         * @Override
         */
        /*self.onWrap = ()=>{

        };*/
        self.onWrapSink = ()=>{

        };
        return self;
    }

    abstract onWrapSink():void
}

class Head<T> extends IntStreamsImpl implements intStream {

    constructor(split:Spliterator<number>) {
        super(split);
    }

    onWrapSink(): void {
    }

}

class StaleFull<T> extends IntStreamsImpl implements intStream {

    constructor(streamParent: intStreamA) {
        super(<IntStreamsImpl>streamParent);
    }

    onWrapSink(): void {
    }


}
export abstract class IntStreamsPipe {

    public static Head = Head;

    public static StaleFull = StaleFull;

}

export class IntStreams implements intStream{
    allMatch(predicate: intPredicate) {
    }

    anyMatch(predicate: intPredicate) {
    }

    average(): Optional<number> {
        return undefined;
    }

    collect<R>(supplier: supplier<number>): R {
        return undefined;
    }

    each(consumer: consumerFn<number>):void {
    }

    filter(predicate: predicateFn<number>):IntStreams {
        console.log('dqdqdssqdsqdsqdqsdsqdsq')
        return this;
    }

    public static builder():IntStreamBuilder{return  new Streams.IntStreamBuilder();}
}


//class
//let k: intStream = new IntStreams.Head();