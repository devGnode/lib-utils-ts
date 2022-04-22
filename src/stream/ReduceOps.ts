import {TerminalOps, terminalOps, terminalSink} from "./TerminalOps";
import {StreamShape} from "./StreamShape";
import {PipelineHelper} from "./PipelineHelper";
import {biConsumer, collector, ObjIntConsumer, supplier} from "../Interface";
import {UnsupportedOperationException} from "../Exception";
import {Spliterator} from "../utils/Spliterator";
import {OptionalInt} from "../utils/OptionalInt";
import {Objects} from "../type/Objects";
import {Optional} from "../utils/Optional";
import {BinaryOperator} from "../utils/BinaryOperator";

interface AccumulatingSink<T, R, K extends AccumulatingSink<T, R, K>> extends terminalSink<T, R> {
   combine(other:K):void;
}
/*
* Evaluate
* **/
export class ReduceOps {

    private constructor() {}
    /***
     *
     * @type {Box<T>>}
     */
    private static Box = class Box<T>{
        state: T;

        constructor() {}

        public get():T{ return this.state; }

    };
    /***
     * @Nested
     * @type {terminalOps<T, R>}
     */
    private static ReduceOp = class ReduceOp<T, R, S extends AccumulatingSink<T, R, S>> implements terminalOps<T, R>{

        private readonly shape:StreamShape;

        constructor(shape:StreamShape) {this.shape = shape;}

        // @toOverriding
        public makeSink():S{throw new UnsupportedOperationException();}

        evaluateSequential<P_IN>(helper: PipelineHelper<T>, spliterator: Spliterator<P_IN>): R {
            return helper.wrapAndCopyInto(this.makeSink(),spliterator).get();
        }

        getOpFlag(): number {return 0;}

        inputShape(): StreamShape {return this.shape;}

    };

    /***
     * @RefPipeline
     * @see Reduce, Min, Max
     */
    public static makeRefOperator<T>(operator:BinaryOperator<T>):TerminalOps<T,Optional<T>>{
        Objects.requireNotNull(operator);
        class ReduceSink
            implements AccumulatingSink<T, Optional<T>, ReduceSink> {

            private state:T;
            private empty:boolean;

            begin(value: number):void {
                this.state = null;
                this.empty = true;
            }

            accept(o: T): void {
                if(this.empty){
                   this.empty=!this.empty;
                   this.state = o;
                }else{
                    this.state = operator.apply(this.state, o);
                }
            }
            /***
             * @override
             **/
            public get():Optional<T> {return this.empty ? Optional.empty() : Optional.ofNullable(this.state);}

            // toDo decommission
            combine(other: ReduceSink): void {}

            cancellationRequested(): boolean {return false;}

            end(): void {}

        }
        return new class extends ReduceOps.ReduceOp<T,Optional<T>,ReduceSink>{

            constructor() {super(StreamShape.REFERENCE);}

            makeSink(): ReduceSink {return new ReduceSink();}
        }
    }

    /***
     * @RefPipeline
     * @param {collector<T, I, any>} collector
     * @return {TerminalOps<T, I>}
     */
    public static makeRefCollect<T,I>(collector:collector<T, I, any>):TerminalOps<T,I>{
         let supplier:supplier<I> = Objects.requireNotNull(collector.supplier()),
         accumulator:biConsumer<I, T> = Objects.requireNotNull(collector.accumulator());

        class ReduceSink extends ReduceOps.Box<I>
            implements AccumulatingSink<T, I, ReduceSink> {

            begin(value: number):void {this.state = supplier.get();}

            accept(o: T): void {accumulator.accept(this.state, o);}

            combine(other: ReduceSink): void {}

            cancellationRequested(): boolean {return false;}

            end(): void {}

        }
        return new class extends ReduceOps.ReduceOp<T,I,ReduceSink>{

            constructor() {super(StreamShape.REFERENCE);}

            makeSink(): ReduceSink {return new ReduceSink();}
        }
    }

    public static makeRef<T,R>(supplier:supplier<R>, accumulator:biConsumer<R,T>):TerminalOps<T,R>{
        Objects.requireNotNull(supplier);
        Objects.requireNotNull(accumulator);
        class ReduceSink extends ReduceOps.Box<R>
            implements AccumulatingSink<T, R, ReduceSink> {

            begin(value: number):void {this.state = supplier.get();}

            accept(o: T): void {accumulator.accept(this.state, o);}

            combine(other: ReduceSink): void {}

            cancellationRequested(): boolean {return false;}

            end(): void {}

        }
        return new class extends ReduceOps.ReduceOp<T,R,ReduceSink>{

            constructor() {super(StreamShape.REFERENCE);}

            makeSink(): ReduceSink {return new ReduceSink();}
        }
    }

    public static makeIntOperator(op:Function):TerminalOps<number, OptionalInt>{
        Objects.requireNotNull(op);
        class ReduceSink implements AccumulatingSink<number, OptionalInt, ReduceSink>{
            private empty:boolean;
            private state:number;

            accept(o: number): void {
                if (this.empty) {
                    this.empty = false;
                    this.state = o;
                }
                else {
                    this.state = op.call(null,this.state, o);
                }
            }

            get(): OptionalInt {return this.empty ? OptionalInt.empty() : OptionalInt.of(this.state);}

            begin(value: number): void {
                this.empty = true;
                this.state = 0;
            }

            cancellationRequested(): boolean {return false;}

            combine(other: ReduceSink): void {
                //
            }

            end(): void {}

        }
        return new class extends ReduceOps.ReduceOp<number,OptionalInt,ReduceSink>{

            constructor() {super(StreamShape.INT_VALUE);}

            makeSink(): ReduceSink {return new ReduceSink();}

        }
    }

    public static makeIntOperatorN(start:number, op:Function):TerminalOps<number, number>{
        Objects.requireNotNull(op);
        class ReduceSink implements AccumulatingSink<number, number, ReduceSink>{

            private state:number;

            accept(o: number): void {
                    this.state = op.call(null,this.state, o);
            }

            get(): number {return this.state;}

            begin(value: number): void {this.state = start;}

            cancellationRequested(): boolean {return false;}

            combine(other: ReduceSink): void {
                //
            }

            end(): void {}

        }
        return new class extends ReduceOps.ReduceOp<number,number,ReduceSink>{

            constructor() {super(StreamShape.INT_VALUE);}

            makeSink(): ReduceSink {return new ReduceSink();}

        }
    }

    public static makeIntSupplier<R>(supplier:supplier<R>, accumulator: ObjIntConsumer<R>):TerminalOps<number, R>{

        class ReduceSink extends ReduceOps.Box<R> implements AccumulatingSink<number, R, ReduceSink>{


            accept(o: number): void {accumulator.accept(this.state,o);}

            begin(value: number): void {this.state = supplier.get();}

            cancellationRequested(): boolean {return false;}

            combine(other: ReduceSink): void {

            }

            end(): void {}

        }

        return new class extends ReduceOps.ReduceOp<number,R,ReduceSink>{

            constructor() {super(StreamShape.INT_VALUE);}

            makeSink(): ReduceSink {return new ReduceSink();}

        }
    }
}
Object.package(this);