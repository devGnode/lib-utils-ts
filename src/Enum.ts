import {ClassNotFoundException} from "./Exception";
/***
 * @AbstractClassEnum
 *
 */
export abstract class Enum{
    /***
     *  @Enum<T> : create a new object
     */
    public static Enum<T>(...args:Object[]):T{
        return <T>this.class<T>().newInstance.apply(this.class<T>(),arguments);
    }
    /***
     * @valueOf
     * @throws ClassNotFoundException
     */
    public static valueOf<T>(value:string):T{
        if( this.class().getStaticEntries().indexOf(value.toUpperCase()).equals( -1) )
            throw new ClassNotFoundException(`ValueOf : Enum Unknown '${value}' definition`);
        return <T>Object.create(this[value.toUpperCase()]);
    }
    /***
     * @equals
     */
    public equals(o:Object):boolean{return Object.deepEquals(this,o);}
    /***
     * @decoration
     * @args ... args: Object[]
     */
    public static args( ...args:Object[] ):any{
        return (target: any, propertyKey: string) => {
            let descriptor: PropertyDescriptor;

           if (( descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {}) ) {
                descriptor.enumerable = true;
                descriptor.writable   = false;
                descriptor.value      = target.class().newInstance.apply(target.class(),args);
                Object.defineProperty(target, propertyKey, descriptor);
                return void 0;
            }
        };
    }
}

