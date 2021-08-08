import {comparable, comparator, int, List} from "./Interface";
import {ArrayList} from "./List";
import {Random} from "./Random";
import {ListIterator} from "./Iterator";
import {Comparator} from "./Comparator";

/***
 *  I don't extends more this class, i think javascript already implemented much of
 *  static method, This is useless to re-write universe.
 */
export abstract class Collection {
    /***
     * @sort : Warning this method can become really greedy for the stack and memory.
     *
     * Sort method : array permutation. In this case i use stream->callback, i think
     * it's not the better way, may be use a basic while loop, because more the array
     * is overload and more there will be of callback function will be called and that
     * it not really good...hum
     *
     * to do : make perf test on this method
     * @param list
     */
    public static sort<T extends comparable<T>>( list : List<T> ): void{
        let tmp:any,l : List<T>;
        (l = ArrayList.of( list.stream().toArray() ))
        .stream().each((valueI,kI)=>{
            l.stream().each((valueJ,kJ)=> {
                if(valueI.compareTo(valueJ)<0) Collection.swap<T>(list, Number(kI), Number(kJ) );
            });
        });
    }
    /****
     *
     */
    public static sortA<T>( list : List<T>, comparator: comparator<T> ): void{
        let tmp:any,l : List<T>;
        (l = ArrayList.of( list.stream().toArray() ))
            .stream().each((valueI,kI)=>{
            l.stream().each((valueJ,kJ)=> {
                if(comparator.compare(valueI,valueJ)<0) Collection.swap<T>(list, Number(kI), Number(kJ) );
            });
        });
    }
    /****
     *
     */
    public static swap<T>( list: List<T>,i : int, j: int ): void{
        Object.requireNotNull(list,"list instance is null");
        let tmp: T = list.get(i);
        list.set(i,list.get(j));
        list.set(j,tmp);
    }
    /****
     *
     */
    public static shuffle<T>( list: List<T>, rand: Random = new Random() ): void{
        Object.requireNotNull(rand,"Random instance is null");
        let itr: ListIterator<T> = list.listIterator();
        while (itr.hasNext()){
            itr.next();
            Collection.swap<T>(list, itr.previousIndex(), rand.nextInt(list.size()));
        }
    }
    /****
     *
     */
    public static replaceAll<T>( list: List<T>, oldVal : T, newVal: T ): void{
        let itr: ListIterator<T> = list.listIterator();
        while (itr.hasNext())if(itr.next().equals(oldVal)) list.set(itr.previousIndex(),newVal);
    }
    /***
     *
     */
    public static reverse<T>(list:List<T> ):List<T> {
        let middle: number = Math.floor(list.size() / 2), size: number = list.size();
        for (let i: number = 0; i < middle; i++) Collection.swap(list, i, size - 1 - i);
        return list;
    }
    /****
     * @ReverseOrder : sub static class
     *
     */
    protected static ReverseOrder:comparator<comparable<Object>> = new class ReverseOrder implements comparator<comparable<Object>>{

        public compare(o1: comparable<Object>, o2: comparable<Object>): number {
            return o2.compareTo(o1);
        }

        public reversed(): comparator<comparable<Object>> {return Comparator.naturalOrder();}
    }
    /****
     * @reverseOrder sort by natural order a list.
     */
    public static reverseOrder<T extends comparable<T>>():Comparator<T>{
        return <Comparator<T>>Collection.ReverseOrder;
    }

}