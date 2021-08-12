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

map.entrySet().forEach(new class implements IConsumer<MapEntries<string, number>>{
    accept = (v:MapEntries<string, number>)=>{
        console.log( v.getValue()+" = " + v.getKey(), v.toString() );
        if(v.getKey().equals("loggl")){
            v.setValue(8888888888);
        }
    }
})

console.log(map.entrySet().toString(), map.get("loggl"))

let entry: Set<MapEntries<string, number>> = map.entrySet();

console.log("=======================================================================");
entry.iterator().forEachRemaining((value:MapEntries<string, number>)=>{
    console.log(value.getKey(), value.getValue(), value.toString())
});

map.keySet().forEach(new class implements IConsumer<string>{
    accept = console.log
});
map.valueCollection().spliterator()