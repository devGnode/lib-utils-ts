import "../src/globalUtils";
import {optional, supplier} from "../src/Interface";
import {Optional} from "../src/Optional";
import assert = require("assert");
import {RuntimeException} from "../src/Exception";
import {OptionalInt} from "../src/OptionalInt";

try{
    Optional.of(null);
    assert.strictEqual(false,false)
}catch (e) {
    console.log(e)
}
assert.strictEqual(  Optional.ofNullable(null).get(), null );

let optional: optional<string> = new Optional("foo");

assert.strictEqual(optional.equals("foo"), true );
assert.strictEqual(optional.equals("foobar"), false );
assert.strictEqual( optional.get(), "foo" );
assert.strictEqual( optional.isEmpty(), false );
assert.strictEqual( optional.isPresent(), true );


let optional1: optional<string> = new Optional(null );

assert.strictEqual(  optional1.orElse("foo"), "foo");

try{
    optional1.orElseThrow(new RuntimeException("Error"));
    assert.strictEqual(false,false);
}catch (e) {
    console.log(e)
}

let supplier: supplier<string> = new class implements supplier<string>{
    get = () => String("barr")
}

let str:string = optional1.orElseGet(new class implements supplier<string>{
    get = () => String("barSupplier")
});
assert.strictEqual(str,"barSupplier");

let optional2: optional<string> = new Optional("500");
str= optional2
    .filter((value:string)=>value.equals("500"))
    .get();
assert.strictEqual(str,"500");

let num:number = optional2
    .map((value:string)=>parseInt(value))
    .get();
assert.strictEqual(num,500);

try{
    optional1.orElseThrowSupplier(new class implements supplier<RuntimeException>{
        get = () => new RuntimeException("Custom Exception")
    });
    assert.strictEqual(false,false);
}catch (e) {
    console.log(e)
}

console.log( "toStrinf : ",  Optional.of(12).toString(), OptionalInt.empty().toString() );
