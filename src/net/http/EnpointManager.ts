import {HttpEndpointTemplate} from "./EndPoint";
import {List} from "../../Interface";
import {ArrayList} from "../../utils/ArrayList";
import {HttpMethod} from "./HttpMethod";
import {Nested} from "../../annotation/Nested";
import {HttpContext} from "./HttpContext";

const {NestedClass} = Nested;

interface EdI {
    getContext():HttpContext
    has(method:HttpMethod, path:string):boolean
}
export class EnpointManager {

    @NestedClass
    private static readonly Ed = class Ed implements EdI{
        context:HttpContext;
        endpoint:HttpEndpointTemplate;

        constructor(context:HttpContext, endpoint:HttpEndpointTemplate) {
            this.context    = context;
            this.endpoint   = endpoint;
        }

        public getContext():HttpContext{ return this.context; }

        public has(method:HttpMethod, path:string):boolean{return this.endpoint.is(path)&&this.endpoint.hasMethod(method);}

    };

    private readonly endpoints:List<EdI>;

    public constructor() { this.endpoints = new ArrayList(); }

    public add(context:HttpContext, endpoint:HttpEndpointTemplate ):void{

    }

    public find(method:HttpMethod, path:string):any/*HttpContext*/{
         this.endpoints
            .stream()
            .filter((value:EdI)=>value.has(method,path))
            .findFirst()
            .get();

    }

    public static getHttpMethod(method:string):HttpMethod{return HttpMethod.valueOf(method.toUpperCase());}

}

//new EnpointManager().find()