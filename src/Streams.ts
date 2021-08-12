import {IntStream} from "./IntStream";
import {consumer, IConsumer, IntStreamBuilder, IStreamBuilder, spliterator} from "./Interface";
import {IntStreams, IntStreamsPipe} from "./IntStreams";
import { Spliterators} from "./Spliterators";

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

    public static StreamBuild = class StreamBuilderImpl<T> extends Streams.StreamImpl<T> implements IStreamBuilder<T,Stream<T>> {

        add(t: T): StreamBuilderImpl<T> {
            this.accept(t);
            return this;
        }

        build(): Stream<T> {
            return undefined;
        }
    }

    public static IntStreamBuilder = class IntStreamBuilderImpl extends Streams.StreamImpl<number> implements IntStreamBuilder {

        accept(o: number): void {super.accept(o);}

        add(t: number): IntStreamBuilder {
            this.accept(t);
            return this;
        }

        build(): IntStreams {
           return new IntStreamsPipe.Head<number>(new Spliterators.IntArraySpliterator([1,2,3])) ;
        }
    }
}


//new Streams.IntStreamBuilder().add(5).add(5).add(5).build()