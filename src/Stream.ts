import {ArrayList} from "./List";
import {Predication} from "./Predication";
import {
    array,
    ArrayStream,
    ascii, asyncStreamLambdaTo,
    lambdaType, MapType, objectStream,
    OptionalMapInterface,
    predication, StreamAble,
    streamLambda, streamLambdaK
} from "./Interface";
import {Optional} from "./Optional";
import {Iterator, ListIterator} from "./Iterator";
/***
 *
 */
export class Stream<T> implements  ArrayStream<T>,OptionalMapInterface<T,Stream<T>>{

    private readonly list : array<T>= null;
    private findLimit : Number      = null;

    constructor( value : array<T> = null ) {
        this.list = value;
    }
    /***
     *
     * @param callback
     */
    public each( callback : streamLambda<T> ): Stream<T> {
        let tmp : string|number, key : ascii;

        for( tmp in this.list ){
            key = isNaN(parseInt(tmp))?tmp:parseInt(tmp);
            let valor : T = this.list[tmp];
            if(typeof this.list[tmp]!=="function") callback(valor,key);
        }
        return this;
    }
    /**
     *
     * @param callback
     */
   public mapTo<U>( callback : lambdaType<T,U> ): Stream<U> {
        let out : array<U> = [], i = 0;
        this.each((value,key)=>out[i++]=callback.call(this,value,key));
        out = out.length>0?out:null;
        return new Stream<U>(out);
   }
    /**
     * @alpha
     * @test
     * @param callback
     */
    public async asyncMapTo<U>( callback : asyncStreamLambdaTo<T,U> ): Promise<Stream<U>> {
        let out : array<U> = [], i = 0;
        let itr : Iterator<T> =this.iterator();
        while( itr.hasNext() ){
            out[i]= await callback.call(this,itr.next(),i);
            i++;
        }
        return new Stream<U>(out.length>0?out:null);
    }
    /***
     *
     * @param callback
     */
   public map( callback : streamLambda<T> ): Stream<T> {return this.mapTo<T>(callback);}
    /**
     *
     * @param callback
     */
   public mapToInt( callback : streamLambda<T> ) : Stream<Number>{return this.mapTo<Number>(callback);}
    /***
     *
     * @param callback
     */
   public filter( callback : predication<T> ): Stream<T> {
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
    /***
     *
     * @param limit
     */
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

/***
*
*/
export abstract class AbstractObjectStream<K extends string|number,V> implements objectStream<K,V>{

    private readonly list : MapType<K,V> = null;
    private findLimit : Number      = null;

    protected constructor( value : MapType<K,V> ) {
        this.list = value;
    }

    public each(callback: streamLambdaK<V,K> ): objectStream<K, V> {
        let tmp : any,ret : any;
        try{for(tmp in this.list)if((ret = callback(this.list[tmp],tmp)))break;}catch (e) {
            console.warn(e)
        }
        return new ObjectStream(ret);
    }

    public filter(predicate: predication<V> = (()=> void 0) ): ObjectStream<K, V> {
        let out : MapType<K, V> = <any>{}, i : number = 0;

        this.each((value,key)=>{
            let state : boolean, keyInt : number = 0;
            if( predicate instanceof Predication ){
                state = predicate.test(value);
            }else state = predicate.call(null,value,key);

            if((state && this.findLimit===null)||(state&&(this.findLimit>0&&i<this.findLimit))){
                out[key] = value;
                i++;
            }

        });
        return new ObjectStream<K,V>( out );
    }

    public mapTo<U>(callback: streamLambdaK<U,K> ): StreamAble<K,U>{
        let out : any = {};
        this.each((value,key)=>out[key]=callback.call(this,value,key));
        out = out.length>0?out:null;
        return new ObjectStream<K,U>(out);
    }

    public map( callback: streamLambdaK<V,K> ) : StreamAble<K, V>{return this.mapTo<V>(callback);}

    public findAny(): Optional<V> {
        let out : V = null, i: number= 0,
            rand :number = Math.floor(Math.random()*(this.count()-1));
        this.each(value=>{ if(rand===i)return out=value; i++; });
        return new Optional<V>(out);
    }

    public findFirst(): Optional<V> {
        let out : V = null;
        this.each(value=>out=value);
        return new Optional<V>(out);
    }

    public limit( limit : number): ObjectStream<K, V> {
        this.findLimit = limit;
        return this;
    }

    public noneMatch(callback : predication<V> ): boolean {return !this.anyMatch(callback);}

    public allMatch( callback: predication<V> ): boolean {return this.filter(callback).count()===this.count();}

    public anyMatch(callback: predication<V> ): boolean {return this.filter(callback).count()>0;}

    public count(): number {
        let c:number=0;
        this.each(()=>{ c++ });
        return c;
    }
    /***
     *
     * @param list
     */
    public static of<K extends string|number,V>( list : MapType<K, V> ): ObjectStream<K,V> {return new ObjectStream<K, V>(list);}

    valueOfOptional(): Optional<MapType<K, V>> {
        return new Optional<MapType<K, V>>(this.list);
    }
}
/***
 *
 */
export class ObjectStream<K extends string|number,V> extends AbstractObjectStream<K,V>{
    constructor(value : MapType<K,V> ) {super(value);}
}