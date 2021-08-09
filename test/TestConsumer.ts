import {Consumer, IntConsumer} from "../src/Consumer";
import {consumer, consumerFn, IConsumer, IntConsumerImpl, intStream} from "../src/Interface";

/**----------------------------------------------------------------*/
let consumer0: consumerFn<number> = (a:number)=>void 0;
let consumer_: IConsumer<number> = Consumer.of(consumer0);

/**----------------------------------------------------------------*/
let consumer1: Consumer<number> = new Consumer();
let consumer2: consumer<number> = new Consumer();
let consumer3: IConsumer<number> = Consumer.of((o:number)=>console.log("Consumer 3", o));

consumer1.accept = (o:number)=>console.log("Consumer 1", o);
consumer2.accept = (o:number)=>console.log("Consumer 2", o);

consumer3.accept(0);
consumer1.accept(5);
consumer2.accept(10)
consumer1.accept(15);
consumer3.accept(20);

/**----------------------------------------------------------------*/

let consumer4: IntConsumer = new IntConsumer();
let consumer5: IConsumer<number> = new IntConsumer();
let consumer6: IntConsumerImpl =  IntConsumer.of((o:number)=>console.log("Consumer 6", o*2));

consumer4.accept = (o:number)=>console.log("Consumer 4", o*2);
consumer5.accept = (o:number)=>console.log("Consumer 5", o*2);

consumer6.accept(2);
consumer4.accept(4);
consumer5.accept(6)
consumer4.accept(7);
consumer6.accept(8);