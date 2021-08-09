import { Spliterators} from "../src/Spliterators";
import {consumerFn, spliterator} from "../src/Interface";
import {Consumer, IntConsumer} from "../src/Consumer";
import {Spliterator} from "../src/Spliterator";

let arr:number[] = [4,8,9,10,12,15];
let iconsumer:IntConsumer = IntConsumer.of((o:number)=>console.log("IntConsumer ,", o));

new Spliterators.IntArraySpliterator(arr).forEachRemaining(iconsumer);
let is:Spliterator<number> = new Spliterators.IntArraySpliterator(arr);

console.log("---");
do{}while( is.tryAdvance(iconsumer) );
console.log("---");
/**----------------------------------------------------------------*/
let arrS:string[] = ["str1","str2","str3"];
let sconsumer:Consumer<string> = Consumer.of((o:string)=>console.log("IntConsumer ,", o));

new Spliterators.ArraySpliterator<string>(arrS).forEachRemaining(sconsumer);
let iss:Spliterator<string> = new Spliterators.ArraySpliterator(arr);

console.log("---");
do{}while( iss.tryAdvance(sconsumer) );
console.log("---");
/**----------------------------------------------------------------*/
/**--------------IMPLEMENTATION-----------------------------------*/
/**----------------------------------------------------------------*/
class Test<T> extends Spliterator<T>{
    /**
     * @Override
     * */
    forEachRemaining(action: consumerFn<T>): void {
        do { } while (this.tryAdvance(action));
    }
    /**
     * @Override
     * */
    tryAdvance(action: consumerFn<T>): boolean {
        let is: Consumer<T> = <Consumer<T>>this.cast(action);
        return false;
    }
    /**
     * @Override
     * */
    trySplit(): spliterator<T> {return undefined;}
}
/**----------------------------------------------------------------*/
class TestI extends Spliterator.OfInt{
    constructor() {
        super();
    }
    /**
     * @Override
     * */
    forEachRemaining(action: consumerFn<number>): void {
        do { } while (this.tryAdvance(action));
    }
    /**
     * @Override
     * */
    tryAdvance(action: consumerFn<number>): boolean {
        let is: IntConsumer = <IntConsumer>this.cast(action);
        return false;
    }
    /**
     * @ToOverride
     * */
    trySplit(): spliterator<number> {return undefined;}
}