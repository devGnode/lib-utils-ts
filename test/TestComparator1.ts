import "../src/globalUtils"
import {Comparator} from "../src/Comparator";
import {flombok} from "../src/flombok";
import getStringFunc = flombok.getStringFunc;
import setNumberFunc = flombok.setNumberFunc;
import getNumberFunc = flombok.getNumberFunc;

import {Collections} from "../src/Collections";
import { List } from "../src/Interface";
import {ArrayList} from "../src/ArrayList";

/***
 * https://mkyong.com/java8/java-8-lambda-comparator-example/
 */
/*
let comp: Comparator<string> = new class extends Comparator<string>{
    public compare(o1: string, o2: string): number {
        return o1.compareTo(o2);
    }
}
*/
class Developer{

    @flombok.SETTER<string>()
    @flombok.GETTER<string>()
    name:string;
    @flombok.SETTER<string>()
    @flombok.GETTER<string>()
    salary:number;
    @flombok.SETTER<string>()
    @flombok.GETTER<string>()
    age:number

    constructor(a:string, b:number, c:number) {
        this.name   = a;
        this.salary = b;
        this.age    = c;
    }

    public getName:getStringFunc;
    public setName:getStringFunc;
    public getSalary:getNumberFunc;
    public setSalary:setNumberFunc;
    public getAge:getNumberFunc;
    public setAge:setNumberFunc;
}


class TestSorting {

    public static main( args: String[]):void {

        let listDevs: List<Developer> = TestSorting.getDevelopers();

        console.log("Before Sort");
        listDevs.stream().each(console.log);

        //sort by age
        let cmp: Comparator<Developer> = new class extends Comparator<Developer>{
            // @override
            public compare = (o1: Developer, o2: Developer): number =>{
                return o1.getAge().compareTo(o2.getAge());
            }
        };
        //Collection.sortA(listDevs, cmp );
       // Collection.sortA(listDevs, cmp.reversed() );

        console.log("After Sort");
        listDevs.stream().each(console.log);

    }

    private static getDevelopers():List<Developer> {
        let  result: List<Developer> = new ArrayList<Developer>();

        result.add(new Developer("mkyong", Number("70000"), 33));
        result.add(new Developer("alvin", Number("80000"), 20));
        result.add(new Developer("jason", Number("100000"), 10));
        result.add(new Developer("iris", Number("170000"), 55));

    return result;
    }

}

TestSorting.main([]);
/***
 *
 Before Sort
 Developer { name: 'mkyong', salary: 70000, age: 33 } 0
 Developer { name: 'alvin', salary: 80000, age: 20 } 1
 Developer { name: 'jason', salary: 100000, age: 10 } 2
 Developer { name: 'iris', salary: 170000, age: 55 } 3
 After Sort
 Developer { name: 'iris', salary: 170000, age: 55 } 0
 Developer { name: 'mkyong', salary: 70000, age: 33 } 1
 Developer { name: 'alvin', salary: 80000, age: 20 } 2
 Developer { name: 'jason', salary: 100000, age: 10 } 3
 */
