import {MapType,ObjectStructure} from "./Interface";
import {Constructor} from "./Constructor";
import {ClassNotFoundException, NullPointerException, RuntimeException} from "./Exception";
import {Path} from "./file/Path";
import {Objects} from "./type/Objects";
import {Enum} from "./Enum";
import {Method} from "./Reflect/Method";
import {Field} from "./Reflect/Field";
import {flombok} from "./flombok";
import {Annotation} from "./annotation/Annotation";
import {ClassLoader} from "./ClassLoader";
import {ObjectsReflector} from "./Reflect/ObjectsReflector";
import {Paths} from "./file/Paths";
import {InputStreamReader} from "./file/InputStreamReader";
import {FileReader} from "./file/FileReader";
import {Package} from "./lang/Package";
import {Optional} from "./utils/Optional";
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
        this.objectReflector = new ObjectsReflector(
            value.constructor.prototype, // instanced Structure
            value.constructor,           // static structure
            this,                       // Class
            this.getConstructor()       // Constructor
        );
    }
    /***
     * @getName : return name of Class
     * so here there is one difference with real Java. getName give back package
     * name & getSimpleName give back name of class, i dont't have want to change that,
     * and make an hot fix
     */
    public getName():string{return this.value.constructor.name.orDefault("Anonymous");}
    /***/
    public getFullName():string{return this.getConstructor().getFullName();}
    /***
     *
     */
    public isNested():boolean{return this.getConstructor().isNested();}
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
    public isPrimitive():boolean{
        return this.value instanceof Number  ||
            this.value instanceof String ||
            this.value instanceof Boolean;
    }
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
    public getPackage():Package{return Package.getPackage(this);}
    /***
     * @param type
     * @params type
     * @returns Field[]
     */
    public getFields(type:number=(Field.INSTANCED|Field.STATIC), acceptNull:boolean = false):Field[]{
        return new ObjectsReflector(this.value,this.value.constructor, this, this.getConstructor()).getFields(type,acceptNull);
    }
    /***
     * @getField
     * @params name
     * @params type
     * @returns Field
     */
    public getField(name:string, type:number= Field.INSTANCED,  acceptNull:boolean = false):Field{
        return new ObjectsReflector(this.value,this.value.constructor, this, this.getConstructor()).getField(name,type,acceptNull);
    }
    /***
     * @getMethod
     * @params name Name of method
     * @params type Type of accessor
     * @returns Method
     */
    public getMethod(name:string, type:number = Method.INSTANCED):Method{return this.objectReflector.getMethod(name,type);}
    /***
     * @getMethods
     * @returns Method[]
     */
    public getMethods( ):Method[]{return this.objectReflector.getMethods();}
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
    public getType( ):string {return Objects.typeof(this.value).toLowerCase();}
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
        let tmp: any = Object.create(Objects.requireNotNull(this.value));
        tmp.constructor = this.value.constructor;
        if(Objects.isNull(tmp.constructor)) throw new ClassNotFoundException('Class constructor not found !')
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
    public getResourcesAsStream( name: string ): InputStreamReader{

        if(!Paths.get(name).isAbsolute())name = Paths.projectResources()[0].resolve(Paths.get(name)).toString();
        return new FileReader(name);
    }
    /***
     * <pre>
     *     Get constructor class
     * </pre>
     *
     * @getConstructor
     * @return Constructor<T>
     */
    public getConstructor( ):Constructor<T>{return new Constructor<T>(this.value.constructor);}
    /***
     * <pre>
     *     Get constructor class
     * </pre>
     *
     * @getClassLoader
     * @return ClassLoader<T>
     */
    public getClassLoader():ClassLoader<T>{ return new ClassLoader<T>(this.value.constructor); }
    /***
     * @toString
     * @return {String}
     */
    public toString():string{
        let out:string = "";
        if(!this.isPrimitive()){
            if(this.isAnnotation()) out+="@";
            out += (this.isEnum() ? "enum" : "class")+" ";
        }
        return out+this.getFullName();
    }
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
     *  Package format :
     *  for Linux
     *      L.absolute.foo.bar
     *      relative.foo.bar
     *
     *  for WINDOWS
     *      C.absolute.foo.bar
     *      relative.foo.bar
     *
     *  for classpath
     *
     *  classpath:foo.bar.package.Clazz => $PROJECT_SRC.node_modules.foo.bar.package.Clazz
     *  make sure 'PROJECT_SRC' environment variable was been defined.
     *
     * </pre>
     * Throwable :
     *  @NullPointerException : if pattern is null or object wished was not found
     *  @ClassNotFoundException : require return an exception not found module
     */
    public static forName<T extends Object>( pattern: string|Path, typeScript : boolean = true ): Constructor<T>{
        let getter:string,target:Path, handler:Object;

        Objects.requireNotNull(pattern,"package name is null !");
        if(pattern instanceof Path ) target = pattern;
        else{

            if(/^classpath:/.test(pattern)) {
                pattern = Objects
                    .requireNotNull(Paths.projectModules())
                    .toForNamePath()
                    .concat(".",pattern.replace(/^classpath:/,""));
            }

            target = Path.ofPackageName(pattern, typeScript?"ts":"js");
        }
        // try to resolve class
        if(!target.isAbsolute()){
            let tmp:Path;

            if(Paths.projectSrc().resolve(target).toFile().isFile()){
                tmp = Paths.projectSrc().resolve(target);
            }
            if (!tmp&&Paths.projectModules().resolve(target).toFile().isFile()){
                tmp = Paths.projectModules().resolve(target);
            }
            if(!tmp)tmp = target.resolve();

            target = tmp;
        }
        // import
        try{handler = require(target.toString());}catch (e) {
            let ex:Error = new ClassNotFoundException(`No exportable class '${getter||target.getShortFileName()}' from package ${target.getParent().toForNamePath()}`);
            throw new RuntimeException("caused by "+e.stack+"\n"+ex.stack);
        }
        return new Constructor<T>(
            Optional.ofNullable((<any>handler)[getter||target.getShortFileName()])
            .orElseThrow(new NullPointerException(
                `No exportable '${getter||target.getShortFileName()}' class found in ${target.getParent().toForNamePath()} package.`
            ))
        );
    }
}
Object.package(this);