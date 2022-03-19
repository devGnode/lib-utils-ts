import {Method} from "./Method";
import {Optional} from "../Optional";
import {Objects} from "../type/Objects";
import {Class} from "../Class";
import {Field} from "./Field";
/**
 *
 */
export class ObjectsReflector{

    private readonly instanced:Object;
    private readonly statics:Object;
    private readonly clazz:Class<any>;

    constructor(instanced:Object, statics:Object, clazz:Class<any>) {
        this.instanced = instanced;
        this.statics   = statics;
        this.clazz     = clazz;
    }
    /***
     * @getMethod
     * @param name : Name of target, of you want.
     * @param type : Type of accessor
     * @return Method :
     */
    public getMethod(name:string, type:number = Method.INSTANCED ):Method{
        return Optional
            .ofNullable( type&Method.STATIC ? this.statics[name]: this.instanced[name] )
            .filter((o:Object)=>Objects.typeof(o).equals("function"))
            .map((value:Function)=> value !== undefined ? new Method(value,name, type, null) : null)
            .orElse(null);
    }
    /***
     * @Warning : In Javascript is impossible to enumerate parent method static or instanced
     */
    public getMethods( ):Method[]{
        let out:Method[]= [], m:Method;

        let enumerate:string[] = Object.getOwnPropertyNames(this.statics);
        for( let tmp of enumerate )if( typeof this.statics[tmp] === "function" ) out.push(this.getMethod(tmp,Method.STATIC));
        // Static Methods
        enumerate = Object.getOwnPropertyNames(this.instanced);
        for( let tmp of enumerate )if(typeof this.instanced[tmp]==="function") out.push(this.getMethod(tmp, Method.INSTANCED));

        return out;
    }
    /***
     * @param name
     * @param type
     */
    public getField(name:string, type:number= Field.INSTANCED):Field{
        return Optional
            .ofNullable(type&Field.INSTANCED ? this.instanced[name] : this.statics[name] )
            .map(value=> value !== undefined ? new Field(name, value, type, this.clazz) : null)
            .orElse(null);
    }
    /***
     *
     * @param type
     */
    public getFields(type: number = (Field.INSTANCED|Field.STATIC)): Field[] {
        let out:Field[] = [];
        if(type&Field.INSTANCED){
            out = out.concat(Object.keys(this.instanced).map(value=>this.getField(value,Field.INSTANCED)));
        }
        if(type&Field.STATIC){
            out = out.concat(Object.keys(this.statics).map(value=>this.getField(value,Field.STATIC)));
        }
        return out;
    }
}