import {Class} from "../Class";
import {Optional} from "../utils/Optional";
import {Objects} from "../type/Objects";
import {Member} from "./Interfaces";
import {Constructor} from "../Constructor";
import {ObjectDescriptor} from "./ObjectDescriptor";
import {Annotation} from "../annotation/Annotation";
import {Arrays} from "../type/Arrays";
import {IllegalArgumentException} from "../Exception";
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
     *
     */
    private readonly construct:Constructor<any>;
    /***
     * @constructor constructor handler
     * @param target Name of field
     * @param value Field value
     * @param level Field level
     * @param clazz Class of target field
     * @param construct
     */
    constructor(target:string, value:Object, level:number, clazz:Class<any> = null, construct:Constructor<any> = null ) {
        this.value      = value;
        this.target     = target;
        this.clazz      = clazz;
        this.construct  = construct;
        this.level      = level;
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
    public getDeclaringClass(): Class<any> {return Optional.ofNullable(this.clazz).orElse(this.construct.getDeclaringClass());}
    /***
     * <pre>
     *     return constructor class of the current field
     * </pre>
     * @getDeclaringConstructor
     * @return {Constructor}
     */
    public getDeclaringConstructor():Constructor<any>{ return this.construct; }
    /***
     * <pre>
     *     This method return all annotations
     *     applied on this field.
     * </pre>
     * @getDeclaredAnnotations
     * @return Annotation[] : All annotation primitive array
     */
    public getDeclaredAnnotations():Annotation[]{
        if(Objects.isNull(this.getDeclaringClass().getInstance())) return [];
        let tmp:Annotation[] = Arrays
            .stream<Annotation>(this.getDeclaringClass().getInstance().constructor["@Annotations"])
            .filter((a:Annotation)=>a.getFieldName().equals(this.getName()))
            .toArray()
        return Optional
            .ofNullable(tmp)
            .orElse([]);
    }
    /***
     * <pre>
     *     This method return all annotations
     *     applied on this field.
     * </pre>
     * @getDeclaredAnnotations
     * @return Annotation[] : All annotation primitive array
     */
    public getDeclaredAnnotation<T extends Annotation>(clazz:Class<T>|Constructor<T>):T[]{
        if(Objects.isNull(this.getDeclaringClass().getInstance())) return [];
        Objects.requireNotNull(clazz);
        let tmp:T[] = Arrays
            .stream<T>(this.getDeclaringClass().getInstance().constructor["@Annotations"])
            .filter((a:Annotation)=>a.getName().equals(clazz.getName())&&a.getFieldName().equals(this.getName()))
            .toArray()
        return Optional
            .ofNullable(tmp)
            .orElse([]);
    }
    /**
     *
     * @param {Annotation} annotation
     */
    public setAnnotation(annotation:Annotation):void{
        Objects.requireNotNull(annotation).setFieldName(this.getName());
        if(Objects.isNull( this.clazz.getInstance().constructor["@Annotations"] )) {
            new Field("@Annotations",[annotation], 1, null,this.clazz.getInstance().constructor.class())
                .getFieldDescriptor()
                .value([annotation])
                .enumerable(false)
                .final()
                .set();
        }else{
            this.clazz
                .getInstance()
                .constructor["@Annotations"]
                .push(annotation);
        }
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
     *
     */
    public getFieldDescriptor():ObjectDescriptor<Field,Object>{return ObjectDescriptor.ofAttribute(this);}
    /***
     * @setValue
     * @params object : value of the field
     * @return void : void
     */
    public setValue(object:Object):void{
        // check type
        if(this.clazz==null&& this.level == Field.INSTANCED) throw new IllegalArgumentException(`Clazz is null !`);
        if(this.getValue() != null && this.getType() != null && !this.getType().getName().equals(object.getClass().getName()))
            throw new IllegalArgumentException(`Bad cast on field ${this.toString()} to type ${object.getClass().toString()}`);
        // set current value
        this.value = this.getFieldDescriptor().value(object).set().getValue();
    }
    /***
     * @isEnumConstant
     *
     * @Throws NullPointerException
     * @returns boolean : boolean
     */
    public isEnumConstant():boolean{ return Objects.requireNotNull(this.getDeclaringClass(),"DeclaringClass is null").isEnum(); }
    /***
     * @toString
     * @return string : string
     * @override
     */
    public toString():string{
        let p:string = "Object", // default
            typePackage:string;

        if(this.getType()!=null){
            p = ((typePackage=this.getType().getPackage().getName())? typePackage+".":"")+this.getType().getName();
            p = p.replace( (this.level.equals(Field.INSTANCED)?this.getDeclaringClass():this.construct).getPackage().getName()+".", "");
        }
        return `${this.level.equals(Field.INSTANCED)? this.getDeclaringClass().getName() :"static "+this.construct.getName()}`+
        `.${this.target}: ${p}`;
    }
}
Object.package(this);