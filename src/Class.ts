import {List, MapType, ObjectStructure} from "./Interface";
//import {FileReader, InputStreamReader} from "./file/IOStream";
import {Constructor} from "./Constructor";
import {ClassNotFoundException, NullPointerException} from "./Exception";
import {Define} from "./Define";
import {Path} from "./file/Path";
import {Objects} from "./type/Objects";
import {Enum} from "./Enum";
import {Method} from "./Reflect/Method";
import {Field} from "./Reflect/Field";
import {Optional} from "./Optional";
import {flombok} from "./flombok";
import {Annotation} from "./annotation/Annotation";
import {ClassLoader} from "./ClassLoader";
import {ObjectsReflector} from "./Reflect/ObjectsReflector";
import {InputStreamReader} from "./file/IOStream";
console.log("CLass - d ")

/***
 * @Class :  Hook class Object accessor: (new MyAnyClass()).getClass()
 *
 */
export class Class<T extends Object> implements ObjectStructure<T>{
    /**
     */
    @flombok.ENUMERABLE(false)
    private readonly value: T;
    /***/
    private readonly objectReflector:ObjectsReflector;
    /***
     * @param value
     */
    constructor(value: T ) {
        this.value = value;
        this.objectReflector = new ObjectsReflector(value.constructor.prototype, value.constructor, this);
    }
    /***
     */
    get name():string{ return this.value.constructor.name;}
    /***
     * @getName : return name of Class
     * so here there is one difference with real Java. getName give back package
     * name & getSimpleName give back name of class, i dont't have want to change that,
     * and make an hot fix
     */
    public getName():string{ return this.value.constructor.name.orDefault("Anonymous"); }
    /***
     *
     */
    public isAnonymousClass():boolean{ return Objects.isNull(this.value.constructor.name); }
    /***
     * @isEnum
     * @return Boolean
     * <pre>
     *     Return if this class is an Enum class
     * </pre>
     */
    public isEnum():boolean{ return this.value instanceof Enum; }
    /***
     * @isArray
     * @return Boolean
     * <pre>
     *     Return if this class is an Array class
     * </pre>
     */
    public isArray():boolean{ return this.value instanceof Array; }
    /***
     * @isAnnotation
     * @return Boolean
     * <pre>
     *     Return if this class is an Annotation class
     * </pre>
     */
    public isAnnotation():boolean{ return this.value instanceof Annotation; }
    /***
     * @isAnnotation
     * @return Boolean
     * <pre>
     *     Return if this class is a primitive type class
     * </pre>
     */
    public isPrimitive():boolean{ return this.value instanceof Number || this.value instanceof String || this.value instanceof Boolean;}
    /***
     * @getPackage
     * <pre>
     *     Return the package name of a class, but
     *     in order that apply this property to your
     *     object implement Package function in your
     *     class file, end of file define this
     *     instruction for package :
     *
     *      src.package(this);
     * </pre>
     */
    public getPackage():string{return this.getConstructor().getPackage();}
    /***
     * @param type
     * @params type
     * @returns Field[]
     */
    public getFields(type:number=(Field.INSTANCED|Field.STATIC)):Field[]{
        return new ObjectsReflector(this.value,this.value.constructor, this).getFields(type);
    }
    /***
     * @getField
     * @params name
     * @params type
     * @returns Field
     */
    public getField(name:string, type:number= Field.INSTANCED):Field{
        return new ObjectsReflector(this.value,this.value.constructor, this).getField(name,type);
    }
    /***
     * @getMethod
     * @params name Name of method
     * @params type Type of accessor
     * @returns Method
     */
    public getMethod(name:string, type:number = Method.INSTANCED):Method{
        return this.objectReflector.getMethod(name,type);
    }
    /***
     * @getMethods
     * @returns Method[]
     */
    public getMethods( ):Method[]{
        return this.objectReflector.getMethods();
    }
    /***
     * <pre>
     *     Return an Array of Enumeration of Enum class
     *     See how make an Enumeration
     * </pre>
     * @getEnumConstants
     * @return T[] : T equals to class Enum
     */
    public getEnumConstants():T[]{
        if(!this.isEnum()) return null;
        return this
            .getFields(Field.STATIC)
            .filter(field=>field.isEnumConstant())
            .map(field=><T>field.getValue());
    }
    /***
     * @getType
     */
    public getType( ):string {return Object.typeof(this.value).toLowerCase();}
    /***
     * @getInstance : returns the instance of T
     */
    public getInstance( ):T{return this.value;}
    /***
     * @notNull : return a new anonymous object without any null property value
     */
    /***@toFix*/
    public notNullProperties( ) : MapType<string, Object>{
        return null; /*HashMap.of<string,Object>(this.value)
            .stream()
            .filter(value=> value !== null && value !== undefined )
            .valueOfOptional()
            .get();*/
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
    public cast(other: Object): T {return <T>other;}
    /***
     * @param name
     */
    public getResourcesAsStream( name: string): InputStreamReader{return null; /*new FileReader(name)*/;}
    /***
     * @getConstructor
     * @return Constructor<T>
     * <pre>
     *     Get constructor class
     * </pre>
     */
    public getConstructor( ):Constructor<T>{return new Constructor<T>(this.value.constructor);}
    /***
     * @getClassLoader
     * @return ClassLoader<T>
     * <pre>
     *     Get constructor class
     * </pre>
     */
    public getClassLoader():ClassLoader<T>{ return new ClassLoader<T>(this.value.constructor); }
    /***
     *
     */
    public getStaticEntries(): string[] {
        let out:string[]=[];
        for(let entry in this.value)out.push(String(entry));
        return out;
    }
    /**
     * @param pattern : pattern
     * @param typeScript : is typescript file otherwise js
     * @param isPackage : is an package that come from to node_modules directory
     * <pre>
     *  Linux :
     *      L.absolute.foo.bar
     *      relative.foo.bar
     *  WINDOWS:
     *      C.absolute.foo.bar
     *      relative.foo.bar
     *  Path :
     *      - toForName : C:\\absolute\\foo\\bar -> C.absolute.foo.bar
     *                    /absolute/foo/bar -> L.absolute.foo.bar
     *
     *  Specifique Object :
     *      path/outputObject
     * </pre>
     * Throwable :
     *  @NullPointerException : if pattern is null or object wished was not found
     *  @ClassNotFoundException : require return an exception not found module
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

        console.log(  "Element ",String(classPath))
        element = String(classPath).explodeAsList(/\./);
        p=classPath;

        console.log("Element ",element);
        if(classPath.startsWith("/")||/^[A-Z]{1}/.test(classPath)) dir=""; // absolute path
        if( (tmp = element.get(element.size()-1).explodeAsList(/\//)).size().equals(1) ) getter = tmp.get(0);
        else{
            // package.src.Class/node
            getter = tmp.get(1);
            element.set(element.size()-1,element.get(element.size()-1).replace(new RegExp(`\/${getter}`),""));
        }
        classPath = element.toArray().join('/');
        if(/^[A-Z]{1}/.test(classPath)) classPath = classPath.replace(/^([A-Z]{1})/,"$1:")
        console.log(classPath,"****** ",isPackage?classPath:`${dir}${classPath}.${typeScript?'ts':'js'}`);
        try{
            let callback = require(isPackage?classPath:`${dir}${classPath}.${typeScript?'ts':'js'}`);
            console.log( "callllllback ", callback);
            return new Constructor<T>(Define.of<any>(callback[getter]).orElseThrow(new NullPointerException(`Element not found ${getter} is Null from [${p}] !`)));
        }catch (e) {
            throw new ClassNotFoundException(`No exportable '${getter}' class from package ${p}`);
        }
    }
}
Object.package(this);