import {Constructor} from "./Constructor";
import {classLoader, functionAConstructor} from "./Interface";
import {RuntimeException} from "./Exception";
/***
 * @ClassLoader
 * @Interface   : classLoader<T> extends constructor<T>
 */
export class ClassLoader<T> extends Constructor<T> implements classLoader<T>, Function{
    /***
     *
     */
    constructor( funcA: functionAConstructor) {
        super(null);
        this.value = funcA;
        funcA.prototype = Object.create(funcA.prototype||Object());
    }
    /***
     * @param proto
     */
    public setPrototype(proto: Function|Object): ClassLoader<T> {
        this.value.prototype = proto.getClass().getType().equals("function") ?
            // @ts-ignore
            Object.create(Object.isNull(proto.prototype)?{}:proto.prototype) :
            Object.create(proto);
        return this;
    }
    /***
     * @param name
     * @param proto
     */
    public setMethod(name :string, proto: Function): ClassLoader<T> {
        Object.requireNotNull(proto);
        if(this.prototype[name]!==undefined) throw new RuntimeException(`method : ${name} already exists in @${this.getName()}`)
        this.prototype[name] = proto;
        return this;
    }
    /***
     * @param argArray
     */
    public instance(...argArray: Object[]): T {return super.newInstance(...argArray);}
}