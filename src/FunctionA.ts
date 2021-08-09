/***
 * Wrap FunctionA
 */
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
     *
     */
    constructor( funcA: functionAConstructor) {super(null);}
    /***
     *
     * @param proto
     */
    public setPrototype(proto: Function|Object): FunctionA<T> {return <FunctionA<T>>super.setPrototype(proto);}
}