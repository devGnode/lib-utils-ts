import {
    array,
    ArrayListInterface,
    LinkedListInterface,
    ListKey,
    objectLikeArray,
    streamLambda
} from "./Interface";
import {indexOfBoundException} from "./Exception";
import { Stream } from "./stream";
import {Iterator, ListIterator} from "./Iterator";

class AbstractArrayList<T> implements ArrayListInterface<T>{

    protected list : array<T> = null;

    constructor( list :  array<T> = null) {this.list = list;}

    public get( key : ListKey = 0 ) : T {
        if( this.list[key]===undefined ) throw new indexOfBoundException(`${key} not found`);
        return this.list[key];
    }

    public clear( ) : void { this.list = []; }

    public size( ) : number {return this.list?.length; }

    public isEmpty(): boolean {return this.size()===0;}

    public stream() : Stream<T> {return new Stream<T>(this.list);}

    public remove( from : number, to? : number  ) :void {
        if( to === undefined ) to = from;
        this.list = this.list
            .slice(0,Math.abs(from))
            .concat(this.list.slice( ( to<0? this.list.length-to:to )+1, this.list.length));
    }

    public iterator(): Iterator<T> {
        return new Iterator<T>(this.list);
    }

    public listIterator(index?: number): ListIterator<T> {
        return new ListIterator<T>(this.list);
    }

    public contains(o: Object): boolean {
        let itr : Iterator<T> = this.iterator();
        while( itr.hasNext() ) if( itr.next() === o ) return true;
        return false;
    }

    public indexOf( object : Object ) : number{
        let itr : ListIterator<T> = this.listIterator();
        while( itr.hasNext() )if( itr.next() === object )  return itr.nextIndex()-1;
        return null;
    }

    public clone( ) : ArrayList<T>{
        let out : List<T> = new ArrayList<T>(),
            itr : Iterator<T> = this.iterator();
        while(itr.hasNext())out.add(itr.next());
        return out;
    }

    public toArray(): array<T> {
        return this.list;
    }

    public set(key: number, value: T): T {
        this.get(key); // if not exists will be throw an exception
        this.list[key] = value;
        return value;
    }

    public static of<T>( list : array<T> ): List<T> {return new ArrayList<T>(list);}

    public toString() : string{
        let out : string = "",tmp : any;
        for( tmp in this.list ){
            let name;
            if(typeof this.list[tmp] == 'object') name = `Object@${this.list[tmp].constructor?this.list[tmp].constructor.name: typeof this.list[tmp]}`;
            out += `${tmp} = ${name}, `;
        }
        out = out.replace(/\,\s*$/,"");
        return `[ ${out} ]`;
    }

}

export class ArrayList<T> extends AbstractArrayList<T> {

    constructor(list?: array<T>) {
        super(list || new Array<T>());
    }

    // @ts-ignore
    public add(...value: T[]): void {
        let tmp : Iterator<T> = new Iterator<T>(value);
        while (tmp.hasNext()) this.list[this.list.length] = tmp.next();
    }

}
export type List<T> = ArrayList<T>;

/***
 * LinkedList
 */
export class LinkedList<V>  implements LinkedListInterface<V>{

    protected list : objectLikeArray<V>= {length:0};
    protected length  : number = 0;
    /***
     * Constructor
     */
    constructor() {this.list = {length:0};}

    public put( key : ListKey, value: V ): void {this.list[key] = value;}

    public delete( key : ListKey ) : void {delete this.list[key];}

    public count( ) : number {
        let count : number = 0;
        this.each(()=>{count++;});
        return count;
    }

    public each( callback : streamLambda<V>  ) : void {
        let tmp : any;
        try{
            for(tmp in this.list) if(!tmp.equals("length"))callback(this.list[tmp],tmp);
        }catch (e) {

        }
    }

    public clear() : void {this.list = {length:0};}

    public static of<V>( list : array<V> | {} ): LinkedList<V> {
        let out : LinkedList<V> = new LinkedList<V>();
        for( let tmp in  list )out.put(tmp,list[tmp]);
        return out;
    }

    get(key: string | number): V {return this.list[key];}
}

export class HashMap<V> extends LinkedList<V>{

    constructor() {super();}

    public static of<V>( list : array<V> | {} ): HashMap<V> {
        let out : HashMap<V> = new HashMap<V>();
        for( let tmp in  list )out.put(tmp,list[tmp]);
        return out;
    }

}