import {terminalOps, TerminalOps, terminalSink} from "./TerminalOps";
import {Spliterator} from "../utils/Spliterator";
import {StreamShape} from "./StreamShape";
import {IntConsumer} from "../Consumer";
import {ofInt} from "./Sink";
import {consumerFn, IConsumer, supplierFn} from "../Interface";
import {UnsupportedOperationException} from "../Exception";
import {PipelineHelper} from "./PipelineHelper";
import {Objects} from "../type/Objects";
/**
 * @ForEachOps
 * */
export class ForEachOps {
    /***/
    private constructor() {}
    /***/
    private static ForEachOp = class ForEachOp<T>
        extends TerminalOps<T, void> implements terminalOps<T, void>, terminalSink<T, void> {

        accept: consumerFn<T>;

        get: supplierFn<void> = ()=> void 0;

        begin(value: number): void {throw new UnsupportedOperationException("Method is not implemented !");}

        end(): void {throw new UnsupportedOperationException("Method is not implemented !");}

        cancellationRequested(): boolean {throw new UnsupportedOperationException("Method is not implemented !");}

        /**@TerminalSink**/

        getOpFlag(): number {return 0;}

        inputShape(): StreamShape {return undefined;}

        evaluateSequential<S>(helper: PipelineHelper<T>, spliterator: Spliterator<S>): void {
           return helper.wrapAndCopyInto(this,spliterator).get();
        }

    };

    public static OfRef = class OfRef<T> extends ForEachOps.ForEachOp<T>{

        readonly consumer:IConsumer<T>;

        constructor(consumer:IConsumer<T>) {
            super();
            this.consumer=consumer;
        }

        public accept = (value:T) => this.consumer.accept(value);

        public inputShape(): StreamShape {return StreamShape.REFERENCE;}

        begin(value: number): void {}

        cancellationRequested(): boolean {
            return false;
        }

        end(): void {}

    };

    public static OfInt = class OfInt extends ForEachOps.OfRef<number> implements ofInt{

        constructor(consumer:IntConsumer) {super(consumer);}

        public accept = (value:number) => this.consumer.accept(value);

        public inputShape(): StreamShape {return StreamShape.INT_VALUE;}

    };


    public static makeRef<T>(consumer:IConsumer<T>):TerminalOps<T, void>{
        return new ForEachOps.OfRef<T>(Objects.requireNotNull(consumer));
    }

    public static makeInt(consumer:IntConsumer):TerminalOps<number, void>{
        return new ForEachOps.OfInt(Objects.requireNotNull(consumer));
    }
}
Object.package(this);