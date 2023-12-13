import {IllegalArgumentException} from "../../Exception";
import {Objects} from "../../type/Objects";
import {HttpHandler} from "./interfaces";
import {HttpMethod} from "./HttpMethod";
import {Endpoint, HttpEndpointTemplate} from "./EndPoint";
import {List} from "../../Interface";
import {ArrayList} from "../../utils/ArrayList";

export class HttpContext {

    private readonly protocol:string;
    private readonly endPoint:List<HttpEndpointTemplate>;
    private caller:HttpHandler;

    public constructor(protocol:string, path:string, callback:HttpHandler, method:HttpMethod, server:Object ) {

        this.protocol = HttpContext.checkProtocol(protocol);
        this.caller   = callback;
        this.endPoint = new ArrayList();
        this.endPoint.add(Endpoint.endpointTemplate(method,path));
    }

    private static checkProtocol(protocol:string):string{
        switch (protocol=protocol.toLowerCase()) {
            case "http"||"HTTP"||"https"||"HTTPS": return protocol;
            default: throw new IllegalArgumentException(`Not supported value protocol '${protocol}'`);
        }
    }

    public setCaller(fct:HttpHandler):void{
        if(this.caller!==null) throw new IllegalArgumentException(`Caller is already defined !`);
        this.caller = Objects.requireNotNull(fct,`Caller can't be null !`);
    }

    public getProtocol():string{ return this.protocol; }

    public getCaller():HttpHandler{ return this.caller; }

    public getTemplateEndpoint(path:string):HttpEndpointTemplate{
        return this.endPoint
            .stream()
            .filter((value:HttpEndpointTemplate)=>value.is(path))
            .findFirst()
            .orElse(null);
    }

    public getEndpoints():List<HttpEndpointTemplate>{ return this.endPoint; }

    public addEndpointTemplate(endpoint:HttpEndpointTemplate):void{this.endPoint.add(endpoint);}

    public getPath():string{return null;}

    public equals(o:Object){
        if(this===o) return true;
        if(o==null||!(o instanceof HttpContext)) return false;
        return this.getProtocol().equals(o.getProtocol()) //&&
         //   this.hasTemplateEndpoint(o.getPath());
    }
}
Object.package(this);