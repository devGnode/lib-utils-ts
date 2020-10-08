<img src="https://img.shields.io/npm/v/lib-utils-ts"/> <img src="https://img.shields.io/snyk/vulnerabilities/npm/lib-utils-ts"/> <img src="https://img.shields.io/npm/l/lib-utils-ts"/> <img src="https://img.shields.io/github/languages/top/devGnode/lib-utils-ts"/> <img src="https://img.shields.io/node/v/lib-utils-ts"/> <img src="https://ci.appveyor.com/api/projects/status/github/devGnode/lib-utils-ts?svg=true&branch=develop"/>

# Utils-ts
  
This framework has been created only for Typescript projects, it's possible to use it for javascript project but is not really adapted for this, cause generics is not support by the native javascript.  
  
  
## Set up  
  
`npm i lib-utils-ts`  
  
# Native Extension  
  
# Native Extension  
  
These objects `Number`, `Str+ing`, `Date` have been extended. Below their prototype :

##### Number
+ **equals**( value : number ) : boolean 

#### String
+ **equals**( value :string  ) : boolean
+ **equalsIgnoreCase**( value : string ): boolean
+ **contains**( value: string ) : boolean
+ **isEmpty**( ) : boolean
+ **regExp**( regExp : RegExp, callback : Function ) : string
+ **repeatString**( char : String\[0\], loop : number ) : string
+ **format***( message : string, ... args : any\[\] ) : string
+ **exec**( regExp : RegExp ) : String\[\]
+ **explodeAsList**( ) : ArrayList\<string\>

#### Date
+ **plusDays**( days : number ) : Date
+ **lessDays**( days : number) : Date
+ **plusYears**( years : number ): Date
+ **lessYears**( years : number ) :Date 
+ **dateFormat**( pattern : string ) : Date

Static : 
+ **dateFormat**( pattern : string ) : Date
  
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
  
- `( value : T ) : Optional<T>`  
  
**Methods**  
  
- `get( ) : T`  
- `equals( obj : Object ) : boolean`  
- `isEmpty( ) : boolean`  
- `isPresent( ) : boolean`  
- `orElse( other : T ) : T`  
- `orElseThrow( other : T ) : T`  
- `filter( predicate : predication<T>) : Optional<T>`  
- `map( callback : lambaStream<T>  ) : Optional<T>`  
- `mapTo( callback : lambdaType<T,U> ) : Optional<U>`  
  
**Static** :  
  
- `of<T>( value : T )  : Optional<T>`  
 - NullPointerException  
- `ofNullable<T>( value : T )  : Optional<T>`  
  
````typescript  
  
let returned : boolean = Optional.ofNullable(null).isEmpty();  
console.log("returned value => ", returned );  
  
let value : String = Optional.ofNullable(null).orElse("default value");  
console.log("value equals to =>", value);  
  
 Optional.ofNullable(null).orElseThrow(new Error("Failed error")); // throw  
````

  
## Predicatation\<T\>  
  
 - **type** predicateFn\<T\>  
 - **type** predication\<T\>  
 
  ````typescript  
export type predicateFn<T> = ( value : T, key? : ascii )=> Boolean;  
export type predication<T> = predicateFn<T> | Predication<T> | PredicationConstructor<T>  
````  
  
````typescript  
let pfn : predicateFn<String> = value=> value.equals("azertyuiop");  
Optional.of("azertyuiop").map(pfn);  
````  
  
````typescript  
let p : PredicationConstructor<String> = value => value.equals("azertyuiop");  
````  
  
## List 
  
## ArrayList\<T\>

**Constructor**  
  
- `( value : Array<T> ) : ArrayList<T>`  
  
**Methods**  
  
- `add(...value: T[]): void`  
- `get( key : number ) : T`  
    + indexOfBoundException
- `clear( ) : void`  
- `size( ) : number`  
- `isEmpty( ) : boolean`  
- `stream( ) :  Stream<T>`  
- `remove( ) : void`  
- `iterator(): Iterator<T>`  
- `listIterator( index number): ListIterator<T>`  
- `indexOf( object : Object ) : number`  
- `clone( ) : ArrayList<T>`  
- `toArray(): array<T>`  
- `set(key: number, value: T): T`  
- `of<T>( list : array<T> ): List<T>`


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

## LinkedList\<V\> & HashMap\<V\> 

**Constructor**  
  
- `(  ) : LinkedList<V>`  or ` HashMap\<V\>` 
  
**Methods**  
  
- `put( key : ListKey, value: V ): void`  
- `delete( key : ListKey ) : void `  
- `count( ) : number`
- `each( callback : streamLambda<V>  ) : void`  
- `count( ) : number`
- `clear() : void `
- `static of<V>( list : {} ):`
- `get(key: string | number): V`

## Stream\<T\>
   
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