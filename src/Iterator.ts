import {array, IteratorInterface, listIteratorInterface} from "./Interface";
import {NoSuchElementException} from "./Exception";
/***
 * @Iterator
 */
export class Iterator<E> implements IteratorInterface<E>{

    protected iteration : number = 0;
    protected list : array<E>    = [];

    constructor( value : array<E> ) {this.list = value;}

    protected get( key : number ) : E{
        if(this.list[key]===undefined) throw new NoSuchElementException(`elements [ ${key} ] is not defined`);
        return this.list[key];
    }

    public hasNext(): boolean {
        return this.iteration+1<=this.list.length;
    }

    public next(): E {
        let key : number = this.iteration;
        this.iteration++;
        return this.get(key);
    }
}

/***
 * @ListIterator
 */
export class ListIterator<E> extends Iterator<E> implements listIteratorInterface<E>{

    constructor( listIterate : array<E>) {
        super(listIterate);
    }

    public add(e: E) : void{
        this.list[this.iteration++] = e;
    };

    public hasPrevious() : boolean{
        try{
            this.get(this.iteration-1);
            return true;
        }catch (e) {
            return false;
        }
    }

    public nextIndex() : number {
        try{
            this.get(this.iteration);
            return this.iteration;
        }catch (e) {
            return null;
        }
    };

    public previous() :E{
        this.iteration--;
        return this.get(this.iteration);
    }

    set (e: E) : void{
        this.list[this.iteration-1]= e;
    }
}