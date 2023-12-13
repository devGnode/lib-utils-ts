import {AnnotationTarget, DecoratorClazz, Invokable} from "./Interfaces";
import {Member} from "../Reflect/Interfaces";
import {AnnotationHandlers} from "./AnnotationHandlers";
import {System} from "../lang/System";
import {RuntimeException} from "../Exception";
import {Constructor} from "../Constructor";
/***
 *
 */
export class Accessor implements Invokable {

    private static readonly INSTANCE:Accessor = new Accessor();

    public invoke(annotationAccessor: AnnotationTarget<Member>): void {

        if(!annotationAccessor.getReflector().getDeclaringClass().isAnnotation()) {
            let c: Constructor<any> = annotationAccessor
                .getReflector()
                .getDeclaringConstructor();

            throw new RuntimeException(
                `Annotation [ @${Accessor.class().getName()}.access ] ` +
                `should be it use on a Annotation class, ${c.toString()} ` +
                `doesn't extends Annotation class.`
            );
        }
        System.out.println("fdslmùkkmslfmk")
    }
    /***
     * @Decorator : @Accessor.access( accessType )
     * @param {number} accessType
     * @return {DecoratorClazz}
     */
    public static access( accessType:number ):DecoratorClazz{return AnnotationHandlers.clazz<Accessor>(Accessor.INSTANCE);}
}
Object.package(this);