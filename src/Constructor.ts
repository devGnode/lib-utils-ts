import {flombok} from "./flombok";
import {ObjectStructure} from "./Interface";
import {Class} from "./Class";
import {ClassNotFoundException} from "./Exception";
import {Objects} from "./type/Objects";
import {Define} from "./Define";
import {Enum} from "./Enum";
import {ClassLoader} from "./ClassLoader";
import {Method} from "./Reflect/Method";
import { Field } from "./Reflect/Field";
import {Annotation} from "./annotation/Annotation";
import {ObjectsReflector} from "./Reflect/ObjectsReflector";
import {Path} from "./file/Path";
import {Paths} from "./file/Paths";
import {InputStreamReader} from "./file/InputStreamReader";
import {FileReader} from "./file/FileReader";
import {Package} from "./lang/Package";
/***
 * @Constructor : in Js an Object it's just a function with an object prototype
 * @Interface   : constructor<T>
 */
export class Constructor<T extends Object> implements ObjectStructure<T> {
    /***
     */
    @flombok.ENUMERABLE(false)
    protected value: Function;
    /**/
    private objectReflector:ObjectsReflector;
    /***
     * @param value
     */
    constructor(value: Function) {
        this.value = value;
        this.objectReflector = new ObjectsReflector(value.prototype, value, null, this);
    }
    /***
     * This method return if target is an Annotation type
     * @isAnnotation
     * @returns boolean returns true if success otherwise false
     */
    public isAnnotation(): boolean {return Annotation.prototype.isPrototypeOf(this.value.prototype);}
    /***
     * This method returns if target is an anonymous class type
     * @isAnonymousClass
     * @returns boolean returns true if success otherwise false
     */
    public isAnonymousClass(): boolean {return this.getName().equals("Anonymous");}
    /***
     * This method return if target is an Enum class type
     * @isEnum
     * @returns boolean returns true if success otherwise false
     */
    public isEnum(): boolean {return Enum.prototype.isPrototypeOf(this.value.prototype); }
    /***
     * This method returns if target is an Array class type
     * @isArray
     * @returns boolean returns true if success otherwise false
     */
    public isArray(): boolean {return Array.prototype.isPrototypeOf(this.value.prototype);}
    /***
     * <pre>
     * This method returns if target is a Primitive class type
     *  Number type
     *  String type
     *  Boolean type
     *  Array type
     *  Function type
     *  </pre>
     * @isPrimitive
     * @returns boolean returns true if success otherwise false
     */
    public isPrimitive(): boolean {
        return  Number.prototype.isPrototypeOf(this.value.prototype) ||
                String.prototype.isPrototypeOf(this.value.prototype) ||
                Boolean.prototype.isPrototypeOf(this.value.prototype) ||
                // Function.prototype.isPrototypeOf(this.value.prototype) ||
                Array.prototype.isPrototypeOf(this.value.prototype);
    }

    /***
     * @isNestedClass
     */
    public isNested():boolean{ return Define.of(this.value["@Nested"]).orNull(false); }
    /***
     * This method returns name of package class
     * @getPackage
     * @returns string name of package
     */
    public getPackage(): Package { return Package.getPackage(this); }
    /***
     * <pre>
     *     Return an Array of Enumeration of Enum class
     *     See how make an Enumeration
     * </pre>
     * @getEnumConstants
     * @returns T[]
     */
    public getEnumConstants():T[]{
        if(!this.isEnum()) return null;
        return this
            .getFields(Field.STATIC)
            .filter(field=>field.getValue().getClass().isEnum())
            .map(field=><T>field.getValue());
    }
    /***
     * @getName
     * @return screen
     */
    public getName():string{  return this.value.name||this.value.prototype.constructor.name||"Anonymous"; }
    /***/
    public getFullName():string{
        let tmp:string;
        return ((tmp=this.getPackage().getName())!=null ? tmp : "" )+(this.isNested()?"$":tmp!=null?".":"")+this.getName();
    }
    /***
     * @getType
     * @returns string
     */
    public getType(): string {return (typeof this.value).toLowerCase();}
    /***
     * @getDeclaringClass
     * @returns Class<T>
     */
    public getDeclaringClass(): Class<T>{ return new Class<T>(this.value.prototype); }
    /***
     * @getClassLoader
     * @returns ClassLoader<T>
     */
    public getClassLoader():ClassLoader<T>{ return new ClassLoader<T>(this.value); }
    /***/
    public getInstance():Function{ return this.value; }
    /***
     * @newInstance return new Instance
     * @throw ClassNotFoundException
     * @returns T new instance of T
     */
    public newInstance(...args: Object[]): T {
       /* let tmp : any = Object.create(Objects.requireNotNull(this.value));
        tmp.constructor = this.value;*/
        let tmp:any = new class{};
        tmp.constructor = this.value;
        if(Objects.isNull(tmp.constructor)) throw new ClassNotFoundException('Class constructor not found !');
        return <T>(new tmp.constructor(...args));
    }
    /***
     * @getMethod
     * @param name
     * @param type
     * @returns Method
     */
    public getMethod(name:string, type:number = Method.INSTANCED ):Method{return this.objectReflector.getMethod(name,type);}
    /***
     * @getMethods
     * @returns Method[]
     */
    public getMethods( ):Method[]{return this.objectReflector.getMethods();}
    /***
     * @getFields
     * @params type
     * @returns Field[]
     */
    public getFields(type: number = (Field.INSTANCED|Field.STATIC)): Field[] {return this.objectReflector.getFields(type);}
    /***
     * @getField
     * @params name
     * @params type
     * @returns Field
     */
    public getField(name: string, type: number): Field {return this.objectReflector.getField(name,type);}
    /***
     * @getResourcesAsStream
     * @param name
     * @returns InputStreamReader
     */
    public getResourcesAsStream( name: string):InputStreamReader{

        if(!Paths.get(name).isAbsolute()){
            let paths:Path[] = Paths
                .projectResources()
                .filter(value=>value.resolve(Paths.get(name)).toFile().isFile());

            if( paths.length === 0 ) name = null;
            name = Paths.projectResources()[0].resolve(Paths.get(name)).toString();
        }
        return new FileReader(name);
    }
    /***/
    public toString():string {
        let out:string = "";
        if(!this.isPrimitive()){
            if(this.isAnnotation()) out+="@";
            out += (this.isEnum() ? "enum" : "class")+" ";
        }
        return out+this.getFullName();
    }
    /***
     * @deprecated
     */
    public getStaticEntries( ):string[]{
        let out:string[]=[];
        for(let entry in this.value)out.push(String(entry));
        return out;
    }
}
Object.package(this);