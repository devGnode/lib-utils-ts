import {supplier, supplierFn} from "../Interface";
/**
 * @Supplier
 */
export abstract class Supplier<T> implements supplier<T>{
    /**@override*/
    get: supplierFn<T> = ()=> void 0;
    /***
     * @adapt
     * @params supplierA
     * @returns Supplier<T>
     */
    public static adapt<T>(supplierA:Supplier<T>|Function):Supplier<T>{
        if(supplierA instanceof Supplier )return supplierA;
        return new class extends Supplier<T> {
            get:supplierFn<T> = ():T=> typeof  supplierA === "function" ? <T>supplierA() : null;
        };
    }
}
Object.package(this);