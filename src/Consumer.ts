import {biConsumer, biConsumerFn, consumerFn, IConsumer} from "./Interface";
/****
 * @Consumer<T> : Class
 * @Interface   : IConsumer
* @ype          : consumerFn<T>
 *
 * cast consumerFn to Consumer class
 * Consumer.of<T>( ( o: T )=>{ } );
 */
export class Consumer<T> implements IConsumer<T>{
    public accept:consumerFn<T>;
    /****
     * @param consumer
     */
    public static of<T>( consumer: consumerFn<T> ):Consumer<T>{
        return new class extends Consumer<T>{
            accept = Object.requireNotNull(consumer);
        };
    }
}
/****
 * @IntConsumer : Class
 * @Interface   : IConsumer<number>
 * @type        : consumerFn<number>
 *
 * cast consumerFn<number> to IntConsumer class
 * IntConsumer.of( ( o: number )=>{ } );
 */
export class IntConsumer implements IConsumer<number>{
    public accept:consumerFn<number>;
    /****
     * @param consumer
     */
    public static of( consumer: consumerFn<number> ):IntConsumer{
        return new class extends IntConsumer{
            accept = Object.requireNotNull(consumer);
        };
    }
}
/****
 * @BiConsumer
 * @Interface   : biConsumer<T,P>
 * @type        : biConsumerFn
 */
export class BiConsumer<T,P> implements biConsumer<T,P>{
    public accept:biConsumerFn<T,P>;
    /****
     * @param consumer
     */
    public static of<T,P>( consumer: biConsumerFn<T,P> ):BiConsumer<T,P>{
        return new class extends BiConsumer<T,P>{
            accept = Object.requireNotNull(consumer);
        };
    }
}