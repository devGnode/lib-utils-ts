import {IConsumer} from "../Interface";
import {Objects} from "../type/Objects";
/**
* @IConsumer: => accept
*/
export interface sink<T> extends IConsumer<T>{
    /***
     */
    begin(value:number):void
    /***
     */
    end():void
    /***
     */
    cancellationRequested():boolean
}
/**/
export interface ofInt extends sink<number>{}
/**/
abstract class ChainedReference<T, E_OUT> implements sink<T>{
    /***
     */
    protected  downstream:sink<E_OUT>

     constructor(downstream:sink<E_OUT>) {
        this.downstream = Objects.requireNotNull(downstream);
    }
    /***
     */
    public abstract accept(o: T): void
    /***
     */
    public begin(value: number): void {
        this.downstream.begin(value);
    }
    /***
     */
    public cancellationRequested(): boolean {
        return this.downstream.cancellationRequested();
    }
    /***
     */
    public end(): void {
        this.downstream.end();
    }
}
/***
 */
abstract class ChainedInt<E_OUT> extends ChainedReference<number, E_OUT> implements ofInt{ }
/**
 * @Sink
 * */
export abstract class Sink {
    /***
     */
    public static readonly ChainedReference = ChainedReference;
    /***
     */
    public static readonly ChainedInt       = ChainedInt;

}
Object.package(this);