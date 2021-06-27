import "../src/globalUtils"
import {Comparator} from "../src/Comparator";
import {flombok} from "../src/flombok";
import getStringFunc = flombok.getStringFunc;
import setNumberFunc = flombok.setNumberFunc;
import getNumberFunc = flombok.getNumberFunc;

import {Collection} from "../src/Collection";
import {ArrayList} from "../src/List";
import {comparator, List} from "../src/Interface";
import {Iterator} from "../src/Iterator";

/***
 * https://www.geeksforgeeks.org/comparator-interface-java/
 * second example
 */
class Student{

    @flombok.SETTER<string>()
    @flombok.GETTER<string>()
    name:string;
    @flombok.SETTER<string>()
    @flombok.GETTER<string>()
    age:number

    constructor(a:string, b:number) {
        this.name   = a;
        this.age    = b;
    }

    public getName:getStringFunc;
    public setName:getStringFunc;
    public getAge:getNumberFunc;
    public setAge:setNumberFunc;

    public toString( ):string{
        return "Customer{ " + "Name= " + this.name + ", Age= " + this.age + ' }';
    }


    public static CustomerSortingComparator: any = class CustomerSortingComparator implements comparator<Student> {

        //@Override
        public compare(customer1:Student,customer2:Student):number {

            // for comparison
            let NameCompare:number = customer1.getName().compareTo(customer2.getName());
            let AgeCompare:number = customer1.getAge().compareTo(customer2.getAge());

            // 2-level comparison
            return (NameCompare == 0) ? AgeCompare: NameCompare;
        }
    }

    public static main( args: String[]):void {

        let al: List<Student> = new ArrayList();

        let obj1:Student = new Student("Ajay", 27);
        let  obj2:Student = new Student("Sneha", 23);
        let  obj3:Student = new Student("Simran", 37);
        let  obj4:Student = new Student("Ajay", 22);
        let  obj5:Student = new Student("Ajay", 29);
        let  obj6:Student = new Student("Sneha", 22);

        // add customer objects to ArrayList
        al.add(obj1);
        al.add(obj2);
        al.add(obj3);
        al.add(obj4);
        al.add(obj5);
        al.add(obj6);

        console.log("Before Sort");
        let custIterator:Iterator<Student> = al.iterator();
        while (custIterator.hasNext()) {
            console.log(custIterator.next().toString());
        }
        // sorting using Collections.sort(al, comparator);
        Collection.sortA(al, new Student.CustomerSortingComparator());


        console.log("After Sort");
        al.stream().each(value=>console.log(value.toString()));

    }
}


Student.main([]);
/***
 *
 Before Sort
 Student { name: 'Ajay', age: 27 }
 Student { name: 'Sneha', age: 23 }
 Student { name: 'Simran', age: 37 }
 Student { name: 'Ajay', age: 22 }
 Student { name: 'Ajay', age: 29 }
 Student { name: 'Sneha', age: 22 }
 After Sort
 Student { name: 'Ajay', age: 22 } 0
 Student { name: 'Ajay', age: 27 } 1
 Student { name: 'Ajay', age: 29 } 2
 Student { name: 'Sneha', age: 22 } 3
 Student { name: 'Sneha', age: 23 } 4
 Student { name: 'Simran', age: 37 } 5

 */
