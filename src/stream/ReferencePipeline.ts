import {AbstractPipeline} from "./AbstractPipeline";
import {StreamShape} from "./StreamShape";
import {Sink, sink} from "./Sink"
import {IllegalArgumentException, UnsupportedOperationException} from "../Exception";
import {Spliterator} from "../utils/Spliterator";
import {
    collector,
    comparator,
    Func,
    optional,
    predicate,
    predication,
    spliterator,
    Stream,
    supplier,
    consumer, biConsumer, intStream, ToTypeFunction
} from "../Interface";
import {Supplier} from "../utils/Supplier";
import {ForEachOps} from "./ForEachOps";
import {Consumer} from "../Consumer";
import {FindOps} from "./FindOps";
import {Predication} from "../utils/Predication";
import {MatchOps} from "./MatchOps";
import {Objects} from "../type/Objects";
import {ReduceOps} from "./ReduceOps";
import {Collectors} from "../Collectors";
import {IntPipelineImpl} from "./IntPipeline";
import {SliceOps} from "./SliceOps";
import {Optional} from "../utils/Optional";
import {BinaryOperator} from "../utils/BinaryOperator";

export abstract class ReferencePipeline<P_IN,P_OUT> extends AbstractPipeline<P_IN, P_OUT, Stream<P_OUT>> implements Stream<P_OUT>{

    protected constructor(value:Spliterator<any>|Supplier<spliterator<any>>|AbstractPipeline<any, P_IN, any>, sourceFlag:number) {
        super(value,sourceFlag);
    }

    public getOutputShape(): StreamShape {return StreamShape.REFERENCE;}

    public abstract opWrapSink(flags: number, sink: sink<P_OUT>): sink<P_IN>;
    /***
     * Most easy case
     * @param {consumer<P_OUT>} consumer
     */
    public each(consumer:consumer<P_OUT>): void {
        this.evaluate(new ForEachOps.OfRef(Consumer.of(consumer)))
    }
    /***
     *
     * @param {Func<P_OUT, R>} mapper
     * @return {Stream<R>}
     */
    public map<R>(mapper: Func<P_OUT, R>): Stream<R> {
        let slf:this = this;
        Objects.requireNotNull(mapper);
        return new class extends StateOps<P_OUT,R>{

            constructor() {super(slf,0);}

            /**@override**/
            opWrapSink(flags: number, sink: sink<R>): sink<P_OUT> {

                return new class extends Sink.ChainedReference<P_OUT,R>{

                    constructor() {super(sink);}

                    /**@override**/
                    accept(o: P_OUT) {
                        this.downstream.accept(mapper.call(o,o));
                    }
                };
            }
        };
    }
    /***
     *
     * @param {ToTypeFunction<P_OUT, number>} mapper
     * @return {intStream}
     */
    public mapToInt(mapper:ToTypeFunction<P_OUT, number>):intStream{
        Objects.requireNotNull(mapper);
        let slf:this = this;
        return new class extends IntPipelineImpl.StalelessOp<P_OUT>{

            // @ts-ignore
            constructor() {super(slf, StreamShape.REFERENCE);}

            public opWrapSink(flags: number, sink: sink<number>): sink<P_OUT> {
                return new class extends Sink.ChainedReference<P_OUT, number>{

                    constructor() {super(sink);}
                    /***@override*/
                    public accept(o: P_OUT) {
                        this.downstream.accept(mapper.applyAs(o));
                    }
                };
            }

        };
    }

    sort(comparator: comparator<P_OUT>): Stream<P_OUT> {
        return undefined;
    }
    /***
     *
     * @return {optional<P_OUT>}
     */
    public findAny(): optional<P_OUT> {
        return this.evaluate(FindOps.makeRef(false));
    }
    /***
     *
     * @param {predication<P_OUT>} predicate
     * @return {boolean}
     */
    public allMatch(predicate: predication<P_OUT>): boolean {
        return this.evaluate(MatchOps.makeRef(predicate,MatchOps.MatchKind.ALL));
    }
    /***
     *
     */
    public anyMatch(predicate: predication<P_OUT>): boolean {
        return this.evaluate(MatchOps.makeRef(Predication.of(predicate),MatchOps.MatchKind.ANY));
    }
    /***
     *
     * @return {number}
     */
    public count(): number {
        class Dummy implements ToTypeFunction<P_OUT, number>{
            public applyAs(type: P_OUT): number {return 1;}
        }
        return this.mapToInt(new Dummy()).sum();
    }
    /***
     *
     * @param {predication<P_OUT>} predicate
     * @return {Stream<P_OUT>}
     */
    public filter(predicate: predication<P_OUT>): Stream<P_OUT> {
        let slf:this = this, p:predicate<P_OUT>;

        Objects.requireNotNull(predicate);
        p = Predication.of(predicate);
        return new class extends StateOps<P_OUT,P_OUT>{

            constructor() {super(slf,slf.getStreamAndOpFlags());}

            opWrapSink(flags: number, sink: sink<P_OUT>): sink<P_OUT> {

                return new class extends Sink.ChainedReference<P_OUT,P_OUT>{

                    constructor() {super(sink);}

                    /**@override**/
                    accept(o: P_OUT) {
                        if( p.test(o) ) this.downstream.accept(o);
                    }
                };
            }
        };
    }
    public flatMap<R extends Stream<R>>(mapper: Func<P_OUT, R>): Stream<R> {
        let slf:this = this;
        Objects.requireNotNull(mapper());
        return new class extends StateOps<P_OUT,R>{

            constructor() {super(slf,slf.getStreamAndOpFlags());}

            public opWrapSink(flags: number, sink: sink<R>): sink<P_OUT> {
                return new class extends Sink.ChainedReference<P_OUT,R>{

                    constructor() {super(sink);}

                    /**@override**/
                    accept(o: P_OUT) {
                        try{
                            let tmp:Stream<R> = mapper(o);
                            if(tmp!=null)tmp.each(this.downstream);
                        }catch (e) {}
                    }
                };
            }
        };
    }
    /***
     *
     * @return {optional<P_OUT>}
     */
    public findFirst(): optional<P_OUT> {
        return this.evaluate(FindOps.makeRef(true));
    }
    /***
     *
     * @param {number} maxValue
     * @return {Stream<P_OUT>}
     */
    public limit(maxValue: number): Stream<P_OUT> {
        if(maxValue<0) throw new IllegalArgumentException();
        return SliceOps.makeRef(this, 0, maxValue);
    }
    /***
     *
     * @param {predication<P_OUT>} predicate
     * @return {boolean}
     */
    public noneMatch(predicate: predication<P_OUT>): boolean {
        return this.evaluate(MatchOps.makeRef(predicate, MatchOps.MatchKind.NONE));
    }

    /*public reduceA(identit:P_OUT, accumulator:Function ):P_OUT{

    }*/
    /***
     *
     * @param {Function} accumulator
     * @return {Optional<P_OUT>}
     */
    public reduce(accumulator:BinaryOperator<P_OUT>):Optional<P_OUT>{
        return this.evaluate(ReduceOps.makeRefOperator(BinaryOperator.from(accumulator)));
    }
    /***
     * @param {comparator<C>} comparator
     * @return {Optional<C>}
     */
    public min(comparator:comparator<P_OUT>):Optional<P_OUT>{
        return this.reduce(BinaryOperator.minBy(comparator));
    }
    /***
     * @param {comparator<C>} comparator
     * @return {Optional<C>}
     */
    public max(comparator:comparator<P_OUT>):Optional<P_OUT>{
        return this.reduce(BinaryOperator.maxBy(comparator));
    }
    /***
     *
     * @param {supplier<R>} supplier
     * @param {biConsumer<R, O>} biConsumer
     * @return {R}
     */
    public collect<R, O extends P_OUT>(supplier:supplier<R>, biConsumer: biConsumer<R, O>):R{
        return this.evaluate(ReduceOps.makeRef(supplier,biConsumer));
    }
    /***
     *
     * @param {collector<O, A, R>} collector
     * @return {R}
     */
    public collector<R, A, O extends P_OUT>(collector: collector<O, A, R>): R {
        return collector.finisher().call(null,this.evaluate(ReduceOps.makeRefCollect(collector)));
    }
    /***
     *
     * @param {sink<P_OUT>} sink
     * @param {spliterator<P_OUT>} spliterator
     * @return {boolean}
     */
    public forEachWithCancel(sink: sink<P_OUT>,spliterator: spliterator<P_OUT>): boolean {
        let canceled:boolean;
        do{}while( !( canceled = sink.cancellationRequested() ) && spliterator.tryAdvance(sink) );
        return canceled;
    }
    /**/
    public toObjectArray():Object[]{return this.collector(Collectors.toArray());}
    /***
     *
     * @return {Object[]}
     */
    public toArray(): P_OUT[] {return <P_OUT[]>this.toObjectArray();}
}

class Head<E_IN,E_OUT> extends ReferencePipeline<E_IN, E_OUT>{

    constructor(value:Spliterator<E_IN>|supplier<spliterator<E_IN>>, opFlags:number) {
        super(value,opFlags);
    }

    opWrapSink(flags: number, sink: sink<E_OUT>): sink<E_IN> {throw new UnsupportedOperationException();}

    opIsStateful(): boolean { throw new UnsupportedOperationException();}

    each(consumer:Consumer<E_OUT>):void {super.each(consumer);}

}

class StateOps<E_IN,E_OUT> extends ReferencePipeline<E_IN, E_OUT>{

    constructor(value:AbstractPipeline<any, E_IN, any>, opFlags:number) {
        super(value, opFlags);
    }

    opWrapSink(flags: number, sink: sink<E_OUT>): sink<E_IN> {throw new UnsupportedOperationException();}

    opIsStateful(): boolean { throw new UnsupportedOperationException();}

    each(consumer:Consumer<E_OUT>):void {super.each(consumer);}

}

class StateOpFulOp<E_IN,E_OUT> extends ReferencePipeline<E_IN, E_OUT>{

    constructor(value:AbstractPipeline<any, E_IN, any>, opFlags:number) {super(value, opFlags);}

    opIsStateful(): boolean { return true; }

    opWrapSink(flags: number, sink: sink<E_OUT>): sink<E_IN> {return null;}
}


export abstract class ReferencePipelineImpl{
    /***
     *
     * @type {Head}
     */
    public static readonly Head         = Head;
    /***
     *
     * @type {StateOps}
     */
    public static readonly StateOps     = StateOps;
    /***
     *
     * @type {StateOpFulOp}
     */
    public static readonly StateFulOp   = StateOpFulOp;
}
Object.package(this);