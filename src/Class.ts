import {classA, List, MapType} from "./Interface";
import {flombok} from "./flombok";
import {HashMap} from "./List";
import {FileReader, InputStreamReader} from "./file/IOStream";
import "./globalUtils";
import {Constructor} from "./Constructor";
import {ClassNotFoundException, NullPointerException} from "./Exception";
import {Define} from "./Define";
import {Path} from "./file/Path";
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
     * so here there is one difference with real Java. getName give back package
     * name & getSimpleName give back name of class, i dont't have want to change that,
     * and make an hot fix
     */
    public getName():string{ return this.value.constructor.name; }
    /***
     * @getEntries : get Array of Object (this)
     */
    public getEntries( ): [any, string ][]{return Object.entries(this.value);}
    /***
     * @getType
     */
    public getType( ):string {return Object.typeof(this.value).toLowerCase();}
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
     * @ClassNotFoundException when constructor is null
     * @NullPointerException if value target is null
     */
    public newInstance( ...args : Object[] ):T{
        let tmp: any = Object.create(Object.requireNotNull(this.value));
        tmp.constructor = this.value.constructor;
        if(Object.isNull(tmp.constructor)) throw new ClassNotFoundException('Class constructor not found !')
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
     *  Linux :
     *      /absolute.foo.bar
     *      relative.foo.bar
     * WINDOWS:
     *      c:\\relative.foo.bar
     *      relative.foo.bar
     * Path :
     *      - toForName : C:\\relative\\foo\\bar -> C:.relative.foo.bar
     *                    /relative/foo/bar -> .relative.foo.bar
     *
     *  Specifique Object :
     *      path/outputObject
     *
     * Throwable :
     *  NullPointerException : if pattern is null or object wished was not been found
     *  ClassNotFoundException : require return an exception not found module
     */
    public static forName<T extends Object>( pattern: string|Path, typeScript : boolean = true, isPackage = false ): Constructor<T>{
        let p:string, getter:string, classPath:string,
            element:List<string>,
            dir:string=`${process.cwd()}/`,tmp :List<string>;

        Object.requireNotNull(pattern,"package name is null !");
        if(pattern instanceof Path)classPath = pattern.toForNamePath();
        else{
            classPath=pattern;
        }

        console.log("Element ",String(classPath))
        element = String(classPath).explodeAsList(/\./);
        p=classPath;

        console.log("Element ",element)
        if(classPath.startsWith("/")||/^[A-Z]{1}\:/.test(classPath)) dir=""; // absolute path
        if( (tmp = element.get(element.size()-1).explodeAsList(/\//)).size().equals(1) ) getter = tmp.get(0);
        else{
            // package.src.Class/node
            getter = tmp.get(1);
            element.set(element.size()-1,element.get(element.size()-1).replace(new RegExp(`\/${getter}`),""));
        }
        classPath = element.toArray().join('/');
        console.log(classPath,"****** ",isPackage?classPath:`${dir}${classPath}.${typeScript?'ts':'js'}`)
        //try{
            let callback = require(isPackage?classPath:`${dir}${classPath}.${typeScript?'ts':'js'}`);
            console.log( "callllllback ", callback)
            return new Constructor<T>(Define.of<any>(callback[getter]).orElseThrow(new NullPointerException(`Element not found ${getter} is Null from [${p}] !`)));
       /* }catch (e) {
            throw new ClassNotFoundException(`'${getter}' : class not found from package [${p}]`);
        }*/
    }
    /***
     *
     */
    public getStaticEntries(): string[] {
        let out:string[]=[];
        for(let entry in this.value)out.push(String(entry));
        return out;
    }
}