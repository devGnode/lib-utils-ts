import {flombok} from "./flombok";
import {constructorFunction, constructor} from "./Interface";
import {FileReader, InputStreamReader} from "./file/IOStream";

export type newConstructor<E> = { new( ... args: Object[ ] ) :E }
export type newConstructorFunc<E> = { (... args: Object[ ] ): E }
export type newConstructorA<E> = newConstructor<E> & newConstructorFunc<E>

function ClassCast<T>( Class: newConstructor<T> ) : newConstructorA<T>{
    return new Proxy(Class,{
        apply : (target: newConstructor<T>, thisArg: any, argArray?: any): any => new (<any>target)(... argArray)
    }) as newConstructorA<T>;
}
/***
 * @Constructor : in Js an Object it's just a function with an object prototype
 */
export class Constructor<T extends Object> extends Function implements constructor<T> {
    /***
     */
    @flombok.ENUMERABLE(false)
    protected value: constructorFunction;
    /***
     * @param value
     */
    constructor( value : constructorFunction ) { super(); this.value = value;}
    /***
     */
    public getName():string{return this.value.name||this.value.prototype.constructor.name||null; }
    /***
     */
    public getType(): string {return this.getName();}
    /***
     */
    public newInstance(...args: Object[]): T {
        let tmp : any = Object.create(this.value.prototype);
        tmp.constructor = this.value;
        return <T>(new tmp.constructor(...args));
    }
    /***
     */
    public getResourcesAsStream( name: string): InputStreamReader{return new FileReader(name);}
    /***
     */
    public getEntries( ): [any, string][]{return Object.entries(this.value.prototype);}
    /***
     *
     */
    public getKeys( ): string[]{return Object.keys(this.value.prototype);}
}