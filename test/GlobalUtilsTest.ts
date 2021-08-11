import "../src/globalUtils"
import assert = require("assert");
import {List} from "../src/Interface";
import {ArrayList} from "../src/ArrayList";


// equals
assert.strictEqual("abc".equals("abc"), true);
assert.strictEqual("abc".equals("bc"), false);
assert.strictEqual("abc".equals(null), false);
// Number
assert.strictEqual(Number(10).equals(10), true);
assert.strictEqual(Number(10).equals(99), false);
assert.strictEqual(Number(10).equals(null), false);
// Boolean
assert.strictEqual(Boolean(true).equals(true), true);
assert.strictEqual(Boolean(false).equals(false), true);
assert.strictEqual(Boolean(false).equals(null), false);
assert.strictEqual(Boolean(false).equals(true), false);
assert.strictEqual(Boolean(true).equals(false), false);

// equalsIgnoreCase
assert.strictEqual("abc".equalsIgnoreCase("abC"), true);
assert.strictEqual("AbC".equalsIgnoreCase("abc"), true);
assert.strictEqual("abc".equalsIgnoreCase("bC"), false);
assert.strictEqual("abc".equalsIgnoreCase(null), false);


// equalsIgnoreCase
assert.strictEqual("abc".equalsIgnoreCase("abC"), true);
assert.strictEqual("AbC".equalsIgnoreCase("abc"), true);
assert.strictEqual("abc".equalsIgnoreCase("bC"), false);
assert.strictEqual("abc".equalsIgnoreCase(null), false);


// repeatString
assert.strictEqual(String.repeatString("0",5).length, 5);
assert.strictEqual(String.repeatString("0",0).length, 0);
try{
    // !!defect!!
    assert.strictEqual(String.repeatString("0",-1).length, 0);
}catch (e){
    assert.strictEqual(false,true);
}

// equals
assert.strictEqual("abc".contains("abc"), true);
assert.strictEqual("abc".contains(/b/), true);
assert.strictEqual("abc".contains(null), false);

// isEmpty
assert.strictEqual("".isEmpty(), true);
assert.strictEqual("abc".isEmpty(), false);

// explodeAsList
let exploder:List<string> = "foo;bar;123;4".explodeAsList(";");
assert.strictEqual(exploder instanceof ArrayList, true);
assert.strictEqual(exploder.size(), 4);


// orDefault
assert.strictEqual("abc".orDefault("foo"), "abc");
assert.strictEqual("".orDefault("foo"), "foo");
console.log("".contains(null))
//assert.strictEqual("".contains(null), "");

// compareTo
assert.strictEqual("abc".compareTo("foo"), -5);
assert.strictEqual("".compareTo("foo"), -3);

// AsList
assert.strictEqual((Array.asList(["a","b","c"])) instanceof ArrayList, true);
assert.strictEqual(Array.newList<string>("a","b","c").size(), 3);


// Number
assert.strictEqual(Number.of("4"), 4);
assert.strictEqual(Number.of("10.00"), 10);
assert.strictEqual(Number.of(null), NaN);

// requireNotNull
let control:boolean = false;
try{
    Object.requireNotNull(null,"messsage");
}catch (e){
    control=true;
}
assert.strictEqual(control, true);

control = true;
try{
    Object.requireNotNull({},"messsage");
}catch (e){
    control=false;
}
assert.strictEqual(control, true);

///
class Test{
    private c:number;
    private b:string;

    constructor() {
    }

    public getC():void{

    }
}

class des{
    private a:string = "fooBar";
    constructor() {
    }

    public toString():string{
        return "[ a = "+this.a+" ]";
    }
}

console.log((new Test()).toString(), "/", Object.toString(new Test()));
console.log( [new Test(), new des()].toString());

console.log(Array.newList<string>("a","b","c").toString())
console.log(Array.newList<Test>(new Test(),new Test(),new Test(),new Test(),new Test(),new Test(),new Test(),new Test()).toString());

console.log(Object.equals(new Test(),new Test()))