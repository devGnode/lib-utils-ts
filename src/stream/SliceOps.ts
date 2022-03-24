import {Integer} from "../type/Integer";
import {AbstractPipeline} from "./AbstractPipeline";
import {consumerFn, intStream, Stream} from "../Interface";
import {IntPipelineImpl} from "./IntPipeline";
import {Sink, sink} from "./Sink";
import {ReferencePipelineImpl} from "./ReferencePipeline";

function calcSize(size:number, skip:number, limit:number ){
    return size>=0 ? Math.max(-1, Math.min(size-skip,limit)) : -1;
}
export class SliceOps {

    private constructor(){}

    public static makeRef<T>(upstream:AbstractPipeline<any,T,any>, skip:number, limit:number ):Stream<T>{
        // if(skip<0) throw new RuntimeException("");

        return new class extends ReferencePipelineImpl.StateFulOp<T, T>{

            constructor() {super(upstream,upstream.getStreamAndOpFlags());}

            public getStreamAndOpFlags(): number {return 1;}

            opWrapSink(flags: number, sink: sink<T>): sink<T> {
                return new class extends Sink.ChainedReference<T, T>{

                    n:number = skip;
                    m:number = limit>=0 ? limit : 0;

                    constructor() {super(sink);}

                    begin(value: number): void {
                        this.downstream.begin(calcSize(value,skip,this.m));
                    }

                    accept: consumerFn<T> = (t:T)=>{
                        if(this.n==0) {
                            if (this.m > 0) {
                                --this.m;
                                this.downstream.accept(t);
                            }
                        }else --this.n;
                    };

                    cancellationRequested(): boolean {
                        return this.m == 0 || this.downstream.cancellationRequested();
                    }
                };
            }

        }
    }

    public static makeInt(upstream:AbstractPipeline<any,number,any>, skip:number, limit:number ):intStream{
        // if(skip<0) throw new RuntimeException("");

        return new class extends IntPipelineImpl.StaleFull<Integer>{

            constructor() {super(upstream,upstream.getStreamAndOpFlags());}

            opWrapSink(flags: number, sink: sink<number>): sink<number> {
                return new class extends Sink.ChainedInt<number>{

                    n:number = skip;
                    m:number = limit>=0 ? limit : 0;

                    constructor() {super(sink);}

                    begin(value: number): void {
                        this.downstream.begin(calcSize(value,skip,this.m));
                    }

                    accept: consumerFn<number> = (t:number)=>{
                        if(this.n==0) {
                            if (this.m > 0) {
                                --this.m;
                                this.downstream.accept(t);
                            }
                        }else --this.n;
                    };

                    cancellationRequested(): boolean {
                        console.log("downStream ", this.m == 0 || this.downstream.cancellationRequested());
                        return this.m == 0 || this.downstream.cancellationRequested();
                    }
                };
            }

        }
    }
}

