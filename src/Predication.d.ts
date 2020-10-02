import { PredicateInterfaces, predication } from "./Interface";
import { List } from "./List";
export declare class Predication<T> implements PredicateInterfaces<T> {
    protected plist: List<predication<String>>;
    and(Predicate: any): Predication<T>;
    or(Predicate: any): Predication<T>;
    test(value: T): boolean;
}
