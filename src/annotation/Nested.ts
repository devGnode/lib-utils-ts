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
        let pack:string, nestedPack:string,
            field:Field = annotation.getReflector();
        Objects.requireNotNull(annotation.getReflector().getValue());
        if(!annotation
            .getReflector()
            .getType()
            .getType()
            .equals("function")
        ) throw new Exception("Value of [ "+annotation.getReflector()+" ] is not class !");

        pack = new PackageException().getLine(field.getDeclaringConstructor().getName());
        if(pack == null)nestedPack = `${field.getDeclaringConstructor().toString().replace(/^class\s*/,"")}$`;
        else{
            nestedPack = `${Package.cleanUp(pack).toForNamePath()}$`;
        }
        if(!(typeof field.getValue().equals("function"))){
            throw new Exception(`Wrong value of field !`);
        }
        Package.fromNested(field.getValue(), nestedPack);
    }
    /***
     * @Annotation : @Nested.NestedClass
     * @param {Function} target
     * @param {string} property
     * @constructor
     */
    public static NestedClass(target:Function, property:string):void{
        AnnotationHandlers.attribute<Nested>(Nested.ONE).call(null,target, property);
    }
}
Object.package(this);