
# Utils-ts
  
This framework has been created only for Typescript projects, it possible to use it for javascript project but is not really adapte for this, cause generics is not support by the native javascript.  
  
  
## Set up  
  
`npm i `  
  
# Extended  
  
some text   
  
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
  
#### ListIterator\<E\>  
  
  
- List\<T\>  
- LinkedList\<T\>  
- HasMap\<T\>  
  
```typescript  
import {List,List,LinkedList,HashMap} from 'utils-ts';  
  
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
 readonly p : number; readonly q : number;}  
  
let personalList : List<Personal> = new List<Personal>();  
  
personalList.add(new Personal());  
  
```  
  
- Stream\<T\>  
  
```typescript  
  
let stream : Stream<String> = new Stream<String>();  
  
```  
  
## mix List & Stream  
  
```typescript  
  
import {List,List,Stream} from 'utils-ts';  
  
let list : List<String> = new List<String>();  
  
list.add("title");  
list.add("some text");  
list.add("some text");  
list.add("");  
  
list = list.stream()  
 .filter(value=>value.length>0) .map(value=>value.equals("some text")) .getList();

```