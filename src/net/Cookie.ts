import "../globalUtils"
import {Define} from "../Define";
/***@toFix*/

export type cookieSameSite = "lax"|"strict"|"none"
export class Cookie{
    /**
     *
     */
    private name : String            = null;
    private value : String           = null;
    private domain : Define<string>  = Define.of(null);
    private path : String            = "/";
    private secure : boolean         = false;
    private httpOnly : boolean       = false;
    private expiry :  Define<string> = Define.of(null);
    private samesite: Define<string> = Define.of(null);
    /***
     * @param name
     * @param value
     * @param path
     * @param domain
     * @param secure
     * @param httpOnly
     * @param expiry
     * @param samesite
     */
    constructor(
        name: String            = null,
        value: String           = null,
        path:String             = "/",
        domain: string          = null,
        secure:boolean          = false,
        httpOnly:boolean        = false,
        expiry:string           = null,
        samesite:cookieSameSite = null
    ){
        this.name       = name;
        this.value      = value;
        this.path       = path;
        this.domain     = Define.of(domain);
        this.secure     = secure;
        this.httpOnly   = httpOnly;
        this.expiry     = Define.of(expiry);
        this.samesite   = Define.of(samesite);
    }

    public setName( name :string): Cookie{
        this.name  = name;
        return this;
    }

    public setValue(value :string): Cookie{
        this.value = value;
        return this;
    }

   public setPath(path : string): Cookie{
        this.path = path;
        return this;
   }

   public setDomain(domain :string): Cookie{
        this.domain = Define.of(domain);
        return this;
   }

    public setSecure(isSecure: boolean = true ): Cookie{
        this.secure = isSecure;
        return this;
    }

    public setHttpOnly(isHttp :boolean = true ): Cookie{
        this.httpOnly = isHttp;
        return this;
    }

    public setExpiry(expire: Date ): Cookie{
        this.expiry = Define.of(expire.toDateString());
        return this;
    }

    public setSameSite( sameSite : cookieSameSite ): Cookie{
        this.samesite = Define.of(sameSite);
        return this;
    }

    public getName( ): String{
        return this.name;
    }

    public getValue( ): String{
        return this.value;
    }

    public getPath( ): String{
        return this.path;
    }

    public getDomain( ): string{
        return this.domain.valueOf();
    }

    public getSecure( ): boolean{
        return this.secure;
    }

    public getHttpOnly( ): boolean{
        return this.httpOnly;
    }

    public getExpiry( ): String{
        return this.expiry.valueOf();
    }

    public toString( ): string{
        return "%s=%s;%s=%s;".format(this.getName(), this.value,"path",this.path)+
            this.domain.map(value=>value!==null?`domain=${value};`:"").get()+
            this.expiry.map(value=>value!==null?`expiry=${value};`:"").get()+
            this.secure.state("secure;","")+
            this.httpOnly.state("httpOnly;","")+
            this.samesite.map(value=>value!==null?`samesite=${value};`:"").get();
    }

    /***@toFix*/
    public static parse( cookie : string ){
       /*let cook : List<string> = cookie.explodeAsList(";"),
            tmp: List<string>, out : Cookie = new Cookie();
        tmp = cook.shift().explodeAsList("=");
        out.setName(tmp.get(0)).setValue(tmp.get(1));
        cook.stream().each(value=>{
            tmp = value.explodeAsList("=");
            switch (tmp.get(0)) {
                case 'path': out.setPath(tmp.get(1)); break;
                case 'domain': out.setDomain(tmp.get(1)); break;
                case 'samesite':  out.setDomain(tmp.get(1)); break;
                case 'httpOnly': out.setHttpOnly(true); break;
                case 'secure': out.setSecure(true); break;
            }
        });*/
        return null // out;
    }
}