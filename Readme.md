<img src="https://img.shields.io/npm/v/lib-utils-ts"/> <img src="https://img.shields.io/snyk/vulnerabilities/npm/lib-utils-ts"/> <img src="https://img.shields.io/npm/l/lib-utils-ts"/> <img src="https://img.shields.io/github/languages/top/devGnode/lib-utils-ts"/><img src="https://img.shields.io/node/v/lib-utils-ts"/> <img src="https://ci.appveyor.com/api/projects/status/github/devGnode/lib-utils-ts?svg=true&branch=develop"/>

# Utils-ts

<img src="https://i.ibb.co/tKdfYNv/libutilstsicon128.png" alt="lib-utils-ts" border="0" />

ads :   
Lucas and Eric both are developer. Lucas use lib-utils-ts :registered:, and on the other hand Eric use basic javascript in his web browser. Development codes of Luca's are clean and structured, Lucas wins much precious times and can eat a little cake with a cup of tea :cowboy_hat_face::tea:. When with him Eric is a labyrinth developer, his code look like foam ball, result he is lost and upset :confused:. Lucas use power of the stream object, He optimize his code and boost this performances. Actually, Eric read a big book how Javascript bêta work ed. 1995 for dummies, that grandfather gave him, but he has a lot of trouble understanding subtlety of javascript in all these pages :sweat:. Today Lucas has wins the better coding champion league of the world :sunglasses:, Eric resign finally oneself to give up and pass to HTML :disappointed:.  Don't be like Eric make rather  like Lucas and use `lib-utils-ts` :registered:. A career may be played on a byt\(e\), Let's reveal together the power of your development.   \( * \) You come from to Java, you want improve your javascript structure, learn object language easily with little framework below, it implements some Java7 & 8 classes like ArrayList, Properties, lombok. \:P :sweat_smile:

This framework has been created only for Typescript projects, it's possible to use it for javascript project but is not really adapted for this, cause generics is not support by the native javascript.  
 
## Set up  
  
`npm i lib-utils-ts`  
  
# Native Extension  
  
These objects `Number`, `String`, `Date`, `Boolean` ... have been extended. Below their prototype :

`import "lib-utils-ts/src/globalUtils"`

##### Number

+ **equals**( value : number ) : boolean 

Static : 

+ **of**( value: Object) : number

#### String

+ **equals**( value :string  ) : boolean
+ **equalsIgnoreCase**( value : string ): boolean
+ **contains**( value: string ) : boolean
+ **isEmpty**( ) : boolean
+ **regExp**( regExp : RegExp, callback : Function ) : string
+ **repeatString**( char : String\[0\], loop : number ) : string
+ **format**( ... args : any\[\] ) : string
+ **exec**( regExp : RegExp ) : String\[\]
+ **explodeAsList**( ) : ArrayList\<string\>
+ **orDefault**( value : string ): string

#### Date

+ **plusDays**( days : number ) : Date
+ **lessDays**( days : number) : Date
+ **plusYears**( years : number ): Date
+ **lessYears**( years : number ) :Date 
+ **dateFormat**( pattern : string ) : Date
+ **elapsedTime**( date : Date ) : number

Static : 
+ **dateFormat**( pattern : string ) : Date
  
#### Boolean

+ **state**( expectTrue : any, orElse : any ) : any
+ **equals**( value: boolean ) : boolean  

Static : 

+ **of**( value: Object) : Boolean

#### Object

+ **getClass**\<T\>(): Class\<T\>

Static :

+ **isNull**() : boolean
+ **requireNotNull**\<T\>( other: T, message?: string ) :T 
+ **nonNull**(obj:Object):boolean

#### Object

+ **getClass**\<T\>(): Class\<T\>

Static :

+ **isNull**() : boolean
+ **requireNotNull**\<T\>( other: T, message?: string ) :T 

#### Function

+ **getClass**\<T\>(): Constructor\<T\>


## Constructor\<T\>

As in javascript an object is also a function, this class depict a next future instanced object

- `getName( ):string` 
- `getType( ):string`  
- ` getEntries( ): [any, string ][]`  
- `getKeys( ): string[]`  
- `cast( other: Object ):T`  
- `newInstance( ...args : Object[] ) :T`  
- `getResourcesAsStream( name: string): InputStreamReader` 

Static :

- `forname<? extends Object>( ...args : Object[] ) :T`

````typescript  

class foo{
    public value:string;

    constructor( value:string ){
        this.value = value;
    }

    public getValue( ):string{ /*...*/ }
}

let a: foo = new foo(125); // Ok

let b: Constructor<foo> = new Constructor(foo);
let c: foo = b.newInstance( 125 ); // OK
console.log( c.getValue( ) ); // 125

let d:  Constructor<foo> =  foo.class();
let e: foo = d.newInstance( 255 );
console.log( e.getValue() );

let f: foo = foo.class<foo>().newInstance(80);
console.log( f.getValue() );

````
    
## Class\<T\>

- `getEntries( ): [any, string ][]`  
- `getType( ):string`  
- `getKeys( ): string[]`  
- `getInstance( ):T`  
- `cast( other: Object ):T`  
- `notNullProperties( ) : MapType<string, Object>`  
- `newInstance( ...args : Object[] ) :T`  
- `getResourcesAsStream( name: string): InputStreamReader`  

````typescript

class foo{
    public value:string;

    constructor( value:string ){
        this.value = value;
    }

    public getValue( ):string{ return this.value; }
}

let a: foo = new foo(125); // Ok

a.getClass().getType( ); // => foo

````

Class for name :

````typescript

import {Constructor} from "./Class"; 

interface IMyInter{
    value:string,
    getValue( ):string    
}

Class.forName<IMyInter>("src.package.Class").newInstance(12).getValue();

````
## Iterator\<E\>  
  
**Methods**  
  
- `hasNext() : boolean`  
- `next() : E`  
	- NoSuchElementException  
  
## ListIterator\<E\>  
  
**Method**  
  
- `hasPrevious( ) : boolean`  
- `nextIndex( ) : number`  
- `previous( ) : E`  
	 - NoSuchElementException  
- `set( e  : E ) : void`  
- `add( e : E ) : void`  
  
```typescript  
let lit_s : String[] = [];  
  
lit_s[0] = "some text 1";  
lit_s[1] = "some text 2";  
lit_s[2] = "some text 3";  
lit_s[3] = "some text 4";  
  
let itr_a : Iterator<String> = new Iterator<String>(lit_s);  
while( itr_a.hasNext() ){  
 console.log(" iterator a = "+ itr_a.next());}  
```  
  
```typescript  
  
let lit_s : String[] = [];  
  
lit_s[0] = "some text 1";  
lit_s[1] = "some text 2";  
lit_s[2] = "some text 3";  
lit_s[3] = "some text 4";  
  
let itr_la : ListIterator<String> = new ListIterator<String>(lit_s);  
while( itr_la.hasNext() ) {  
 console.log(" iterator value => "+ itr_la.next());}  
  
console.log("\n");  
while( itr_la.hasPrevious() ){  
 console.log(" iterator value => "+ itr_la.previous()); console.log(" hasPrevious => "+ itr_la.hasPrevious());}  
  
````  
  
## Optional\<E\>  
  
**Constructor**  
  
- `( value : E ) : Optional<E>`  
  
**Methods**  
  
- `get( ) : E`  
- `equals( obj : Object ) : boolean`  
- `isEmpty( ) : boolean`  
- `isPresent( ) : boolean`  
- `orElse( other : E ) : E`  
- `orElseThrow( other : E ) : E`  
- `filter( predicate : predication<E>) : Optional<E>`  
- `map( callback : lambaStream<E>  ) : Optional<E>`  
- `mapTo( callback : lambdaType<E,U> ) : Optional<U>`  
  
**Static** :  
  
- `of<T>( value : E )  : Optional<E>`  
 - NullPointerException  
- `ofNullable<E>( value : E )  : Optional<E>`  
  
````typescript  
  
let returned : boolean = Optional.ofNullable(null).isEmpty();  
console.log("returned value => ", returned );  
  
let value : String = Optional.ofNullable(null).orElse("default value");  
console.log("value equals to =>", value);  
  
 Optional.ofNullable(null).orElseThrow(new Error("Failed error")); // throw  
````

  
## Predicatation\<T\>  

public Interface **predicate**\<T\>

- `test( value : T ) : boolean`
- `and( Predicate : predicate<T>) : predicate<T>`
- `or( other : predicate<T> ) : predicate<T>`
- `negate(): predicate<T>`

Typescript is not java so, fit us : 

Public class **Predication**<\T\> implements **predicate**\<T\>

usage :

````typescript  
let pobj0 : predicate<string> = new Predication();  
let pobj1 : predicate<string> = new Predication();
let pobj2 : predicate<string> = new Predication();

pobj0.test = value => value.startWith("f");<    
pobj1.test = value => value.endWith("oo");
pobj2.test = value => value.equals("Hello World !");


console.log( pobj0.and(pobj1).test( "f1oo" ) ); // true
console.log( pobj0.and(pobj1).test( "Hello World !" ) ); // false

console.log( pobj0.and(pobj1).or(pobj2) ).test( "Hello World !" ) ); // true

let p: predicate<string> = Predication.of(( value ,key)=> value==="foo");

p.and(pobj1).test();

````  

````typescript  
let pobj0 : predicate<string> = new Predication();  
let pobj1 : predicate<string> = new Predication();
let pobj2 : predicate<string> = new Predication();

pobj0.test = value => value.startWith("f");
pobj1.test = value => value.endWith("oo");
pobj2.test = value => value.equals("Hello World !");

list.stream().map( pobj0.and(pobj1).or(pobj2) ); 
````  

 - **type** predicateFn\<T\>  
 
````typescript  
let pfn : predicateFn<String> = value=> value.equals("azertyuiop");  
Optional.of("azertyuiop").map(pfn);  
````  

public **PredicationConstructor**\<String\>

- constructor : ( value : T, key\?\: ascii ) \: boolean
- `test( value : T ) : boolean`
- `and( Predicate : predicate<T>) : predicate<T>`
- `or( other : predicate<T> ) : predicate<T>`
- `negate(): predicate<T>`

````typescript  
let p : PredicationConstructor<String> = value => value.equals("azertyuiop");  
````  
  
# List 

### Interface Iterable\<E\>

`iterator( ): Iterator<T>`

## Interface Collection\<E\>

public interface Collection\<E\> extends Iterable\<E\>

- `add( value : E ) : boolean`
- `add(...value: E[]): boolean`
- `addAll( collection : Collection<E> ) : boolean`
- `clear( ) :void`
- `contains( o : object  ) : boolean`
- `containsAll( collection : Collection<E> ) : boolean`
- `equals( o : object ) : boolean`
- `remove( key : E ) : boolean`
- `isEmpty( ) : boolean`
- `size( ) :number`
- `toArray( ) : array<E>`
        
## Interface List\<E\>

- `get( index : number ) : E`
- `indexOf( value : object  ) : number`
- `lasIndexOf( value : object ) : number`
- `set( index : number, element : E): E`
- `listIterator( ) : ListIterator<E>`
- `subList( from : number, to : number ): List<E>`
- `stream( ) : Stream<E>`
      
## Interface Cloneable\<E\> 

- `clone( ) : ArrayList<E>`
 
## AbstractCollection\<E\>

public abstract class **AbstractCollection\<E\>** implements **Collection\<E\>**

## AbstractList\<E\>

public abstract class **AbstractList\<E\>** extends **AbstractCollection\<E\>** implements **List\<E\>**,**NativeExportable\<E\>**
  
## ArrayList\<E\>

public class **ArrayList\<E\>** extends **AbstractList\<E\>** implements **Cloneable\<E\>**,**List\<E\>**,**ArrayListInterfaceA\<E\>**

**Constructor**  
  
- `( value : array<E> ) : ArrayList<E>`  
  
**Methods**  
  
- `add(...value: E[]): void`  
- `addAll( collection : Collection<E> ): boolean`
- `clear( ) : void`  
- `contains(o: Object): boolean`
- `containsAll(collection: Collection<E>): boolean`
- `equals(o: object): boolean`
- `get( key : number ) : E`  
    + indexOfBoundException
- `isEmpty(): boolean`    
- `size( ) : number`  
- `iterator(): Iterator<E>`  
- `listIterator( index number): ListIterator<E>` 
- `isEmpty( ) : boolean`  
- `stream( ) :  Stream<E>`  
- `remove(key: E): boolean`  
- `indexOf( object : Object ) : number`  
- `lasIndexOf(value: object): number `
- `set(index: number, element: E): E`
- `subList(from: number, to: number): List<E>`
- `shift( ) : E `
- `pop( ): E`
- `clone( ) : ArrayList<E>`  
- `toArray(): array<E>`  
- `of<E>( list : array<E> ): List<E>`


```typescript  
import {List,List,LinkedList,HashMap} from 'lib-utils-ts';  
  
let boolList : List<Boolean> = new List<Boolean>();  
let stringList : List<String> = new List<String>();  
let numberList : List<Number> = new List<Number>();  
let objectList : List<Object> = new List<Object>();  
  
boolList.add(true);  
// boolList.add("string foo"); --> compilateur error  
  
stringList.add("a simple string");  
// stringList.add(true); --> compilateur error  
  
numberList.add(12);  
//numberList.add("a string"); --> compilateur error  
  
objectList.add({});  
objectList.add([]);  
//objectList.add(true); --> compilateur error  
  
let link : LinkedList<String> = new LinkedList<String>();  
let map : HashMap<Number> = new HashMap<Number>();  
  
link.put("key","value");  
/**...**/  
map.put("id",123456789);  
/**...*/  
  
class Personal{  

 readonly p : number; readonly q : number;

}  
  
let personalList : List<Personal> = new List<Personal>();  
  
personalList.add(new Personal());  
  
```  
# Set\<E\>

public interface Set\<E\> extends Collection\<E\>

## AbstractSet\<E\>

public abstract class AbstractSet\<E\> extends AbstractCollection\<E\> implements Set\<E\>

## SetList\<E\>

public class SetList\<E\> extends AbstractSet\<E\>

**Constructor**  
  
- `(  ) : SetList<E>` 

# Interface Map\<E\>

- `clear( ): void`
- `containsKey( key : K ) : boolean`
- `containsValue( value : V ): boolean`
- `entrySet() : Set<MapEntries<K,V>>`
- `equals( o : Object ) : boolean`
- `get( key : Object ) : V`
- `isEmpty( ) : boolean`
- `keySet( ) : Set<K>`
- `put( key : K, value : V ) : V`
- `remove( o : Object ): V`
- `size( ) : number`
- `valueCollection( ) : Collection<V>`
- `each( callback : streamLambda<V> ): void`
    
## MapEntry\<K,V\>

public class MapEntry<K,V> implements MapEntries<K,V>

**Constructor**

- `(key: K, value: V) : MapEntry`

Methods

- `getKey(): K `
- `getValue(): V`

## AbstractMap\<K extends string|number,V\>

public abstract class AbstractMap\<K extends string|number,V\> implements Map\<K,V\>

## HashMap\<K,V\>

public class HashMap\<K extends ListKey,V\> extends AbstractMap\<K , V\>

**Constructor**  
  
- `(  ) : ` HashMap\<K,V\>` 
  
**Methods**  
  
- `put(key: K, value: V): V`
- `get(key: Object): V`
- `containsKey(key: Object): boolean`
- `containsValue(value : V): boolean`
- `keySet(): Set<K>`
- `entrySet(): Set<MapEntry<K, V>>`
- `equals(o: Object): boolean`
- `remove(o: Object): V`  
- `count( ) : number`
- `each(callback : streamLambdaK<V,K>): V`  
- `size( ) : number`
- `valueCollection(): Collection<V>`
- `clear() : void `
- `static of<V>( list : {} ):`

```typescript  
  
import {HashMap} from 'lib-utils-ts';  
  
let list : HashMap<String,string> = new HashMap({});  
  
list.put("entry0","foo");  
list.put("entry1","bar");  
list.put("entry2","foo"); 

/***
 Iterable
***/

let hMap : HashMap<string, string> = new HashMap({ foo:"123",bar:"4545",});
// let setHMap : Set<MapEntries<string, string>> = ghj.entrySet();
let ItrHMap : Iterator<MapEntry<string, string>> = hMap.entrySet().iterator();

while (ItrHMap.hasNext()){
    let mapentry : MapEntry<string, string>  = ItrHMap.next();

    console.log(mapentry.getKey(),mapentry.getValue());
}

// OR

(<ArrayList<string>>ghj.valueCollection()).stream().each(value=>console.log(value));

```

## Stream\<T\>
 
Public  class Stream<T> implements  ArrayStream<T>,OptionalMapInterface<T,Stream<T>>
  
**Constructor**  
  
- `( value : Array<T> ) : Stream<T>`  
  
**Methods**  
  
- `each( callback : streamLambda<T> ): Stream<T>`  
- `mapTo<U>( callback : lambdaType<T,U> ): Stream<U>`  
    + indexOfBoundException
- `map( callback : streamLambda<T> ): Stream<T>`  
- `mapToInt( callback : streamLambda<T> ) : Stream<Number>`  
- `filter( callback : predication<T> ): Stream<T>`  
- `limit( limit : Number ): Stream<T>`  
- `findFirst( ) : Optional<T>`  
- `findAny( ) : Optional<T>`  
- `allMatch( callback : predication<T> ): boolean`  
- `anyMatch( callback : predication<T> ): boolean`  
- `noneMatch( callback : predication<T> ): boolean`  
- `hasPeer(): boolean`  
- `count(): number`  
- `sum( ) : Optional<Number>`
- `count(): number`  
- `min(): Optional<Number>`  
- `max() : Optional<Number>`  
- `getList( ) : ArrayList<T>`  
- `toArray() : array<T>`  
- `iterator(): Iterator<T> `  
- `listIterator(): ListIterator<T> `
- ` of<T>( list : array<T> ): Stream<T>`

```typescript  
  
let stream : Stream<String> = new Stream<String>();  
  
```  

  
## mix List & Stream  
  
```typescript  
  
import {List,List,Stream} from 'lib-utils-ts';  
  
let list : List<String> = new List<String>();  
  
list.add("title");  
list.add("some text");  
list.add("some text");  
list.add("");  
  
list = list.stream()  
 .filter(value=>value.length>0) .map(value=>value.equals("some text")) .getList();

```


```typescript  
  
import {List,List,Stream} from 'lib-utils-ts';  
  
let list : List<String> = new List<String>();  
  
list.add("title");  
list.add("some text");  
list.add("some text");  
list.add("");  
  
let predicate : predicateFn<String> = ( value : String, key ) => value.length>0;

// Accepted
list = list.stream()
    .filter(predicate)
    .mapTo(value=>value.equals("some text"))
    .getList();

//or
list = list.stream()
    .filter(value=>value.length>0)
    .mapTo(value=>value.equals("some text"))
    .getList();

```
## Properties

#### Interface 

public export interface IPropertiesFile\<K extends string|number,V\>

- `setProperty( key : K, value : V ) : void` 
    - NullPointerException : if key is null
- `getProperty( key: K, defaultValue?: V ) : V` 
    - NullPointerException : if key is null

public interface properties\<V\> extends  IPropertiesFile\<string, V\>

- `hasKey( key : string ):boolean` 
- `load( input : InputStreamReader ) : void` 
    - NullPointerException
    - IOException
- `stringPropertiesName( ) : Set<string>` 
- `store( output: OutputStreamWriter ) : void` 
- `update( ) : void`
    - NullPointerException
    - IOException

#### Class 

public Abstract class AbstractProperties\<V\> implements properties\<V\>

public class PropertiesA\<V\> extends AbstractProperties\<V\>

```typescript  

let prop : PropertiesA<string> = new PropertiesA<string>();
prop.setProperty("foo","bar");

```

public class Properties extends AbstractProperties\<Object\>

```typescript  

let prop : Properties = new Properties();
prop.setProperty("foo","bar");
prop.setProperty("foo",1234);
prop.setProperty("foo",true);
```

public class PropertiesJson extends AbstractProperties\<Object\>

```typescript  

let prop : PropertiesJson = new PropertiesJson();
prop.setProperty("foo","bar");
prop.setProperty("foo",1234);
prop.setProperty("foo",true);
prop.store(new FileWriter("./foo/bar.json"));
```

## :checkered_flag: FLombok 

A testing feature, be careful when using this method. make sure you have defined "experimentalDecorators" property to "true" in your tsconfig.json. This functionality may be changed in a future version.

- version `0.0.1`

FakeLombok is a decorator annotation, for use this 

### usage getter & setter properties annotation

- `GETTER( )`
- `SETTER( )`

```typescript  

class Test{
    
    @flombok.GETTER( )
    @flombok.SETTER( )
    public fooS :string;
    
    @flombok.GETTER( )
    @flombok.SETTER( )
    protected fooN : number;

    @flombok.GETTER( )
    @flombok.SETTER( )
    protected fooMO : MyObjectInterface;

    public getFooS: flombok.getStringFunc;
    public setFooS: flombok.setStringFunc;

    public getFooN: flombok.getNumberFunc;
    public setFooN: flombok.setNumberFunc;

    public getFooMO: flombok.accessorGetFunc<MyObjectInterface>;
    public setFooMO: flombok.accessorSetFunc<MyObjectInterface>;
}

let test : Test = new Test();

test.setFooS( "bar" );
console.log( test.getFooS( ) ); 

let mo  : MyObjectInterface = test.getFooMO( );

```

### usage enumerable properties/method annotation


- `ENUMERABLE( enumerable: boolean, defaultValue: any = null )`
    - For apply this annotation to your class good way to use it is to no define value, but define 'defaultValue' in your annotation
 - `ENUMERABLEFUNC( enumerable: boolean)`

```typescript  

class Test{
    
    @flombok.ENUMERABLE( flase, "foo" ) 
    public fooS :string;
    
    @flombok.ENUMERABLE( true, 5 ) 
    protected fooN : number;

    @flombok.ENUMERABLE( flase ) // default null
    protected fooMO : MyObjectInterface;

}

console.log( ( new Test() ).getClass().getEntries() ); // []

```

## RestHttp

Public Interface restHttp :

 - `getProto( ): string`
- `getHeaderAsObject( ) : HashMap<string,any>`
- `getDataAsObject( ) :any`
- `getData( ): string`
- `setData( data : string ) :void`
- `setHeader( header: HashMap<string,any> ):void`
- `request( ) : Promise<Response>`
- `setEncoding( encoding:BufferEncoding):restHttp`
- `getEncoding( ):BufferEncoding`
- `setLoader( pipe:loader): restHttp`
- `getLoader( ):loader`

#### RestHttp & RestHttps

- static `options( ) : HttpOptions<RestHttp>`

````typescript

import {Response,RestHttp} from "lib-utls-ts/src/net/Http";
import {Cookie} from "lib-utls-ts/src/net/Cookie";

let q : Response = RestHttp.options()
    .widthEndpoint("/end/point")
    .widthHostname("host")
    .get()
    .build()
    .setEncoding("utf-8")
    .request();

let cookie: Cookie = q.getCookies()
            .stream()
            .filter(value=> value.getName().equals("foo"))
            .findFirst()
            .get();
````


## Feature 

- 1.2.0-beta : Implementation and stabilisation of `ArrayList<E>`, `HashMap<E>`, `Stream<E>` ..
- 1.2.1-beta : 
    + Implementation of `Properties` class and wrap file class `FileReader` and `FileWriter`
    + Featured flombok decorator annotation version 0.0.1 `Test version`, cause the decoration annotation is an experimental feature of TypeScript.
    + Implementation of `RestHttp` and `RestHttps` feature
    + Stabilisation of predicate class : `Predication<T>`