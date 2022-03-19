import {Optional} from "../Optional";
import {propertiesDescriptor} from "../decorator/DecoratorInterfaces";
import {Objects} from "../type/Objects";
import {Field} from "../Reflect/Field";
import {ClassLoader} from "../ClassLoader";
/**/
export abstract class Annotation{

    public static readonly STATIC_ANNOTATION:number           = 0x01;
    public static readonly INSTANCED_ANNOTATION:number        = 0x02;

    public static readonly CONSTRUCTOR_ANNOTATION:number      = 0x04;
    public static readonly ATTRIB_ANNOTATION:number           = 0x08;
    public static readonly METHOD_ANNOTATION:number           = 0x10;
    public static readonly PARAMETERS_ANNOTATION:number       = 0x20;
    /***
     * @name name of annotation
     */
    protected readonly name:string;
    /***
     * @target level access
     */
    protected target:number;
    /*-*/
    protected constructor(annotationName:string, target:number) {
        this.name   = annotationName;
        this.target = target;
    }
    /***
     * @getName
     * <pre>
     *   This method return name of annotation
     * </pre>
     */
    public getName():string{ return Optional.ofNullable(this.name).orElse("ANNOTATION"); }
    /***
     * @getTarget
     * <pre>
     *   This method return access level of annotation
     *   CONSTRUCTOR_ANNOTATION
     *   ATTRIB_ANNOTATION
     *   METHOD_ANNOTATION
     *   PARAM_ANNOTATION
     *
     * </pre>
     */
    public getTarget():number{ return this.target; }
    /**/
    public invoke<T>(args:T):void{

    }

    index:number;
    getIndex():number{
        return this.index;
    }
}
//
Object.package(this);

export abstract class DecoratorHandler {

    static clazz():Function {
        return (target: Function) => void 0 //invoke.invoke(Anno.staticAnnotation(target));
    }

    static attribute(annotation:Annotation): Function {
        return (target: any, propertiesTarget: string) => {
           /* if(annotation.getTarget()&Annotation.STATIC_ANNOTATION){
                target.class();
            }*/
            // typeof target === "function" ? Anno.staticAnnotation(target,propertiesTarget) : Anno.instancedAnnotation(target,propertiesTarget);

           // invoke.invoke({});
        };
    }

    static method(annotation:Annotation):Function{
        return (target: any, propertiesTarget: string, descriptor: propertiesDescriptor<any>)=> {
            if(Objects.isNull( target[propertiesTarget]["@Annotations"] )) {
                target[propertiesTarget]["@Annotations"] = [annotation];
                Object.defineProperty(target,propertiesTarget,{writable:false});
            }else{
                target[propertiesTarget]["@Annotations"].push(annotation);
            }
        }
    }
    static param(annotation:Annotation):Function{
        return (target: Function, propertiesTarget: string, index:number)=> {
            if(Objects.isNull( target[propertiesTarget]["@Annotations"] )) {
                target[propertiesTarget]["@Annotations"] = [annotation];
                Object.defineProperty(target,propertiesTarget,{writable:false});
            }else{
                target[propertiesTarget]["@Annotations"].push(annotation);
            }
        }
    }
}

class test{


    static fg:number = 1;

    @DecoratorHandler.attribute(<any>{})
    ghj:number=1;
}