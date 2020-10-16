import {List, PredicateInterfaces, predication} from "./Interface";
import {ArrayList} from "./List";


export class Predication<T> implements PredicateInterfaces<T>{

    protected plist : List<predication<String>> = new ArrayList<predication<String>>();

    public and(Predicate ) : Predication<T>{
       throw new Error("no predicate implemented");
    }

    public or(Predicate ) : Predication<T>{
        throw new Error("no predicate implemented");
    }

    public test(value: T): boolean {
        return this.plist
            .stream()
            .mapTo<Boolean>((v)=>{

                if(v instanceof Predication) return v.test(String(value));
                else{
                    return v(String(value));
                }
            })
            .allMatch(value=>value===true);
    }

}