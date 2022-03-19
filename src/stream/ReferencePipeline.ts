import {AbstractPipeline} from "./AbstractPipeline";
import {StreamShape} from "./StreamShape";
import {Sink, sink} from "./Sink"
import {UnsupportedOperationException} from "../Exception";
import {Spliterator} from "../Spliterator";
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
    consumer
} from "../Interface";
import {Supplier} from "../Supplier";
import {ForEachOps} from "./ForEachOps";
import {Consumer} from "../Consumer";
import {FindOps} from "./FindOps";
import {Predication} from "../Predication";
import {MatchOps} from "./MatchOps";
import {Objects} from "../type/Objects";


export abstract class ReferencePipeline<P_IN,P_OUT> extends AbstractPipeline<P_IN, P_OUT, Stream<P_OUT>> implements Stream<P_OUT>{

    protected constructor(value:Spliterator<any>|Supplier<spliterator<any>>|AbstractPipeline<any, P_IN, any>) {
        super(value,0);
    }

    getOutputShape(): StreamShape {return StreamShape.REFERENCE;}

    abstract opWrapSink(flags: number, sink: sink<P_OUT>): sink<P_IN>;

    public each(consumer:consumer<P_OUT>): void {
        this.evaluate(new ForEachOps.OfRef(Consumer.of(consumer)))
    }

    public map<R>(mapper: Func<P_OUT, R>): Stream<R> {
        let slf:this = this;
        Objects.requireNotNull(mapper);
        return new class extends StateOps<P_OUT,R>{

            constructor() {super(slf);}

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
        }
    }


    public findAny(): optional<P_OUT> {
        return this.evaluate(FindOps.makeRef(false));
    }

    sort(comparator: comparator<P_OUT>): Stream<P_OUT> {
        return undefined;
    }

    sum(): number {
        return 0;
    }

    public allMatch(predicate: predication<P_OUT>): boolean {
        return this.evaluate(MatchOps.makeRef(predicate,MatchOps.MatchKind.ALL));
    }

    public anyMatch(predicate: predication<P_OUT>): boolean {
        return this.evaluate(MatchOps.makeRef(predicate,MatchOps.MatchKind.ANY));
    }

    count(): number {
        return 0;
    }

    public filter(predicate: predication<P_OUT>): Stream<P_OUT> {
        let slf:this = this, p:predicate<P_OUT>;

        Objects.requireNotNull(predicate);
        p = Predication.of(predicate);
        return new class extends StateOps<P_OUT,P_OUT>{

            constructor() {super(slf);}

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

    public findFirst(): optional<P_OUT> {
        return this.evaluate(FindOps.makeRef(true));
    }

    limit(maxValue: number): Stream<P_OUT> {
        return undefined;
    }

   public noneMatch(predicate: predication<P_OUT>): boolean {
        return this.evaluate(MatchOps.makeRef(predicate, MatchOps.MatchKind.NONE));
    }

    collector<R, A>(collector: collector<P_OUT, A, R>): R {
        return undefined;
    }

    public forEachWithCancel(sink: sink<P_OUT>,spliterator: spliterator<P_OUT>): boolean {
        let canceled:boolean;
        do{}while( !( canceled = sink.cancellationRequested() ) && spliterator.tryAdvance(sink) );
        return canceled;
    }

    toArray(): Object[] {
        return [];
    }
}

class Head<E_IN,E_OUT> extends ReferencePipeline<E_IN, E_OUT>{

    constructor(value:Spliterator<E_IN>|supplier<spliterator<E_IN>>) {
        super(value);
    }

    opWrapSink(flags: number, sink: sink<E_OUT>): sink<E_IN> {throw new UnsupportedOperationException();}

    opIsStateful(): boolean { throw new UnsupportedOperationException();}

    each(consumer:Consumer<E_OUT>):void {
        super.each(consumer);
    }

}

class StateOps<E_IN,E_OUT> extends ReferencePipeline<E_IN, E_OUT>{

    constructor(value:AbstractPipeline<any, E_IN, any>) {
        super(value);
    }

    opWrapSink(flags: number, sink: sink<E_OUT>): sink<E_IN> {throw new UnsupportedOperationException();}

    opIsStateful(): boolean { throw new UnsupportedOperationException();}

    each(consumer:Consumer<E_OUT>):void {
        super.each(consumer);
    }

}

export abstract class ReferencePipelineImpl{

    public static readonly Head     = Head;

    public static readonly StateOps = StateOps;

}
Object.package(this);