import "../../src/globalUtils"
import {Consumer, IntConsumer} from "../../src/Consumer";
import {ForEachOps} from "../../src/stream/ForEachOps";
import {StreamShape} from "../../src/stream/StreamShape";
import {terminalSink} from "../../src/stream/TerminalOps";
import {intStream, Stream} from "../../src/Interface";
import {IntPipeline} from "../../src/stream/IntPipeline";
import {Collectors} from "../../src/Collectors";


ForEachOps.makeInt(new class extends IntConsumer{
    accept = (value:number)=> value;
});

/**ofInt*/
console.log(ForEachOps.makeInt(IntConsumer.of((v:number)=>v)))
console.log(ForEachOps.makeInt(IntConsumer.of((v:number)=>v)).inputShape().equals(StreamShape.INT_VALUE));
console.log(ForEachOps.makeInt(IntConsumer.of((v:number)=>v)).inputShape().equals(StreamShape.REFERENCE));


/**ofRef*/
console.log(ForEachOps.makeRef<string>(Consumer.of((value:string)=>value)))
console.log(ForEachOps.makeRef<string>(Consumer.of((value:string)=>value)).inputShape().equals(StreamShape.INT_VALUE));
console.log(ForEachOps.makeRef<string>(Consumer.of((value:string)=>value)).inputShape().equals(StreamShape.REFERENCE));

(<terminalSink<string,void>>( new ForEachOps.OfRef<string>(Consumer.of((value:string)=>value)))).begin(5);


let k: intStream = IntPipeline.builder().add(55).add(57777).add(5).add(57777).build();
console.log( k.map((a:number)=>{
    console.log("4sd65s64d65s4564d56s4", a)
    return a;
}).map((a:number)=>{
    console.log("---*/*/*/**/*/*/*/*/*/*", a)
    return a;
}).filter((v:number)=>v>10).findFirst().getAsInt())

/*.collector(Collectors.toList()) )*//*.each(IntConsumer.of((v:number)=>{
    console.log("Cosumer", v);
}));*/


class Xest{

    t;

    constructor(c) {
        this.t = c;
    }

    ret(testx){

        return new Xest(()=>{
            this.t();
            testx();
        });
    }

}

new Xest(()=>console.log(45666)).ret(()=>console.log("sdsdsdsdsdsdsdsds")).ret(()=>console.log("------------------------------------")).t()

console.log(IntPipeline.builder().add(55).add(57777).add(5).add(57777).build().max())
console.log(IntPipeline.builder().add(55).add(57777).add(5).add(57777).build().min())