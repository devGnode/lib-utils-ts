import {propertiesDescriptor} from "../decorator/DecoratorInterfaces";
import {Objects} from "../type/Objects";
import {Annotation} from "./Annotation";
import {Enumerate} from "../Reflect/Enumerate";
import {Constructor} from "../Constructor";
import {Field} from "../Reflect/Field";
import {Method} from "../Reflect/Method";

interface DecoratorClass{
    (constructor:Function):void
}
interface DecoratorAttribute<T>{
    (target: T, propertiesTarget: string):void
}
interface DecoratorCA<T>{
    (target: T, propertiesTarget?: string):void
}
interface DecoratorMethod<T>{
    (target: T, propertiesTarget: string, descriptor: propertiesDescriptor<any>):void
}

// method & attribute
interface DecoratorMethodAttribute<T>{
    (target: T, propertiesTarget: string, descriptor?: propertiesDescriptor<any>):void
}
interface DecoratorParameter<T>{
    (target: T, propertiesTarget: string, index:number):void
}
interface DecoratorParameterA<T>{
    (target: T, propertiesTarget: string, descriptor?: propertiesDescriptor<any>, index?:number):void
}
interface Invokable<T,V,K>{
    invoke(
        target: T,
        clazz: K,
        propertiesTarget?: string,
        descriptor?: propertiesDescriptor<V>,
        index?:number,
        ):void
}

export abstract class DecoratorHandler {
    /***
     * @class
     */
    static clazz(invoke:Invokable<Function,void,Constructor<any>>):DecoratorClass{
        return (target: Function) => invoke.invoke(target,target.class());
    }
    /**
     * @type T : Target type Function or Object
     *          can build annotation for
     *          - class
     *          - Attribute => static | instanced
     *
     *          T : Object      => instanced
     *          T : Function    => static
     *          T : any         => static | instanced *default
     *
     *          T should be same typeofInvokable T
     * @param invoke
     */
    static anos<T extends any,K>(invoke:Invokable<T,void, K>):DecoratorParameterA<T>{
        return (target: T, property:string, descriptor: propertiesDescriptor<any>, index?:number) => invoke.invoke(target, null, property);
    }

    static attributeM<T, V extends any>(invoke:Invokable<T, V>):DecoratorMethodAttribute<T>{
        return (target: T,property:string, descriptor?: propertiesDescriptor<V>) => invoke.invoke(target, property);
    }

    static attribute<T,K extends Field>(invoke:Invokable<T,void, K>):DecoratorAttribute<T>{
        return (target: T,property:string) => invoke.invoke(target, null, property);
    }

    static method<T,V extends any>(invoke:Invokable<T, V>):DecoratorMethod<T>{
        return (target: T,property:string, descriptor: propertiesDescriptor<V>) => invoke.invoke(target, property);
    }

    static params<T, V>(invoke:Invokable<T, V, Method>):DecoratorParameter<T>{
        return (target: T,property:string, index:number) => invoke.invoke(target, null, property);
    }
    static paramss<T, V>(invoke:Invokable<T, V, Method>):DecoratorParameterA<T>{
        return (target: T, property:string, descriptor?: propertiesDescriptor<V>, ) => invoke.invoke(target, null, property);
    }
    /* static & instanced
    static attribute(invoke:Invokation):DecoratorAttribute<any>{
        return (target: any, propertiesTarget: string) =>{
            // typeof target === "function" ? Anno.staticAnnotation(target,propertiesTarget) : Anno.instancedAnnotation(target,propertiesTarget);
            invoke.invoke({});
        };
    }

    static instanceAttribute(invoke:Invokation):DecoratorAttribute<Object>{
        return (target: Object, propertiesTarget: string) => invoke.invoke({});
    }

    static staticAttribute(invoke:Invokation):DecoratorAttribute<Function>{
        return (target: Function, propertiesTarget: string ) => invoke.invoke({});
    }


    static method(invoke:Invokation):DecoratorAttrProto<Object>{
        return (target: Object, propertiesTarget: string, descriptor: propertiesDescriptor<any>)=> invoke.invoke({});
    }

    static staticMethod(invoke:Invokation):DecoratorAttrProto<Function>{
        return (target: Function, propertiesTarget: string, descriptor: propertiesDescriptor<any>) => invoke.invoke({});
    }

    static staticParam(invoke:Invokation):DecoratorParamProto<Function>{
        return (target: Function, propertiesTarget: string, index:number)=> invoke.invoke([]);
    }

    static parameter(invoke:Invokation):DecoratorParamProto<Object>{
        return (target: Object, propertiesTarget: string, index:number)=> invoke.invoke([]);
    }


    static instancedHandler():AnnotationProto<Object, void>{
        return (target:Object, propertiesTarget?: string, descriptor?: propertiesDescriptor<any>, index?:number)=>{

        };
    }
    */
}

// Annotations => object => methods & params | construct & attrib
// decorators.getHandler();

class DecoratorWorker{

    static method<T, K>(annotation:Annotation):Invokable<any,T, K>{
        return new class implements Invokable<any,T, K>{
            constructor() {}
            invoke(target:any,clazz:K, propertiesTarget:string, descriptor:propertiesDescriptor<any>, index:number) {
                if(Objects.isNull( target[propertiesTarget]["@Annotations"] )) {
                    target[propertiesTarget]["@Annotations"] = [annotation];
                    Object.defineProperty(target,propertiesTarget,{writable:false});
                }else{
                    target[propertiesTarget]["@Annotations"].push(annotation);
                }
            }
        }
    }

    static clazz(annotation:Annotation):Invokable<Function, void, Constructor<any>>{
        return new class implements Invokable<Function,void, Constructor<any>>{
            constructor() {}
            invoke(target:Function, clazz: Constructor<any>) {

            }
        }
    }

    static clzz(annotation:Annotation):Invokable<Function, void,Constructor<any>>{
        return new class implements Invokable<Function,void,Constructor<any>>{
            constructor() {}
            invoke(target:Function,v:Constructor<any>, property:string ) {

            }
        }
    }

    static a(annotation:Annotation):Invokable<any, void,Field>{
        return new class implements Invokable<any,void, Field>{
            constructor() {}
            invoke(target:any,f:Field, property:string ) {

            }
        }
    }

    static m<V extends any>(annotation:Annotation):Invokable<any, V,Method>{
        return new class implements Invokable<any, V,Method>{
            constructor() {}
            invoke(target:any, m:Method, property:string, descriptor: propertiesDescriptor<V> ) {

            }
        }
    }

    static mi<V extends any>(annotation:Annotation):Invokable<Object, V,Method> {
        return new class implements Invokable<any, V, Method> {
            constructor() {}

            invoke(target: any,m: Method, property: string, descriptor: propertiesDescriptor<V>) {

            }
        }
    }

    static ms<V extends any>(annotation:Annotation):Invokable<Function, V>{
        return new class implements Invokable<any,V>{
            constructor() {}
            invoke(target:Function, property:string, descriptor: propertiesDescriptor<V> ) {

            }
        }
    }

    static aS(annotation:Annotation):Invokable<Function, void,Field>{
        return new class implements Invokable<Function,void,Field>{
            constructor() {}
            invoke(target:Function,f:Field, property:string ) {

            }
        }
    }

    static ai(annotation:Annotation):Invokable<Object, void, Field>{
        return new class implements Invokable<Object,void,Field>{
            constructor() {}
            invoke(target:Object, f:Field, property:string ) {

            }
        }
    }
}

// @class only OK
// Attribute => element + method ( justefairela diff avec static or method )
// only method => grace descriptor
// only params =>
// method + params
function k(target:Object, property:string):void{}

@DecoratorHandler.clazz(DecoratorWorker.clazz(new Enumerate(5)))
@DecoratorHandler.attribute(null)
@DecoratorHandler.anos<Function,Field>(null)
class TER{


    @DecoratorHandler.clazz(DecoratorWorker.clzz(new Enumerate(5)))
    @DecoratorHandler.attribute(DecoratorWorker.ai(new Enumerate(5)))
    @DecoratorHandler.anos(DecoratorWorker.clazz(new Enumerate(5)))
    @DecoratorHandler.attribute(DecoratorWorker.ai(new Enumerate(56)))
    @DecoratorHandler.anos(DecoratorWorker.clzz(new Enumerate(5)))
    @k
    static efg:number;


   // @DecoratorHandler.attribute({})
    @DecoratorHandler.clazz(DecoratorWorker.clazz(new Enumerate(5)))
    @DecoratorHandler.anos(DecoratorWorker.aS(new Enumerate(5)))
    @DecoratorHandler.attribute(DecoratorWorker.ai(new Enumerate(56)))
    @DecoratorHandler.attributeM(DecoratorWorker.ai(new Enumerate(5)))
    @k
    ert:number;

    @DecoratorHandler.method(DecoratorWorker.a(new Enumerate(5)))
    @DecoratorHandler.anos(DecoratorWorker.ai(new Enumerate(5)))
    @DecoratorHandler.attribute(DecoratorWorker.a(new Enumerate(5)))
    @DecoratorHandler.anos(DecoratorWorker.aS(new Enumerate(5)))
    meth(){}

    @k
    @DecoratorHandler.clazz(DecoratorWorker.clzz(new Enumerate(5)))
    @DecoratorHandler.attribute(DecoratorWorker.ai(new Enumerate(5)))
    @DecoratorHandler.method(DecoratorWorker.a(new Enumerate(5)))
    @DecoratorHandler.anos(DecoratorWorker.ai(new Enumerate(5)))
    static meft( @DecoratorHandler.paramss(null)   p:number){}
}