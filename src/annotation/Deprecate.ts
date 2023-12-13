import {AnnotationTarget, Invokable} from "./Interfaces";
import {AnnotationHandlers} from "./AnnotationHandlers";
import {Field} from "../Reflect/Field";
import {System} from "../lang/System";

export class Deprecate implements Invokable{

    public invoke(annotation: AnnotationTarget<Field>): void {
        System.out.println( annotation.getReflector().toString()+" it was deprecated !" );
    }

    public static Deprecated(target:Object, property:string):void{
        AnnotationHandlers.attribute<Deprecate>(new Deprecate()).call(null,target, property);
    }
}
Object.package(this);