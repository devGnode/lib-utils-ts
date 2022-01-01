import {DecoratorImpl} from "./DecoratorImpl";
import {DecoratorAttributes} from "./DecoratorAttributes";
import {AttributeProperties} from "./DecoratorInterfaces";
import {Objects} from "../type/Objects";
/***
 *
 */
export abstract class Decorators {
    /***
     * @Annotation PARAMETERS
     * @param attributes
     * @constructor
     */
    public static PARAMETERS<T>(attributes:AttributeProperties<T>):Function{
        Objects.requireNotNull(attributes);
        return DecoratorImpl.attributeDecorator<T>(attributes.setDecorator("%s.DECORATORS.PARAMETERS").getSink());
    }
    /***
     * @Annotation VALUE
     * @param value
     * @constructor
     */
    public static VALUE<T>(value:T):Function{
        return DecoratorImpl.attributeDecorator<T>(DecoratorAttributes.empty<T>()
            .setDecorator("%s.DECORATORS.VALUE")
            .setValue(value)
            .getSink());
    }
    /***
     * @Annotation FINAL
     * @constructor
     */
    public static FINAL():Function{
        return DecoratorImpl.attributeDecorator<any>(DecoratorAttributes.empty()
            .setDecorator("%s.DECORATORS.FINAL")
            .final()
            .getSink());
    }
    /***
     * @Annotation CONFIGURABLE
     * @param state
     * @constructor
     */
    public static CONFIGURABLE(state:boolean):Function{
        return DecoratorImpl.attributeDecorator<any>(DecoratorAttributes.empty()
            .setDecorator("%s.DECORATORS.CONFIGURABLE")
            .setConfigurable(state)
            .getSink());
    }
    /***
     * @Annotation ENUMERABLE
     * @param state
     * @constructor
     */
    public static ENUMERABLE(state:boolean):Function{
        return DecoratorImpl.attributeDecorator<any>(DecoratorAttributes.empty()
            .setDecorator("%s.DECORATORS.ENUMERABLE")
            .setEnumerable(state)
            .getSink());
    }

    public static NestedClass():Function{
        return (constructor:Object)=> void 0
    }
}