import {AnnotationTarget, AttributeDecorator, DecoratorClazz, Invokable} from "./Interfaces";
import {AnnotationHandlers} from "./AnnotationHandlers";
import {Field} from "../Reflect/Field";
import {System} from "../lang/System";

export class Deprecate implements Invokable{

    private readonly type:number;
    private readonly message:string;

    constructor(type:number, message:string = null) {
        this.message = message||"";
        this.type=type;
    }

    public invoke(annotation: AnnotationTarget<Field>): void {
        let value:string=System.getProperty("deprecation.message"),
            field:Field = annotation.getReflector(), msg:string;

        if(this.type==0)msg = `-> ${field.toString()}`;
        if(value==null||value.equals("visible"))
            System.out.println( `${field.getDeclaringConstructor().toString()} %sit was deprecated ! ${this.message}`.format(msg||"") );
    }
    /***
     * @param {Object} target
     * @param {string} property
     * @constructor
     */
    public static Deprecated(target:Object, property:string):void{
        AnnotationHandlers.attribute<Deprecate>(new Deprecate(0)).call(null,target, property);
    }
    /****
     * @param {string} message
     * @return {AttributeDecorator}
     * @constructor
     */
    public static DeprecatedText(message:string):AttributeDecorator{
        return AnnotationHandlers.attribute<Deprecate>(new Deprecate(0, message));
    }
    /****
     * @param {Object} target
     * @constructor
     */
    public static DeprecatedObject(target:Object):void{
        AnnotationHandlers.clazz<Deprecate>(new Deprecate(1)).call(null,target);
    }
    /***
     * @param {string} message
     * @return {DecoratorClazz}
     * @constructor
     */
    public static DeprecatedObjectText(message:string):DecoratorClazz{
        return AnnotationHandlers.clazz<Deprecate>(new Deprecate(1, message));
    }

}
Object.package(this);