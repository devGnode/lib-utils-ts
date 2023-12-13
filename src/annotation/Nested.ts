import {AnnotationTarget, Invokable} from "./Interfaces";
import {AnnotationHandlers} from "./AnnotationHandlers";
import {Field} from "../Reflect/Field";
import {PackageException} from "../Package/PackageException";
import {Package} from "../Package/Package";
import {Exception} from "../Exception";
import {Objects} from "../type/Objects";

export class Nested implements Invokable{

    private static readonly ONE:Nested = new Nested();

    protected constructor() {}

    public invoke(annotation: AnnotationTarget<Field>): void {
        let pack:string;
        //console.log("dsdsqdddddddddddddddddddddddddddddddddddddd---*-*-");
        Objects.requireNotNull(annotation.getReflector().getValue());
        if(!annotation
            .getReflector()
            .getType()
            .getType()
            .equals("function")
        ) throw new Exception("Value of [ "+annotation.getReflector()+" ] is not class !");
        //
        pack = new PackageException().getLine(annotation.getReflector().getDeclaringConstructor().getName());
        ///console.log(pack,annotation.getReflector().getDeclaringConstructor().getName());
        //Package.fromClazzName(annotation.getReflector().getValue(), Objects.requireNotNull(pack));
        //  Object.defineProperty(annotation.getReflector().getValue(),"@Nested",{value:true,enumerable:false,configurable:false,writable:false});
       // console.log("isNested",(<Function>annotation.getReflector().getValue()).class().getDeclaringClass().toString(),  annotation.getReflector().getType().isNested())
    }
    /***
     * @Annotation : @Nested.NestedClass
     * @param {Function} target
     * @param {string} property
     * @constructor
     */
    public static NestedClass(target:Function, property:string):void{
        //console.log("NESTED FOR = ",property)
        AnnotationHandlers.attribute<Nested>(Nested.ONE).call(null,target, property);
    }
}
Object.package(this);