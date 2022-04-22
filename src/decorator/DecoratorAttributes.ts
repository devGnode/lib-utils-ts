import {Func, supplierFn,supplier} from "../Interface";
import {Supplier} from "../utils/Supplier";
import {AbstractDecorator} from "./AbstractDecorator";
import {affectFn, AttributeProperties, DecoratorSink, propertiesDescriptor} from "./DecoratorInterfaces";

export class DecoratorAttributes<T> extends AbstractDecorator<T> implements AttributeProperties<T>{

    protected decorator: string;

    prop:propertiesDescriptor<T>;

    constructor(prop:propertiesDescriptor<T> = null ) {super();}

    setEnumerable(state:boolean):AttributeProperties<T>{
        let slf:this = this;
        return new class extends DecoratorBuilderStateOp<T>{

            constructor() {super(slf);}
            /***@Override**/
            public affect:affectFn = ()=>{
                slf.get().enumerable = state;
                slf.affect();
            }
        }
    }

    setWrite(state:boolean):AttributeProperties<T>{
        let slf:this = this;
        return new class extends DecoratorBuilderStateOp<T>{

            constructor() {super(slf);}
            /***@Override**/
            public affect:affectFn = ()=>{
                slf.affect();
                slf.get().writable = state;
            }
        }
    }

    setConfigurable(state:boolean):AttributeProperties<T>{
        let slf:this = this;
        return new class extends DecoratorBuilderStateOp<T>{

            constructor() {super(slf);}
            /***@Override**/
            public affect:affectFn = ()=>{
                slf.affect();
                slf.get().configurable = state;
            }
        }
    }

    setValue(value:T):AttributeProperties<T>{
        let slf:this = this;
        return new class extends DecoratorBuilderStateOp<T>{

            constructor() {super(slf);}
            /***@Override**/
            public affect:affectFn = ()=>{
                slf.affect();
                slf.get().value = value;
            }
        }
    }

    setMethod(value:Function):AttributeProperties<T>{
        let slf:this = this;
        return new class extends DecoratorBuilderStateOp<T>{

            constructor() {super(slf);}
            /***@Override**/
            public affect:affectFn = ()=>{
                slf.affect();
                (<any>slf.get()).value = function(...args:Object[]):T{
                    args.push(slf.getName());
                    return value.apply(this,args);
                };
            }
        }
    }

    propertyName(consumer:Func<string, string>):AttributeProperties<T>{
        let slf:this = this;
        return new class extends DecoratorBuilderStateOp<T>{

            constructor() {super(slf);}
            /***@Override**/
            public affect:affectFn = ()=>{
                slf.affect();
                let t:this= this;
                this.setProperty(new class extends Supplier<string>{
                    get:supplierFn<string> = ():string=> consumer.call(null,t.getName());
                });
            }
        }
    }

    readOnly():AttributeProperties<T>{ return this.setConfigurable(false).setWrite(false); }

    final():AttributeProperties<T>{ return this.setConfigurable(false).setWrite(false); }

    getSink():DecoratorSink<T>{ return <DecoratorSink<T>>this; }

    /***@ts-ignore*/
    setDecorator(decorator:string):AttributeProperties<T>{  this.decorator = decorator; return this; }
    /***
     *
     */
    public static empty<T>():AttributeProperties<T>{return new DecoratorAttributes(null);}
}
/****
 *
 */
class DecoratorBuilderStateOp<T> extends DecoratorAttributes<T>{

    private readonly up: DecoratorAttributes<T>;

    constructor(up: DecoratorAttributes<T>) {
        super(up.prop);
        this.up = up;
    }

    get():propertiesDescriptor<T> {return this.up.get();}

    setProp(prop: propertiesDescriptor<T>): void { this.up.setProp(prop);}

    setName(value: string): void {this.up.setName(value);}

    getName(): string {return this.up.getName();}

    getPropertyKey(): string {return this.up.getPropertyKey();}

    setProperty(supplier: supplier<string>): void {this.up.setProperty(supplier);}

    setDecorator(decorator: string): AttributeProperties<T> {this.up.setDecorator(decorator);return this;}

    getDecorator(): string { return this.up.getDecorator();}

}