import {Objects} from "../type/Objects";
import {Member} from "../Reflect/Interfaces";
import {Method} from "../Reflect/Method";
import {Field} from "../Reflect/Field";
import {AnnotationTarget, ParameterAnnotation} from "./Interfaces";
import {MethodNotFoundException, UnsupportedOperationException } from "../Exception";
import {Parameter} from "../Reflect/Parameter";

export abstract class AnnotationAccessor {

    private constructor() {}

    private static AnnotationTarget = class AnnotationTarget<O extends Member>
        implements AnnotationTarget<O>{

        protected reflectorMember:O;

        protected index: number;

        constructor(target: O, index?: number) {
            this.reflectorMember = Objects.requireNotNull(target);
            this.index          = index;
        }

        public getProperty(): string {return this.reflectorMember.getName();}

        public isStaticMember():boolean{ return this.reflectorMember.getModifiers().equals(1);}

        public isClass():boolean{ return this.reflectorMember.getModifiers().equals(4); }

        public isParameter():boolean{ return this.reflectorMember.getModifiers().equals(8); }

        public getIndex(): number { throw new UnsupportedOperationException(); }

        public getReflector(): O {return this.reflectorMember; }
    };

    public static clazz(member:Member):AnnotationTarget<Member>{
        return new AnnotationAccessor.AnnotationTarget(member);
    }
    /***
     * @param {Method} method
     * @return {AnnotationTarget<Method>}
     * @throw MethodNotFoundException : caused by NullPointerException
     */
    public static method(method:Method):AnnotationTarget<Method>{
        try{return new AnnotationAccessor.AnnotationTarget(method);}catch (e) {
            throw new MethodNotFoundException(e.stack);
        }
    }

    public static attribute(field:Field):AnnotationTarget<Field>{
        return new AnnotationAccessor.AnnotationTarget(field);
    }

    public static parameterAnnotation(method:Parameter):ParameterAnnotation{
        /***/
        return new class ParameterTarget extends AnnotationAccessor.AnnotationTarget<Parameter>{

            constructor() {super(method, Objects.requireNotNull(method.getIndex()));}

            getIndex(): number {return method.getIndex();}
        };
    }
}
Object.package(this);
