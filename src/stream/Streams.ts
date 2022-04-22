import {
    consumer,
    IConsumer,
    intStream,
    IntStreamBuilder,
    IStreamBuilder,
    spliterator, Stream
} from "../Interface";
import { Spliterators} from "../utils/Spliterators";
import {Exception} from "../Exception";
import {StreamSupport} from "./StreamSupport";
import {Objects} from "../type/Objects";

/**MOCK*/
export interface StreamImpl<T> extends IConsumer<T>, spliterator<T>{

}

export abstract class Streams{

    public static StreamImpl = class StreamImpl<T> implements StreamImpl<T>{

        buffer:T[];
        counter:number = 1;

        accept(o: T): void {
            if(Objects.isNull(this.buffer)) this.buffer = [o];
            else{
                this.buffer[this.counter++]=o;
            }
        }

        forEachRemaining(action: consumer<T>): void {
            let i:number = 0;
            if(this.buffer.length<=0) return;
            do{ (<IConsumer<T>>action).accept( this.buffer[i++] ); }while (!Objects.isNull(this.buffer[i]));
        }

        tryAdvance(action: consumer<T>): boolean {
            return false;
        }

        trySplit(): spliterator<T> {
            return undefined;
        }

        estimateSize(): number {return 0;}
    }

    public static StreamBuilder = class StreamBuilderImpl<T> extends Streams.StreamImpl<T> implements IStreamBuilder<T,Stream<T>> {

        add(t: T): StreamBuilderImpl<T> {
            if( this.counter > 0  ) super.accept(t);
            else{
                throw new Exception();
            }
            return this;
        }

        build(): Stream<T> {
            if(this.counter<0) return;
            this.counter = -this.counter;
            return StreamSupport.stream(new Spliterators.ArraySpliterator(this.buffer));
        }

        estimateSize(): number {return this.counter;}
    };

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
           return StreamSupport.intStream(new Spliterators.IntArraySpliterator(this.buffer)) ;
        }

        estimateSize(): number {return this.counter;}
    }
}