import {propertiesDescriptor} from "../decorator/DecoratorInterfaces";
import {Decorators as A} from "../decorator/Decorators";
import {Objects} from "../type/Objects";

export abstract class ObjectDescriptor{

    private constructor() {}

    public static readonly PropertiesDescriptor = class PropertiesDescriptor<T> implements propertiesDescriptor<T> {

        enumerable?: boolean    = false;
        writable?: boolean      = false;
        configurable?: boolean  = true;
        value?: T;

        get?():T
        set?(value:T):void

        constructor() {}
    };


}

class PropertyBuilder<T>{

    private readonly properties:propertiesDescriptor<T>;

    constructor( properties:propertiesDescriptor<T> ) {
        this.properties = properties || new ObjectDescriptor.PropertiesDescriptor<T>();
    }

    enumerable(state:boolean):void{ this.properties.enumerable = state; }

    writable(state:boolean):void{ this.properties.writable = state; }

    configurable(state:boolean):void{ this.properties.configurable =  state; }

    readonly(){ this.writable(false); this.configurable(false); }

    final(){this.readonly();}

    value(value:T){ this.properties.value = value; }

    getDescriptor():propertiesDescriptor<T>{ return this.properties; }

}

let ter:propertiesDescriptor<void> = new ObjectDescriptor.PropertiesDescriptor();
