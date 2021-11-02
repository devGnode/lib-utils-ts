import {
    Func,
    intPredicate,
    intStream,
    IntStreamBuilder, predicate,
    predicateFn,
    spliterator,
    supplier,
    collector, ObjIntConsumer
} from "../Interface";
import {Streams} from "../Streams";
import { Spliterator } from "../Spliterator";
import {OptionalInt} from "../OptionalInt";
import {ForEachOps} from "./ForEachOps";
import {BiConsumer, IntConsumer} from "../Consumer";
import {UnsupportedOperationException} from "../Exception";
import {AbstractPipeline} from "./AbstractPipeline";
import {Sink, sink} from "./Sink";
import {StreamShape} from "./StreamShape";
import {Predication} from "../Predication";
import {ReduceOps} from "./ReduceOps";


export abstract class IntPipeline<E_IN> extends AbstractPipeline<E_IN, number, intStream> implements intStream {

    /****
     */
     protected constructor(value:Spliterator<number>|AbstractPipeline<any, E_IN, any>|supplier<spliterator<number>>) {
         super(value);
     }

     public getOutputShape(): StreamShape{return StreamShape.INT_VALUE;}

    allMatch(predicate: intPredicate) :boolean{
         return true;
    }

    anyMatch(predicate: intPredicate):boolean {
         return true;
    }

    average(): OptionalInt {
        return OptionalInt.of(0);
    }

    collect<R>(supplier: supplier<R>, consumer?:ObjIntConsumer<R>, combiner?:BiConsumer<R,R>): R {
        return this.evaluate(ReduceOps.makeIntBinaryOperator(supplier,consumer));
    }

    collector<R>(collector:collector<number, R, R>):R{
        return this.collect(
            collector.supplier(),
            new class implements ObjIntConsumer<R>{
            accept(t: R, value: number) {
                collector.accumulator().accept(t,value);
            }
        },
            null);
    }

    each(consumer: IntConsumer ): void {
         this.evaluate(ForEachOps.makeInt(consumer));
    }

    forEachWithCancel(sink: sink<number>,spliterator: spliterator<number>): boolean {
         let canceled:boolean;
         do{}while( !( canceled = sink.cancellationRequested() ) && spliterator.tryAdvance(sink) );
        return canceled;
    }

    filter(predicate: predicateFn<number>): intStream {
        let p:predicate<number> = Predication.of(Object.requireNotNull(predicate)),
            slf:this = this;

        return new class extends StatelessOp<number>{
            constructor() {super(slf,0);}

            opWrapSink(flags: number, sink: sink<number>): sink<number> {
                return new class extends Sink.ChainedInt<number>{

                    constructor() {super(sink);}

                    accept(value:number){
                        if(p.test(value)) this.downstream.accept(value);
                    }

                }
            }
        };
    }

    count(): number {return 0;}

    findAny(consumer:IntConsumer): OptionalInt {
        return this.evaluate(FindOps.makeInt(false))
    }

    findFirst(): OptionalInt {
         return this.evaluate(FindOps.makeInt(true))
    }

    map(supplier: Func<number,number>): intStream {
         let slf:this = this;

         return new class extends StatelessOp<number>{

             constructor() {super(slf,0);}

             opWrapSink(flags: number, sink: sink<number>): sink<number> {
                 return new class extends Sink.ChainedInt<number>{

                        constructor() {super(sink);}

                        accept(o: number) {
                            this.downstream.accept(supplier.call(null,o))
                        }
                 };
             }

         };
    }

    public static builder():IntStreamBuilder{return  new Streams.IntStreamBuilder();}
}


class Head<E_IN> extends IntPipeline<E_IN> implements intStream {

    constructor(split:Spliterator<number>|supplier<spliterator<number>>, sourceFlag:number) {
        super(split,sourceFlag);
    }

    opIsStateful(): boolean { throw new UnsupportedOperationException(); }

    opWrapSink(flags: number, sink: sink<number>): sink<E_IN> {
        throw new UnsupportedOperationException();
    }

    each(consumer: IntConsumer) {
        super.each(consumer);
    }
}

class StatelessOp<E_IN> extends IntPipeline<E_IN> implements intStream {

    constructor(streamParent: AbstractPipeline<any, E_IN, any>, sourceFlag:number) {
        super(streamParent,sourceFlag);
    }

    opIsStateful(): boolean {return false;}

    opWrapSink(flags: number, sink: sink<number>): sink<E_IN> {
        return null;
    }

}

class StateFulOp<E_IN> extends IntPipeline<E_IN> implements intStream {

    constructor(streamParent: AbstractPipeline<any, E_IN, any>, opFlags:number) {
        super(streamParent,opFlags);
    }

    opIsStateful(): boolean {return true;}

    opWrapSink(flags: number, sink: sink<number>): sink<E_IN> {
        return null;
    }

}

export abstract class IntPipelineImpl {
    /****
     *
     */
    public static Head      = Head;
    /****
     *
     */
    public static StaleFull = StateFulOp;
}