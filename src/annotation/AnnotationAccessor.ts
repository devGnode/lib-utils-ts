import {Constructor} from "../Constructor";
import {Class} from "../Class";
import {Objects} from "../type/Objects";
import {IllegalArgumentException, NullPointerException} from "../Exception";
import {Optional} from "../Optional";
import {propertiesDescriptor} from "../decorator/DecoratorInterfaces";
import {DecoratorImpl} from "../decorator/DecoratorImpl";

// (target: T ) Obj
// (target: T, propertiesTarget?: string, descriptor?: propertiesDescriptor<any> ) Attr / Func
// (target: T, propertiesTarget?: string, index?:number) // Param

type AnnotationProto<T,R> = (target: T, propertiesTarget?: string, descriptor?: propertiesDescriptor<any>, index?:number) => R

export interface AnnotationInit<T,R>{
    init: (target: T, propertiesTarget?: string, descriptor?: propertiesDescriptor<any>, index?:number) => R
}

interface StaticDecorator<R> extends AnnotationInit<Function, R>{
    init(target: Function, propertiesTarget?: string, descriptor?: propertiesDescriptor<any>, index?:number):R
}
interface InstancedDecorator<R> extends AnnotationInit<Object, R>{
    init(target: Object, propertiesTarget?: string, descriptor?: propertiesDescriptor<any>, index?:number):R
}

interface AnnotationTarget<T,U,R>{

    getProperty( ):string
    getIndex():number
    getTarget():T
    getDescriptor():propertiesDescriptor<U>
    class():R
}
interface StaticAnnotation<T,V> extends AnnotationTarget<Function, V, Constructor<T>> {}
interface InstancedAnnotation<T,V> extends AnnotationTarget<Object, V, Class<T>> {}


export interface ObjectAnnotationTarget<T,R>{
    getTarget():T
    class():R
}

export interface AttributeAnnotationTarget<T,U,R> extends ObjectAnnotationTarget<T,R>{
    getProperty( ):string
    getDescriptor():propertiesDescriptor<U>
}

interface FunctionAnnotationTarget<T,U,R> extends AttributeAnnotationTarget<T, U, R>{}

interface ParameterAnnotationTarget<T,U,R> extends  AnnotationTarget<T, U, R>{}

export class Anno {

    private static AbsAnnotationTarget = class AbsAnnotationTarget<T, U, R>
        implements  ObjectAnnotationTarget<T,R>,
                    AttributeAnnotationTarget<T,U,R>,
                    FunctionAnnotationTarget<T,U,R>,
                    ParameterAnnotationTarget<T,U,R>,
                    AnnotationTarget<T,U,R> /*AnnotationTarget<T, U, R> */{

        protected target: T;

        protected propertyTarget: string;

        protected index: number;

        protected descriptor:propertiesDescriptor<U>;

        constructor(target: T, propertyTarget?: string, index?: number) {
            this.target         = Objects.requireNotNull(target);
            this.propertyTarget = propertyTarget;
            this.index          = index || -1;
        }

        public getTarget(): T {return this.target;}

        public getProperty(): string {return this.propertyTarget.orDefault(null);}

        public getIndex(): number {return this.index;}

        public getDescriptor(): propertiesDescriptor<U> {
            if(!this.descriptor) {
                Objects.requireNotNull(this.target);
                this.descriptor = Optional
                    .ofNullable(Object.getOwnPropertyDescriptor(this.target, Objects.requireNotNull(this.propertyTarget)))
                    .orElse(new DecoratorImpl.AttributesDescriptor());
            }
            return this.descriptor;
        }

        public class(): R {return null;}
    };
    // T : Object
    // U : Type of value
    private static readonly StaticAnnotation = class StaticAnnotationO<T, U>
        extends Anno.AbsAnnotationTarget<Function, U, Constructor<T>> implements StaticAnnotation<T,U> {

        constructor(constructor: Function, propertyTarget?: string, index?: number) {
            if (!Objects.typeof(constructor).equals("function")) throw new IllegalArgumentException();
            super(constructor, propertyTarget, index);
        }

        /***@override**/
        class(): Constructor<T> {return this.target.class();}
    };
    // T : Object
    // U : Type of value
    private static readonly InstancedAnnotation = class InstancedAnnotationO<T, U>
        extends Anno.AbsAnnotationTarget<Object, U, Class<T>> implements InstancedAnnotation<T,U>{

        constructor(target: Object, propertyTarget?: string, index?: number) {
            if (!Objects.typeof(target).equals("function")) throw new IllegalArgumentException();
            super(target, propertyTarget, index);
        }

        /***@override**/
        class(): Class<T> {return this.target.getClass();}
    };

    //ObjectAnnotationTarget<Object>
    public static readonly ObjAnnotation = class ObjAnnotation<T> implements StaticDecorator<ObjectAnnotationTarget<Function,Constructor<T>>> {

        constructor() {}

        init(target: Function): ObjectAnnotationTarget<Function,Constructor<T>> {
            return new Anno.StaticAnnotation(target);
        }
    };

    public static readonly AttribAnnotation = class AttribAnnotation<T, V> implements InstancedDecorator<AttributeAnnotationTarget<V, Object, Class<T>>> {

        constructor() {}

        init(target: Object, propertyTarget: string): AttributeAnnotationTarget<V, Object, Class<T>> {
           return new Anno.InstancedAnnotation(target, propertyTarget);
        }
    };

    protected static readonly StaticAttribAnnotation = class StaticAttribAnnotation<T, V> implements StaticDecorator<AttributeAnnotationTarget< Function, V, Constructor<T>>> {

        constructor() {}

        init(target: Function, propertyTarget: string): AttributeAnnotationTarget< Function, V, Constructor<T>> {
            return  new Anno.StaticAnnotation<T, V>(target, propertyTarget);
        };
    };

    /*protected static readonly FunctionAnnotation = class FunctionAnnotation<T, V> implements InstancedDecorator<FunctionAnnotationTarget<V, Object, Class<T>>> {

        constructor() {}

        init(target: Object, propertyTarget: string, descriptor: propertiesDescriptor<V>): FunctionAnnotationTarget<V, Object, Class<T>> {
             return new class extends Anno.InstancedAnnotation<T,V> {

                constructor() {super(target,propertyTarget);}

                /***@override*
                getDescriptor(): propertiesDescriptor<V> {return Optional.ofNullable(descriptor).orElseThrow(new NullPointerException());}
            };
        };
    };

    protected static readonly StaticFunctionAnnotation = class StaticFunctionAnnotation<T, V> implements StaticDecorator<FunctionAnnotationTarget<V, Function,Constructor<T>>> {

        constructor() {}

        init(target: Function, propertyTarget: string, descriptor: propertiesDescriptor<V>): FunctionAnnotationTarget<V, Function,Constructor<T>> {
            return new class extends Anno.StaticAnnotation<T, V> {

                constructor() {super(target,propertyTarget);}

                /***@override*
                getDescriptor(): propertiesDescriptor<V> {return Optional.ofNullable(descriptor).orElseThrow(new NullPointerException());}
            };
        };
    };
*/
    public static classAnnotation<T extends Object,V>():StaticDecorator<any/*ObjectAnnotationTarget<T>*/> {
        return new Anno.ObjAnnotation();
    }


    public static instancedAnnotation<V,T extends Object>(target: Object, propertyTarget?: string, index?: number):InstancedAnnotation<T,V>{
        return new Anno.InstancedAnnotation(target, propertyTarget, index);
    }

    public static staticAnnotation<V,T extends Object>(target: Function, propertyTarget?: string, index?: number):StaticAnnotation<T,V>{
        return new Anno.StaticAnnotation(target, propertyTarget, index);
    }

}
Anno.classAnnotation().init(null);
///AttributeAnnotationTarget<V, Object, Class<T>>




// (target: T ) Obj
// (target: T, propertiesTarget?: string, descriptor?: propertiesDescriptor<any> ) Attr / Func
// (target: T, propertiesTarget?: string, index?:number) // Param
type DecoratorClassProto = (constructor:Function)=>void
type DecoratorAttrProto<T> = (target: T, propertiesTarget: string, descriptor?: propertiesDescriptor<any>) => void
type DecoratorParamProto<T> =  (target: T, propertiesTarget: string, index:number) => void

interface DecoratorClass{
    (constructor:Function):void
}

interface DecoratorAttribute<T>{
    (target: T, propertiesTarget: string):void
}
interface DecoratorMethod<T>{
    (target: T, propertiesTarget: string, descriptor: propertiesDescriptor<any>):void
}
// method & attribute
interface DecoratorMethodAttribute<T>{
    (target: T, propertiesTarget: string, descriptor?: propertiesDescriptor<any>):void
}
interface DecoratorParameter<T>{
    (target: T, propertiesTarget: string, descriptor: propertiesDescriptor<any>, index:number):void
}

interface Invokable<T>{
    invoke(args:T):void
}

interface Invokation {
    invoke(arg:Object)
}

export abstract class DecoratorHandler {

    static clazz(invoke:Invokation):DecoratorClass{
        return (target: Function) => invoke.invoke(Anno.staticAnnotation(target));
    }

    // static & instanced
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

    static  ObjectAnnotation<T extends Object>( c:AnnotationHandler<ObjectAnnotationTarget<T,void>> ):AnnotationProto<Function,void>{
        return (constructor:Function)=>{
            c.set(new Anno.ObjAnnotation<T>().init(constructor));
            c.invoke();
        } ;
    }

    static AttributeDecorator<V,T extends Object>( c:AnnotationHandler<AttributeAnnotationTarget<Object, Object, Class<Objects>>> ){
        return (target:any, propertyKey:string) =>{
            c.set(new Anno.AttribAnnotation().init(target,propertyKey));
            //new Ter(c).begin(constructor);
        } ;
    }


}

class terr implements Invokation{
    invoke(arg: Object) {

    }
}
@DecoratorHandler.clazz(new terr())
class TTY{


    @DecoratorHandler.staticAttribute(new terr())
    static e:void;

    @DecoratorHandler.attribute(new terr())
    a = 0;

    @DecoratorHandler.staticMethod(new terr())
    static sf():void{}

    @DecoratorHandler.method(new terr())
    ft():void{}

    p( @DecoratorHandler.parameter(new terr()) s:number):void{

    }

    static sp( @DecoratorHandler.staticParam(new terr()) s:number):void{

    }

}

