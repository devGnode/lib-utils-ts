import { ArrayList } from "../utils/ArrayList";
/***
 * RestHttp(s) v1.0.0
 *
 * @write : Maroder
 * @date : 2020-10-09
 *
 */
import {List} from "../Interface";
/****
 * ProxyType
 */
type proxyType = "pac"|"direct"|"autodetect"|"system"|"manual"
/***
 *
 */
export class Proxy {

    private proxyType : proxyType       = "manual";
    private proxyAutoConfigUrl : string = null;
    private ftpProxy : string           = null;
    private httpProxy : string          = null;
    private httpsProxy : string         = null;
    private sslProxy : string           = null;
    private socksProxy : string         = null;
    private socksVersion : string       = null;
    private noProxy : List<String>      = new ArrayList<String>();

    constructor() {}

    public setProxyType(type : proxyType) : Proxy{
        this.proxyType = type;
        return this;
    }

    public setProxyAutoconfigUrl(url : string) : Proxy{
        this.proxyAutoConfigUrl = url;
        return this;
    }

    public setFtpProxy(proxy : string) : Proxy{
        this.ftpProxy = proxy;
        return this;
    }


    public setHttpProxy(proxy : string) : Proxy{
        this.httpProxy = proxy;
        return this;
    }

    public setHttpsProxy(proxy : string) : Proxy{
        this.httpsProxy = proxy;
        return this;
    }

    public setSslProxy(proxy : string) : Proxy{
        this.sslProxy = proxy;
        return this;
    }

    public setSocksProxy(proxy : string) : Proxy{
        this.socksProxy = proxy;
        return this;
    }

    public setSocksVersion(version : string) : Proxy{
        this.socksVersion = version;
        return this;
    }

    private setNoProxy(proxy : string) : Proxy{
        if( !this.noProxy.stream().filter(value=>proxy===value).findFirst().get())this.noProxy.add(proxy);
        return this;
    }

    private getNoProxy() : Array<String>{return this.noProxy.toArray()}

    public getProxyType() : string{return this.proxyType;}

    public getProxyAutoconfigUrl( ) : string{return this.proxyAutoConfigUrl;}

    public getFtpProxy() : string{return this.ftpProxy;}

    public getHttpProxy() : string{return this.httpProxy;}

    public getHttpsProxy() : string{return this.httpsProxy;}

    public getSslProxy() : string{return this.sslProxy;}

    public getSocksProxy() : string{ return this.socksProxy; }

    public getSocksVersion() : string{ return this.socksVersion;}
}