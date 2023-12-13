import {HttpContext} from "./HttpContext";
import {List, predication} from "../../Interface";
import {ArrayList} from "../../utils/ArrayList";
import {Objects} from "../../type/Objects";
import {HttpMethod} from "./HttpMethod";
import {HttpHandler} from "./interfaces";
import {HttpEndpointTemplate} from "./EndPoint";

export class ContextList {

    private readonly context:List<HttpContext>;

    public constructor() {this.context =  new ArrayList();}

    public size():number{ return this.context.size(); }
    /***
     * Check Endpoint
     * @param {string} protocol
     * @param {HttpMethod} method
     * @param {string} path
     * @return {predication<HttpContext>}
     */
    private is(protocol:string, method:HttpMethod, path:string ):predication<HttpContext>{
        return (context:HttpContext):boolean => {
            let template:HttpEndpointTemplate;
           return context.getProtocol().equals(protocol)
            && (template=context.getTemplateEndpoint(path))
            && ( (method == null||context.getEndpoints().size() === 0) || (template && template.hasMethod(method)) );
        };
    }
    /***
     * Find Route
     * @param {string} protocol
     * @param {string} path
     * @param {HttpMethod} method
     * @return {HttpContext}
     */
    public find(protocol:string, path:string, method:HttpMethod = null ):HttpContext{
        return this.context
            .stream()
            .filter(this.is(protocol, method, path))
            .findFirst()
            .orElse(null)
    }

    public findByHandler(handler:HttpHandler):HttpContext{
        return this.context
            .stream()
            .filter((context:HttpContext)=>context.getCaller().hash().equals(handler.hash()))
            .findFirst()
            .orElse(null);
    }

    public add(context:HttpContext):void{this.context.add(Objects.requireNotNull(context));}

    public removeContext(context:HttpContext):void{this.context.remove(Objects.requireNotNull(context));}
}
Object.package(this);