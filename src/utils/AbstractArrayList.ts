import {AbstractCollection} from "./AbstractCollection";
import {iterator, List, Stream} from "../Interface";
import {ListIterator} from "./Iterator";
import {Collections} from "../Collections";
import {Comparator} from "../Comparator";
import {Objects} from "../type/Objects";
/****
 * @v3.0.0
 * @AbstractArrayList
 */
export abstract class AbstractArrayList<T> extends AbstractCollection<T> implements List<T> {
    /***
     *
     */
    protected constructor() {super();}
    /***
     * @get : allows to get an element
     * @param index
     */
    public abstract get(index: number): T
    /***
     * @set
     * @param index
     * @param value
     */
    public abstract set(index: number, value: T): void
    /***
     * @subList : slice an array
     * @param from
     * @param to
     */
    public abstract subList(from: number, to: number): List<T>
    /***
     * @indexOf : return index of an element
     * @param o
     */
    public indexOf(o: Object): number {
        let itr: iterator<T> = this.iterator(),
            found:boolean = false, loop:number = 0;
        while (itr.hasNext()) {
            if (o.equals(itr.next())) {
                found = !found;
                break;
            }
            loop++;
        }
        return found ? loop : -1;
    }
    /***
     * @replaceAll : replace all element
     * @param oldValue
     * @param newValue
     */
    public replaceAll(oldValue: T, newValue: T): void {Collections.replaceAll(this, oldValue, newValue)}
    /***
     * @sort
     * @param comparator
     */
    public sort(comparator: Comparator<T>){
        Collections.sortComparator(this,!Objects.isNull(comparator) ?comparator: Comparator.naturalOrder());
    }
    /***
     *
     */
    public abstract listIterator(): ListIterator<T>
    /***
     *
     */
    public reverse(): void {Collections.reverse(this);}
    /***
     *
     */
    public abstract clone(): List<T>
    /**
     * @Mock
     */
    public stream(): Stream<T> {return super.stream(); }
}
Object.package(this);