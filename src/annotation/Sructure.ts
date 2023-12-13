import { AttributeDecorator} from "./Interfaces";
import {AnnotationHandlers} from "./AnnotationHandlers";
import {Annotation} from "./Annotation";
import {Constructor} from "../Constructor";
import {Dword} from "../primitives/Dword";

export class Sructure extends Annotation{

   private clazzConstructor:Constructor<any>;
   
    protected constructor(clazzConstructor:Constructor<any>) {
        super(Sructure.class().getName());
        this.clazzConstructor = clazzConstructor;
    }
    /***
     * @Annotation : @Nested.NestedClass
     * @constructor
     */
    public static type<T extends Object>( clazzConstructor:Constructor<any> ):AttributeDecorator{
        return AnnotationHandlers.annotationAttribute<Sructure>(Sructure.class(), ... arguments);
    }

    public static DWORD<T extends Object>( defaultValue:Dword = Dword.mk(0) ):AttributeDecorator{
        return AnnotationHandlers.annotationAttribute<Sructure>(Sructure.class(), Dword.class(), defaultValue);
    }

    public static WORD<T extends Object>(  ):AttributeDecorator{
        return AnnotationHandlers.annotationAttribute<Sructure>(Sructure.class(), ... arguments);
    }

    public static BYTE<T extends Object>(  ):AttributeDecorator{
        return AnnotationHandlers.annotationAttribute<Sructure>(Sructure.class(), ... arguments);
    }
}
Object.package(this);