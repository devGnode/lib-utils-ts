import {IOException} from "./Exception";
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
     * @IOException
     */
    public static valueOf<T>(value:string):T{
        if( this.class().getStaticEntries().indexOf(value.toUpperCase()).equals( -1) )
            throw new IOException(`ValueOf : Enum Unknown '${value}' definition`);
        return <T>Object.create(this[value.toUpperCase()]);
    }
    /***
     *
     */
    public equals(o:Object):boolean{return Object.deepEquals(this,o);}
}

