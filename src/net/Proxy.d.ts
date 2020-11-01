declare type proxyType = "pac" | "direct" | "autodetect" | "system" | "manual";
export declare class Proxy {
    private proxyType;
    private proxyAutoConfigUrl;
    private ftpProxy;
    private httpProxy;
    private sslProxy;
    private socksProxy;
    private socksVersion;
    private noProxy;
    constructor();
    setProxyType(type: proxyType): Proxy;
    setProxyAutoconfigUrl(url: string): Proxy;
    setFtpProxy(proxy: string): Proxy;
    setHttpProxy(proxy: string): Proxy;
    setSslProxy(proxy: string): Proxy;
    setSocksProxy(proxy: string): Proxy;
    setSocksVersion(version: string): Proxy;
    private setNoProxy;
    private getNoProxy;
    getProxyType(): string;
    getProxyAutoconfigUrl(): string;
    getFtpProxy(): string;
    getHttpProxy(): string;
    getSslProxy(): string;
    getSocksProxy(): string;
    getSocksVersion(): string;
}
export {};
