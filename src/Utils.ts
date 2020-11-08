import {newConstructor, newConstructorA} from "./Interface";

export class Utils{

    public static regExp( regexp : RegExp = /.+/, value : string, callback : Function  ){
        try{
            let tmp,toReplace;
            while(( tmp = regexp.exec(value) )){
                toReplace = callback !==undefined ? callback.call(tmp,value, tmp) : "";
                value = value.replace(tmp[0], toReplace);
            }
        }catch (e) {
            return value;
        }
        return value;
    }

    public static merge( objA : Object = {}, ...args : Object[] ) : Object{
        try{
            let i:number=0,objB:Object;
            while((objB=args[i])) {
                for (let tmp in objB) if (!objA[tmp]) objA[tmp] = objB[tmp];
                i++;
            }
        }catch (e) {return objA;}
        return objA;
    }
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