import "../src/globalUtils"
import {Comparator} from "../src/Comparator";
import {Collections} from "../src/Collections";
import assert = require("assert");
import {List} from "../src/Interface";
import {Define} from "../src/Define";
import {RuntimeException} from "../src/Exception";
import {Optional} from "../src/Optional";
import {flombok} from "../src/flombok";
import {ClassLoader} from "../src/ClassLoader";
import {Class} from "../src/Class";
import {Constructor} from "../src/Constructor";


let arrN: List<number> = Array.newList(6,3,20,4,1,3);

Collections.sortComparator(arrN,
    Collections.reverseOrder<number>().reversed()
)

let er:Comparator<string> = new Comparator();
//er.reversed().thenComparing()
console.log(arrN)

/****
 *
 * @param a
 */
function a( a  ){this.a =  0;}
a.prototype.c = function( ){};

let bn:any = new a(0), bk = new a(0);
let ao= {a:0}, ap= {a:0};

class abc{
    a:number = 0;

    constructor(a:number, b:string = null, c:string = "foo") {
        this.a = a;
    }

    public ac(){

    }

    static d(){}

}

let Co : abc = new abc(12), Co1:abc = new abc(12);
/****
 * JSON
 */
// let ao= {a:0}, ap= {a:0};
assert.strictEqual( Object.equals(ao,ap), false )
console.log( "should be true ",  Object.equals(ao,ap));
ao= {a:1};
ap= {a:0};
assert.strictEqual( Object.equals(ao,ap), false )
assert.strictEqual( Object.deepEquals(ao,ap), false )
console.log(  "should be false ", Object.deepEquals(ao,ap));
console.log(  "should be false ", Object.equals(ao,ap));
/****
 * Function Object
 */
assert.strictEqual( Object.equals(bn,bk), false )
console.log("should be true ",  Object.equals(bn,bk) );
/****
 * Class
 */
assert.strictEqual( Object.equals(Co,Co1), false )
console.log("should be true ", Object.equals(Co,Co1));
assert.strictEqual( Object.deepEquals(Co,Co1), true )
console.log("should be true ",   Object.deepEquals(Co,Co1));
//Co1.a = 25;
//assert.strictEqual( Object.deepEquals(Co,Co1), false )
console.log( "should be false ", Object.deepEquals(Co,Co1));
/****
 * String
 */
assert.strictEqual( "abcd".compareTo("abcd"), 0 )
assert.strictEqual( "abcd".compareTo("abcde"), -1 )
assert.strictEqual( "abcde".compareTo("abcd"), 1 )
console.log(  "abcd".compareTo("abcd"), "abcd".compareTo("abcdd"),"abcde".compareTo("abcd") );
/****
 * Number
 */
assert.strictEqual( Number(12).compareTo(12), 0 )
assert.strictEqual( Number(12).compareTo(15), -1 )
assert.strictEqual( Number(15).compareTo(12), 1 )
console.log(  Number(12).compareTo(12), Number(12).compareTo(15), Number(15).compareTo(12) );

let array1: List<number> = Array.newList(2,95,2,55,11,45,30,15,8 ), ctrl:number=Number.MAX_VALUE;
Collections.sortComparator(array1,Comparator.naturalOrder());
console.log(array1)
/*array1.stream().each(v=>{
    console.log(v)
    if( v < ctrl ) ctrl = v;
    else{
        assert.strictEqual( v < ctrl, false )
    }
})*/

assert.strictEqual( Define.of(null).isNull(), true );
assert.strictEqual( Define.of(null).orNull("foo"), "foo");
assert.strictEqual( Define.of(null).orElse("bar"), "bar");
try{
    Define.of(null).orThrow(new RuntimeException("Test Exception"));
}catch (e) {
    console.log(e)
    assert.strictEqual( true, true );
}
Optional.ofNullable(null).orElse(null);
try {
    Optional.of(null).orElse(null);
}catch (e) {
    console.log(e)
    assert.strictEqual( true, true );
}

console.log( "dsdqsd", true )
let dao= {kkkk:1,c12:{ e:0, u:[1,2,3] }, n: Array.newList<number>(1,2,3)};
let dap= {kkkk:1,c12:{ e:0, u:[1,2,3] },n: Array.newList<number>(1,5,3)};
console.log( Object.deepEquals(dao,dap), true );

let arr0: ArrayList<number> = Array.list(1,2,3), arr1: ArrayList<number> = Array.list(1,2,3);
console.log(arr0.equals(arr1))
