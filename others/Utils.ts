import {newConstructor, newConstructorA} from "../src/Interface";

export class Utils{

    /****
     * @Reflect : Constructor<T> , Class<T>
     * I keep this there, but ... for get around error 'need of `new` for build a new object',
     * cause when you declare a class with `class` annotation , you don't can build an object
     * like an function with apply or call function if you have several arguments to pass in
     * your constructor or bypass the error with a partial reflect method so just use this,
     *  no need to pass by all that, but idea is good :  -> [ ... args ] like,
     *
     *  ( ... args : Object[] ) => new constructor( ... args ).
     *
     * https://stackoverflow.com/questions/38754854/in-typescript-can-a-class-be-used-without-the-new-keyword/54455994
     * https://github.com/rsp/ts-no-new/blob/master/rsp-2-7/rsp-no-new-7.ts
     * @param Class
     * @constructor
     */
    public ClassCast<T>( Class: newConstructor<T> ) : newConstructorA<T>{
        return new Proxy(Class,{
            apply : (target: newConstructor<T>, thisArg: any, argArray?: any): any => new (<any>target)(... argArray)
        }) as newConstructorA<T>;
    }

}