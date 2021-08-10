import "../src/globalUtils"
import {Comparator} from "../src/Comparator";
import {Collections} from "../src/Collections";
import {comparable, List} from "../src/Interface";

let arr:List<string> = Array.newList("6","2",null,"4",null,"3");

Collections.sortComparator(arr, Comparator.nullsLast(new class extends Comparator<string> {

    public compare = (o1: string, o2: string): number =>{
        return o1.compareTo( o2 );
    }
}));
console.log(arr);
Collections.sortComparator(arr, Comparator.nullsFirst(new class extends Comparator<string> {

    public compare = (o1: string, o2: string): number =>{
        return o1.compareTo( o2 );
    }
}));
console.log(arr);

Collections.sortComparator(arr,Comparator.nullsFirst(Comparator.naturalOrder()));

/***
 * https://www.geeksforgeeks.org/comparator-naturalorder-method-in-java-with-examples/
 * First
 */
// POJO
class User implements comparable<User> {
    public name:string;
    public age:number;

    constructor( name:string, age:number) {
        this.name = name;
        this.age = age;
    }

    public compareTo( u1:User ):number {
        return this.name.compareTo(u1.name);
    }

    public getName():string {return this.name;}

    public setName(name:string):void{this.name = name;}

    public getAge():number {return this.age;}

    public setAge( age:number ):void {this.age = age;}

    //@Override
    public toString():string{ return "User [name=" + this.name + ", age=" + this.age + "]"; }
}

// MAIN
class GFG {

    public static main(args: String[] ): void {

        // Create some user objects
        let u1:User = new User("Aaman", 25);
        let u2:User = new User("Joyita", 22);
        let u3:User = new User("Suvam", 28);
        let u4:User = new User("mahafuj", 25);

        console.log("One null Objects");
        let list:List<User> = Array.newList(u1, u2, u3, null, u4);

        Collections.sortComparator(list, Comparator.nullsFirst( Comparator.comparing(User.prototype.getName)));
        list.stream().each((user:User)=> console.log(user));

        console.log("\nMore than One null Objects");
        list = Array.newList(u1, u4, null, u2, u3, null, null);

        Collections.sortComparator(list, Comparator.nullsFirst( Comparator.comparing( User.prototype.getName )));
        list.stream().each((user:User)=> console.log(user));
    }
}


GFG.main([]);