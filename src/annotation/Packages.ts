import {AnnotationTarget, DecoratorClazz, Invokable} from "./Interfaces";
import {Member} from "../Reflect/Interfaces";
import {AnnotationHandlers} from "./AnnotationHandlers";
import { Package } from "../Package/Package";
import {Path} from "../file/Path";
import {PackageException} from "../Package/PackageException";

export class Packages implements Invokable{

    private readonly o:PackageException;

    protected constructor(o:PackageException) {this.o=o;}

    public invoke(annotation: AnnotationTarget<Member>): void {

        console.log("AAklmmm",this.o.getLine(annotation.getReflector().getDeclaringConstructor().getName()),new Path(this.o.getLine(annotation.getReflector().getDeclaringConstructor().getName())).getParent().toForNamePath() )
        Package.fromClazzName(
            annotation.getReflector().getDeclaringConstructor().getInstance(),
            new Path(this.o.getLine(annotation.getReflector().getDeclaringConstructor().getName())).getParent().toString()
        );
        console.log("AAklmmm2", annotation.getReflector().getDeclaringConstructor().getName() ,  annotation.getReflector().getDeclaringConstructor().getPackage() );
    }

    public static Package( src:string = null ):DecoratorClazz{
        return AnnotationHandlers.clazz<Packages>(new Packages(new PackageException()));
    }

}
Object.package(this);