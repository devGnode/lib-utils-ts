import {Func, supplier} from "../Interface";

export type affectFn = ()=>void;

export interface AttributeDecoratorPipe<T> {
    get(consumer: Function):Function
}

export interface propertiesDescriptor<T> extends PropertyDescriptor{
    value?:T;
    get?():T
    set?(value:T):void
}

export interface AttributeProperties<T> {
    setEnumerable(state:boolean):AttributeProperties<T>
    setWrite(state:boolean):AttributeProperties<T>
    setConfigurable(state:boolean):AttributeProperties<T>
    setValue(value:T):AttributeProperties<T>
    readOnly():AttributeProperties<T>
    final():AttributeProperties<T>
    propertyName(consumer:Func<string, string>):AttributeProperties<T>
    setMethod(value:Function):AttributeProperties<T>
    setDecorator(decorator:string):AttributeProperties<T>
    getSink():DecoratorSink<T>
}

export interface DecoratorSink<T> {
    affect:affectFn;
    setProp(prop:propertiesDescriptor<T>):void
    get():propertiesDescriptor<T>
    setName(value: string):void
    getName():string
    getDecorator():string
    getPropertyKey():string
    setProperty(supplier: supplier<string>):void
    setDecorator(value:string):AttributeProperties<T>
}