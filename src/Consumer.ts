import {biConsumer, biConsumerFn, consumerFn, IConsumer} from "./Interface";
import {Objects} from "./type/Objects";
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
    public static of<T>( consumer: Consumer<T>|consumerFn<T> ):Consumer<T>{
        if(consumer instanceof Consumer ) return consumer;

        /***@ts-ignore**/
        return new class extends Consumer<T>{

            /***@ts-ignore**/
            accept = Objects.requireNotNull(consumer);
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
    public static of( consumer: consumerFn<number>|IntConsumer ):IntConsumer{
        if( consumer instanceof IntConsumer ) return consumer;
        /***@ts-ignore**/
        return new class extends IntConsumer{

            /***@ts-ignore**/
            accept = Objects.requireNotNull(consumer);
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
            accept = Objects.requireNotNull(consumer);
        };
    }
}