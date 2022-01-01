import {supplier} from "../Interface";
import {DecoratorImpl} from "./DecoratorImpl";
import {affectFn, DecoratorSink, propertiesDescriptor} from "./DecoratorInterfaces";

export abstract class AbstractDecorator<T> implements DecoratorSink<T>{
    /***
     *
     */
    protected abstract prop: propertiesDescriptor<T>;
    /***
     *
     */
    protected abstract decorator:string;
    /***
     *
     */
    protected name:string;
    /***
     *
     */
    protected propertyKey:supplier<string>;
    /***
     *
     */
    protected constructor() {}
    /***
     *
     */
    public affect: affectFn = ():void =>void 0;
    /***
     *
     */
    public get(): propertiesDescriptor<T> {return this.prop;}
    /***
     *
     */
    public setProp(prop:propertiesDescriptor<T>):void{
        this.prop = prop===null||prop===undefined? new DecoratorImpl.AttributesDescriptor() : prop;
    }

    public setName(value: string):void{this.name=value; }
    /***
     *
     */
    public getName():string{ return this.name; }
    /***
     *
     */
    public getPropertyKey():string{ return !this.propertyKey ? this.name : this.propertyKey.get(); }
    /***
     *
     */
    public setProperty(supplier: supplier<string>):void{ this.propertyKey=supplier; }
    /***
     *
     */
    public getDecorator():string{ return this.decorator||"ANNOTATION"; }
    /***@ts-ignore*/
    public setDecorator(value:string):DecoratorSink<T>{ this.decorator=value; return this;}
}