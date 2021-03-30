import {flombok} from "./flombok";
import {constructorFunction, constructor} from "./Interface";
import {FileReader, InputStreamReader} from "./file/IOStream";
import {Class} from "./Class";
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
    get name():string{return this.value.constructor.name;}
    /***
     */
    public getName():string{return this.value.name||this.value.prototype.constructor.name||null; }
    /***
     */
    public getType(): string {return (typeof this.value).toLowerCase();}
    /***
     */
    public getDeclaringClass(): Class<T>{ return new Class<T>(this.value.class<T>().newInstance()); }
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