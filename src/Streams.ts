
import {consumer, IConsumer, intStream, IntStreamBuilder, IStreamBuilder, spliterator} from "./Interface";
import {IntPipelineImpl, IntPipeline} from "./stream/IntPipeline";
import { Spliterators} from "./Spliterators";
import {Exception} from "./Exception";

/**MOCK*/
interface Stream<T> {

}
/**MOCK*/
interface StreamImpl<T> extends IConsumer<T>, spliterator<T>{

}

export abstract class Streams{

    public static StreamImpl = class StreamImpl<T> implements IConsumer<T>, spliterator<T>{
        buffer:T[];
        counter:number = 1;

        accept(o: T): void {
            if(Object.isNull(this.buffer)) this.buffer = [o];
            else{
                this.buffer[this.counter++]=o;
            }
        }

        forEachRemaining(action: consumer<T>): void {
            let i:number = 0;
            if(this.buffer.length<=0) return;
            do{ (<IConsumer<T>>action).accept( this.buffer[i++] ); }while (!Object.isNull(this.buffer[i]));
        }

        tryAdvance(action: consumer<T>): boolean {
            return false;
        }

        trySplit(): spliterator<T> {
            return undefined;
        }
    }

    public static StreamBuilder = class StreamBuilderImpl<T> extends Streams.StreamImpl<T> implements IStreamBuilder<T,Stream<T>> {

        add(t: T): StreamBuilderImpl<T> {
            super.accept(t);
            return this;
        }

        build(): Stream<T> {
            return undefined;
        }
    }

    public static IntStreamBuilder = class IntStreamBuilderImpl extends Streams.StreamImpl<number> implements IntStreamBuilder {

        accept(o: number): void {super.accept(o);}

        add(t: number): IntStreamBuilder {
            if( this.counter > 0  ) super.accept(t);
            else{
                throw new Exception();
            }
            return this;
        }

        build(): intStream {
            if(this.counter<0) return;
            this.counter = -this.counter;
           return new IntPipelineImpl.Head<number>(new Spliterators.IntArraySpliterator(this.buffer)) ;
        }
    }
}


//new Streams.IntStreamBuilder().add(5).add(5).add(5).build()