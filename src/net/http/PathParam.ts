import {PathParams} from "./EndPoint";

export class PathParam {

    private readonly pathParameters:PathParams;
    private readonly value:Object;

    public constructor(pathTemplate:PathParams, value:Object) {
        this.pathParameters = pathTemplate;
        this.value          = value;
    }

    public name():string{ return this.pathParameters.getName(); }

    public valueAsString():string{ return String(this.value); }

    public valueAsNumber():number{ return Number(this.value); }

    public valueAsBoolean():boolean{ return Boolean.of(this.value); }

    /***@override*/
    public equals(o:Object):boolean{
        if(!(o instanceof PathParam)) return false;
        return this.value == o.value && this.name().equals(o.name());
    }

    /***@override*/
    public toString():string{return `${this.pathParameters.toString()} = ${this.valueAsString()}`; }

}
Object.package(this);