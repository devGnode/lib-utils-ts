import {StreamShape} from "./StreamShape";
import {Spliterator} from "../utils/Spliterator";
import {sink} from "./Sink";
import {IConsumer, spliterator} from "../Interface";


export interface Node<T> {
    spliterator():spliterator<T>;
    forEach(consumer:IConsumer< T> ):void;

    // degfault
    getChildCount():number;
    getChild( i:number):Node<T>

}

export abstract class PipelineHelper<P_OUT>{
    /**/
    abstract getSourceShape():StreamShape;
    /**/
    abstract getStreamAndOpFlags():number;
    /**
     * @wrapAndCopyInto:
     * + AbstractPipeline
     * + ForEachOps
     */
    abstract wrapAndCopyInto<P_IN, S extends sink<P_OUT>>(sink:S, spliterator:Spliterator<P_IN>):S;
    /**
     * @wrapAndCopyInto:
     * + ForEachOps
     */
    abstract copyIntoWithCancel<P_IN extends P_OUT>(wrappedSink:sink<P_IN>, spliterator:Spliterator<P_IN>):void;
    /**/
    abstract wrapSink<P_IN>(sin:sink<P_OUT> ):sink<P_IN>;
    /**/
    abstract copyInto<P_IN>(wrappedSink:sink<P_IN>, spliterator:Spliterator<P_IN>):void
    /*
    * SortOps
    * */
    abstract evaluateHelper<P_IN>(spliterator:Spliterator<P_IN>, flatten:boolean):Node<P_OUT>;
}
Object.package(this);