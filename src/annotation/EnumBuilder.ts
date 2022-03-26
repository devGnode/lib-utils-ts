import {AnnotationTarget, Invokable, StaticAttributeDecorator} from "./Interfaces";
import {Field} from "../Reflect/Field";
import {Exception, RuntimeException} from "../Exception";
import {AnnotationHandlers} from "./AnnotationHandlers";
import {Enum} from "../Enum";
import {Constructor} from "../Constructor";

export class EnumBuilder<T extends Enum> implements Invokable{

    private static readonly NOT_STATIC_ERR:string = "An enum can't be initialized on a instanced field [%s]. on enumeration %s";
    private static readonly EX:string             = "@%s has failed on the field '%s.%s.%s' caused by : \n\n%s";

    private readonly args:Object[];

    protected constructor(args:Object[]) {this.args = args;}

    public invoke(annotation: AnnotationTarget<Field>): void {
        let c: Constructor<Enum> = annotation.getReflector().getDeclaringConstructor();

        if(annotation.getReflector().getValue()!=null) throw new Exception(`Cannot declare '${annotation.getReflector().getName()}', field is already defined in ${c.toString()}`);
        if(!annotation.isStaticMember()) throw new Exception(EnumBuilder.NOT_STATIC_ERR.format(annotation.getProperty(),c.toString()));
        if(!c.isEnum()) throw new Exception(`${c.toString()} is not an Enum class !`);
        // init
        try{annotation.getReflector().getFieldDescriptor().value(Enum.set(annotation, this.args)).final().set();}catch (e) {
            throw new RuntimeException(EnumBuilder.EX.format(
                EnumBuilder.getAnnotationName(),
                c.getPackage().getName(),
                c.getName(),
                annotation.getProperty(),
                e.stack)
            );
        }
    }

    private static getAnnotationName():string{ return EnumBuilder.class().getName()+".enums( ... )"; }
    /***
     * <pre>
     *   Annotation :   @EnumBuilder.enums( ... args );
     * </pre>
     * @param {Object} args
     * @return {StaticAttributeDecorator}
     */
    public static enums<T extends Enum>( ...args:Object[] ):StaticAttributeDecorator{
        return AnnotationHandlers.attribute<EnumBuilder<T>>(new EnumBuilder(args));
    }

}
Object.package(this);