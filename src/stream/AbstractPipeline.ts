import {Node, PipelineHelper} from "./PipelineHelper";
import {spliterator, supplier} from "../Interface";
import {Spliterator} from "../utils/Spliterator";
import {StreamShape} from "./StreamShape";
import {sink} from "./Sink";
import {terminalOps} from "./TerminalOps";
import {Supplier} from "../utils/Supplier";
import {RuntimeException} from "../Exception";
import assert = require("assert");

// @ts-ignore
export abstract class AbstractPipeline<E_IN,E_OUT,S> extends PipelineHelper<E_OUT>{

    private readonly sourceStage:AbstractPipeline<E_IN,E_OUT, S>;

    protected previousStage:AbstractPipeline<E_IN, E_OUT, S>;

    private nextStage:AbstractPipeline<E_IN, E_OUT, S>;

    private  sourceSplit:spliterator<any>;

    private  sourceSupplier: supplier<any>;

    private linkedOrConsumed:boolean    = false;

    protected depth:number              = 0;

    private combinedFlag:number         = 0;

    protected constructor(value:Spliterator<any>|Supplier<spliterator<any>>|AbstractPipeline<any,E_IN,any>, opFlags:number) {
        super();

        if( value instanceof Spliterator ){
            this.sourceSplit    = value;
            this.sourceStage    = this;
            this.previousStage  = this.nextStage = null;

        }else if(value instanceof  Supplier ){
            this.sourceSplit    = null;
            this.sourceStage    = this;
            this.sourceSupplier = value;
            this.previousStage  = this.nextStage = null;

            // upstream
        }else if(value instanceof  AbstractPipeline ){
            value.linkedOrConsumed  = true;
            // @ts-ignore
            value.nextStage         = this;
            // @ts-ignore
            this.previousStage      = value;
            // @ts-ignore
            this.sourceStage        = value.sourceStage;
            this.nextStage          = null;
            this.depth              = value.depth + 1;
            this.combinedFlag       = opFlags;
        }
    }

    // Parallel ??
    public abstract opIsStateful():boolean;

    /**
     * @opWrapSink: to Implement with :
     * + Head => throw
     * + StateLessOp
     * + StateFulOp
     * */
    public abstract opWrapSink(flags:number, sink:sink<E_OUT>):sink<E_IN>;
    /****
     * @evaluate
     * @returns {R}
     */
    public evaluate<R>(terminalOps: terminalOps<E_OUT, R>):R{
        assert.strictEqual( this.getOutputShape().equals(terminalOps.inputShape()), true);
        if(this.linkedOrConsumed) throw new RuntimeException("stream has already been operated upon or closed");
        this.linkedOrConsumed=true;

        return terminalOps.evaluateSequential(this,this.sourceSpliterator(terminalOps.getOpFlag()));
    }
    /**
     * PipelineHelper Handler
     * */
    public getSourceShape():StreamShape{
        return null;
    };
    /***
     * @getOutputShape
     * @toImplement
     */
    public abstract getOutputShape():StreamShape;
    /***
     * @getOutputShape
     * @toOverride
     */
    public getStreamAndOpFlags(): number {return this.combinedFlag;}

    public wrapAndCopyInto<P_IN, S extends sink<E_OUT>>(sink: S, spliterator: Spliterator<P_IN> ):S {
        this.copyInto(this.wrapSink(sink),spliterator);
        return sink;
    }

    public copyInto<P_IN>(wrappedSink: sink<P_IN>, spliterator: Spliterator<P_IN>):void{

        if( this.getStreamAndOpFlags() == 1 ) this.copyIntoWithCancel(wrappedSink,spliterator);
        else {
            wrappedSink.begin(spliterator.estimateSize());
            spliterator.forEachRemaining(wrappedSink);
            wrappedSink.end();
        }
    }

    public copyIntoWithCancel<P_IN>(wrappedSink: sink<P_IN>, spliterator: Spliterator<P_IN>) {
        let tmp: AbstractPipeline<any, E_OUT, any> = this,
            canceled:boolean;

        while (tmp.depth > 0) tmp = tmp.previousStage;

        wrappedSink.begin(spliterator.estimateSize());
        // @ts-ignore
        canceled = tmp.forEachWithCancel(wrappedSink,spliterator);
        wrappedSink.end();
        return canceled;
    }

    public wrapSink<P_IN>(sk:sink<E_OUT>): sink<P_IN> {

        for(let ptr: AbstractPipeline<any, E_OUT, any> = this; ptr.depth >  0; ptr = ptr.previousStage ){
            //console.log("======== =====================================")
           // console.log(ptr.depth )
           // console.log("=======================================================================================================================================")
            sk = ptr.opWrapSink(0, sk);
           // console.log(sk)
        }
        // @ts-ignore
        return (<sink<P_IN>>sk);
    }

    public evaluateHelper<P_IN>(spliterator: Spliterator<P_IN>, flatten: boolean): Node<E_OUT> {
        return undefined;
    }

    private sourceSpliterator(terminalFlags:number): spliterator<any>{
        let tmp: spliterator<any> = null;

        if(this.sourceStage.sourceSplit != null ){
            tmp = this.sourceStage.sourceSplit;
            this.sourceStage.sourceSplit = null;
        }else if(this.sourceStage.sourceSupplier != null ){
            tmp = this.sourceStage.sourceSupplier.get();
            this.sourceStage.sourceSupplier=null;
        }else{
            throw new RuntimeException("source already consumed or closed");
        }

        // parallel Ctrl ...
        if( terminalFlags!=0) this.combinedFlag = terminalFlags;

        return tmp;
    }

    public abstract forEachWithCancel( sink:sink<E_OUT>, spliterator:spliterator<E_OUT>):boolean;

}
Object.package(this);