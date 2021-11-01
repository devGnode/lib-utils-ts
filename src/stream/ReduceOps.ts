import {TerminalOps, terminalOps, terminalSink} from "./TerminalOps";
import {StreamShape} from "./StreamShape";
import {PipelineHelper} from "./PipelineHelper";
import {biConsumer, ObjIntConsumer, spliterator, supplier} from "../Interface";
import {UnsupportedOperationException} from "../Exception";
import {Spliterator} from "../Spliterator";

interface AccumulatingSink<T, R, K extends AccumulatingSink<T, R, K>> extends terminalSink<T, R> {
   combine(other:K):void;
}

/*
* Evaluate
* **/
export class ReduceOps {

    private constructor() {}

    private static Box = class Box<T>{
        state: T;

        constructor() {}

        public get():T{ return this.state; }

    }

    private static ReduceOp = class ReduceOp<T, R, S extends AccumulatingSink<T, R, S>> implements terminalOps<T, R>{

        private readonly shape:StreamShape;

        constructor(shape:StreamShape) {this.shape = shape;}

        // @toOverriding
        public  makeSink():S{throw new UnsupportedOperationException();}

        evaluateSequential<P_IN>(helper: PipelineHelper<T>, spliterator: Spliterator<P_IN>): R {
            return helper.wrapAndCopyInto(this.makeSink(),spliterator).get();
        }

        getOpFlag(): number {return 0;}

        inputShape(): StreamShape {return this.shape;}

    }

    public static makeIntBinaryOperator<R>(supplier:supplier<R>, accumulator: ObjIntConsumer<R>):TerminalOps<number, R>{

        class ReduceSink extends ReduceOps.Box<R> implements AccumulatingSink<number, R, ReduceSink>{


            accept(o: number): void {
                accumulator.accept(this.state,o);
            }

            begin(value: number): void {
                this.state = supplier.get();
            }

            cancellationRequested(): boolean {
                return false;
            }

            combine(other: ReduceSink): void {
            }

            end(): void {
            }

        }

        return new class extends ReduceOps.ReduceOp<number,R,ReduceSink>{

            constructor() {super(StreamShape.INT_VALUE);}

            makeSink(): ReduceSink {return new ReduceSink();}

        }
    }
}