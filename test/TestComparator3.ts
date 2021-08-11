import "../src/globalUtils"
import {Comparator} from "../src/Comparator";
import {flombok} from "../src/flombok";
import setNumberFunc = flombok.setNumberFunc;
import getNumberFunc = flombok.getNumberFunc;

import { Collections} from "../src/Collections";
import { List} from "../src/Interface";
import {Iterator} from "../src/Iterator";
import accessorGetFunc = flombok.accessorGetFunc;
import accessorSetFunc = flombok.accessorSetFunc;
import {Comparators} from "../src/Comparators";
import {ArrayList} from "../src/ArrayList";

/***
 * https://www.geeksforgeeks.org/comparator-interface-java/
 * second example
 */
class Student {

    @flombok.SETTER<string>()
    @flombok.GETTER<string>()
    date:Date;
    @flombok.SETTER<string>()
    @flombok.GETTER<string>()
    age:number

    constructor(a:Date, b:number) {
        this.date   = a;
        this.age    = b;
    }


    public getDate:accessorGetFunc<Date>;
    public setDate:accessorSetFunc<Date>;
    public getAge:getNumberFunc;
    public setAge:setNumberFunc;

    public static compareByDate(student:Student):Student{
        return student;
    }

    public compareTo(o1:Student){
        return this.getAge().compareTo(o1.getAge());
    }

    public static main( args: String[]):void {

        let al: List<Student> = new ArrayList();

        let obj1:Student = new Student(new Date().plusDays(365), 27);
        let  obj2:Student = new Student(new Date().plusDays(128), 23);
        let  obj3:Student = new Student(new Date().plusDays(64), 37);
        let  obj4:Student = new Student(new Date().plusDays(32), 22);
        let  obj5:Student = new Student(new Date().plusDays(8), 29);
        let  obj6:Student = new Student(new Date().plusDays(4), 21);

        // add customer objects to ArrayList
        al.add(obj1);
        al.add(obj2);
        al.add(obj3);
        al.add(obj4);
        al.add(obj5);
        al.add(obj6);

        console.log("Before Sort");
        let custIterator:Iterator<Student> = <Iterator<Student>>al.iterator();
        while (custIterator.hasNext()) {
            console.log(custIterator.next());
        }
         // sorting using Collections.sort(al, comparator);
       // Collections.sortComparator(al, Comparator.comparing(Student.prototype.getAge).reversed());
        //Collections.sortComparator(al, Comparator.comparing<Student,number>(Student.prototype.getAge).reversed());


        console.log("After Sort");
      //  al.stream().each(console.log);
        custIterator = <Iterator<Student>>al.iterator();
        while (custIterator.hasNext()) {
            console.log(custIterator.next());
        }

    }
}

Student.main([]);
/***
 *
 Before Sort
 Student { date: 2022-06-26T18:43:22.275Z, age: 27 }
 Student { date: 2021-11-01T18:43:22.276Z, age: 23 }
 Student { date: 2021-08-29T18:43:22.276Z, age: 37 }
 Student { date: 2021-07-28T18:43:22.276Z, age: 22 }
 Student { date: 2021-07-04T18:43:22.276Z, age: 29 }
 Student { date: 2021-06-30T18:43:22.276Z, age: 21 }
 After Sort
 Student { date: 2021-08-29T18:43:22.276Z, age: 37 } 0
 Student { date: 2021-07-04T18:43:22.276Z, age: 29 } 1
 Student { date: 2022-06-26T18:43:22.275Z, age: 27 } 2
 Student { date: 2021-11-01T18:43:22.276Z, age: 23 } 3
 Student { date: 2021-07-28T18:43:22.276Z, age: 22 } 4
 Student { date: 2021-06-30T18:43:22.276Z, age: 21 } 5


 */

console.log( Array.newList("1","1",null) );
console.log( Array.newList("1","1",null) , new Comparators.NullComparator( true, null ) );

let arr:List<string> = Array.newList("1","2",null,"1",null);

Collections.sortComparator(arr, Comparator.nullsLast(new class extends Comparator<string> {

    public compare = (o1: string, o2: string): number =>{
        return o1.compareTo( o2 );
    }
}))

console.log(arr);

let values:List<number> = Array.newList(212, null, 888, null, 435, 566, 133, 100, 55);

// naturalOrder is a static method
values.stream().sort(Comparator.nullsFirst(Comparator.naturalOrder()));

// print sorted number based on natural order
console.log(values);