/***
 * Fake Lombok :
 *
 * properties decorator :
 *  + @GETTER
 *  + @SETTER
 *
 */
import {IOException, NoSuchElementException} from "./Exception";

export module flombok{
    /***
     * Accessor prototype
     */
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
    /***
     *
     * @param readOnly
     * @param orThrow
     * @constructor
     */
    export function GETTER<T>( readOnly : boolean = false, orThrow:boolean = false  ) {
        return function (target : any, key : string ){
            let name:string=key.substr(0,1).toUpperCase()+key.substr(1,key.length);
            Object.defineProperty(target,"get"+name,{
                writable:!(readOnly),
                value:function () :T{
                    try {return this[key];}catch (e) {
                        if(orThrow) new NoSuchElementException(`flombok : Getter element [ ${key} ] not found !`)
                        return null;
                    }
                }
            });
        };
    }
    /***
     *
     * @param readOnly
     * @constructor
     */
    export function SETTER<T>(  readOnly : boolean = false  ) {
        return function (target : any, key : string ){
            let name:string=key.substr(0,1).toUpperCase()+""+key.substr(1,key.length);
            Object.defineProperty(target,"set"+name,{
                writable:!(readOnly),
                value:function ( value : T) {
                    try{this[key] = value;}catch (e) {
                        throw new IOException(`flombok : Setter method [ ${key} ] not found !`)
                    }
                }
            });
        };
    }

    /**
     * @enumerable decorator that sets the enumerable property of a class field to false.
     * @param enumerable
     * @param defaultValue true|false
     */
    export function ENUMERABLE( enumerable: boolean, defaultValue: any = null ) {
        return (target: any, propertyKey: string):any => {
            let descriptor: PropertyDescriptor;
            if (( descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {}) != defaultValue) {
                descriptor.enumerable = enumerable;
                descriptor.writable   = true;
                descriptor.value      = defaultValue;
                Object.defineProperty(target, propertyKey, descriptor);
                return void 0;
            }
        };
    }
    /**
     * @enumerable
     * @param enumerable
     */
    export function ENUMERABLEFUNC( enumerable: boolean) {
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor ) :void {
            if (( descriptor.enumerable ) != enumerable) descriptor.enumerable = enumerable;
        };
    }

    export function FINAL(  ) {
        return (target: any, propertyKey: string):any => {
            let descriptor: PropertyDescriptor;
            if (( descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {})) {
                descriptor.writable   = false;
                Object.defineProperty(target, propertyKey, descriptor);
                return void 0;
            }
        };
    }
}