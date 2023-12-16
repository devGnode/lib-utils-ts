import {AnnotationTarget, DecoratorClazz, Invokable} from "./Interfaces";
import {Member} from "../Reflect/Interfaces";
import {AnnotationHandlers} from "./AnnotationHandlers";
import { Package } from "../Package/Package";
import {Path} from "../file/Path";
import {PackageException} from "../Package/PackageException";
import {Constructor} from "../Constructor";

export class Packages implements Invokable{

    private readonly o:PackageException;

    protected constructor(o:PackageException) {this.o=o;}

    public invoke(annotation: AnnotationTarget<Member>): void {
        let c:Constructor<Object> = annotation.getReflector().getDeclaringConstructor();
        Package.fromClazzName(c.getInstance(), new Path(this.o.getLine(c.getName())).getParent().toString());
    }

    public static Package( src:string = null ):DecoratorClazz{
        return AnnotationHandlers.clazz<Packages>(new Packages(new PackageException()));
    }

}
Object.package(this);