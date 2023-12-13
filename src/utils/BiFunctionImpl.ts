import {BiFunction} from "../Interface";

export class BiFunctionImpl<T,U,R> extends Function implements BiFunction<T,U,R>{

    public apply(a:T, b:U):R{ return this.call(null, a, b); }

    public static of<T, U, R>(func:Function):BiFunctionImpl<T, U, R>{
        if(func instanceof BiFunctionImpl)return func;
         return new class BiFunction<T, U, R> extends BiFunctionImpl<T, U, R>{
             apply(a: T, b: U): R {return func(a,b);}
         }
     }

    public call(thisArg: any, ...argArray:any[]): any {return this.apply(argArray[0],argArray[1]);}
}
Object.package(this);