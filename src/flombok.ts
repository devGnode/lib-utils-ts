/***
 * Fake Lombok :
 *
 * properties decorator :
 *  + @GETTER
 *  + @SETTER
 *
 * @version : 0.0.1
 */
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
     * @constructor
     */
    export function GETTER<T>( readOnly : boolean = false  ) {
        return function (target : any, key : string ){
            let name:string=key.substr(0,1).toUpperCase()+key.substr(1,key.length);
            Object.defineProperty(target,"get"+name,{
                writable:!(readOnly),
                value:function () :T{return this[key];}
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
                value:function ( value : T) {this[key] = value;}
            });
        };
    }
}