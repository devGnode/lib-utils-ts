import { ParameterMember} from "./Interfaces";
import {Class} from "../Class";
import {Constructor} from "../Constructor";
import {Method} from "./Method";

export class Parameter implements ParameterMember{

    private readonly parent:Method;
    private readonly name:string;
    private readonly index:number;

    public constructor(parent: Method, name:string, index:number) {
        this.parent     = parent;
        this.name       = name;
        this.index      = index;
    }

    public getMethod():Method{ return this.parent; }

    public getDeclaringClass(): Class<any> {return this.parent.getDeclaringClass();}

    public getDeclaringConstructor(): Constructor<any> {return this.parent.getDeclaringConstructor();}

    public getModifiers(): number {return 255;}

    public getName(): string { return this.name;}

    public getIndex():number{ return this.index; }
}