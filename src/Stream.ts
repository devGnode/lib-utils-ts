import {ArrayList} from "./List";
import {Predication} from "./Predication";
import {
    array,
    ArrayStream,
    ascii,
    lambdaType, objectLikeArray,
    OptionalMapInterface,
    predication, StreamAble,
    streamLambda
} from "./Interface";
import {Optional} from "./Optional";
import {Iterator, ListIterator} from "./Iterator";

export class Stream<T> implements  ArrayStream<T>,OptionalMapInterface<T,Stream<T>>{

    private readonly list : array<T>= null;
    private findLimit : Number      = null;

    constructor( value : array<T> = null ) {
        this.list = value;
    }

    public each( callback : streamLambda<T> ): Stream<T> {
        let tmp : string|number, key : ascii;

        for( tmp in this.list ){
            key = isNaN(parseInt(tmp))?tmp:parseInt(tmp);
            let valor : T = this.list[tmp];
            if(typeof this.list[tmp]!=="function") callback(valor,key);
        }
        return this;
    }

   public mapTo<U>( callback : lambdaType<T,U> ): Stream<U> {
        let out : array<U> = [], i = 0;
        this.each((value,key)=>out[i++]=callback.call(this,value,key));
        out = out.length>0?out:null;
        return new Stream<U>(out);
   }

   public map( callback : streamLambda<T> ): Stream<T> {
      return this.mapTo<T>(callback);
   }

   public mapToInt( callback : streamLambda<T> ) : Stream<Number>{
       return this.mapTo<Number>(callback);
   }

   public filter( callback : predication<T> = (()=> void 0)): Stream<T> {
       let out : array<T> = [], i : number = 0;

        this.each((value,key)=>{
            let state : boolean, keyInt : number = 0;
            if( callback instanceof Predication ){
                state = callback.test(value);
            }else state = callback.call(null,value,key);

            if((state && this.findLimit===null)||(state&&(this.findLimit>0&&out.length<this.findLimit))){
                out[i++] = value;
            }

       });

        return new Stream<T>( out );
   }

    public limit( limit : Number = null ): Stream<T> {
        this.findLimit = limit;
        return this;
    }

    public findFirst( ) : Optional<T> {
        let out : T = this.list[0];
        return new Optional<T>(this.list[0]===undefined?null:out);
    }

    public findAny( ) : Optional<T> {
        let out : T = this.list[Math.floor(Math.random()*(this.list.length-1))];
        return new Optional<T>(out===undefined?out:null);
    }

    public allMatch( callback : predication<T> = (()=> void 0) ): boolean {
        return this.filter(callback).count()===this.count();
    }

    public anyMatch( callback : predication<T> = (()=> void 0) ): boolean {
        return this.filter(callback).count()>0;
    }

    public noneMatch( callback : predication<T> = (()=> void 0) ): boolean {
       return !this.anyMatch(callback);
    }

    public hasPeer(): boolean {
        return this.anyMatch(  <T>(value,key)=> value%2===0 );
    }

    public count(): number { return this.list?.length; }

    public sum( ) : Optional<Number> {
        let sum : Number = 0;
        this.mapToInt(v=>v).each(value=>sum= parseInt(String(value)));
        return new Optional<Number>(sum);
    }

    public min(): Optional<Number> {
        let min : number = Number.MIN_VALUE;
        this.mapToInt(v=>v).each(value=>{
            min = parseInt(String(value<min?value:min))
        });
        return new Optional<Number>(min);
    }

    public max() : Optional<Number> {
        let max : number = Number.MAX_VALUE;
        this.mapToInt(v=>v).each(value=>max = parseInt(String(value>max?value:max)));
        return new Optional<Number>(max);
    }

    sorted() : void {
        throw new Error("Method not implemented.");
    }

    public getList( ) : ArrayList<T> {return ArrayList.of<T>(this.list);}

    public toArray() : array<T> {return this.list;}

    public iterator(): Iterator<T> {return new Iterator<T>(this.list);}

    public  listIterator(): ListIterator<T> { return new ListIterator<T>(this.list); }

    public static of<T>( list : array<T> ): Stream<T>{return new Stream(list);}
}

export class ObjectStream<T> implements StreamAble<T,ObjectStream<T>>,OptionalMapInterface<T,ObjectStream<T>>{

    private readonly list : objectLikeArray<T> = null;
    private findLimit : Number      = null;

    constructor( value : objectLikeArray<T> = null ) {
        this.list = value;
    }

    map(callback: streamLambda<T>): ObjectStream<T> {
        throw new Error("Method not implemented.");
    }

    allMatch( callback: predication<T> = (()=> void 0) ): boolean {
        return false;
    }

    anyMatch(callback: predication<T> = (()=> void 0)): boolean {
        return false;
    }

    count(): number {
        return 0;
    }

    each(callback: streamLambda<T> ): ObjectStream<T> {
        return undefined;
    }

    filter(predicate: predication<T> = (()=> void 0) ): ObjectStream<T> {
        return undefined;
    }

    findAny(): Optional<T> {
        return undefined;
    }

    findFirst(): Optional<T> {
        return undefined;
    }

    limit(): Stream<T> {
        return undefined;
    }

    noneMatch(callback : predication<T> = (()=> void 0)): boolean {
        return false;
    }

}