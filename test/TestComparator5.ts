import "../src/globalUtils"
import {Comparator} from "../src/Comparator";
import {Collection} from "../src/Collection";
import assert = require("assert");
import {List} from "../src/Interface";
import {Define} from "../src/Define";
import {RuntimeException} from "../src/Exception";
import {Optional} from "../src/Optional";

let arrN: List<number> = Array.newList(6,3,20,4,1,3);

Collection.sortA(arrN,
    Collection.reverseOrder<number>().reversed()
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
assert.strictEqual( Object.equals(ao,ap), true )
console.log(  Object.equals(ao,ap));
ao= {a:1};
ap= {a:0};
assert.strictEqual( Object.equals(ao,ap), true )
assert.strictEqual( Object.deepEquals(ao,ap), false )
console.log(  Object.deepEquals(ao,ap));
console.log(  Object.equals(ao,ap));
/****
 * Function Object
 */
assert.strictEqual( Object.equals(bn,bk), true )
console.log(  Object.equals(bn,bk) );
/****
 * Class
 */
assert.strictEqual( Object.equals(Co,Co1), true )
console.log( Object.equals(Co,Co1));
assert.strictEqual( Object.deepEquals(Co,Co1), true )
console.log(  Object.deepEquals(Co,Co1));
Co1.a = 25;
assert.strictEqual( Object.deepEquals(Co,Co1), false )
console.log(  Object.deepEquals(Co,Co1));
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
assert.strictEqual( Number(12).compareTo(15), -3 )
assert.strictEqual( Number(15).compareTo(12), 3 )
console.log(  Number(12).compareTo(12), Number(12).compareTo(15), Number(15).compareTo(12) );

let array1: List<number> = Array.newList(2,95,2,55,11,45,30,15,8 ), ctrl:number=Number.MAX_VALUE;
Collection.sortA(array1,Comparator.naturalOrder());
array1.stream().each(v=>{
    console.log(v)
    if( v < ctrl ) ctrl = v;
    else{
        assert.strictEqual( v < ctrl, false )
    }
})

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