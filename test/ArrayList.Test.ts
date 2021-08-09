// INSERT ALL
import "../src/globalUtils";
//
import {IConsumer, iterator, List, PredicationConstructor} from "../src/Interface";
import {ArrayList} from "../src/ArrayList";


console.log("==================== ArrayList ==================")
let arr:List<number> = new ArrayList();
console.log(arr);

arr = new ArrayList([1,2,3,4,5,6,7,8]);
console.log(arr);

console.log("==================== Replace All ==================")
arr.replaceAll(2,8);
arr.spliterator().forEachRemaining(new class implements IConsumer<number>{
    accept = (value:number)=> console.log("consumer=",value)
});
console.log("==================== IndexOf ==================")
console.log( arr.indexOf(6), arr.indexOf(22)  );

console.log("==================== Iterator ==================")
let itr: iterator<number> = arr.iterator();
while (itr.hasNext()){
    console.log("iterator = ", itr.next());
}
console.log("==================== ToString ==================")
console.log( arr.toString()  );


console.log("==================== Sort ==================");
arr = new ArrayList([14,25,4,8,11,3,66,2]);
console.log( arr.sort(), arr  );

console.log("==================== Get ==================");
console.log("index 2 = ", arr.get(2) );

console.log("==================== Remove ==================");
console.log("index 2 = ", arr.remove(2), arr );

console.log("==================== RemoveAll ==================");
arr = new ArrayList([66,14,66,4,8,11,3,66,2]);
console.log("index 2 = ", arr.removeAll(66), arr );

console.log("==================== Contains ==================");
console.log("contains = ", arr.contains(8));


console.log("==================== Remove Oject ==================");

class Testor{

    private str:string;
    private num:number;
    public  value:number;

    constructor(rand:number) {
        this.num =rand;
        this.value = rand;
    }

    static gen():List<Testor>{
        let out:List<Testor> = new ArrayList();

        for(let i=0;i < 10;i++){
            out.add(new Testor(i));
        }
        return out;
    }
}

let oo: List<Testor> = Testor.gen();
console.log(oo);

oo.remove(new Testor(7));
oo.remove(new Testor(9));
console.log(oo)

console.log("==================== Reverse ==================");
oo.reverse();
console.log(oo);

console.log("==================== Clone ==================");
console.log(oo.clone(),);


let lm: PredicationConstructor<string> = (value:string) => true;
