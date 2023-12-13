import {TerminalOps, terminalOps, terminalSink} from "./TerminalOps";
import {PipelineHelper} from "./PipelineHelper";
import {supplier, supplierFn} from "../Interface";
import {StreamShape} from "./StreamShape";
import {Enum} from "../Enum";
import {sink} from "./Sink";
import {Spliterator} from "../utils/Spliterator";
import { UnsupportedOperationException} from "../Exception";
import {Predication} from "../utils/Predication";


interface BooleanTerminalSink<T> extends sink<T>{
    stop:boolean
    value:boolean
    getAndClearState():boolean
}

class MatchKind extends Enum{

    @Enum.args(true, true)
    static ANY:MatchKind;

    @Enum.args(false, false)
    static ALL:MatchKind;

    @Enum.args(true, false)
    static NONE:MatchKind;

    private readonly stopOnPredicateMatches:boolean;
    private readonly shortCircuitResult:boolean;

    constructor(stopOnPredicateMatches:boolean, shortCircuitResult:boolean) {
        super();
        this.stopOnPredicateMatches=stopOnPredicateMatches;
        this.shortCircuitResult    = shortCircuitResult;
    }

    public getStopOnPredicateMatches():boolean{return this.stopOnPredicateMatches;}

    public getShortCircuitResult():boolean{return this.shortCircuitResult;}
}


export class MatchOps {

    private constructor() {}
    /***
     * @type {MatchKind}
     */
    public static readonly MatchKind = MatchKind;
    /***
     *
     * @param predicate
     * @param {MatchKind} matcher
     * @returns {TerminalOps<T, boolean>}
     */
    public static makeRef<T>(predicate:any, matcher:MatchKind):TerminalOps<T, boolean>{

        class MatchSink extends MatchOps.BooleanTerminalSink<T>{

            constructor() {super(matcher);}

            accept(o: T) {
                if (!this.stop && predicate.test(o) == matcher.getStopOnPredicateMatches()) {
                    this.stop = true;
                    this.value = matcher.getStopOnPredicateMatches();
                }
            }

        }

        return new MatchOps.MatchOp(StreamShape.REFERENCE,matcher,new class implements supplier<BooleanTerminalSink<T>>{
            get: supplierFn<BooleanTerminalSink<T>> = ()=> new MatchSink();
        });
    }
    /***
     *
     * @param predicate
     * @param {MatchKind} matcher
     * @returns {TerminalOps<number, boolean>}
     */
    public static makeInt(predicate:Predication<number>, matcher:MatchKind):TerminalOps<number, boolean>{

        class MatchSink extends MatchOps.BooleanTerminalSink<number>{

            constructor() {super(matcher);}

            accept(o: number) {
                if (!this.stop && predicate.test(o) == matcher.getStopOnPredicateMatches()) {
                    this.stop = true;
                    this.value = matcher.getStopOnPredicateMatches();
                }
            }

        }
        return new MatchOps.MatchOp(StreamShape.INT_VALUE,matcher,new class implements supplier<BooleanTerminalSink<number>>{
            get: supplierFn<BooleanTerminalSink<number>> = ()=> new MatchSink();
        });
    }

    private static readonly BooleanTerminalSink = class BooleanTerminalSink<T> implements BooleanTerminalSink<T>{

        stop:boolean;
        value:boolean;

        constructor(matcher:MatchKind) {
            this.value = !matcher.getShortCircuitResult();
        }

        getAndClearState(): boolean {return this.value;}

        cancellationRequested(): boolean {return this.stop;}

        /**@toDoImplement**/
        accept(o: T): void { throw new UnsupportedOperationException("To do implement")}

        begin(value: number): void {}

        end(): void {}

    };

    private static readonly MatchOp = class MatchOp<T> implements terminalOps<T, boolean>{

        private readonly shape: StreamShape;
        private readonly matchKind: MatchKind;
        private readonly sinkSupplier:supplier<BooleanTerminalSink<T>>;

        constructor(shape:StreamShape, matchKind: MatchKind,sinkSupplier: supplier<BooleanTerminalSink<T>> ) {
            this.shape          = shape;
            this.matchKind      = matchKind;
            this.sinkSupplier   = sinkSupplier;
        }

        evaluateSequential<P_IN>(helper: PipelineHelper<T>, spliterator: Spliterator<P_IN>): boolean {
            return helper.wrapAndCopyInto(this.sinkSupplier.get(), spliterator).getAndClearState();
        }

        /**@Mock**/
        getOpFlag(): number {return 1;}

        inputShape(): StreamShape {return this.shape;}
    }

}
Object.package(this);