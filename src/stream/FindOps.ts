import {terminalOps, terminalSink} from "./TerminalOps";
import {PipelineHelper} from "./PipelineHelper";
import { predicate, supplier, supplierFn} from "../Interface";
import {StreamShape} from "./StreamShape";
import {Spliterator} from "../utils/Spliterator";
import {Optional} from "../utils/Optional";
import {ofInt} from "./Sink";
import {OptionalInt} from "../utils/OptionalInt";

export class FindOps {

    private constructor() {}

    private static readonly FindOp = class FindOps<T,O> implements terminalOps<T,O>{

        protected readonly shapeOps:StreamShape;
        readonly mustFindFirst:boolean;                     // parallel
        readonly emptyValue:O;
        readonly sinkSupplier:supplier<terminalSink<T, O>>;
        readonly predicate:predicate<O>;                    // parallel
        readonly opFlags;

        constructor(mustFindFirst:boolean, shapeOps:StreamShape, emptyValue:O, predicate:predicate<O>, sinkSupplier:supplier<terminalSink<T, O>> ) {
            this.mustFindFirst = mustFindFirst;      // parallel
            this.shapeOps      = shapeOps;
            this.emptyValue    = emptyValue;
            this.predicate     = predicate;         // parallel
            this.sinkSupplier  = sinkSupplier;
            this.opFlags       = 0x01;              // MOCK
        }

        /**TerminalOps**/

        evaluateSequential<S>(helper: PipelineHelper<T>, spliterator: Spliterator<S>): O {
            let tmp:O = helper.wrapAndCopyInto(this.sinkSupplier.get(), spliterator).get();
            return Optional.ofNullable(tmp).isPresent() ? tmp : this.emptyValue;
        }

        getOpFlag(): number {return this.opFlags;}

        inputShape(): StreamShape {return this.shapeOps;}

    };


    private static readonly FindSink = class FindSink<T,O> implements terminalSink<T,O>{

        protected hasValue:boolean;
        value:T;

        constructor() {}

        accept(o: T): void {
            if(!this.hasValue){
                this.hasValue = true;
                this.value = o;
            }
        }

        /**TerminalSink**/

        get(): O {return null;}

        begin(value: number): void {}

        /**@override**/
        cancellationRequested(): boolean {return this.hasValue;}

        end(): void {}
    };

    private static readonly FindSinkImpl = class FindSinkImpl{

        public static readonly OfRef = class OfRef<T> extends FindOps.FindSink<T, Optional<T>>{

            /**@override**/
            public get():Optional<T> {return this.hasValue ? Optional.of(this.value) : null;}

           public static readonly OP_FIND_FIRST = class OF_FIND_ANY<T> implements supplier<terminalOps<T, Optional<T>>>{
                     get = ()=> new FindOps.FindOp<T,Optional<T>>(
                             true,
                             StreamShape.REFERENCE,
                             <Optional<T>>Optional.empty(),
                             null,
                             new class implements supplier<terminalSink<T, Optional<T>>>{
                                  get : supplierFn<terminalSink<T, Optional<T>>> = () =>  new FindOps.FindSinkImpl.OfRef();
                             })
           };

           public static readonly OP_FIND_ANY = class OF_FIND_FIRST<T> implements supplier<terminalOps<T, Optional<T>>>{
                     get = ()=> new FindOps.FindOp<T,Optional<T>>(
                             false,
                             StreamShape.REFERENCE,
                             <Optional<T>>Optional.empty(),
                             null,
                             new class implements supplier<terminalSink<T, Optional<T>>>{
                                  get : supplierFn<terminalSink<T, Optional<T>>> = () =>  new FindOps.FindSinkImpl.OfRef();
                             })
           }
        };

        public static readonly OfInt = class OfInt extends FindOps.FindSink<number, OptionalInt> implements ofInt{

            /**@override**/
            accept(o: number) {super.accept(o);}

            /**@override**/
            public get():OptionalInt {return this.hasValue ? OptionalInt.of(this.value) : null;}

            public static readonly OP_FIND_FIRST: terminalOps<number, OptionalInt> = new FindOps.FindOp(
                true,
                StreamShape.INT_VALUE,
                OptionalInt.empty(),
                null,
                new class implements supplier<terminalSink<number, OptionalInt>>{
                    get = ()=> new FindOps.FindSinkImpl.OfInt();
                }
            );

            public static readonly OP_FIND_ANY: terminalOps<number, OptionalInt> = new FindOps.FindOp(
                false,
                StreamShape.INT_VALUE,
                OptionalInt.empty(),
                null,
                new class implements supplier<terminalSink<number, OptionalInt>>{
                    get = ()=> new FindOps.FindSinkImpl.OfInt();
                }
            );
        }
    };

    public static makeInt( findFirst:boolean ):terminalOps<number, OptionalInt>{
        return findFirst ? FindOps.FindSinkImpl.OfInt.OP_FIND_FIRST : FindOps.FindSinkImpl.OfInt.OP_FIND_ANY;
    }

    public static makeRef<T>( findFirst:boolean ):terminalOps<T, Optional<T>>{
        return (
            findFirst ?
            new FindOps.FindSinkImpl.OfRef.OP_FIND_FIRST<T>() :
            new FindOps.FindSinkImpl.OfRef.OP_FIND_ANY<T>() ).get();
    }
}
Object.package(this);
