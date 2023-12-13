import {Constructor} from "./Constructor";
import {RuntimeException} from "./Exception";
import {Objects} from "./type/Objects";
import {Method} from "./Reflect/Method";
import {Field} from "./Reflect/Field";
import {propertiesDescriptor} from "./decorator/DecoratorInterfaces";
import {Member} from "./Reflect/Interfaces";
import {classLoader} from "./Interface";
import {Paths} from "./file/Paths";
import { InputStreamReader } from "./file/InputStreamReader";
import {FileReader} from "./file/FileReader";
import {Package} from "./lang/Package";
import {Optional} from "./utils/Optional";
import {Annotation} from "./annotation/Annotation";
//import {Launcher} from "./lang/misc/Launcher";
/***
 * @ClassLoader
 * <pre>
 *     For use this class, you need to
 *     instance this object with a simple
 *     function in parameter.
 * </pre>
 */
export class ClassLoader<T> implements classLoader<T>{

   // private static scl:ClassLoader<any>;
    /**
     */
    private readonly value:Function;
    /***
     * @param funcA
     */
        constructor( funcA: Function&{ constructor:Function }) {this.value = funcA;}
    /***
     *
     * @param member
     * @private
     */
    private getTarget(member:Member):Object{
        return member.getModifiers().equals(Method.INSTANCED) ? this.value.prototype : this.value
    }
    /***
     * @param method
     */
    public setMethod(method:Method): ClassLoader<T> {
        let target:Object;

        target = this.getTarget(Objects.requireNotNull(method));
        if((<any>target)[method.getName()]!==undefined)
            throw new RuntimeException(`Method : ${method.getName()} already declared in @${this.value.name}`);
        // When you set a function you can't re-declare it
        (<any>target)[method.getName()] = function (...args:Object[]){
            return method.invoke(this,...args);
        };
        Object.defineProperty(target, method.getName(), {writable:false,configurable:false});
        return this;
    }

    public setField(field:Field):ClassLoader<T>{
        let desc:propertiesDescriptor<any>, target:Object;

        target = this.getTarget(Objects.requireNotNull(field));
        if( ( desc = Object.getOwnPropertyDescriptor(target,field.getName()) ) ){
            // if( !desc.writable );
            if( !desc.configurable ){}
            if( !desc.writable && (<any>target)[field.getName()]!== undefined ){} // already defined
        }
        (<any>target)[field.getName()] = field.getValue();
        // object descriptor

        return this;
    }
    /***/
    public getPackage():Package{return new Package( Optional.ofNullable((<any>this.value)["@Package"]).orElse(null) );}
    /***
     * @getResourcesAsStream
     * @param name
     * @returns InputStreamReader
     */
    public getResourcesAsStream( name: string):  InputStreamReader{
        if(!Paths.get(name).isAbsolute())name = Paths.projectResources()[0].resolve(Paths.get(name)).toString();
        return new FileReader(name);
    }
    /***
     * @getResourcesAsStream
     * @param {Annotation} annotation
     * @return {Annotation[]}
     */
    public setAnnotation(annotation:Annotation):Annotation[]{
        Objects.requireNotNull(annotation);
        Objects.requireNotNull(annotation).setFieldName(this.value.name);
        if(Objects.isNull( (<any>this.value)["@Annotations"] )) {
            new Field("@Annotations",[annotation], 1, null,this.value.class())
                .getFieldDescriptor()
                .value([annotation])
                .enumerable(false)
                .final()
                .set();
        }else{
            (<any>this.value)["@Annotations"].push(annotation);
        }
        return (<any>this.value)['@Annotations'];
    }
    //public setDescriptor(target:string,)
    /***
     * @param argArray
     */
    public instance(...argArray: Object[]): T {return new Constructor<T>(this.value).newInstance(...argArray);}

   /* public static getSystemClassLoader():ClassLoader<any>{
        this.initSystemClassLoader();
        if(ClassLoader.scl==null) return null;
        return this.scl;
    }

    private static initSystemClassLoader():void{
        let launcher:Launcher = Launcher.getLauncher();
        if(!this.scl){
            if(this.scl) throw new Error();
            this.scl = launcher.getCLassLoader();
        }
    }*/

}
Object.package(this);