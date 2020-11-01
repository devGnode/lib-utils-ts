"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxy = void 0;
const List_1 = require("../List");
class Proxy {
    constructor() {
        this.proxyType = "manual";
        this.proxyAutoConfigUrl = null;
        this.ftpProxy = null;
        this.httpProxy = null;
        this.sslProxy = null;
        this.socksProxy = null;
        this.socksVersion = null;
        this.noProxy = new List_1.ArrayList();
    }
    setProxyType(type) {
        this.proxyType = type;
        return this;
    }
    setProxyAutoconfigUrl(url) {
        this.proxyAutoConfigUrl = url;
        return this;
    }
    setFtpProxy(proxy) {
        this.ftpProxy = proxy;
        return this;
    }
    setHttpProxy(proxy) {
        this.httpProxy = proxy;
        return this;
    }
    setSslProxy(proxy) {
        this.sslProxy = proxy;
        return this;
    }
    setSocksProxy(proxy) {
        this.socksProxy = proxy;
        return this;
    }
    setSocksVersion(version) {
        this.socksVersion = version;
        return this;
    }
    setNoProxy(proxy) {
        if (!this.noProxy.stream().filter(value => proxy === value).findFirst().get())
            this.noProxy.add(proxy);
        return this;
    }
    getNoProxy() { return this.noProxy.toArray(); }
    getProxyType() { return this.proxyType; }
    getProxyAutoconfigUrl() { return this.proxyAutoConfigUrl; }
    getFtpProxy() { return this.ftpProxy; }
    getHttpProxy() { return this.httpProxy; }
    getSslProxy() { return this.sslProxy; }
    getSocksProxy() { return this.socksProxy; }
    getSocksVersion() { return this.socksVersion; }
}
exports.Proxy = Proxy;
//# sourceMappingURL=Proxy.js.map