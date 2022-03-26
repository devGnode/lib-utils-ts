import { AttributeDecorator} from "./Interfaces";
import {AnnotationHandlers} from "./AnnotationHandlers";
import {Annotation} from "./Annotation";
import {Constructor} from "../Constructor";
/****
 * @Annotation
 * @Json.JsonAttribute
 */
export class Json extends Annotation{

    attributeName:string;

    defaultValue:Object;

    type:Constructor<any>;

    protected constructor(attributeName:string, defaultValue:Object = null, type:Constructor<any> = null) {
        super(Json.class().getName());
        this.attributeName = attributeName;
        this.defaultValue  = defaultValue;
        this.type          = type;
    }
    /***
     * @Annotation : @Nested.NestedClass
     * @param {string} property
     * @param defaultValue
     * @param type
     * @constructor
     */
    public static JsonAttribute<T extends Object>(
        property:string,
        defaultValue:Object = null ,
        type:Constructor<any> = null
    ):AttributeDecorator{
        return AnnotationHandlers.annotationAttribute<Json>(Json.class(), ...arguments );
    }
}
Object.package(this);