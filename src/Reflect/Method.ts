import {Class} from "../Class";
import {IllegalArgumentException} from "../Exception";
import {Objects} from "../type/Objects";
import {Type} from "./Type";
import {Constructor} from "../Constructor";
import {Annotation} from "../annotation/Annotation";
import {Optional} from "../utils/Optional";
import {Member} from "./Interfaces";
import {ObjectDescriptor} from "./ObjectDescriptor";
import {Field} from "./Field";
import {Parameter} from "./Parameter";
/***
 * @Method
 */
export class Method implements Member{
    /***
     * @LevelAccessor
     */
    public static readonly STATIC:number     = 0x01;
    public static readonly INSTANCED:number  = 0x02;
    /***
     *
     * @private
     */
    private readonly target:Function;
    private readonly name:string;
    private readonly clazz:Class<any>;
    private readonly construct:Constructor<any>;
    private readonly level:number;

    constructor(target:Function, name:string = null, level:number, clazz:Class<any> = null, construct:Constructor<any> = null) {
        this.target     = Objects.requireNotNull(target);
        this.name       = name||target.name||null;
        this.clazz      = clazz;
        this.construct  = construct;
        this.level      = level;
    }
    /***
     * @getName
     * @return string : name of method
     */
    public getName():string{ return Optional.ofNullable(this.name).orElse("Anonymous"); }
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
    public getDeclaringClass():Class<any>{return Optional.ofNullable(this.clazz).orElse(this.construct.getDeclaringClass());}

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
     *     Return field accessor, Static
     *     or instanced property.
     *  </pre>
     * @getModifiers
     * @return number : type of the target field
     */
    public getModifiers():number{ return this.level; }
    /**
     * @getParameterCount
     * @return number : return number of a function arguments
     */
    public getParameterCount():number{return this.target.length;}
    /***
     * <pre>
     *     This method return all annotations
     *     applied on this field.
     * </pre>
     * @getDeclaredAnnotations
     * @return Annotation[] : All annotation primitive array
     */
    public getDeclaredAnnotations():Annotation[]{
        if(!(<any>this.target)["@Annotations"]) return [];
        return Optional
            .ofNullable((<any>this.target)["@Annotations"])
            .orElse([]);
    }
    /***
     * @getAnnotation
     * @types T : extends Annotation
     * @param clazz :  Constructor<T> or Class<T>
     * @return Annotation
     */
    public getAnnotation<T extends Annotation>(clazz:Class<T>|Constructor<T>):T{
        let annotations:Annotation[];
        if((annotations = this
            .getDeclaredAnnotations()
            .filter(a=>a.getName().equals(clazz.getName())))
            .length>=1)
            // return annotation
            return <T>annotations[0];

        return null;
    }
    /***
     * @Throw NullPointeurException
     */
    public setAnnotation(annotation:Annotation):void{
        Objects.requireNotNull(annotation).setFieldName(this.getName());
        if(Objects.isNull( (<any>this.target)["@Annotations"] )) {
            new Field("@Annotations",[annotation], 1, null,this.target.class())
                .getFieldDescriptor()
                .value([annotation])
                .enumerable(false)
                .final()
                .set();
        }else{
            (<any>this.target)["@Annotations"].push(annotation);
        }
    }
    /***
     *  @getParameterAnnotations
     *  @return Annotation[][] : return array of Annotation Parameter
     */
    public getParameterAnnotations():Annotation[][]{
        let annotations:Annotation[][] = new Array(this.getParameterCount()).fill(null);

        this.getDeclaredAnnotations()
            .filter(a=>(a.getTarget()&0x20).equals(Annotation.PARAMETERS_ANNOTATION))
            .forEach(a=>{
                if(Optional.ofNullable(annotations[0/*a.getIndex()*/]).isEmpty()) annotations[0/*a.getIndex()*/] = [];
                annotations[0/*a.getIndex()*/].push( a );
            })

        return annotations;
    }
    /****
     * @Mock
    * @usurper method
    **/
    public getThrowType( ):Type[]{
        let throwElt:Type[] = [],
            tmp:RegExpExecArray,
            str:string = this.target.toString();

        while( ( tmp = (/throw\s*new\s*([^\(]+)[^;]+\;/).exec(str)  ) != null ){
            str = str.replace(tmp[0],"");
            if( throwElt.filter(v=>v.getName() === tmp[1]).length === 0 ) throwElt.push(new Type(tmp[1]));
        }
        return throwElt;
    }
    /***
     * notSupported
     * @getParameterType
     * @deprecated
     */
    getParameterType():void{}
    /**/
    public getParameter():Parameter[]{
        let tmp:RegExpExecArray, i:number = 0;

        if( (tmp = /^\t*\s*\w+\s*\(\s*([^)]+)\s*\)/.exec(this.target.toString())) ){
            return tmp[1]
                .split(",")
                .map(v=>new Parameter(this, v.trimStart().trimEnd(), i++));
        }
        return [];
    }
    /***
     * notSupported
     * @getReturnType
     * @deprecated
     */
    getReturnType():void{}
    /***/
    public getMethodDescriptor():ObjectDescriptor<Method,Function>{return ObjectDescriptor.ofMethod(this);}
    /***
     * <pre>
     *  call method, mode strict arguments
     * </pre>
     *
     * @param object :
     * @param args :
     * @throws  NullPointerException  IllegalArgumentException
     * @returns Object :
     */
    public invoke(object:Object, ...args:Object[]):Object{
        if(args.length!=this.getParameterCount()) throw new IllegalArgumentException(`${args.length} != ${this.getParameterCount()}`);
        return Objects.requireNotNull(this.target)
            .apply(object,args);
    }
    /****
     *
     * @param {Object} object
     * @param {Object} args
     * @return {Promise<Object>}
     */
    public async invokeASync(object:Object, ...args:Object[]):Promise<Object>{
        if(args.length!=this.getParameterCount()) throw new IllegalArgumentException(`${args.length} != ${this.getParameterCount()}`);
        return await Objects.requireNotNull(this.target)
            .apply(object,args);
    }
    /***
     * @toString
     * @return string : object to string value
     * @overrides
     */
    public toString():string{
        return `${this.level.equals(Method.INSTANCED)? this.getDeclaringClass().getName() :"static "+this.construct.getName()}`+
            `.${this.getName()}( ... )`;
    }
}
// package
Object.package(this);
