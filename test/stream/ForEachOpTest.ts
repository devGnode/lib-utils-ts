import "../../src/globalUtils"
import {Consumer, IntConsumer} from "../../src/Consumer";
import {ForEachOps} from "../../src/stream/ForEachOps";
import {StreamShape} from "../../src/stream/StreamShape";
import {terminalSink} from "../../src/stream/TerminalOps";
import {intStream, List, Stream} from "../../src/Interface";
import {IntPipeline} from "../../src/stream/IntPipeline";
import {Collectors} from "../../src/Collectors";
import {Comparators} from "../../src/Comparators";
import {OS, System} from "../../src/System";
import {Arrays} from "../../src/type/Arrays";
import {ArrayList} from "../../src/ArrayList";
import {Integer} from "../../src/type/Integer";



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

console.log(IntPipeline.builder().add(55).add(57777).add(5).add(57777).build().max());
console.log(IntPipeline.builder().add(55).add(57777).add(5).add(57777).build().min());

console.log("*----")
console.log( IntPipeline.builder().add(2).add(3).add(3).add(4).add(6).add(8).add(8).add(56).build().average().getAsDouble());
//Array.list<number>(2, 3, 3, 4, 6, 8, 8)

console.log(IntPipeline.builder().add(2).add(3).add(3).add(4).add(6).add(8).add(8).add(56).build().mapToObj<string>((value:number)=>String(value)).each(console.log));
System.Out.println( "cc {}", IntPipeline.builder().add(2).add(3).add(3).add(4).add(6).add(8).add(8).add(56).build().reduce(Math.min).getAsInt());

class gfd{

}
process.stdout.write('\x09');
System.Out.println( "HellowWorl {} {} {}", new gfd(), true, Boolean(true) );
process.stdout.write('\x0A');
System.Out.println( "HellowWorl {} {} {}", new gfd(), true, Boolean(true) );
// @ts-ignore
//process.stdout.write('\x1Bc');

System.setProperty("selenium.webdriver.path","c/user/c.exe");

System.Out.println(System.getProperty("MAVEN_HOME"));

console.log(process.arch);

System.Out.println("dskdlmksqkdmsqkdm {} {}", 12);


System.Out.println( "{}", System.arch() );
System.Out.println( "{}", System.arch() );

/*let df:List<string>= new ArrayList(["lol","c","dssd"]);

df.stream().filter((value:string)=>value.equals("lol"));
*/




System.Out.println( "{}",IntPipeline.builder().add(2).add(4).add(6).add(20).build().sum() );

System.Out.println("-------------------");
IntPipeline.builder().add(2).add(4).add(6).add(20).build().limit(2).each(IntConsumer.of((value:number)=> console.log("-dsfds**--",value)));

//Arrays.stream( "123456".split("") ).map(Integer.of).each(console.log);