import "../src/globalUtils"
import {HashMap} from "../src/HashMap";
import {IConsumer, List, MapEntries, Set} from "../src/Interface";
import {ArrayList} from "../src/ArrayList";
import {Arrays} from "../src/type/Arrays";

let map: HashMap<string,number> = new HashMap();
map.put("lol",15);
map.put("loggl",150);
map.put("loggl",127878);
map.put("loggldsdsdssdsdsfsd",7452465456654);
//map.put("loggl",15);
//map.put("ldddoggl",125);

console.log("--", map.get("loggldsdsdssdsdsfsd"));
map.remove(7452465456654)
console.log("--", map.get("loggldsdsdssdsdsfsd"), map.size());
//console.log(map)
console.log("======================ENTRYSET==============================");
map.entrySet().forEach(new class implements IConsumer<MapEntries<string, number>>{
    accept = (v:MapEntries<string, number>)=>{
        console.log( v.getValue()+" = " + v.getKey(), v.toString() );
        if(v.getKey().equals("loggl")){
            v.setValue(8888888888);
        }
    }
})
console.log("=======================================================================");
console.log(map.entrySet().toString(), map.get("loggl"))

let entry: Set<MapEntries<string, number>> = map.entrySet();

console.log("=======================================================================");
entry.iterator().forEachRemaining((value:MapEntries<string, number>)=>{
    console.log(value.getKey(), value.getValue(), value.toString())
});

map.keySet().forEach(new class implements IConsumer<string>{
    accept = console.log
});
map.valueCollection().spliterator();

class Test{
    public test:number=15;
    constructor(value:number) {this.test=value;}

    equals(o:Object):boolean{

        if(o instanceof Test){return o.test == this.test;}
        return false;
    }

    toString():string{
        return "[ test = "+ this.test +" ]";
    }
}

let mapper:HashMap<number, Test> = new HashMap();
mapper.put(0, new Test(150));

for(let i = 1; i < 20; i++ ){
    mapper.put(i,new Test(i));
}
//mapper.remove(new Test(4997));
console.log("=========================+9+++++==============================================");
let entry1: Set<MapEntries<number, Test>> = mapper.entrySet();

/*entry1.iterator().forEachRemaining((value:MapEntries<number, Test>)=>{
    console.log(value.getKey(), value.getValue().test, value.toString())
});*/

console.log( mapper.entrySet().toString() );
console.log( map.toString() );


