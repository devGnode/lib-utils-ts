/***
 * Wrap FunctionA
 */
import {Constructor} from "./Constructor";
import {functionA, functionAConstructor} from "./Interface";
import {Define} from "./Define";
/***
 *
 */
export class FunctionA<T> extends Constructor<T> implements functionA<T>, Function{

    constructor( funcA: functionAConstructor) {
        super(null);
        this.value = funcA;
        funcA.prototype = Object.create(funcA.prototype||Object());
    }
    /***
     *
     * @param proto
     */
    public setPrototype(proto: Function|Object): FunctionA<T> {
        this.value.prototype = proto.getClass().getType().equals("function") ?
            // @ts-ignore
            Object.create(proto.prototype) :
            Object.create(proto);
        return this;
    }
    /***
     * @param argArray
     */
    public instance(...argArray: Object[]): T {return super.newInstance(...argArray);}
}