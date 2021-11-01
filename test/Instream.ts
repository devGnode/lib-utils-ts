import "../src/globalUtils";
import {IntPipelineImpl, IntPipeline} from "../src/stream/IntPipeline";
import {Spliterators} from "../src/Spliterators";
import {
    biConsumer,
    biConsumerFn,
    collector,
    Func,
    IConsumer,
    IntConsumerImpl, iterator,
    supplier,
    List,
    supplierFn, spliterator
} from "../src/Interface";
import {Streams} from "../src/Streams";
import {Collectors} from "../src/Collectors";
import {Predication} from "../src/Predication";
import {Arrays} from "../src/type/Arrays";
import {Iterator} from "../src/Iterator";
import {IntConsumer} from "../src/Consumer";



//let etre: IntPipeline = new IntPipelineImpl.Head<number>(new Spliterators.IntArraySpliterator([1,2,3]));

//console.log( etre.filter(value => value.equals(4)).filter(value => value.equals(4)).each( IntConsumer.of((v:number)=>v)) )

//IntPipeline.builder().add(6).build().



class tr{
    hello():string{ return ""; }
}
class tet implements biConsumer<string, List<string>> {

    constructor(p: string, q: List<string>) {

    }

    accept(p: string, q: List<string>) {
    }

    public static der<T extends tr>( su:supplier<T> ): tr{
        return su.get();
    }
}

//tet.der(()=> new tr()  ).hello();

/***
 *
 */




interface StreamImpl<T> extends IConsumer<T>, spliterator<T>{

}

interface stringBuilder extends IConsumer<string>{

}

class StringBuilder implements stringBuilder{

    private value:string[] = [];

    accept(o: string): void {
        this.value.push(o);
    }

    toString():string{return this.value.join("");}

}

abstract class ConsumerFactory{
    public static biConsumer<T,P>(fn:biConsumerFn<T,P>):biConsumer<T, P>{
        return new class implements biConsumer<T, P>{
            accept = fn;
        }
    }
    public static supplier<T,P>(fn:supplierFn<T>):supplier<T>{
        return new class implements supplier<T>{
            get = fn;
        }
    }

}
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
               // console.log("Je collect for ", o);
                consumer.accept(a,o);
            }
        })

     /*   let tmp:T;
        let i:number = 0;
        while( ( tmp = this.arr[i]) ){
            col.accumulator().accept(a,this.arr[i]);
            i++;
        }*/
       // console.log("innnnn", a, col.finisher().call(null,a))
        try{
            return col.finisher().call(null,a);
        }catch (e) {
           // this.collectFn(col.supplier,col.accumulator,value=>value)
        }
    }

    public collectFn<A, R>( supplier:supplierFn<A>, consumer:biConsumerFn<A, T>, finisher:Func<A,R> ):R{
        return this.collect( new Collectors.CollectorImpl(ConsumerFactory.supplier(supplier),ConsumerFactory.biConsumer(consumer),finisher) );
    }
}

let it:StreamImpl<string> = new Streams.StreamImpl();
it.accept("2");
it.accept("0");
it.accept("44");
it.accept("442155");
it.accept("555");
it.accept("4785");
console.log(it)
let listo: Listor<string> = new Listor(it);
listo.collect(Collectors.toList())

console.log("===========DD==============");
let rr: List<string> = listo.collect(Collectors.toList());
console.log("===========DD==============");
console.log("toStrin", listo.collect(Collectors.join("@")));
console.log("===========DD==============");
console.log( "45878878787", listo.collect(Collectors.map((value:string)=>parseInt(value),Collectors.toList())) );

console.log("===========DD==============");
listo.collectFn(
    ()=>new Array<string>(),
    (ta:string[],value:string)=>ta.push(value),
    (ret:string[])=>ret
);
console.log("===========DD==============");
console.log(
    listo.collect(
        Collectors.filtering( Predication.of(value=>{ console.log("jeSuisici for ", value); return value.length>1 }),
            Collectors.filtering(Predication.of(value=>{ console.log("NOOOOeSuisici"); return value.startsWith("4")}),Collectors.toList())
        )
    )

);

console.log("===========DD1==============");
//List<number> list;

let it0:StreamImpl<number> = new Streams.IntStreamBuilder();
it0.accept(2);
it0.accept(4);
it0.accept(6);
it0.accept(8);
it0.accept(10);
it0.accept(12);
let term: Listor<number> = new Listor(it0);


   console.log( term.collect(Collectors.filtering(Predication.of((i:number) => i % 4 == 0), Collectors.toList())) );
/****
 1 - identifeir type Array
    T[]
 2 - un builder

 */
console.log("Arrays Merge ");
console.log(Arrays.merge([1,2,3],[4,5,6]));

console.log("Arrays Fill ");
console.log(Arrays.fill([],5, 5));

console.log("Arrays Clear ");
console.log(Arrays.clear([1,2,3]));

console.log("Arrays Remove");
console.log(Arrays.remove([1,2,3], 1));

console.log("Arrays Reverse");
console.log( Arrays.reverse([1,2,3,4]) );

console.log("Arrays Swap");
console.log( Arrays.swap([1,2,3,4], 0, 3) );

console.log("Arrays Equals");
console.log( Arrays.equals([1,2,3,4], [1,2,3,5]) );
console.log( Arrays.equals([1,2,3,4], [1,2,3,4]) );

console.log("Arrays deepEquals");
class ter{ constructor(v:number){this.a=v} public a:number;}
let tt:ter[] = [new ter(4),new ter(5),new ter(3)];
let tk:ter[] = [new ter(4),new ter(5),new ter(4)];
console.log( Arrays.deepEquals(tt, tk),Object.deepEquals(new ter(4),new ter(4)) );

console.log("Arrays Spliterator");
Arrays.spliterator( [new ter(4),new ter(5),new ter(3)]).forEachRemaining(new class implements IConsumer<ter>{
    accept = (value:ter)=>{ console.log("consumer", value); }
});

console.log("Arrays intSpliterator");
Arrays.intSpliterator([1,2,3,5,5,8]).forEachRemaining(new class implements IConsumer<number>{
    accept = (value:number)=>{ console.log("consumer", value); }
});

console.log("Arrays try");
let split: spliterator<number> = Arrays.intSpliterator([101,201,301,401,501]);

split.tryAdvance(new class implements IConsumer<number>{
    accept = (value:number)=>{ console.log("consumer+++++", value); }
});


split.trySplit().forEachRemaining(new class implements IConsumer<number>{
    accept = (value:number)=>{ console.log("consumer---", value); }
});
split.forEachRemaining(new class implements IConsumer<number>{
    accept = (value:number)=>{ console.log("consumer+++", value); }
});
//console.log(split.trySplit())

let terr: iterator<void> = new Iterator([]);
terr.forEachRemaining(new class implements IConsumer<void>{
    accept = (value:void)=>{ console.log("consumer+++", value); }
});
let tera: iterator<number> = new Iterator([1,2,3,4,5,6,7,8]);

let out:number = 2;
while(tera.hasNext()) {
    tera.next();
    if(out==2){
        tera.remove();
    }
    out++;
}

console.log(tera)

/*let rrr:ListO<number> = new ListO<number>([null,1,2,3,4,5,6,7]);
console.log( rrr);
let rrrr: iterator<number> = rrr.iterator();

let k:number;
while(rrrr.hasNext()){
     k = rrrr.next();
    console.log("------",k);
    if( k === 3 ) rrrr.remove();
    if( k === 6 ) rrrr.remove();
}


console.log(/*rrr.remove(5),rrr)


//console.log(rrr.containsAll(new ListO<number>([2,4])))
console.log(rrr.clear(),rrr);

rrr.addAll(new ListO<number>([1,2,3,4,5,6,7]))
console.log(rrr);

let oter : ListO<ter> = new ListO<ter>([new ter(4),new ter(5),new ter(3)]);

console.log(oter);
console.log(oter.remove(new ter(4)), oter);*/