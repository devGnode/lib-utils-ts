import {Annotation} from "./Annotation";
import {AnnotationTarget, Invokable} from "./Interfaces";
import {Member} from "../Reflect/Interfaces";


export class Decorators extends Annotation implements Invokable{

    private constructor() {
        super(Decorators.class().getName());
    }

    invoke(annotationAccessor: AnnotationTarget<Member>): void {
    }

}
Object.package(this);