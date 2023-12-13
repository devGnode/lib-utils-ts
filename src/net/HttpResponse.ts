import {IncomingMessage} from "http";
import {HashMap} from "../utils/HashMap";
import {Optional} from "../utils/Optional";


export class HttpResponse {

    private readonly messgae:IncomingMessage;

    constructor(messgae:IncomingMessage) { this.messgae = messgae; }

    public getHeaders() : HashMap<string,any>{return HashMap.of<string,any>(this.messgae.headers);}

    public getHeader( name :string):string| string[]{
        return Optional
            .ofNullable(this.messgae.headers[name])
            .orElseThrow(null);
    }

    /***
     */
    public getStatusCode( ): number{ return Number(this.messgae.statusCode); }
    /***
     */
    public getMethod( ): string{ return this.messgae.method; }
    /***
     */
    public getUrl( ): string{ return this.messgae.url; }
    /***
     */
    public getStatusMessage( ): string{ return this.messgae.statusMessage; }
    /***
     */
   // public contentType() : string{ return this.getHeader("Content-Type")||this.getHeader("content-type"); }
    /***
     */
  //  public getBody():string{ return this.messgae.body;}
}
Object.package(this);