import {DecoratorImpl} from "./DecoratorImpl";
import {DecoratorAttributes} from "./DecoratorAttributes";
import {IOException, NoSuchElementException} from "../Exception";

export type accessorGetFunc<T> = ()=>T
export type accessorSetFunc<T> = ( value: T )=>void
export type getStringFunc = accessorGetFunc<string>
export type getNumberFunc = accessorGetFunc<number>
export type getObjectFunc = accessorGetFunc<object>
export type getBooleanFunc= accessorGetFunc<boolean>
export type getStringFuncA = accessorGetFunc<String>
export type getNumberFuncA = accessorGetFunc<Number>
export type getObjectFuncA = accessorGetFunc<Object>
export type getBooleanFuncA= accessorGetFunc<Boolean>
export type setStringFunc = accessorSetFunc<string>
export type setNumberFunc = accessorSetFunc<number>
export type setObjectFunc = accessorSetFunc<object>
export type setBooleanFunc= accessorSetFunc<boolean>
export type setStringFuncA = accessorSetFunc<String>
export type setNumberFuncA = accessorSetFunc<Number>
export type setObjectFuncA = accessorSetFunc<Object>
export type setBooleanFuncA= accessorSetFunc<Boolean>

export abstract class Lombok{

    public static GETTER<T>( orThrow: boolean = false ):Function{
        return DecoratorImpl.attributeDecorator<T>(DecoratorAttributes
            .empty<T>()
            .final()
            .setDecorator("GETTER")
            .propertyName((target:string)=>"get"+target.substr(0,1).toUpperCase()+target.substr(1,target.length))
            .setMethod(function(target:string){
                try {return this[target];}catch (e) {
                    if(orThrow) new NoSuchElementException(`Lombok : Getter element [ ${target} ] not found !`);
                    return null;
                }
            }).getSink());
    }

    public static SETTER<T>():Function{
        return DecoratorImpl.attributeDecorator<T>(DecoratorAttributes
            .empty<T>()
            .final()
            .setDecorator("SETTER")
            .propertyName((target:string)=> "set"+target.substr(0,1).toUpperCase()+target.substr(1,target.length))
            .setMethod(function(value:T,target:string){
                try{this[target] = value;}catch (e) {
                    throw new IOException(`Lombok : Setter method [ ${target} ] not found !`)
                }
                return void 0;
            }).getSink());
    }
}