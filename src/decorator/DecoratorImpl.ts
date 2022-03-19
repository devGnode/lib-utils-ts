import {AttributeDecoratorPipe, AttributeProperties, DecoratorSink, propertiesDescriptor} from "./DecoratorInterfaces";
import {RuntimeException} from "../Exception";
import {format} from "util";

export interface InterfaceMock {
    action();
}

export abstract class DecoratorImpl {
    /***/
    private static readonly THROW_ELEMENT_LOCK:string = "@%s annotation failed [ '%s' ] property is not configurable !";
    //
    private static readonly THROW_ALREADY_EXISTS:string = "@%s already defined";
    /***
     *
     */
    public static readonly AttributesDescriptor = class AttributesDescriptor<T> implements propertiesDescriptor<T> {

        enumerable?: boolean    = false;
        writable?: boolean      = false;
        configurable?: boolean  = true;
        value?: T;

        get?():T
        set?(value:T):void

        constructor() {}
    };

    /***/
    public static AttributeAnnotation(){

    }
    /***
     * @attributeDecorator
     * @param propertyDecorator
     */
    public static attributeDecorator<T>(propertyDecorator: DecoratorSink<T>):Function{
        return (target:any, propertyKey:string)=>{
            let msg:string, name:string="Anonymous",
                prop:propertiesDescriptor<T>;

            propertyDecorator.setProp(Object.getOwnPropertyDescriptor(target, propertyKey));
            if((!(prop=propertyDecorator.get()).configurable||!prop.writable)&&prop.value!==undefined) {
                msg =DecoratorImpl.THROW_ALREADY_EXISTS;
            }else if(!prop.configurable){
                msg = DecoratorImpl.THROW_ELEMENT_LOCK;
            }

            propertyDecorator.setName(propertyKey);
            propertyDecorator.affect();

            switch (typeof target) {
                case "object":   name = target.getClass().getName(); break;
                case "function": name =target.class().getName(); break;
            }
            propertyDecorator.setDecorator(format(propertyDecorator.getDecorator(),name));

            if(/*!Objects.isNull(*/msg!==null&&msg!==undefined/*)*/) throw new RuntimeException(format(msg,propertyDecorator.getDecorator(), propertyDecorator.getPropertyKey()));
            Object.defineProperty(target,propertyDecorator.getPropertyKey(),propertyDecorator.get());
        }
    }
    /***
     * @attributeDecoratorPipe
     * @param propertyDecorator
     */
    public static attributeDecoratorPipe<T>(propertyDecorator: AttributeProperties<Object>):AttributeDecoratorPipe<T>{
        return new class implements AttributeDecoratorPipe<T> {

            get(consumer: Function):Function{
               // Objects.requireNotNull(consumer);
                return (target:any, propertyKey:string)=>{
                    let dec:string = propertyDecorator.getSink().getDecorator();
                    // apply Hooks
                    DecoratorImpl.attributeDecorator(
                        /*Objects.requireNotNull(*/consumer(propertyDecorator,target,propertyKey)/*)*/
                        .setDecorator((dec?dec+".":"")+"%s."+propertyKey.toUpperCase())
                        .getSink()

                    ).call( this, target, propertyKey);
                }
            }

        }


    }
}