import "../../src/globalUtils"
import {Func, supplier, supplierFn} from "../../src/Interface";
import {Supplier} from "../../src/Supplier";
import {Decorators} from "../../src/decorator/Decorators";
import {IOException, RuntimeException} from "../../src/Exception";

export type affectFn = ()=>void;

abstract class DecoratorSinkObj<T> implements DecoratorSink<T>{

    protected abstract prop: PropertyDescriptors<T>;
    protected name:string;
    protected propertyKey:supplier<string>;

    affect: affectFn = ()=>void 0;

    get(): PropertyDescriptors<T> {return this.prop;}

    setProp(prop:PropertyDescriptors<T>):void{
        this.prop = prop===null||prop===undefined? new PropertyDescriptors() : prop;
    }

    setName(value: string):void{console.log("dskmlqsdksqdqs",value); this.name=value; }

    getName():string{ return this.name; }

    getPropertyKey():string{ return !this.propertyKey? this.name : this.propertyKey.get(); }

    setProperty(supplier: supplier<string>):void{ this.propertyKey=supplier; }
}


class DecoratorBuilders<T> extends DecoratorSinkObj<T> implements AttributeProperties<T>{

    prop:PropertyDescriptors<T>;

    constructor(prop:PropertyDescriptors<T> = null ) { super(); this.prop = prop||new PropertyDescriptors();}

    setEnumerable(state:boolean):AttributeProperties<T>{
        let slf:this = this;
        return new class extends DecoratorBuildersStateOp<T>{

            constructor() {super(slf);}

            public affect:affectFn = ()=>{
                slf.get().enumerable = state;
                slf.affect();
            }
        }
    }

    setWrite(state:boolean):AttributeProperties<T>{
        let slf:this = this;

        return new class extends DecoratorBuildersStateOp<T>{

            constructor() {super(slf);}

            public affect:affectFn = ()=>{
                slf.affect();
                slf.get().writable = state;
            }
        }
    }

    setConfigurable(state:boolean):AttributeProperties<T>{
        let slf:this = this;

        return new class extends DecoratorBuildersStateOp<T>{

            constructor() {super(slf);}

            public affect:affectFn = ()=>{
                slf.affect();
                slf.get().configurable = state;
            }
        }
    }

    setValue(value:T):AttributeProperties<T>{
        let slf:this = this;

        return new class extends DecoratorBuildersStateOp<T>{

            constructor() {super(slf);}

            public affect:affectFn = ()=>{
                slf.affect();
                slf.get().value = value;
            }
        }
    }

    setMethod(value:Function):AttributeProperties<T>{
        let slf:this = this;

        return new class extends DecoratorBuildersStateOp<T>{

            constructor() {super(slf);}

            public affect:affectFn = ()=>{
                slf.affect();

                let t:string=this.getName();
                (<any>slf.get()).value = function(...args:Object[]):T{ args.push(t); console.log(args, t,slf.getName()); return value.apply(this,args);};
            }
        }
    }

    propertyName(consumer:Func<string, string>):AttributeProperties<T>{
        let slf:this = this;

        return new class extends DecoratorBuildersStateOp<T>{

            constructor() {super(slf);}

            public affect:affectFn = ()=>{
                slf.affect();
                let t:this= this;
                this.setProperty(new class extends Supplier<string>{
                    get:supplierFn<string> = ():string=> consumer.call(null,t.getName());
                });
            }
        }
    }

    readOnly():AttributeProperties<T>{  return this.setConfigurable(false).setWrite(false); }

    final():AttributeProperties<T>{ return this.setConfigurable(false).setWrite(false); }

    getSink():DecoratorSink<T>{ return <DecoratorSink<T>>this; }

    public static empty<T>():AttributeProperties<T>{return new DecoratorBuilders(null);}
}

class PropertyDescriptors<T> implements PropertyDescriptor {

    enumerable?: boolean    = false;
    writable?: boolean      = false;
    configurable?: boolean  = false;
    value?: T;

    get?():T
    set?(value:T):void

}

export interface AttributeProperties<T> {
    setEnumerable(state:boolean):AttributeProperties<T>
    setWrite(state:boolean):AttributeProperties<T>
    setConfigurable(state:boolean):AttributeProperties<T>
    setValue(value:T):AttributeProperties<T>
    readOnly():AttributeProperties<T>
    final():AttributeProperties<T>
    propertyName(consumer:Func<string, string>):AttributeProperties<T>
    setMethod(value:Function):AttributeProperties<T>
    getSink():DecoratorSink<T>
}
export interface DecoratorSink<T> {
    affect:affectFn;
    setProp(prop:PropertyDescriptors<T>):void
    get():PropertyDescriptors<T>
    setName(value: string):void
    getName():string
    getPropertyKey():string
    setProperty(supplier: supplier<string>):void
}



class DecoratorBuildersStateOp<T> extends DecoratorBuilders<T>{

    private readonly up: DecoratorBuilders<T>;

    constructor(up: DecoratorBuilders<T>) {
        super(up.prop);
        this.up = up;
    }

    get(): PropertyDescriptors<T> {return this.up.get();}

    setProp(prop: PropertyDescriptors<T>): void { this.up.setProp(prop);}

    setName(value: string): void {this.up.setName(value);}

    getName(): string {return this.up.getName();}

   getPropertyKey(): string {
        return this.up.getPropertyKey();
    }

    setProperty(supplier: supplier<string>): void {
        this.up.setProperty(supplier);
    }
}


abstract class Decorator{

    public static attributeDecorator<T>(propertyDecorator: DecoratorSink<T>):Function{
        return (target:any, propertyKey:string)=>{
            propertyDecorator.setProp(<PropertyDescriptor>Object.getOwnPropertyDescriptor(target, propertyKey));
            propertyDecorator.setName(propertyKey);
            propertyDecorator.affect();

            console.log("statsoc", propertyDecorator.getPropertyKey(), propertyDecorator.getName(), propertyDecorator);
            if(!propertyDecorator.get().configurable) {
                throw new RuntimeException(`@Decorator cannot configure ${propertyDecorator.getPropertyKey()}`);
            }
            Object.defineProperty(target,propertyDecorator.getPropertyKey(),propertyDecorator.get());
        }
    }

}

abstract class Lombok{

    public static PARAMETERS<T>(attributes:AttributeProperties<T>):Function{
        return Decorator.attributeDecorator<T>(attributes.getSink());
    }

    public static VALUE<T>(value:T):Function{
        return Decorator.attributeDecorator<T>(DecoratorBuilders.empty<T>().setValue(value).getSink());
    }

    public static FINAL():Function{
        return Decorator.attributeDecorator<any>(DecoratorBuilders.empty().final().getSink());
    }

    public static CONFIGURABLE(state:boolean):Function{
        return Decorator.attributeDecorator<any>(DecoratorBuilders.empty().setConfigurable(state).getSink());
    }
    /***
     * @decorator ENUMERABLE
     * @param state
     * @constructor
     */
    public static ENUMERABLE(state:boolean):Function{
        return Decorator.attributeDecorator<any>(DecoratorBuilders.empty().setEnumerable(state).getSink());
    }


    public static GETTER<T>():Function{
        let attr: AttributeProperties<T> = DecoratorBuilders
            .empty<T>()
            .final()
            .propertyName((target:string)=>"get"+target.substr(0,1).toUpperCase()+target.substr(1,target.length))
            .setMethod(function(target:string){
                return this[target];
            });
        return Decorator.attributeDecorator<T>(attr.getSink());
    }

    public static SETTER<T>(value?:T):Function{
        let attr: AttributeProperties<T> = DecoratorBuilders
            .empty<T>()
            .final()
            .propertyName((target:string)=> "set"+target.substr(0,1).toUpperCase()+target.substr(1,target.length))
            .setMethod(function(value:T,target:string){
                try{this[target] = value;}catch (e) {
                    throw new IOException(`Lombok : Setter method [ ${target} ] not found !`)
                }
                return void 0;
            });
        return Decorator.attributeDecorator<T>(attr.getSink());
    }
}

function f<T>() {
  /*  let d:DecoratorBuilders<string> = new DecoratorBuilders<string>(null).setValue('dfsdfsdfds2555').setWrites(false).setConfigurable(true);
    return (target:any, propertyKey:string)=>{
        let tmp:PropertyDescriptors<string> = <PropertyDescriptor>Object.getOwnPropertyDescriptor(target, propertyKey);
        console.log("FFFFF----FFF", tmp,"\n");
        d.setProp(tmp);
        d.affect();

       Object.defineProperty(target,propertyKey,d.get());


    };*/
    let f: AttributeProperties<string> =  new DecoratorBuilders<string>(null).setWrite(false).setConfigurable(false);
    f= f.setMethod( function(value:string,name:string) {
        console.log(this, "99---", value,name);
       // this[name]= value;
        return this[name];
    }).propertyName((value:String)=>"set"+value);
  return Decorator.attributeDecorator(f.getSink());
}
function G() {
    /*let d:DecoratorBuilders<string> = new DecoratorBuilders<string>().final("ddddd").setEnumerable(false);
    return (target:any, propertyKey:string)=>{
        let tmp:PropertyDescriptors<string> = <PropertyDescriptor>Object.getOwnPropertyDescriptor(target, propertyKey);

        tmp= tmp||new PropertyDescriptors<string>();
        //let l = Object.getOwnPropertyDescriptor(target, propertyKey);
        //l.value = "dsqxxxxxxxxxxxxxdq";
        d.setProp(tmp);
        console.log("++++++++++++++", tmp,"\n");
       d.affect();
        console.log("11111",d, d.get())

        Object.defineProperty(target,propertyKey,d.get());


    };*/
    let f: AttributeProperties<string> =  new DecoratorBuilders<string>().setEnumerable(false);

    return Decorator.attributeDecorator(DecoratorBuilders.empty().setValue("dddd").final().setEnumerable(false).getSink());
}

class Test{


  //  @G()
   // @f()
    f:string;

    //@Lombok.GETTER()
   // @Lombok.SETTER()
    ter:string;


  // @Lombok.VALUE("sds")
  // @Lombok.FINAL()
   gh:string

    @Decorators.VALUE("lol")
    @Decorators.FINAL()
    kup:string;

   constructor() {
   }
  /*  @f()
    fd(){}*/
}

console.log( new Test());

let o:Test = new Test();


console.log("KUP ", o.kup)
console.log("GH ", o.gh)
// @ts-ignore
console.log( o.setTer("4545------"))
// @ts-ignore
console.log( o.getTer());

console.log(o.f)
// @ts-ignore
console.log("here",o.setf("ds"))
o.f = 'dss';
console.log(o.f)
for( let tmp in o ){
    console.log(tmp, o[tmp])
}
