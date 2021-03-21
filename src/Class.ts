import {classA, List, MapType} from "./Interface";
import {flombok} from "./flombok";
import {HashMap} from "./List";
import {FileReader, InputStreamReader} from "./file/IOStream";
import "./globalUtils";
import {Constructor} from "./Constructor";
import {ClassNotFoundException, NullPointerException} from "./Exception";
import {Define} from "./Define";
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
     */
    get name():string{return this.value.constructor.name;}
    /***
     * @getName : return name of Class
     * so here there is one difference with real Java. getName give back package name & getSimpleName give back name of class,
     * i dont't have want to change that, and make an hot fix
     */
    public getName():string{ return this.value.constructor.name; }
    /***
     * @getEntries : get Array of Object (this)
     */
    public getEntries( ): [any, string ][]{return Object.entries(this.value);}
    /***
     * @getType
     */
    public getType( ):string {return (typeof this.value).toLowerCase();}
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
        return HashMap.of<string,Object>(this.value)
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

    public getConstructor( ):Constructor<T>{return new Constructor<T>(this.value.constructor);}
    /**
     * @param pattern : pattern
     * @param typeScript : is typescript file otherwise js
     * @param isPackage : is an package that come from to node_modules directory
     *
     * Throwable :
     *  NullPointerException : if pattern is null or object wished was not been found
     *  ClassNotFoundException : require return an exception not found module
     */
    public static forName<T extends Object>( pattern: string, typeScript : boolean = true, isPackage = false ): Constructor<T>{
        let p:string=pattern, getter:string, path:string,
            element:List<string> = String(pattern)
            .explodeAsList(/\./);

        let tmp :List<string>;
        Object.requireNotNull(pattern,"package name is null !");
        if( (tmp = element.get(element.size()-1).explodeAsList(/\//)).size().equals(1) ) getter = tmp.get(0);
        else{
            // package.src.Class/node
            getter = tmp.get(1);
            element.set(element.size()-1,element.get(element.size()-1).replace(new RegExp(`\/${getter}`),""));
        }
        pattern = element.toArray().join('/');
        try{
            let callback = require(isPackage?pattern:`${process.cwd()}/${pattern}.${typeScript?'ts':'js'}`);
            return new Constructor<T>(Define.of<any>(callback[getter]).orElseThrow(new NullPointerException(`Element not found ${getter} is Null from [${p}] !`)));
        }catch (e) {
            throw new ClassNotFoundException(`'${getter}' : class not found from package [${p}]`);
        }
    }
}