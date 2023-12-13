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
import {JSONException} from '../Exception';
import {iterator, List, loader, MapEntries, restHttp, wrapHeader} from "../Interface";
import {ArrayList} from "../utils/ArrayList";
import {Proxy} from "./Proxy";
import {Cookie} from "./Cookie";
import "../globalUtils"
import {Define} from "../Define";
import {Constructor} from "../Constructor";
import {HashMap} from "../utils/HashMap";
/**
 *
 */
export type httpProtoType  = "https"|"http"
export type httpMethodType = "HEAD"|"GET"|"PUT"|"POST"|"DELETE"|"CONNECT"|"TRACE"|"PATCH";
export type httpMimeType   = "text/plain"|"text/html"|"text/xml"|"text/csv"|"application/octet-stream"|"application/xml"|
                             "application/json"|"application/javascript"|"multipart/form-data"|"application/x-www-form-urlencoded"|
                             "application/xhtml+xml"|"application/ld+json" //...
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
    public static async send( rest : AbstractRestHttp ):Promise<Response>{

        let httpA : any = (rest.getProto().equals("http")?http:https),
            handle;
        return new Promise<Response>((resolve,reject)=>{
            handle = httpA.request(
                    rest.getHeaderAsObject(),
                    response=>{
                        let chunk = [];
                       if(rest.getLoader()&&(response.statusCode!==200&&!rest.getFollowRedirect()))rest.getLoader().error(`Failed to download resources, status code : ${response.statusCode}`);
                       else if(rest.getLoader()&&response.statusCode===200) {
                            let s:number = parseInt(new Response({headers: response.headers}).getHeader("content-length"))||0;
                            rest.getLoader().setSizeOf(s);
                        }
                        response.on("data",data=>{ chunk.push(data); if(rest.getLoader()&&response.statusCode===200)rest.getLoader().add(data.length); });
                        response.on("end",()=>{httpEvent.pack(resolve,response,Buffer.concat(chunk).toString(rest.getEncoding()));});
                }).on("error",error=>{
                    reject(new Response({ errorno:1,error:error }));
                });
                if(rest.getData()){
                    try{ handle.write(rest.getData());}catch (e) {
                        reject(new Response( { errorno:1,error:e }));
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

 * RESPONSE CLASS
 * Wrap getter http response
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
    /***@toFix*/
    public getCookies() : ArrayList<Cookie> {
      //  let mapToCookie : streamLambdaTo<string,Cookie>=value=>Cookie.parse(value);
       /*  return ArrayList.of<string>( this.getHeader("cookie") )
            .stream()
            .mapTo(mapToCookie)
            .getList(); */
        return null;
    }
    /***
     *
     */
    /***@toFix*/
    public getCookie( name :string ) : Cookie {
        return this.getCookies()
            .stream()
            .filter(cookie=>cookie.getValue().trim().equals(name))
            .findFirst()
            .orElse(null);
    }
    /***
     *
     */
    /***@toFix*/
    public getHeaders() : HashMap<string,any>{ return  HashMap.of<string,any>(this.response.headers); }
    /***
     *
     */
    public getHeader( name :string) : any{
        try{return this.response.headers[name]}catch (e) {
            return null;
        }
    }
    /***
     *
     */
    public getBody():string{ return this.response.body;}
    /***
     *  throwable : RuntimeException
     *
     */
    /***@toFix*/
    public getBodyAsObject():any{
        try{return JSON.parse(this.response.body);}catch (e) {
            console.log("446646", this.response.body);
            throw new JSONException(e);
        }
    }
    /***
     *
     */
    public getStatusCode( ): Number{ return Number(this.response.statusCode); }
    /***
     *
     */
    public getStatusMessage( ): string{ return this.response.statusMessage; }
    /***
     *
     */
    public contentType() : string{ return this.getHeader("Content-Type")||this.getHeader("content-type"); }
    /***
     *
     */
    public hasError( ): boolean{ return this.response.errorno>0; }
    /***
     *
     */
    public getLasError( ): string{ return this.response.error; }
    /***
     *
     * @param code
     */
    public success( code : number ): Define<Response>{
        return new Define<Response>( this.getStatusCode().equals(code) ? this : null );
    }

}
/***
 *
 */
abstract class AbstractRestHttp implements restHttp{
    /***
     *
     */
    protected encoding:BufferEncoding      = "utf-8";
    protected proto :httpProtoType         = null;
    /***@toFix*/
    protected header :HashMap<string,any>  = null;
    protected data :string                 = null;
    protected followRedirect:boolean       = false;
    private loader:loader                  = null;
    /***
     *
     */
    public getProto( ): string{ return String(this.proto);}
    /***
     *
     */
    public getHeaderAsObject( ) :any {
        let out:any = {};

        let itr:iterator<MapEntries<string, any>>,
            entry:MapEntries<string, any>;

        itr = (<HashMap<string,any>>this.header.get("headers")).entrySet().iterator();
        out.headers = {};
        while(itr.hasNext()){
            entry = itr.next();
            out.headers[ entry.getKey() ] = entry.getValue();
        }
        this.header.remove(this.header.get("headers"));
        itr = this.header.entrySet().iterator();
        while(itr.hasNext()){
            entry = itr.next();
            out[entry.getKey()] = entry.getValue();
        }
        return out
    }
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
        try{
            if(this.loader) this.loader.start("Download was successful !");
            if(this.followRedirect)return this.redirect(await httpEvent.send(this));
            return await httpEvent.send(this);
        } catch (Exception) {
            return Exception;
        }
    }
    /****
     */
    private async redirect(response: Response): Promise<Response> {
        let codes: List<number> = new ArrayList([301, 302]);
        // follow 'location' header value
        if (codes.stream().noneMatch(value => value.equals(<number>response.getStatusCode()))) return new Promise<Response>(resolve => resolve(response));
            if (codes.indexOf(response.getStatusCode())>-1) {
            let url: URL = new URL(response.getHeaders().get("location")),
                q: HttpOptions<restHttp> = url.protocol.equals("http") ? RestHttp.options() : RestHttps.options();

            let a: any = await (response.getStatusCode().equals(302) ?
                q.withMethod("GET")
                    .widthContentType("application/octet-stream")
                    .widthAccept("application/octet-stream")
                    .withHostname(url.hostname)
                    .withEndPoint(url.pathname)
                    .build()
                    .setLoader(this.getLoader())
                    .setEncoding("base64")
                    .request() :
                // 301
                q.withMethod("GET")
                    .withHostname(url.hostname)
                    .withEndPoint(url.pathname)
                    .build()
                    .setLoader(this.getLoader())
                    .withFollowRedirect(true)
                    .request())

            return this.redirect(a);
        }

    }

    public setData(data: string): void { this.data = data; }
    /***@toFix*/
    public setHeader(header:HashMap<string, any>): void { this.header = header}

    public setEncoding( encoding:BufferEncoding):restHttp{this.encoding = encoding; return  this;}

    public getEncoding( ):BufferEncoding{ return this.encoding;}

    public setLoader( pipe:loader): restHttp { this.loader = pipe; return this; }

    public getLoader( ): loader{ return this.loader; }

    public withFollowRedirect(state:boolean):restHttp{ this.followRedirect=state;return this;}

    public getFollowRedirect():boolean{return this.followRedirect;}
}
export class RestHttp extends AbstractRestHttp{
    /***
     *
     */
    protected proto : httpProtoType =  "http";
    /***
     * @param header
     * @param data
     */
    constructor( header: HashMap<string,any> = null, data : string = null) {
        super();
        this.header = header;
        this.data   = data;
    }
    /***
     * Constructor
     */
    public static options( ) : HttpOptions<RestHttp>{
        return new HttpOptions<RestHttp>( RestHttp );
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
        return new HttpOptions<RestHttps>( RestHttps );
    }
}
/***
 * Only most popular options are implemented,
 * you can add new options  yourself  it not prohibited.
 */
export class HttpOptions<T extends restHttp> implements wrapHeader<T>{

    private options :HashMap<string,any> =  new HashMap<string,any>();
    private data : object|string   = null;
    private params :HashMap<string,string> =  new HashMap<string,string>();
    private Class : Constructor<T>;

    constructor( value : Function  ){
        this.Class = value.class();
        this.options.put("headers",new HashMap<string,string>());
        this.withEndPoint("/");
        this.withPort(this.Class.newInstance().getProto().equals("https") ? 443 : 80 );
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
    /***
     * @withProxy :
     * httpProxy has [http_proxy_port] ->  [http_proxy_port] who reflect => 80
     * httpsProxy has [https_proxy_port] -> [http_proxy_port] who reflect => 443
     * now query :
     *  httpProxy -> with httpsQuery -> gotta reverse redirect protocol, otherwise follow same proto than proxy
     *      port has defined in the redirect url : port !== ( [http_proxy_port] & 80 )
     *
     *          + can be an reverse redirect protocol or simply an another server with no https,
     *            just a another service hosted under a other port than 80 or [http_proxy_port].
     *
     *  httpsProxy : same than httpProxy
     * @param proxy
     * @param noReverseProtocolFor
     */
    public withProxy( proxy : Proxy, noReverseProtocolFor: List<number> = new ArrayList() ) : HttpOptions<T>{
        let url:string = proxy.getHttpProxy(),
            host:string = this.options.get("hostname")||this.options.get("host"),
            proto:string = this.Class.newInstance().getProto(),
            originalPort:number = <number>proto.equals("http").state(80,443),
            port:number, tmp:List<string>;

        if(proto.equals("https")) url = proxy.getHttpsProxy();
        // define proxy port => url:port
        if((tmp=url.explodeAsList(":")).size().equals(2)){
            port = Number( tmp.get(1).orDefault(proto.equals("https").state("8443","8080")) );
            url = tmp.get(0);
        }else // no port defined may be properties is defined withPort method
            // otherwise default port 8080 & 8443
            port = Define.of<number>(this.options.get("port"))
                .orNull(proto.equals("http").state(8080,8443))

        if((tmp=host.explodeAsList(/:(\d+)$/)).size().equals(3)){
            if(!Number(tmp.get(1)).equals(originalPort)&&noReverseProtocolFor.indexOf(<Object>Number(tmp.get(1))).equals(-1))
                proto = proto.equals("http")?"https":"http";
        }

        return this.withEndPoint(proto+"://"+host+this.options.get("path"))
            .withPort( port )
            .withHeader("Referer",this.options.get("path"))
            .withHeader("Host",host)
            .withHostname(url);
    }
    /***
     *
     * @param params
     */
    private packParams( params:HashMap<string,string> ): string{
        let chunk:string="", mapEntry:MapEntries<string, string>,
            itr:iterator<MapEntries<string, string>> = params.entrySet().iterator();

        while(itr.hasNext()){
            mapEntry = itr.next();
            chunk += "%s=%s&".format(mapEntry.getKey(),encodeURI(mapEntry.getValue()));
        }

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
            case "object": dat = post? /*this.packParams(data)*/ void 0:JSON.stringify(data); break;
            case "string": dat = data; break;
        }
        this.data = data;
        return this.withHeader("Content-Length",dat.length);
   }
    /**
     * @param params
     */
   public withParams( params : object ): HttpOptions<T>{
       //this.params = "%s%s".format("?",this.packParams(params));
       return this;
   }

    public withParam(key:string, value:string ): HttpOptions<T>{
        this.params.put(key,value);
        return this;
    }
   /***
    * @constructor
    */
   public build() : T{
       if(!this.params.isEmpty()) this.options.put("path", (this.options.get("path")||"/")+ "%s%s".format("?",this.packParams(this.params)) );
        return this.Class.newInstance(this.options,typeof this.data === "string" ? this.data : JSON.stringify(this.data));
   }
}