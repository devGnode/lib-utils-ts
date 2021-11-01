import {Node, PipelineHelper} from "./PipelineHelper";
import {spliterator, supplier} from "../Interface";
import {Spliterator} from "../Spliterator";
import {StreamShape} from "./StreamShape";
import {sink} from "./Sink";
import {terminalOps} from "./TerminalOps";
import {Supplier} from "../Supplier";
import {RuntimeException} from "../Exception";
import assert = require("assert");


export abstract class AbstractPipeline<E_IN,E_OUT,S> extends PipelineHelper<E_OUT>{

    private readonly sourceStage:AbstractPipeline<E_IN,E_OUT, S>;

    private  sourceSplit:spliterator<any>;

    private  sourceSupplier: supplier<any>;

    private linkedOrConsumed:boolean = false;

    protected previousStage:AbstractPipeline<E_IN, E_OUT, S>;

    private nextStage:AbstractPipeline<E_IN, E_OUT, S>;

    protected depth:number;

    protected constructor(value:Spliterator<any>|Supplier<spliterator<any>>|AbstractPipeline<any,E_IN,any>) {
        super();

        if( value instanceof  Spliterator ){
            this.sourceSplit    = value;
            this.sourceStage    = this;
            this.depth          = 0;
            this.previousStage  = this.nextStage = null;

        }else if(value instanceof  Supplier ){
            this.sourceSplit    = null;
            this.sourceStage    = this;
            this.sourceSupplier = value;
            this.depth          = 0;
            this.previousStage  = this.nextStage = null;

        }else if(value instanceof  AbstractPipeline ){
            value.linkedOrConsumed  = true;
            value.nextStage         = this;
            this.previousStage      = value;
            this.sourceStage        = value.sourceStage;
            this.nextStage          = null;
            this.depth              = value.depth + 1;
        }

        //console.log("--------------------------------------------------------------------------------------------------")
      //  console.log("--------------------------------------------------------------------------------------------------")
      // console.log(this);
    }

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
    public getStreamAndOpFlags(): number {return 0;}

    public wrapAndCopyInto<P_IN, S extends sink<E_OUT>>(sink: S, spliterator: Spliterator<P_IN> ):S {
        this.copyInto(this.wrapSink(sink),spliterator);
        return sink;
    }

    public copyInto<P_IN>(wrappedSink: sink<P_IN>, spliterator: Spliterator<P_IN>):void{

        console.log(wrappedSink, spliterator)
        wrappedSink.begin(0);
        spliterator.forEachRemaining(wrappedSink);
        wrappedSink.end();
        console.log("dsqdqskmdlksqmdkmqskdmlksqmdk")
    }

    public copyIntoWithCancel<P_IN>(wrappedSink: sink<P_IN>, spliterator: Spliterator<P_IN>) {
    }

    public wrapSink<P_IN>(sk:sink<E_OUT>): sink<P_IN> {
        let ptr: AbstractPipeline<any, E_OUT, any> = this;

        for(let ptr: AbstractPipeline<any, E_OUT, any> = this; ptr.depth >  0; ptr = ptr.previousStage ){
            console.log("=============================================")
            console.log(ptr.depth )
            console.log("=======================================================================================================================================")
            sk = ptr.opWrapSink(0, sk);
            console.log(sk)
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

        return tmp;
    }

    public abstract forEachWithCancel( spliterator:spliterator<E_OUT>, sink:sink<E_OUT>):boolean;

}