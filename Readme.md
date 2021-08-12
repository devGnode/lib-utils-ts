<img src="https://img.shields.io/npm/v/lib-utils-ts"/> <img src="https://img.shields.io/snyk/vulnerabilities/npm/lib-utils-ts"/> <img src="https://img.shields.io/npm/l/lib-utils-ts"/> <img src="https://img.shields.io/github/languages/top/devGnode/lib-utils-ts"/><img src="https://img.shields.io/node/v/lib-utils-ts"/> <img src="https://ci.appveyor.com/api/projects/status/github/devGnode/lib-utils-ts?svg=true&branch=develop"/> <img src="https://img.shields.io/badge/tsconfig@target-ES2020-blue"/>
 
# !! Big Refactoring !! Framework not operational.
 
 - clone realease 2.0.0-stable
 - clone master => 2.0.0-stable
 
 - Stream feature is disable in develop branch
 
# Utils-ts

<img src="https://i.ibb.co/tKdfYNv/libutilstsicon128.png" alt="lib-utils-ts" border="0" />

ads :   
Lucas and Eric both are developer. Lucas use lib-utils-ts :registered:, and on the other hand Eric use basic javascript in his web browser. Development codes of Luca's are clean and structured, Lucas wins much precious times and can eat a little cake with a cup of tea :cowboy_hat_face::tea:. When with him Eric is a labyrinth developer, his code look like foam ball, result he is lost and upset :confused:. Lucas use power of the stream object, He optimizes his code and boost these performances. Actually, Eric read a big book how Javascript bêta work ed. 1995 for dummies, that grandfather gave him, but he has a lot of trouble understanding subtlety of javascript in all these pages :sweat:. Today Lucas has wins the better coding champion league of the world :sunglasses:, Eric resign finally oneself to give up and pass to HTML :disappointed:.  Don't be like Eric make rather  like Lucas and use `lib-utils-ts` :registered:. A career may be played on a byt\(e\), Let's reveal together the power of your development.   \( * \) You come from to Java, you want improve your javascript structure, learn object language easily with little framework below, it implements some Java7 & 8 classes like ArrayList, Properties, lombok. \:P :sweat_smile:

This framework has been created only for Typescript projects, it's possible to use it for javascript project but is not really adapted for this, cause generics is not support by the native javascript.  

Dev : :star::star::star::star::star:

 
# Why 

When i have start to my job, I had to work with the Java, but Java is was't been my favorite language buts with time i learned to love it. in the beginning develop sometimes it was really hard ... after, i had to work with Typescript,  JS a language i master it really well, but its language too permissive not enaugth strcutured. And i had discover Typescript who allows to strucutred Js developpment in real. In first i have decide to implement a speudo code of Stream in typescript JS, more later,  I have decide to implement some elements to Java. that allows to learn Java easly without compilation error. navigation betwenn the a permissive language & typed lanuage that is allows too to see how Java work. I try to be iso Java but sometimes its not possibles


## Set up  
  
`npm i lib-utils-ts`  
  
# Native Extension  
  
Importation : `import "lib-utils-ts/src/globalUtils"`

For enabled this framework you need to import globalUtils to you root project,
This import provides access to the methods of these native objects that have been extended `Object`, `FunctionA`, `Number`, `String`, `Date`, `Boolean`.
And so many others :

#### Object

Instanced Object :

+ `getClass<T>(): Class<T>` : [see](https://github.com/devGnode/lib-utils-ts#classt)
+ `equals( object: Object ): boolean`

Static :

+ `isNull() : boolean` : obj can be null or undefined
+ `nonNull(obj:Object):boolean` : check if an element is null 
+ `requireNotNull<T>( other: T, message?: string ) :T `
    - NullPointerException
+ `compare( o1:Object, o2: Object ): number`
+ `equals( o1: Object, o2: Object ): number`
+ `deepEquals( o1: Object, o2:Object ):boolean`
+ `typeof(o:Object):PrimitiveType`

#### FunctionA

+ `class<T>(): Constructor<T>` : [see](https://github.com/devGnode/lib-utils-ts#constructort)

##### Number

+ `equals( value : number ) : boolean `
+ `compareTo( other : number ): number`
+ `isPrime( ): boolean`

Static : 

+ `of( value: Object) : number`
+ `compare( o1: number, o2: number ): number`

#### String

+ `quals( value :string  ) : boolean`
+ `equalsIgnoreCase( value : string ): boolean`
+ `contains( value: string ) : boolean`
+ `isEmpty( ) : boolean`
+ `regExp( regExp : RegExp, callback : FunctionA ) : string`
+ `repeatString( char : String, loop : number ) : string`
+ `format( ... args : any[] ) : string`
+ `exec( regExp : RegExp ) : String[]`
+ `explodeAsList( ) : ArrayList<string>`
+ `orDefault( value : string ): string`
+ `compareTo( other : string ): number`

Static : 

+ `compare(o1:String ,o2:String):number`

#### Date

+ `plusDays( days : number ) : Date`
+ `lessDays( days : number) : Date`
+ `plusYears( years : number ): Date`
+ `lessYears( years : number ) :Date `
+ `dateFormat( pattern : string ) : Date`
+ `elapsedTime( date : Date ) : number`

Static : 
+ `dateFormat( pattern : string ) : Date`
+ `compare(o1:Date ,o2:Date):number`

#### Array

+ `equals(o: Array<T>): boolean`

Static : 
+ `asList<T>( value: T[] ) : ArrayList<T>`
+ `newList( ... value: T[] ) : ArrayList<T>`
+ `list( ... value: T[] ) : ArrayList<T>`
+ `sum(  ) : number`

#### Boolean

+ `state( expectTrue : any, orElse : any ) : any`
+ `equals( value: boolean ) : boolean`
+ `compareTo(obj: boolean): number`

Static : 

+ `of( value: Object) : Boolean`
+ `compare(o1:boolean,o2:boolean):number`

# Interfaces

Importation : `import "lib-utils-ts/src/Interfaces"`

You will find all the interfaces in this file. All interfaces 
name are in lowerCase 

# Framework

## Constructor\<T\>

- Interface : `constructor<T>`

- Class : `public class Constructor extends Function implements constructor<T>`

As in javascript an object is also a function, these class depict a next future instanced object

- `getName( ):string` 
- `getType( ):string`  
- `getEntries( ): [any, string ][]`  
- `getKeys( ): string[]`  
- `cast( other: Object ):T`  
- `newInstance( ...args : Object[] ) :T`  
- `getResourcesAsStream( name: string): InputStreamReader` 

Fix :

- `< 1.3.1` class `MyObj` . getType &rarr; MyObj
- `>= 1.3.1` class `MyObj` . getType &rarr; Object

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

Another example :

 ````typescript 

 let str : Constructor<String> = new Constructor<String>(String);
 
 console.log( str.newInstance("hello").toUpperCase() )

 ````

## ClassLoader\<T\>

Old class was been FunctionA, it was been deprecated

- Interface : `classLoader<T>, Function`

- Class : `class ClassLoader<T> extends Constructor<T> implements classLoader<T>, Function`

constructor : 

- ( name: string, constructor: Function ) : FunctionA

Interface `functionA<T>` : 

- `setPrototype(proto: Function | Object): ClassLoader<T>`
- `setPrototype(proto: Function | Object): ClassLoader<T>`
- `instance(...argArray: Object[]): T`

Usage :

````typescript

interface MyInterfaces{
    getValue():string
}

let fc : ClassLoader<MyInterfaces> = new ClassLoader(function(s){      
    this.value= s||"success";
});

fc.setPrototype({
    getValue: function(){ return this.value; }
});

fc.instance("Hello world !").getValue();
fc.class<MyInterfaces>().newInstance().getValue();

````

- class\<T extends Object\>( ) : Constructor\<T\>

````typescript
Object.class().newInstance(); // Object

Number.class().newInstance(255); // Object

String.class<String>().newInstance("foo").equals("bar"); // with generic

(<MyObj>MyObj.class().newInstance()); // cast
````

## Class\<T\>

- Interface : `classInterface`

- Class : `class Class<T extends Object> implements classInterface<T>`


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

Class forname :

Package pattern `package.name.src.Class` replace all `/` or `\\` character by `.` dot character in your package path.
If your Class file contain several class, the package pattern will look like:  `packe.name.src.Class/pointer`

````typescript

import {Constructor} from "./Class"; 

interface IMyInter{
    value:string,
    getValue( ):string    
}

Class.forName<IMyInter>("src.package.Class").newInstance(12).getValue();

````

## Comparator\<T\>

- Interface : ` comparator<T>`

- Class : `class Comparator<T> implements comparator<T>`

Method :

- `compare(o1: T, o2: T ): number` : To override
- `reversed?( ) : Compartor<T>`
- `equals?(o:Object):boolean`
- `thenComparing?( comparator: comparator<T> ): comparator<T>`

````typescript
class Test extends Comparator<Developer> /** implements comparator<Developer>*/{

    public compare = (o1: Developer, o2: Developer): number =>{
        return o1.getAge().compareTo( o2.getAge() )
            //return o1.getAge() - o2.getAge();
            //return o1.getSalary().compareTo(o2.getSalary())
    }
}
````

static

- `nullsFirst<T>( comparator: comparator<T> ): Comparator<T>`
- `nullsLast<T>( comparator: comparator<T> ): Comparator<T>`
- `naturalOrder<T extends comparable<T>>( ): Comparator<T>`
- `comparing<T,U extends comparable<T>>( comparatorFn: comparatorFn<T,U> ): Comparator<T>`
- `comparingA<T,U extends comparable<T>>( comparatorFn: comparatorFn<T,U>, comparator: comparator<T> ): Comparator<T>`

## Comparators\<T\>

- Class : `static abstract class Comparators<T>`

Method static :

- `Reversed<T> implements comparator<T>` : Object to instanced
- `NaturalOrder<T> implements comparator<comparable<Object>>` : Instanced Object
- `NullComparators<T> implements comparator<T>` : Object to instanced

## Consumer\<T\>

- Interface : ` IConsumer<T>`

- Class : `Consumer<T> implements IConsumer<T>`
- Class : `IntConsumer implements IConsumer<number>`
- Class : `BiConsumer<T,P> implements biConsumer<T,P>`

Method to implemented for consumer:

- `accept:consumerFn<T>` type  of `consumerFn<T>` is a simple function `(value:T) => void`

````typescript
//
let consumer: Consumer<string> = Consumer.of(value=>console.log(value));
consumer.accept("Accepted");
//
let consumer1: Consumer<string> = new Consumer();
consumer1.accept = value=>console.log(value);
consumer1.accept("Accepted");
//
class Test implements IConsumer<string>{
    accept = value=>console.log(value);
}
new Test().accept("Accepted");
````

Method to implemented for biconsumer:

- `accept:biConsumerFn<T,P>`;

type `biConsumerFn<T,P>` is a function `(o:T,v:U) => void`

````typescript
let consumer: BiConsumer<string[],string> = BiConsumer.of((o:string[],value:string)=> o.push(value) ),
tab:string[] = [];

consumer.accept( tab,"Accepted");

let consumer1: BiConsumer<string[],string> = new BiConsumer();
consumer1.accept = (o:string[],value:string)=> o.push(value);
consumer1.accept(tab, "Accepted-1");

class Test implements  biConsumer<string[],string>{
    accept = (o:string[],value:string)=> o.push(value)
}
new Test().accept(tab, "Accepted-2");
````

## Enum

- Class : `abstract class Enum`

Static method :

- `valueOf<T>(value:string):T`
- `equals(o:Object):boolean`

Decorator : \@

- `args( ...args:Object[] ):any`

````typescript
class TestDevice extends Enum{

    @Enum.args("cellphone",200,300)
    static IOS:TestDevice;

    @Enum.args("desktop",1080,720)
    static WINDOW:TestDevice;

    private readonly device:string;
    private readonly width:number;
    private readonly height:number;

    private constructor(device:string, width: number, height:number) {
        super();
        this.device = device;
        this.width = width;
        this.height= height;
    }

    public getDevice():string{return this.device;}

    public getWidth():number{ return this.width; }

    public getHeight():number{ return this.height; }
}
/***
 *
 */
let window: TestDevice  = TestDevice.valueOf("WINDOW");
let ios: TestDevice     = TestDevice.valueOf("IOS");
````

## Define<T>

Method static :

Public static Collections

- `static sort<T extends comparable<T>>( list : List<T> ): void`
- `static sortA<T>( list : List<T>, comparator: comparator<T> ): void`
- `static swap<T>( list: List<T>,i : int, j: int ): void`
- `static shuffle<T>( list: List<T>, rand: Random ): void`
- `static replaceAll<T>( list: List<T>, oldVal : T, newVal: T ): void`
- `static reverseOrder<T extends comparable<T>>():Comparator<T>`


##### Usage

````typescript
import {comparable} from "lib-utils-ts/src/Interface"

class Test implements comparable<Test>{

    public n: number = 0;
    public str:string;

    constructor(n:number,value:string) {this.n = n; this.str=value;}

    public compareTo(o: Test): number {
        return this.n - o.n;
    }

}

let l: List<Test> = new ArrayList();
l.add(new Test(55,"aaa"));
l.add(new Test(5,"aa"));
l.add(new Test(1,"z"));
l.add(new Test(125,"zzzzzzzz"));
l.add(new Test(0,"def"));
l.add(new Test(56,"lkjhg"));
l.add(new Test(2,"lkmlpolo"));
l.add(new Test(255,"aztgrbcekielflflf"));
Collections.sort(l);
console.log(l.stream().toArray());

````

output 

````log
  Test { s: 0, str: 'def' },
  Test { s: 1, str: 'z' },
  Test { s: 5, str: 'aa' },
  Test { s: 55, str: 'aaa' },
  Test { s: 2, str: 'lkmlpolo' },
  Test { s: 56, str: 'lkjhg' },
  Test { s: 125, str: 'zzzzzzzz' },
  Test { s: 255, str: 'aztgrbcekielflflf' }
````

````typescript
import {comparable} from "lib-utils-ts/src/Interface"

class Test implements comparable<Test>{

    public n: number = 0;
    public str:string;

    constructor(n:number,value:string) {this.n = n; this.str=value;}

    public compareTo(o: Test): number {
        return this.str.compareTo( o.str );
    }

}

/* .... */

Collections.sort(l);
console.log(l.stream().toArray());

````

````log
  Test { s: 1, str: 'z' },
  Test { s: 5, str: 'aa' },
  Test { s: 55, str: 'aaa' },
  Test { s: 0, str: 'def' },
  Test { s: 56, str: 'lkjhg' },
  Test { s: 2, str: 'lkmlpolo' },
  Test { s: 125, str: 'zzzzzzzz' },
  Test { s: 255, str: 'aztgrbcekielflflf' }
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

### Collections

- `static sort<T extends comparable<T>>( list : List<T> ): void`
- `static sortA<T>( list : List<T>, comparator: comparator<T> ): void`
- `static swap<T>( list: List<T>,i : int, j: int ): void`
- `static shuffle<T>( list: List<T>, rand: Random ): void`
- `static replaceAll<T>( list: List<T>, oldVal : T, newVal: T ): void`

### Interface Iterable\<E\>

`iterator( ): Iterator<T>`

## Interface Collections\<E\>

public interface Collections\<E\> extends Iterable\<E\>

- `add( value : E ) : boolean`
- `add(...value: E[]): boolean`
- `addAll( collection : Collections<E> ) : boolean`
- `clear( ) :void`
- `contains( o : object  ) : boolean`
- `containsAll( collection : Collections<E> ) : boolean`
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

public abstract class **AbstractCollection\<E\>** implements **Collections\<E\>**

## AbstractList\<E\>

public abstract class **AbstractList\<E\>** extends **AbstractCollection\<E\>** implements **List\<E\>**,**NativeExportable\<E\>**
  
## ArrayList\<E\>

public class **ArrayList\<E\>** extends **AbstractList\<E\>** implements **Cloneable\<E\>**,**List\<E\>**,**ArrayListInterfaceA\<E\>**

**Constructor**  
  
- `( value : array<E> ) : ArrayList<E>`  
  
**Methods**  
  
- `add(...value: E[]): void`  
- `addAll( collection : Collections<E> ): boolean`
- `clear( ) : void`  
- `contains(o: Object): boolean`
- `containsAll(collection: Collections<E>): boolean`
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

public interface Set\<E\> extends Collections\<E\>

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
- `valueCollection( ) : Collections<V>`
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
- `valueCollection(): Collections<V>`
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
- `sort( comparatorFn: comparator<T>):Stream<T>`
- `sorted( compareFn: (a: T, b: T) => number ) : Stream<T>`
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

- Old versions are deprecated
- 2.0.0-stable :
    + Fix : Linux/Unix importation, Windows build some files in lowercase ( Stream &rarr; stream ), Now every release will be packaged in a Docker alpine:3.12 from a Jenkins pipeline
    + Implement job jenkins  
- 2.1.0-stable :
- 3.0.0 :
    + Refactoring ArrayList :
        + AbstractCollection
        + AbstractArrayList 
        + ArrayList
    + Refactoring Native of the extensions
    + Implements Arrays, Collections classes
    + Refactoring Optional