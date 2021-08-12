import "../src/globalUtils"
import {Comparator} from "../src/Comparator";
import {Collections} from "../src/Collections";
import {flombok} from "../src/flombok";
import getStringFunc = flombok.getStringFunc;
import getNumberFunc = flombok.getNumberFunc;
import setNumberFunc = flombok.setNumberFunc;
import setStringFunc = flombok.setStringFunc;
import {comparator} from "../src/Interface";
import {ArrayList} from "../src/ArrayList";
//https://howtodoinjava.com/java/sort/sort-on-multiple-fields/
class Employee{

    @flombok.SETTER<string>()
    @flombok.GETTER<string>()
    firstName:string;
    @flombok.SETTER<string>()
    @flombok.GETTER<string>()
    lastName:string;
    @flombok.SETTER<number>()
    @flombok.GETTER<number>()
    id:number

    constructor(id:number, firstName:string, lastName:string) {
        this.firstName  = firstName;
        this.lastName   = lastName;
        this.id         = id;
    }

    public getLastName:getStringFunc;
    public setLastName:setStringFunc;
    public getFirstName:getStringFunc;
    public setFirstName:setStringFunc;
    public getId:getNumberFunc;
    public setId:setNumberFunc;
}

class JavaSort {
    public static main( args:string[]):void {

    let employees:ArrayList<Employee> = this.getUnsortedEmployeeList();

    //Compare by first name and then last name
  //  let compareByName : comparator<Employee> = Comparator.comparing<Employee,string>(Employee.prototype.getFirstName)/*.thenComparing(Comparator.nullsFirst())*/.thenComparingFn(Employee.prototype.getLastName);

    //Collections.sortComparator(employees, compareByName);

    console.log(employees);
}

    private static getUnsortedEmployeeList():ArrayList<Employee>  {
        let list:ArrayList<Employee> = new ArrayList();

        list.add( new Employee(2, "Lokesh", "Gupta") );
        list.add( new Employee(1, "Alex", "Gussin") );
        list.add( new Employee(4, "Brian", "Sux") );
        list.add( new Employee(5, "Neon", "Piper") );
        list.add( new Employee(3, "David", "Beckham") );
        list.add( null );
        list.add( new Employee(6, "Brian", "Suxena") );
        return list;
    }
}
JavaSort.main([]);