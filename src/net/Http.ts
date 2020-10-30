/***
 * RestHttp(s) v1.0.0
 *
 * @write : Maroder
 * @date : 2020-10-09
 *
 * Not3 :
 * Basic send http(s) query, these object that allow to mount a http query doesn't check integrity of data sending,
 * its just a wrap around the different options supported by node http(s). for the version 1.0.x only most popular
 * options are supported for wrapping data, SSL/TLS options are supported. Some check are making when you have ending
 * to informing the different options of the query with the `build` and `post` methods will make a minimal check of :
 *  + Made a concat with hostname + query_params variable
 *  + Will set "multipart/form-data" at Content-Type header property if this one is not defined.
 *  + Proxy replace path and hostname
 *
 *  much things staying to do ... but I make sure that a basic request will be made,
 *  I tried to respect the typescript and object dev rules as much as possible, like Java IORestAssured
 *
 *  exportable :
 *      - HttpOptions<T> :  T is ResHttp or ResHttps object
 *      - RestHttp(s) : builder a new object with static constructor handler `options`
 *      - Response :  Getter class
 *
 * All errors message are redirecting to Response Object.
 */
import * as http from "http";
import * as https from "https";
import {RuntimeException} from '../Exception';
import {streamLambdaTo} from "../Interface";
import {ArrayList, HashMap} from "../List";
import {Proxy} from "./Proxy";
import {Cookie} from "./Cookie";
import "../globalUtils"
/**
 *
 */
export type httpProtoType  = "https"|"http"
export type httpMethodType = "HEAD"|"GET"|"PUT"|"POST"|"DELETE"|"CONNECT"|"TRACE"|"PATCH";
export type httpMimeType   = "text/plain"|"text/html"|"text/xml"|"text/csv"|"application/octet-stream"|"application/xml"|
                             "application/json"|"application/javascript"|"multipart/form-data"|"application/x-www-form-urlencoded"|
                             "application/xhtml+xml"|"application/ld+json" //...
/***
 *
 */
export interface wrapHeader<T> {
    build( ) : T
}
/***
 * I keep this static class in private for this moment,
 * but... it is only used to send requests
 */
class httpEvent{
    /****
     * + May be make a try/catch wrap on 'handle' variable, in order
     *   to return a RuntimeException when an error is throwing.
     *
     * @param rest
     */
    public static async send( rest : AbsRestHttp ):Promise<Response>{
        let httpA : any = (rest.getProto().equals("http")?http:https),
            handle;
        return new Promise<Response>((resolve,reject)=>{
            handle = httpA.request(
                    rest.getHeaderAsObject().toJson(),
                    response=>{
                        let chunk = "";
                        response.on("data",data=>chunk+=Buffer.from(data,"utf-8").toString());
                        response.on("end",()=>httpEvent.pack(resolve,response,chunk));
                }).on("error",error=>{
                    reject(new Response({ errorno:1,error:error }));
                });
                if(rest.getData()){
                    try{ handle.write(rest.getData());}catch (e) {
                        reject(new Response( { errorno:1, error:e }));
                    }
                }
            handle.end();
        });
    }
    /***
     * Repack response data
     * @param resolve
     * @param response
     * @param body
     */
    private static pack( resolve : Function, response : any, body : string ): void{
        resolve(new Response({
            errorno:0,error:null,statusMessage: response.statusMessage,
            statusCode:response.statusCode, headers: response.headers, body: body
        }));
    }
}
/***
 *
 */
export class Response {
    /***
     *
     */
    private response : any = null;
    /***
     * @param response
     */
    constructor( response : any ) { this.response = response;}
    /***
     *
     */
    getCookies() : ArrayList<Cookie> {
        let mapToCookie : streamLambdaTo<string,Cookie>=value=>Cookie.parse(value);
        return ArrayList.of<string>( this.getHeader("set-cookie") )
            .stream()
            .mapTo(mapToCookie)
            .getList();
    }
    /***
     *
     */
    getCookie( name :string ) : Cookie {
        return this.getCookies()
            .stream()
            .filter(cookie=>cookie.getValue().equals(name))
            .findFirst()
            .orElse(null);
    }
    /***
     *
     */
    getHeaders() : HashMap<string,any>{ return HashMap.of<string,any>(this.response.headers); }
    /***
     *
     */
    getHeader( name :string) : any{
        try{return this.response.headers[name]}catch (e) {
            return null;
        }
    }
    /***
     *
     */
    getBody():string{ return this.response.body;}
    /***
     *  throwable : RuntimeException
     *
     */
    getBodyAsObject():any{
        try{return JSON.parse(this.response.body);}catch (e) {
            throw new RuntimeException(e);
        }
    }
    /***
     *
     */
    getStatusCode( ): number{ return this.response.statusCode; }
    /***
     *
     */
    getStatusMessage( ): string{ return this.response.statusMessage; }
    /***
     *
     */
    contentType() : string{ return this.getHeader("Content-Type")||this.getHeader("content-type"); }
    /***
     *
     */
    hasError( ): boolean{ return this.response.errorno>0; }
    /***
     *
     */
    getLasError( ): string{ return this.response.error; }
}
/***
 *
 */
abstract class AbsRestHttp{

    protected proto : httpProtoType = null;
    protected header : HashMap<string,any> = null;
    protected data : string  = null;
    /***
     *
     */
    public getProto( ): string{ return String(this.proto);}
    /***
     *
     */
    public getHeaderAsObject( ) : HashMap<string,any> {return this.header}
    /***
     *
     */
    public getDataAsObject( ) :any{
        try{return JSON.parse(this.data);}catch (e) {
            return null;
        }
    }
    /***
     *
     */
    public getData( ): string { return this.data;}
    /***
     * @async
     */
    public async request( ) : Promise<Response>{
        try{return await httpEvent.send(this);} catch (Exception) {
            return Exception;
        }
    }
}
export class RestHttp extends AbsRestHttp{
    /***
     *
     */
    protected proto : httpProtoType =  "http";
    /***
     * @param header
     * @param data
     */
    constructor( header : HashMap<string,any>, data : string) {
        super();
        this.header = header;
        this.data   = data;
    }
    /***
     * Constructor
     */
    public static options( ) : HttpOptions<RestHttp>{
        return new HttpOptions<RestHttp>( new RestHttp(null,null) );
    }
}

export class RestHttps extends RestHttp{
    /***
     *
     */
    protected proto : httpProtoType =  "https";
    /***
     * @param header
     * @param data
     */
    constructor(header : HashMap<string,any>, data : string) {super(header,data); }
    /***
     * Constructor
     */
    public static options( ) : HttpOptions<RestHttps>{
        return new HttpOptions<RestHttps>( new RestHttps(null,null) );
    }
}
/***
 * Only most popular options are implemented,
 * you can add new options  yourself  it not prohibited.
 */
export class HttpOptions<T> implements wrapHeader<T>{

    private options : HashMap<string,any> = new HashMap<string,any>({});
    private data : object|string   = null;
    private params : string        = "";
    private value : T              = null;

    constructor( value : T  ){
        this.value=value;
        this.options.put("headers",new HashMap<string,string>({}));
        this.withEndPoint("/");
    }
    /***
     *
     */
    public withHostname( hostname : string ) : HttpOptions<T>{
        this.options.put("hostname",hostname);
        return this;
    }

    public withPort( port : number): HttpOptions<T>{
        this.options.put("port",port);
        return this;
    }

    public withEndPoint(endPoint : string): HttpOptions<T>{
        this.options.put("path",endPoint);
        return this;
    }

    public withTimeout( timeout : number ): HttpOptions<T>{
        this.options.put("timeout",timeout);
        return this;
    }
    /***
     * Method Area
     */
    public withMethod(method : httpMethodType ): HttpOptions<T>{
        this.options.put("method",method);
        return this;
    }

    public get( ) : HttpOptions<T>{return this.withMethod("GET");}

    public put( ) : HttpOptions<T>{return this.withMethod("PUT");}

    public delete( ) : HttpOptions<T>{return this.withMethod("DELETE");}

    public post( ) : HttpOptions<T>{
        if( !this.options.get("headers").get("Content-Type") )this.widthContentType("multipart/form-data");
        return this.withMethod("POST");
    }

    public withInsecureHTTPParser(  state : boolean ) : HttpOptions<T>{
        this.options.put("insecureHTTPParser",state);
        return this;
    }
    /***
     * Headers Are
     */
    public withHeader(type :string, value : any ): HttpOptions<T>{
       this.options.get("headers").put( type, value);
       return this;
    }

    public widthContentType( mime : httpMimeType|string ): HttpOptions<T> {
        return this.withHeader("Content-Type",mime);
    }

    public widthAccept( mime : httpMimeType|string ):  HttpOptions<T> {
        return this.withHeader("Accept", mime );
    }

    public widthJson( mime : httpMimeType|string ):  HttpOptions<T> {
        this.withHeader("Accept", "application/json" );
        return this.widthContentType("application/json" );
    }
    /***
     * Auth Area
     */
    public withAuth( auth : string ): HttpOptions<T>{
        this.options.put("auth",auth);
        return this;
    }
   /***
    * SSL/TLS options
    *
    */
   public withRejectUnauthorized( state : boolean ): HttpOptions<T>{
        this.options.put("rejectUnauthorized",state);
        return this;
   }

   public withRequestCert( state : boolean ): HttpOptions<T> {
       this.options.put("requestCert",state);
        return this;
   }

   public withPfx( pfx : Buffer|string ): HttpOptions<T>{
        this.options.put("pfx",pfx);
        return this;
   }

   public withPassPhrase( passphrase : string ): HttpOptions<T>{
        this.options.put("passphrase",passphrase);
        return this;
   }

    public withCACert( cacert : Buffer|string ): HttpOptions<T>{
        this.options.put("cacert",cacert);
        return this;
    }

    public withCert( cert : Buffer|string ): HttpOptions<T>{
        this.options.put("cert",cert);
        return this;
    }

    public withDhparam( dhparam : string ): HttpOptions<T>{
        this.options.put("dhparam",dhparam);
        return this;
    }

    public withCrl( crl : Buffer|string ): HttpOptions<T>{
        this.options.put("crl",crl);
        return this;
    }

    public withSSlKey( key : string ): HttpOptions<T>{
        this.options.put("key",key);
        return this;
    }

    public withCiphers( ciphers : Array<String> ) :  HttpOptions<T>{
        this.options.put("ciphers",ciphers.join(":"));
        return this;
    }

    public withSessionTimeout( sessionTimeout : number ) : HttpOptions<T>{
        this.options.put("sessionTimeout",sessionTimeout);
        return this;
    }

    public withSecureOptions( value : number ): HttpOptions<T>{
        this.options.put("secureOptions",value);
        return this;
    }

    public withSigalgs( value : string ): HttpOptions<T>{
        this.options.put("sigalgs",value);
        return this;
    }

   public withProxy( proxy : Proxy ) : HttpOptions<T>{
       let url : string;
       this.withEndPoint((this.options.get("hostname")||this.options.get("host"))+this.options.get("path"));
       if( proxy.getHttpProxy().explodeAsList(":").size()===2){
          this.withPort(Number( proxy.getHttpProxy().explodeAsList(":").get(1) ));
          url = proxy.getHttpProxy().replace(/:\d+$/,"");
       }
       this.withHostname(url||proxy.getHttpProxy());
       return this;
   }
    /***
     *
     * @param params
     */
    private packParams( params : object ): string{
        let chunk="";
        HashMap.of<string,any>(params).each((value,key)=>chunk += "%s=%s&".format(key,encodeURI(String(value))));
        return chunk.replace(/\&$/,"");
    }

   public withPostData( data : object|string ): HttpOptions<T>{
        return this.withData(data,true);
   }
    /***
     * Method throwable : JSON.Parse
     * @param data
     * @param post
     */
   public withData(data : object|string, post: boolean = false ): HttpOptions<T>{
        let dat="";
        switch (typeof data) {
            case "object": dat = post? this.packParams(data):JSON.stringify(data); break;
            case "string": dat = data; break;
        }
        this.data = data;
        return this.withHeader("Content-Length",dat.length);
   }
    /**
     * @param params
     */
   public withParams( params : object ): HttpOptions<T>{
       this.params = "%s%s".format("?",this.packParams(params));
       return this;
   }
   /***
    * @constructor
    */
   public build() : T{
       if(!this.params.isEmpty()) this.options.put("path", (this.options.get("path")||"/")+this.params );
        return this.value.constructor(this.options,this.data);
   }
}