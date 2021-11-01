import {AbstractPipeline} from "./AbstractPipeline";
import {StreamShape} from "./StreamShape";
import {sink} from "./Sink"
import {UnsupportedOperationException} from "../Exception";
import {Spliterator} from "../Spliterator";
import {spliterator} from "../Interface";
import {Supplier} from "../Supplier";

interface Stream<T> {
    each():void
}


export abstract class ReferencePipeline<P_IN,P_OUT> extends AbstractPipeline<P_IN, P_OUT, Stream<P_OUT>> implements Stream<P_OUT>{

    protected constructor(value:Spliterator<any>|Supplier<spliterator<any>>) {
        super(value);
    }

    getOutputShape(): StreamShape {return StreamShape.REFERENCE;}

    abstract opWrapSink(flags: number, sink: sink<P_OUT>): sink<P_IN>;

    each(): void {
    }
}

class Head<E_IN,E_OUT> extends ReferencePipeline<E_IN, E_OUT>{

    constructor(value:Spliterator<E_IN>) {
        super(value);
    }

    opWrapSink(flags: number, sink: sink<E_OUT>): sink<E_IN> {throw new UnsupportedOperationException();}

    opIsStateful(): boolean { throw new UnsupportedOperationException();}

    each() {
        super.each();
    }

    forEachWithCancel(spliterator: spliterator<E_OUT>, sink: sink<E_OUT>): boolean {
        return false;
    }
}