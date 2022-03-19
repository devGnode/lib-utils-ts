import {Class} from "../Class";
import {Optional} from "../Optional";
import {Annotation} from "../annotation/Annotation";
import {Objects} from "../type/Objects";
import {Member} from "./Interfaces";
/***
 * @class Field
 * @implements Member
 */
export class Field implements Member{

    public static readonly STATIC:number     = 0x01;
    public static readonly INSTANCED:number  = 0x02;
    /***
     * @field value
     * @types Object
     */
    private value:Object;
    /***
     * @field target
     * @types string
     */
    private readonly target:string;
    /***
     * @field clazz
     * @types Class<any>
     */
    private readonly clazz:Class<any>;
    /***
     * @field level
     * @types number
     */
    private readonly level:number;

    /***
     * @constructor constructor handler
     * @param target Name of field
     * @param value Field value
     * @param level Field level
     * @param clazz Class of target field
     */
    constructor(target:string, value:Object, level:number, clazz:Class<any> = null ) {
        this.value  = value;
        this.target = target;
        this.clazz  = clazz;
        this.level  = level;
    }
    /***
     * <pre>
     *     Return field accessor, Static
     *     or instanced property.
     *  </pre>
     * @getModifiers
     * @return number : type of the target field
     */
    public getModifiers():number{ return this.level; }
    /***
     * @getName
     * @return string : name of field
     */
    public getName():string{return this.target;}
    /***
     * <pre>
     *     Return Class of this Field, but
     *     if this field has been instanced
     *     from Constructor<T> then clazz field
     *     should be equals to null
     * </pre>
     * @getDeclaringClass
     * @return Class<any> : Target Class
     */
    public  getDeclaringClass(): Class<any> {return this.clazz;}
    /***
     * <pre>
     *     This method return all annotations
     *     applied on this field.
     * </pre>
     * @getDeclaredAnnotations
     * @return Annotation[] : All annotation primitive array
     */
    public getDeclaredAnnotations():Annotation[]{
        if(Objects.isNull(this.clazz.getInstance())) return [];
        return Optional
            .ofNullable(this.clazz.getInstance().constructor["@Annotations"])
            .orElse([]);
    }
    /***
     * <pre>
     *     Return Class type of the field value,
     *     if this one is defined otherwise return
     *     null by default.
     * </pre>
     * @getType
     * @return Class<any> .
     */
    public getType():Class<any>{return Objects.isNull(this.value) ? null : this.value.getClass();}
    /***
     * <pre>
     *     Return the field value. Need to cast value.
     * </pre>
     * @getValue
     * @returns {Object}
     */
    public getValue():Object{ return this.value; }
    /***
     * @setValue
     * @params object : value of the field
     * @return void : void
     */
    public setValue(object:Object):void{ this.value = object; }
    /***
     * @isEnumConstant
     *
     * @Throws NullPointerException
     * @returns boolean : boolean
     */
    public isEnumConstant():boolean{ return Objects.requireNotNull(this.clazz,"Class is null").isEnum(); }
    /***
     * @toString
     * @return string : string
     * @override
     */
    public toString():string{
        return `${this.level.equals(Field.INSTANCED)?"":"static "}`+
        `${this.clazz.getName()}.${this.target} : ${this.getType().getName()} = ${this.value};`;
    }
}
// package
Object.package(this);