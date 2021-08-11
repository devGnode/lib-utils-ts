import { functionAConstructor} from "./Interface";
import {ClassLoader} from "./ClassLoader";
/***
 * @FunctionA<T>
 * @package src
 * @deprecated
 * @Alternative ClassLoader
 */
export class FunctionA<T> extends ClassLoader<T>{
    /****
     * @deprecated
     * @Alternative ClassLoader
     */
    constructor( funcA: functionAConstructor) {super(null);}
    /***
     * @deprecated
     * @Alternative ClassLoader
     */
    public setPrototype(proto: Function|Object): FunctionA<T> {return <FunctionA<T>>super.setPrototype(proto);}
}