import {supplier, supplierFn} from "./Interface";
/**
 * @Supplier
 */
export abstract class Supplier<T> implements supplier<T>{
    /**@override*/
    get: supplierFn<T> = ()=> void 0;
}