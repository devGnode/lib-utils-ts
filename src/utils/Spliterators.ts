import {consumer, spliterator} from "../Interface";
import {Consumer, IntConsumer} from "../Consumer";
import {NullPointerException} from "../Exception";
import {Spliterator} from "./Spliterator";
import {Objects} from "../type/Objects";


export abstract class Spliterators{

    public static EmptySpliterator = class EmptySpliterator<T, S extends spliterator<T>, C> {
        constructor() {}

        public trySplit():S {return null;}

        public tryAdvance(consumer: C):boolean { return false;}

        public  forEachRemaining( consumer: C) :void{}

        public estimateSize(): number {return 0;}

        public static OfInt = class OfInt extends EmptySpliterator<number, Spliterator<number>, IntConsumer> {
            constructor() {super();}
        };
    };

    public static ArraySpliterator = class ArraySpliterator<T> extends Spliterator<T> {
        readonly array: Object[];
        index:number;
        fence:number;

        constructor(array: Object[], origin:number = 0, fence:number = null, c:number = 0) {
            super();
            this.array = array;
            this.index = origin || 0;
            this.fence = fence || array.length;
        }

        forEachRemaining(action: consumer<T>): void {
            let a:T[], i:number , hi:number,
                consumer:Consumer<T>;

            if (Objects.isNull(action)) throw new NullPointerException();
            consumer = <Consumer<T>>this.cast(action);
            if ((a = <T[]>this.array).length >= (hi = this.fence) && (i = this.index) >= 0 && i < (this.index = hi)) {
                do { consumer.accept(<T>a[i]); } while (++i < hi);
            }
        }

        tryAdvance(action: consumer<T> ): boolean {
            let consumer:Consumer<T>;

            if (Objects.isNull(action)) throw new NullPointerException();
            consumer = <Consumer<T>>this.cast(action);

            if (this.index >= 0 && this.index < this.fence) {
                consumer.accept(<T>this.array[this.index++]);
                return true;
            }
            return false;
        }

        trySplit(): spliterator<T> {
            let lo:number = this.index, mid = lo+ Math.floor(this.fence/2);
            return lo >= mid ? null : new Spliterators.ArraySpliterator(this.array, lo,this.index = mid );
        }

        estimateSize(): number {return this.fence - this.index;}

    };

    public static IntArraySpliterator = class IntArraySpliterator extends Spliterator.OfInt{
        readonly array: number[];
        index:number;
        fence:number;
        readonly characteristics:number;

        constructor(array: number[], origin:number = 0, fence:number = null, c:number = 0) {
            super();
            this.array = array;
            this.index = origin || 0;
            this.fence = fence || array.length;
        }

        forEachRemaining(action: consumer<number>): void {
             let a:number[], i:number , hi:number,
             consumer:IntConsumer;

            consumer = <IntConsumer>this.cast(action);
            if (Objects.isNull(action)) throw new NullPointerException();
            if ((a = this.array).length >= (hi = this.fence) && (i = this.index) >= 0 && i < (this.index = hi)) {
                do { consumer.accept(a[i]); } while (++i < hi);
            }
        }

        tryAdvance(action: consumer<number>): boolean {
            let consumer:IntConsumer;

            if (Objects.isNull(action)) throw new NullPointerException();
            consumer = <IntConsumer>this.cast(action);
            if (this.index >= 0 && this.index < this.fence) {
                consumer.accept(this.array[this.index++]);
                return true;
            }
            return false;
        }

        trySplit(): spliterator<number> {
            let lo:number = this.index, mid = lo+ Math.floor(this.fence/2);
            return lo >= mid ? null : new Spliterators.IntArraySpliterator(this.array, lo,this.index = mid );
        }

        estimateSize(): number {return this.fence - this.index;}
    }
}
Object.package(this);