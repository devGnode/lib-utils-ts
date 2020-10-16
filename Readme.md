<img src="https://img.shields.io/npm/v/lib-utils-ts"/> <img src="https://img.shields.io/snyk/vulnerabilities/npm/lib-utils-ts"/> <img src="https://img.shields.io/npm/l/lib-utils-ts"/> <img src="https://img.shields.io/github/languages/top/devGnode/lib-utils-ts"/> <img src="https://img.shields.io/node/v/lib-utils-ts"/> <img src="https://ci.appveyor.com/api/projects/status/github/devGnode/lib-utils-ts?svg=true&branch=develop"/>

# Utils-ts
  
This framework has been created only for Typescript projects, it's possible to use it for javascript project but is not really adapted for this, cause generics is not support by the native javascript.  
  
  
## Set up  
  
`npm i lib-utils-ts`  
  
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
+ **format***( ... args : any\[\] ) : string
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
