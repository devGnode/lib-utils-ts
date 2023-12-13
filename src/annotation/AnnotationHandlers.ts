import {AnnotationAccessor} from "./AnnotationAccessor";
import {
    AccessorType,
    AnnotationTarget, AttributeDecorator,
    AttributeDecoratorRef, DecoratorClazz,
    IAccessorType,
    Invokable,
    MethodDecorator,
    ParameterDecorator
} from "./Interfaces";
import {propertiesDescriptor} from "../decorator/DecoratorInterfaces";
import {Constructor} from "../Constructor";
import {Annotation} from "./Annotation";
import {Method} from "../Reflect/Method";
import {Member} from "../Reflect/Interfaces";
import {RuntimeException, UnsupportedOperationException} from "../Exception";
import {Class} from "../Class";
import {ObjectsReflector} from "../Reflect/ObjectsReflector";
import {Field} from "../Reflect/Field";
import {Parameter} from "../Reflect/Parameter";
import {Objects} from "../type/Objects";
import {Risk} from "../init/Risk";

interface DecoratorClass{
    (constructor:Function,propertyName:string ):void
}
export abstract class AnnotationHandlers {

    /***
     * Constant
     * @type {number}
     */
    private static readonly CLASS:number        = 0x04;
    private static readonly ATTRIBUTE:number    = 0x08;
    private static readonly METHOD:number       = 0x10;
    private static readonly PARAM:number        = 0x20;

    private static readonly AccessorType = class AccessorType<C> implements IAccessorType<C>{

        protected construct:Constructor<C>;
        protected type: number;

        constructor(constructor:Constructor<C>, type: number) {
            this.construct = constructor;
            this.type      = type;
        }

        getConstructor():Constructor<C>{return this.construct;}

        getType():number{ return this.type; }
    };


    protected static staticAccessorType<C>(construct:Constructor<C>):AccessorType<C>{
        return new class StaticAccessorType extends AnnotationHandlers.AccessorType<C>{

            constructor() {super(construct,null);}
            getType(): number {return ObjectsReflector.STATIC;}
        };
    }

    protected static instancedAccessorType<C>(construct:Constructor<C>):AccessorType<C>{
        return new class InstancedAccessorType extends AnnotationHandlers.AccessorType<C>{

            constructor() {super(construct,null);}
            getType(): number {return ObjectsReflector.INSTANCED;}
        };
    }

    protected static get<C>(target:Object):AccessorType<C>{
        return typeof target === "function" ?
            AnnotationHandlers.staticAccessorType(target.class()) :
            AnnotationHandlers.instancedAccessorType(target.getClass<C>().getConstructor());
    }

    protected static getMember<C>(target:Object, propertyName:string = null, index:number, memberType:number):Member{
        let currentTarget:AccessorType<C> = AnnotationHandlers.get(Objects.requireNotNull(target));

            switch (memberType) {

                case AnnotationHandlers.PARAM:
                    return currentTarget
                        .getConstructor()
                        .getMethod(propertyName, currentTarget.getType())
                        .getParameter()[index];
                case AnnotationHandlers.METHOD:
                    return currentTarget
                        .getConstructor()
                        .getMethod(propertyName, currentTarget.getType());

                case AnnotationHandlers.ATTRIBUTE:
                    let member:Member = currentTarget.getConstructor()
                        .getField(propertyName, currentTarget.getType());
                    // may this var was not be initialized with real data
                    if(member==null) return new Field(
                        propertyName,
                        null,
                        currentTarget.getType(),
                        currentTarget.getConstructor().getDeclaringClass(),
                        currentTarget.getConstructor()
                    );
                    return currentTarget
                        .getConstructor()
                        .getField(propertyName, currentTarget.getType());

                case AnnotationHandlers.CLASS:
                    return new class ClassField implements Member{

                        getDeclaringClass(): Class<any> {return currentTarget.getConstructor().getDeclaringClass();}

                        getDeclaringConstructor(): Constructor<any> {return currentTarget.getConstructor();}

                        getModifiers(): number {return AnnotationHandlers.CLASS;}

                        getName(): string {return currentTarget.getConstructor().getName();}
                    }
                default:
                    throw new UnsupportedOperationException(`unknown member type [${memberType}]`);
            }
    }
    /***
     * @class
     */
    public static clazz<C extends Object>(invoke:Invokable):DecoratorClazz{
        return (target: Object) =>
            Risk.try(()=>invoke.invoke(AnnotationAccessor.clazz(AnnotationHandlers.getMember(target, null, null, AnnotationHandlers.CLASS))));
    }
    /***
     * @attribute
     */
    public static attributeRef<T, C extends Object>(invoke:Invokable):AttributeDecoratorRef<T>{
        return (target:  T, propertyName:string ) =>
            Risk.try(()=>invoke.invoke(AnnotationAccessor.attribute(<Field>AnnotationHandlers.getMember(target,propertyName, null, AnnotationHandlers.ATTRIBUTE))));
    }
    /**/
    public static attribute<C extends Object>(invoke:Invokable):AttributeDecorator{
        return function(target:  Object, propertyName:string ) {
            Risk.try(()=> invoke.invoke(AnnotationAccessor.attribute(<Field>AnnotationHandlers.getMember(target, propertyName, null, AnnotationHandlers.ATTRIBUTE))));
        }
    }
    /***
     * @method
     * @throws NullPointerException : if method doesn't exist
     */
    public static method<C extends Object, T>( invoke:Invokable ):MethodDecorator<T>{
        return (target: Object, propertyName:string, desc:propertiesDescriptor<T> ) =>
            Risk.try(()=>invoke.invoke(AnnotationAccessor.method(<Method>AnnotationHandlers.getMember(target, propertyName, null, AnnotationHandlers.METHOD))));
    }
    
    public static parameter<C extends Object, T>(invoke:Invokable):ParameterDecorator<T>{
        return (target: Object, propertyName:string, index:number ) =>{
            Risk.try(()=>invoke.invoke(AnnotationAccessor.parameterAnnotation(<Parameter>AnnotationHandlers.getMember(target, propertyName, index, AnnotationHandlers.PARAM))));
        }
    }

    static all<T>(invoke:Invokable){
        return (target: Object, propertyName:string, desc?:propertiesDescriptor<T> ) =>{

        };
    }

    public static annotationClazz<T extends Annotation, V extends Object>(annotation:Constructor<T>, ...args: Object[]):DecoratorClazz{
        let inv:Invokable = new class AnnotationClazz implements Invokable{

            public invoke(target: AnnotationTarget<Method>): void {
                let classT:Constructor<any> = target.getReflector().getDeclaringConstructor();

                // error
                if(!annotation.isAnnotation())
                    throw new RuntimeException(
                        `Bad implementation of annotation [ @${annotation.getPackage().getName()}`+
                        `.${annotation.getName()} ] from ${classT.toString()}`+
                        `$${target.getReflector().getName()} : @${annotation.getName()}`+
                        ` should be it an extends of Annotation class`
                    );
                target
                    .getReflector()
                    .getDeclaringConstructor()
                    .getClassLoader()
                    .setAnnotation(annotation.newInstance(...args));
            }
        };
        return this.clazz(inv);
    }

    public static annotationMethod<T extends Annotation, V extends Object>(annotation:Constructor<T>, ...args: Object[]):MethodDecorator<V>{
        let inv:Invokable = new class AnnotationMethod implements Invokable{

            public invoke(target: AnnotationTarget<Method>): void {
                let classT:Constructor<any> = target.getReflector().getDeclaringConstructor();

                // error
                if(!annotation.isAnnotation())
                    throw new RuntimeException(
                        `Bad implementation of annotation [ @${annotation.getPackage().getName()}`+
                        `.${annotation.getName()} ] from ${classT.toString()}`+
                        `$${target.getReflector().getName()} : @${annotation.getName()}`+
                        ` should be it an extends of Annotation class`
                    );
                target.getReflector().setAnnotation(annotation.newInstance(...args));
            }
        };
        return this.method(inv);
    }

    public static annotationAttribute<T extends Annotation>(annotation:Constructor<T>, ...args: Object[]):AttributeDecorator{
        let inv:Invokable = new class AnnotationMethod implements Invokable{

            public invoke(target: AnnotationTarget<Field>): void {
                let classT:Constructor<any> = target.getReflector().getDeclaringConstructor();

                // error
                if(!annotation.isAnnotation())
                    throw new RuntimeException(
                        `Bad implementation of annotation [ @${annotation.getPackage().getName()}`+
                        `.${annotation.getName()} ] from ${classT.toString()}`+
                        `$${target.getReflector().getName()} : @${annotation.getName()}`+
                        ` should be it an extends of Annotation class`
                    );
                target.getReflector().setAnnotation(annotation.newInstance(...args));
            }
        };
        return this.attribute(inv);
    }
}
Object.package(this);