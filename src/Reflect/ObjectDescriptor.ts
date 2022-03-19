import {propertiesDescriptor} from "../decorator/DecoratorInterfaces";
import {Member} from "./Interfaces";
import {Method} from "./Method";
import {Field} from "./Field";
import {IOException} from "../Exception";

export class ObjectDescriptor<F extends Member,T>{

    private static readonly STATIC:number       = 1;

    public static readonly PropertiesDescriptor = class PropertiesDescriptor<T> implements propertiesDescriptor<T> {

        enumerable?: boolean    = true;
        writable?: boolean      = true;
        configurable?: boolean  = true;
        value?: T;

        get?():T
        set?(value:T):void
    };

    private prop:propertiesDescriptor<T> = null;
    private readonly target:Member;

    private constructor(target:Member) {
        this.target = target;
    }

    private static EMPTY_DESC:propertiesDescriptor<any> = new ObjectDescriptor.PropertiesDescriptor();

    private getProp():propertiesDescriptor<T>{
        if(this.prop!=null) return this.prop;
        return ( this.prop = Object.getOwnPropertyDescriptor(this.getInstance(), this.target.getName()) || new ObjectDescriptor.PropertiesDescriptor());
    }

    private getInstance():Object{
       return (this.target.getModifiers() === ObjectDescriptor.STATIC ?
           this.target.getDeclaringConstructor() :
           this.target.getDeclaringClass()).getInstance();
    }

    public isEnumerable():boolean{
        if(this.prop==null)return ObjectDescriptor.EMPTY_DESC.enumerable;
        return this.prop.enumerable;
    }

    public enumerable(state:boolean):ObjectDescriptor<F,T>{
        if(!this.isConfigurable()) throw new IOException("");
        this.getProp().enumerable = state;
        return this;
    }

    public isWritable():boolean{
        if(this.prop==null)return ObjectDescriptor.EMPTY_DESC.writable;
        return this.prop.writable;
    }

    public writable(state:boolean):ObjectDescriptor<F,T>{
        if(!this.isConfigurable()) throw new IOException();
        this.getProp().writable = state;
        return this;
    }

    public isConfigurable():boolean{
        if(this.prop==null)return ObjectDescriptor.EMPTY_DESC.configurable;
        return this.prop.configurable;
    }

    public configurable(state:boolean):ObjectDescriptor<F,T>{
        this.getProp().configurable =  state;
        return this;
    }

    public readonly():ObjectDescriptor<F,T>{return this.writable(false).configurable(false); }

    public final():ObjectDescriptor<F,T>{ return this.readonly();}

    public value(value:T):ObjectDescriptor<F,T>{
        if(this.getProp()==null)return this;
        if(!this.isConfigurable()&&!this.isWritable()&&this.prop.value!=undefined) throw new IOException(`${ObjectDescriptor.class().getName()} has failed, target '${this.target.toString()}' is already defined on ${this.target.getDeclaringConstructor().toString()}`);
        this.getProp().value = value;
        return this;
    }

    public set():F{
        if(this.prop!=null) Object.defineProperty(
            this.getInstance(),
            this.target.getName(),
            this.getProp()
        );
        return <F>this.target;
    }

    public toString():string {
        return `ObjectDescriptor[ `+
            `enumerable = ${this.isEnumerable()}, ` +
            `configurable = ${this.isConfigurable()}, ` +
            `writable = ${this.isWritable()} ] for ` +
            this.target.toString();
    }

    public static ofMethod<T>(method:Method):ObjectDescriptor<Method, T>{return new ObjectDescriptor(method);}

    public static ofAttribute<T>(field:Field):ObjectDescriptor<Field, T>{return new ObjectDescriptor(field);}
}
Object.package(this);