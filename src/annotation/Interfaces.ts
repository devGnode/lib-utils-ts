import {Member} from "../Reflect/Interfaces";
import {Method} from "../Reflect/Method";
import {Field} from "../Reflect/Field";
import {Constructor} from "../Constructor";
import {propertiesDescriptor} from "../decorator/DecoratorInterfaces";
import {Parameter} from "../Reflect/Parameter";

export interface AnnotationTarget<O extends Member>{
    getProperty(): string
    isStaticMember():boolean
    getReflector(): O
}
export interface MethodAnnotation extends AnnotationTarget<Method>{}
export interface AttributeAnnotation extends AnnotationTarget<Field>{}
export interface ParameterAnnotation extends AnnotationTarget<Parameter>{
    getIndex():number
}
//
export interface Invokable{
    invoke(annotationAccessor:AnnotationTarget<Member>):void
}

export interface AccessorType<C> {
    getConstructor():Constructor<C>
    getType():number
}
/*NestedInterface*/
export interface IAccessorType<C> extends AccessorType<C>{}

/**/
export interface DecoratorClazz{
    (constructor:Function):void
}
export interface AttributeDecoratorRef<T>{
    (constructor:T, propertyName:string ):void
}
export interface AttributeDecorator{
    (constructor:Object, propertyName:string ):void
}
export interface StaticAttributeDecorator{
    (constructor:Function,propertyName:string ):void
}
export interface MethodDecorator<T>{
    (target: T, propertiesTarget: string, descriptor: propertiesDescriptor<any>):void
}

export interface ParameterDecorator<T>{
    (target: T, propertiesTarget: string, index:number):void
}