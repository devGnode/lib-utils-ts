import {biConsumer, biConsumerFn, collector, Func, IConsumer, List, supplierFn,supplier} from "../src/Interface";
import {Collectors} from "../src/Collectors";
import {Streams} from "../src/Streams";
import {spliterator} from "../src/Spliterators";
import {BiConsumer, Consumer} from "../src/Consumer";
import {Predication} from "../src/Predication";
import {ClassLoader} from "../src/ClassLoader";


/***
 * 1 - Impl
 *
 */
function looper<T,A, R>( collect :collector<T,A, R>, arr: T[] ):A{
    let a:A = collect.supplier().get();

    let tmp:T;
    let i:number = 0;
    while( ( tmp = arr[i]) ){
        collect.accumulator().accept(a,arr[i]);
        i++;
    }

    return a;
}

looper(Collectors.toList<number>(), [4,5,6,8]);
looper(Collectors.toArray<number>(), [4]);
looper(Collectors.toArrays<number>(), [4,5,6,2,3,4]).forEachRemaining( new class implements IConsumer<number>{
    //
    accept(o: number): void {
        console.log("Element =" , o)
    }
});

/***
 * ADD
 *
 */
let clt: collector<number,List<number>,List<number>> = Collectors.toList<number>();
let lits0: List<number> = clt.supplier().get();

clt.accumulator().accept(lits0,2);
clt.accumulator().accept(lits0,55)

/***
 * Real Impl
 *
 */
// MOCK
interface StreamImpl<T> extends IConsumer<T>, spliterator<T>{

}
// MOCK
abstract class ConsumerFactory{
    public static supplier<T,P>(fn:supplierFn<T>):supplier<T>{
        return new class implements supplier<T>{
            get = fn;
        }
    }
}
// MOCK
class Listor<T> {

    private readonly arr: StreamImpl<T>;

    constructor(st:StreamImpl<T>) {
        this.arr = st;
    }

    public  collect<A, R>( col :collector<T,A, R>):R{
        let a:A = col.supplier().get();
        let consumer: biConsumer<A, T> = col.accumulator();

        this.arr.forEachRemaining( new class implements IConsumer<T>{
            accept(o: T): void {
                console.log("Je collect ");
                consumer.accept(a,o);
            }
        })

        try{
            return col.finisher().call(null,a);
        }catch (e) {
        }
    }

    public collectFn<A, R>( supplier:supplierFn<A>, consumer:biConsumerFn<A, T>, finisher:Func<A,R> ):R{
        return this.collect( new Collectors.CollectorImpl(ConsumerFactory.supplier(supplier),BiConsumer.of(consumer),finisher) );
    }
}

let it:StreamImpl<string> = new Streams.StreamImpl();
it.accept("2");
it.accept("0");
it.accept("44");
it.accept("442155");
it.accept("555");
it.accept("4785");
console.log("===========SIMPLE ARRAY==============");
console.log(it);
console.log("====================================");

let listo: Listor<string> = new Listor(it);

listo.collect(Collectors.toList());
console.log("===========JOIN ARRAY==============");
console.log("toStrin", listo.collect(Collectors.join( )));
console.log("toStrin", listo.collect(Collectors.join("@")));

console.log("===========MAP ARRAY==============");
console.log( listo.collect(Collectors.map((value:string)=>parseInt(value),Collectors.toArray())) );

let ret:number[] = listo.collect(Collectors.map((value:string)=>parseInt(value), Collectors.toArray()));

console.log("===========COLLECT FN==============");
listo.collectFn(
    ()=>new Array<string>(),
    (ta:string[],value:string)=>ta.push(value),
    (ret:string[])=>ret
);

console.log("===========DD==============");
console.log(
    listo.collect(
        Collectors.filtering( Predication.of(value=>{ console.log("jeSuisici"); return value.length>1 }),
            Collectors.filtering(Predication.of(value=>{ console.log("NOOOOeSuisici"); return value.startsWith("4")}),Collectors.toList())
        )
    )

);