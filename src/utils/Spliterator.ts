import {consumer, spliterator} from "../Interface";
import {UnsupportedOperationException} from "../Exception";
import {Consumer} from "../Consumer";
/***
 * @class Spliterator<T>
 * @abstract
 */
export abstract class Spliterator<T> implements spliterator<T> {
    /**
     * @ToOverride
     * */
    forEachRemaining(action: consumer<T>): void {
        do {
        } while (this.tryAdvance(action));
    }
    /**
     * @ToOverride
     * */
    tryAdvance(action: consumer<T>): boolean {
        throw new UnsupportedOperationException();
    }
    /**
     * @ToOverride
     * */
    trySplit(): spliterator<T> {
        throw new UnsupportedOperationException();
    }

    cast(action: consumer<T>): consumer<T> {
        if (typeof action === "function") return Consumer.of(action);
        return action;
    }
    /**
     *
     * @returns {number}
     */
    public estimateSize(): number {return 0;}
    /**
     * @staticClass Spliterator.Ofint
     * */
    public static OfInt = class OfInt extends Spliterator<number>{

        /*tryAdvance(action: consumer<number>): boolean {
            let consumer: IntConsumer = <IntConsumer>this.cast(action);
           return false;
        }*/
    }
}
Object.package(this);