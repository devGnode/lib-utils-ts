import {collection, comparable, comparator, IConsumer, int, iterator, List} from "./Interface";
import {Random} from "./utils/Random";
import {ListIterator} from "./utils/Iterator";
import {Comparator} from "./Comparator";
import {NullPointerException} from "./Exception";
import {Objects} from "./type/Objects";
/***
 * @Collections
 * @Abstract
 */
export abstract class Collections {
    /***
     *
     */
    public static addAll<T>(list:collection<T>, obj:T[]):void{
        if(obj.length===0||Objects.isNull(list)||Objects.isNull(obj)) return;
        for(let i=0; i < obj.length; i++ )list.add(obj[i]);
    }
    /***
     * @sort
     * @param list
     */
    public static sort<T extends comparable<T>>( list : List<T> ): void{
        let i:number=0;
        list.spliterator().forEachRemaining(new class implements IConsumer<T>{
            accept = (value:T)=>{
                let itr:iterator<T> = list.iterator();
                let j:number=0;
                while(itr.hasNext()){
                    if(value.compareTo(itr.next())<0) Collections.swap(list,i,j);
                    j++;
                }
                i++;
            }
        });
    }
    /****
     *
     */
    public static sortComparator<T>( list : List<T>, comparator: comparator<T> ): void{
        let i:number=0;
        list.spliterator().forEachRemaining(new class implements IConsumer<T>{
            accept = (value:T)=>{
                let itr:iterator<T> = list.iterator();
                let j:number=0;
                while(itr.hasNext()){
                    if(comparator.compare(value,itr.next())<0) Collections.swap(list,i,j);
                    j++;
                }
                i++;
            }
        });
    }
    /****
     *
     */
    public static swap<T>( list: List<T>,i : int, j: int ): void{
        Objects.requireNotNull(list,"list instance is null");
       // console.log("SWAP - ", i , j)
        let tmp: T = list.get(i);
        list.set(i,list.get(j));
        list.set(j,tmp);
    }
    /****
     *
     */
    public static shuffle<T>( list: List<T>, rand: Random = new Random() ): void{
        Objects.requireNotNull(rand,"Random instance is null");
        let itr: ListIterator<T> = list.listIterator();
        while (itr.hasNext()){
            itr.next();
            Collections.swap<T>(list, itr.previousIndex(), rand.nextInt(list.size()));
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
     */
    public static reverse<T>(list:List<T> ):List<T> {
        let middle: number = Math.floor(list.size() / 2), size: number = list.size();
        for (let i: number = 0; i < middle; i++) Collections.swap(list, i, size - 1 - i);
        return list;
    }
    /****
     * @ReverseOrder : sub static class
     *
     */
    protected static ReverseOrder:comparator<comparable<Object>> = new class ReverseOrder implements comparator<comparable<Object>>{

        public compare(o1: comparable<Object>, o2: comparable<Object>): number {
            if(Objects.isNull(o1)&&Objects.isNull(o2)||Objects.isNull(o1)||Objects.isNull(o2)) return 0;
            if(Objects.isNull(o2.compareTo)) throw new NullPointerException(`${o2.getClass().getName()} class doesn't not implement comparable interface`);
            return o2.compareTo(o1);
        }

        public reversed?<T extends comparable<T>>(): comparator<comparable<Object>> {return <comparator<comparable<Object>>>Comparator.naturalOrder();}
    }
    /****
     * @reverseOrder sort by natural order a list.
     */
    public static reverseOrder<T extends comparable<T>>():Comparator<T>{
        return <Comparator<T>>Collections.ReverseOrder;
    }

}
Object.package(this);