import {classA, List, MapType} from "./Interface";
import {flombok} from "./flombok";
import {HashMap} from "./List";
import {FileReader, InputStreamReader} from "./file/IOStream";
import "./globalUtils";
import {Constructor} from "./Constructor";
/***
 * @Class :  Hook class Object accessor: (new MyAnyClass()).getClass()
 *
 */
export class Class<T extends Object> implements classA<T>{
    /**
     */
    @flombok.ENUMERABLE(false)
    private readonly value: T;
    /***
     * @param value
     */
    constructor(value: T ) {this.value = value;}
    /***
     * @getName : return name of Class
     */
    public getName():string{ return this.value.constructor.name; }
    /***
     * @getEntries : get Array of Object (this)
     */
    public getEntries( ): [any, string ][]{return Object.entries(this.value);}
    /***
     * @getType
     */
    public getType( ):string {return this.getName().toLowerCase();}
    /***
     * @getKeys
     */
    public getKeys( ): string[ ]{return Object.keys(this.value);}
    /***
     * @getInstance : give back instance of T
     */
    public getInstance( ):T{return this.value;}

    /***
     * @notNull : return a new anonymous object without any null property value
     */
    public notNullProperties( ) : MapType<string, Object>{
        return HashMap.of<string,Object>(this.newInstance())
            .stream()
            .filter(value=> value !== null && value !== undefined )
            .valueOfOptional()
            .get();
    }
    /***
     * @newInstance return new Instance
     */
    public newInstance( ...args : Object[] ):T{
        let tmp: any = Object.create(this.value);
        tmp.constructor = this.value.constructor;
       return <T>(new tmp.constructor( ... args));
    }
    /***
     * @cast
     * @param other
     */
    public cast(other: Object): T {return <T>Object.assign(this.newInstance(),other);}
    /***
     * @param name
     */
    public getResourcesAsStream( name: string): InputStreamReader{return new FileReader(name);}

    /**
     * @param value
     */
    public static forName<T extends Object>( value: string ): Constructor<T>{
        let element:List<string>=String(value)
            .explodeAsList(/\./);

            value = value
                .replace(`.${element.get(element.size()-1)}`,"")
                .replace(/\./gi,"/");
        console.log(`${process.cwd()}/${value}.ts`,element,element.get(element.size()-1));
        String(value).explodeAsList(/./)
        let callback = require(`${process.cwd()}/${value}.ts`)[element.get(element.size()-1)];
        console.log(callback,`${process.cwd()}/${value}.ts`)
        console.log("eee ",callback.name)
        return new Constructor<T>(callback);
    }
}