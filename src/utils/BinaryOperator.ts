import {Objects} from "../type/Objects";
import {BiFunctionImpl} from "./BiFunctionImpl";
import {comparator} from "../Interface";

export abstract class BinaryOperator<T> extends BiFunctionImpl<T, T, T>{

    private constructor() {super();}

    public static minBy?<T>(comparator:comparator<T>):BinaryOperator<T>{
        Objects.requireNotNull(comparator);
        return new class extends BinaryOperator<T>{
            apply = (a: T, b: T): T => comparator.compare(a,b) <= 0  ? a : b;
        };
    }

    public static maxBy?<T>(comparator:comparator<T>):BinaryOperator<T>{
        Objects.requireNotNull(comparator);
        return new class extends BinaryOperator<T>{
            apply = (a: T, b: T): T => comparator.compare(a,b) >= 0  ? a : b;
        };
    }

    public static from<T>(other:Function):BinaryOperator<T>{
        if(other instanceof BinaryOperator) return other;
        return new class extends BinaryOperator<T>{
            apply = (a: T, b: T): T => other(a, b);
        };
    }

    public call(thisArg: any, ...argArray:any[]): any {return this.apply((<any>argArray)[0],(<any>argArray)[1]);}
}
Object.package(this);