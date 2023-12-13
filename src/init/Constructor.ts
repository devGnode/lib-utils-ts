import {ClassNotFoundException} from "../Exception";
/***
 * Temporary {@Constructor} class, this class allow
 * to make a first initialisation of {@Function.class}
 * method. @bug bad importation of StreamShape this
 * class build an Enum and this one call Object.class()
 * {@Function.class} it doesn't yet initialized
 *
 * @version 4.0-R-libUtilsTs
 * @version 1.0-R-JSTrip
 */
export class Constructor {
    /**/
    private readonly value:Function;
    /***/
    private constructor(value:Function) { this.value=value;}
    /***/
    public getName(){return this.value.constructor.name;}
    /***/
    public getEnumConstants():any[]{
        let out:string[]=[];
        for(let entry in this.value)out.push(String(entry));
        return out;
    }
    /***/
    public newInstance<T>(...args:any[]){
        let tmp:any = new class{};
        tmp.constructor = this.value;
        if(tmp.constructor===undefined)throw new ClassNotFoundException('Class constructor not found !');
        return <T>(new tmp.constructor(...args));
    }
    /**/
    public static clazz():Constructor{ return new Constructor(this);}
}