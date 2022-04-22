import {StreamShape} from "./StreamShape";
import {Spliterator} from "../utils/Spliterator";
import {sink} from "./Sink";
import {supplier,spliterator} from "../Interface";
import {PipelineHelper} from "./PipelineHelper";
/**
* @terminalOps
 *
 * used by :
 *  @ForEachOps
*/
export interface terminalOps<E_IN,R> {
    /**/
    inputShape():StreamShape
    /**/
    getOpFlag():number
    /**/
    evaluateSequential<P_IN>(helper:PipelineHelper<E_IN>, spliterator:spliterator<P_IN>):R
    /*Parallel...*/
}
/**
 * @terminalSink
 */
export interface terminalSink<T,R> extends sink<T>, supplier<R>{}
/**
 * @TerminalOps: default methods of the interface
 */
export abstract class TerminalOps<E_IN,R> implements terminalOps<E_IN,R>{
    /**/
    public inputShape():StreamShape{ return StreamShape.REFERENCE; }
    /**/
    public getOpFlag():number{ return  0; }
    /**/
    public abstract evaluateSequential<P_IN>(helper:PipelineHelper<E_IN>, spliterator:Spliterator<P_IN>): R;
}
Object.package(this);