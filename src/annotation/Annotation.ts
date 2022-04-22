import {Optional} from "../utils/Optional";
/**/
export abstract class Annotation{

    public static readonly STATIC_ANNOTATION:number           = 0x01;
    public static readonly INSTANCED_ANNOTATION:number        = 0x02;

    public static readonly CONSTRUCTOR_ANNOTATION:number      = 0x04;
    public static readonly ATTRIB_ANNOTATION:number           = 0x08;
    public static readonly METHOD_ANNOTATION:number           = 0x10;
    public static readonly PARAMETERS_ANNOTATION:number       = 0x20;
    /***
     * @name name of annotation
     */
    protected readonly name:string;
    /***
     * Allow to to known then name of
     * field, because in this spec
     * JS-0050 annotation fields & clazz
     * go to constructor method
     */
    private fieldName:string = null;
    /***
     * @target level access
     */
    protected target:number;
    /*-*/
    protected constructor(annotationName:string) {
        this.name   = annotationName;
    }
    /***
     * @getName
     * <pre>
     *   This method return name of annotation
     * </pre>
     */
    public getName():string{ return Optional.ofNullable(this.name).orElse("ANNOTATION"); }
    /***
     * @getTarget
     * <pre>
     *   This method return access level of annotation
     *   CONSTRUCTOR_ANNOTATION
     *   ATTRIB_ANNOTATION
     *   METHOD_ANNOTATION
     *   PARAM_ANNOTATION
     * </pre>
     */
    public getTarget():number{ return this.target; }
    /***
     *
     */
    public setFieldName(fieldName:string):void{this.fieldName = fieldName;}
    /***
     *
     */
    public getFieldName():string{ return this.fieldName; }
}
//
Object.package(this);