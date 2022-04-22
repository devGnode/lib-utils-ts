import {collector, IConsumer, List, predicate} from "./Interface";
import {biConsumer,supplier,Func} from "./Interface";
import {ArrayList} from "./utils/ArrayList";
import {StreamImpl, Streams} from "./stream/Streams";
import {Objects} from "./type/Objects";


/***/
//MOCK
interface stringBuilder extends IConsumer<string>{

}
/***/
//MOCK
class StringBuilder implements stringBuilder{

    private value:string[] = [];
    private readonly delimiter:string;

    constructor(delimiter:string = "") {
        this.delimiter = delimiter;
    }
    accept(o: string): void {
        this.value.push(o);
    }

    toString():string{return this.value.join(this.delimiter);}
}

class CollectorsImpl<T, A, R> implements collector<T, A, R>{
    /****
     *
     */
    private readonly consumerFn:biConsumer<A, T>;
    private readonly supplierFn:supplier<A>;
    private readonly finisherFn:Func<A, R>
    /***
     *
     * @param supplier
     * @param consumer
     * @param finisher
     */
    public constructor(supplier?:supplier<A>,consumer?:biConsumer<A, T>, finisher?:Func<A,R>) {
        this.consumerFn = consumer;
        this.supplierFn = supplier;
        this.finisherFn = finisher;
    }
    /****
     *
     */
    public supplier(): supplier<A> {return Objects.requireNotNull(this.supplierFn);}
    /****
     *
     */
    public accumulator(): biConsumer<A, T> {return Objects.requireNotNull(this.consumerFn);}
    /****
     *
     */
    public finisher(): Func<A, R> {return Objects.requireNotNull(this.finisherFn);}

}


export abstract class Collectors{
    /***
     * @CollectorsImpl
     */
    public static CollectorImpl = CollectorsImpl;
    /***
     * @toArray :
     * @returns Collector<T,T[], T[]>
     * @types T
     */
    public static toArray<T>( ):collector<T, T[], T[]> {
        /***
         *
         */
        return new class extends CollectorsImpl<T, T[], T[]>implements collector<T, T[], T[]> {
            /***
             *
             */
            supplier = (): supplier<T[]> => new class implements supplier<T[]>{
                    get = ():T[] => []
            }
            /***
             *
             */
            accumulator = (): biConsumer<T[], T> => new class implements biConsumer<T[], T>{
                    accept = (ta: T[], v: T) => ta[ta.length] = v;
            }

            finisher = (): Func<T[], T[]> => (o:T[])=> o;
        }
    }
    /***
     * @toList
     */
    public static toList<T>():collector<T, List<T>, List<T>> {
        /***
         *
         */
        return new class extends CollectorsImpl<T, List<T>, List<T>> implements collector<T, List<T>, List<T>>{
            /***
             *
             */
            supplier = (): supplier<List<T>> => new class implements supplier<List<T>>{
                get = ( ): List<T> => new ArrayList();
            };
            /***
             *
             */
            accumulator = (): biConsumer<List<T>, T> => new class implements biConsumer<List<T>, T>{
                    accept = (ta:List<T>, v:T) => ta.add(v);
            };
            /***
             *
             */
            finisher = (): Func<List<T>, List<T>> => (a:List<T>)=> a;

        }

    }

    public static filtering<T, A, R>( predicate:predicate<T>, collector: collector<T, A, R>):collector<T, A, R> {
        let consumer:biConsumer<A,T> = collector.accumulator();
        return new class extends CollectorsImpl<T, A, R> implements collector<T, A, R>{
            /***
             *
             */
            supplier= collector.supplier;
            finisher = collector.finisher;
            /***
             *
             */
            accumulator = (): biConsumer<A, T> => new class implements biConsumer<A, T>{
                    accept = (ta:A, v:T)=> predicate.test(v) ? consumer.accept(ta,v) : void 0;
            }
        }

    }

    public static map<T, U, A, R>( func:Func<T,U>, collector: collector<U, A, R>):collector<T, A, R> {
        let consumer:biConsumer<A,U> = collector.accumulator();
        return new class extends CollectorsImpl<T, A, R> implements collector<T, A, R>{
            /***
             *
             */
            supplier = collector.supplier;
            finisher = collector.finisher;
            /***
             *
             */
            accumulator = (): biConsumer<A, T> => new class implements biConsumer<A, T>{
                accept = (ta:A, v:T)=>  consumer.accept(ta, func(v));
            }
        }

    }

    public static join<T extends string>(delimiter:string= " "):collector<T, StringBuilder, string> {

        return new class extends CollectorsImpl<T, StringBuilder, string> implements collector<T, StringBuilder, string>{
            /***
             *
             */
            supplier = (): supplier<StringBuilder> => new class implements supplier<StringBuilder>{
                    get = ( ): StringBuilder => new StringBuilder(delimiter);
            }
            /***
             *
             */
            accumulator = (): biConsumer<StringBuilder, T> =>  new class implements biConsumer<StringBuilder, T>{
                    accept = (ta:StringBuilder, v:T)=>  ta.accept(v);
            }

            finisher = (): Func<StringBuilder, string> => (a:StringBuilder)=> a.toString()

        }

    }
    /***
     *
     */
    public static toArrays<T>( ):collector<T, StreamImpl<T>, StreamImpl<T>> {

        return new class extends CollectorsImpl<T, StreamImpl<T>, StreamImpl<T>>
            implements collector<T, StreamImpl<T>, StreamImpl<T>> {

            supplier(): supplier<StreamImpl<T>> {
                return new class implements supplier<StreamImpl<T>>{
                    get = ():StreamImpl<T> => new Streams.StreamBuilder<T>();
                };
            }

            accumulator(): biConsumer<StreamImpl<T>, T> {
                return new class implements biConsumer<StreamImpl<T>, T>{
                    accept = (ta: StreamImpl<T>, v: T) => ta.accept(v);
                };
            }
        }
    }

}
Object.package(this);