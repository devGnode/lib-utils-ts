"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpOptions = exports.RestHttps = exports.RestHttp = exports.Response = void 0;
const http = require("http");
const https = require("https");
const Exception_1 = require("../Exception");
const List_1 = require("../List");
const Cookie_1 = require("./Cookie");
require("../globalUtils");
const Define_1 = require("../Define");
class httpEvent {
    static async send(rest) {
        let httpA = (rest.getProto().equals("http") ? http : https), handle;
        return new Promise((resolve, reject) => {
            handle = httpA.request(rest.getHeaderAsObject().toJson(), response => {
                let chunk = "";
                response.on("data", data => chunk += Buffer.from(data, "utf-8").toString());
                response.on("end", () => httpEvent.pack(resolve, response, chunk));
            }).on("error", error => {
                reject(new Response({ errorno: 1, error: error }));
            });
            if (rest.getData()) {
                try {
                    handle.write(rest.getData());
                }
                catch (e) {
                    reject(new Response({ errorno: 1, error: e }));
                }
            }
            handle.end();
        });
    }
    static pack(resolve, response, body) {
        resolve(new Response({
            errorno: 0, error: null, statusMessage: response.statusMessage,
            statusCode: response.statusCode, headers: response.headers, body: body
        }));
    }
}
class Response {
    constructor(response) {
        this.response = null;
        this.response = response;
    }
    getCookies() {
        let mapToCookie = value => Cookie_1.Cookie.parse(value);
        return List_1.ArrayList.of(this.getHeader("set-cookie"))
            .stream()
            .mapTo(mapToCookie)
            .getList();
    }
    getCookie(name) {
        return this.getCookies()
            .stream()
            .filter(cookie => cookie.getValue().equals(name))
            .findFirst()
            .orElse(null);
    }
    getHeaders() { return List_1.HashMap.of(this.response.headers); }
    getHeader(name) {
        try {
            return this.response.headers[name];
        }
        catch (e) {
            return null;
        }
    }
    getBody() { return this.response.body; }
    getBodyAsObject() {
        try {
            return JSON.parse(this.response.body);
        }
        catch (e) {
            throw new Exception_1.RuntimeException(e);
        }
    }
    getStatusCode() { return Number(this.response.statusCode); }
    getStatusMessage() { return this.response.statusMessage; }
    contentType() { return this.getHeader("Content-Type") || this.getHeader("content-type"); }
    hasError() { return this.response.errorno > 0; }
    getLasError() { return this.response.error; }
    success(code) {
        return new Define_1.Define(this.getStatusCode().equals(code) ? this : null);
    }
}
exports.Response = Response;
class AbstractRestHttp {
    constructor() {
        this.proto = null;
        this.header = null;
        this.data = null;
    }
    getProto() { return String(this.proto); }
    getHeaderAsObject() { return this.header; }
    getDataAsObject() {
        try {
            return JSON.parse(this.data);
        }
        catch (e) {
            return null;
        }
    }
    getData() { return this.data; }
    async request() {
        try {
            return await httpEvent.send(this);
        }
        catch (Exception) {
            return Exception;
        }
    }
}
class RestHttp extends AbstractRestHttp {
    constructor(header, data) {
        super();
        this.proto = "http";
        this.header = header;
        this.data = data;
    }
    static options() {
        return new HttpOptions(new RestHttp(null, null));
    }
}
exports.RestHttp = RestHttp;
class RestHttps extends RestHttp {
    constructor(header, data) {
        super(header, data);
        this.proto = "https";
    }
    static options() {
        return new HttpOptions(new RestHttps(null, null));
    }
}
exports.RestHttps = RestHttps;
class HttpOptions {
    constructor(value) {
        this.options = new List_1.HashMap({});
        this.data = null;
        this.params = "";
        this.value = null;
        this.value = value;
        this.options.put("headers", new List_1.HashMap({}));
        this.withEndPoint("/");
    }
    withHostname(hostname) {
        this.options.put("hostname", hostname);
        return this;
    }
    withPort(port) {
        this.options.put("port", port);
        return this;
    }
    withEndPoint(endPoint) {
        this.options.put("path", endPoint);
        return this;
    }
    withTimeout(timeout) {
        this.options.put("timeout", timeout);
        return this;
    }
    withMethod(method) {
        this.options.put("method", method);
        return this;
    }
    get() { return this.withMethod("GET"); }
    put() { return this.withMethod("PUT"); }
    delete() { return this.withMethod("DELETE"); }
    post() {
        if (!this.options.get("headers").get("Content-Type"))
            this.widthContentType("multipart/form-data");
        return this.withMethod("POST");
    }
    withInsecureHTTPParser(state) {
        this.options.put("insecureHTTPParser", state);
        return this;
    }
    withHeader(type, value) {
        this.options.get("headers").put(type, value);
        return this;
    }
    widthContentType(mime) {
        return this.withHeader("Content-Type", mime);
    }
    widthAccept(mime) {
        return this.withHeader("Accept", mime);
    }
    widthJson(mime) {
        this.withHeader("Accept", "application/json");
        return this.widthContentType("application/json");
    }
    withAuth(auth) {
        this.options.put("auth", auth);
        return this;
    }
    withRejectUnauthorized(state) {
        this.options.put("rejectUnauthorized", state);
        return this;
    }
    withRequestCert(state) {
        this.options.put("requestCert", state);
        return this;
    }
    withPfx(pfx) {
        this.options.put("pfx", pfx);
        return this;
    }
    withPassPhrase(passphrase) {
        this.options.put("passphrase", passphrase);
        return this;
    }
    withCACert(cacert) {
        this.options.put("cacert", cacert);
        return this;
    }
    withCert(cert) {
        this.options.put("cert", cert);
        return this;
    }
    withDhparam(dhparam) {
        this.options.put("dhparam", dhparam);
        return this;
    }
    withCrl(crl) {
        this.options.put("crl", crl);
        return this;
    }
    withSSlKey(key) {
        this.options.put("key", key);
        return this;
    }
    withCiphers(ciphers) {
        this.options.put("ciphers", ciphers.join(":"));
        return this;
    }
    withSessionTimeout(sessionTimeout) {
        this.options.put("sessionTimeout", sessionTimeout);
        return this;
    }
    withSecureOptions(value) {
        this.options.put("secureOptions", value);
        return this;
    }
    withSigalgs(value) {
        this.options.put("sigalgs", value);
        return this;
    }
    withProxy(proxy) {
        let url;
        this.withEndPoint((this.options.get("hostname") || this.options.get("host")) + this.options.get("path"));
        if (proxy.getHttpProxy().explodeAsList(":").size() === 2) {
            this.withPort(Number(proxy.getHttpProxy().explodeAsList(":").get(1)));
            url = proxy.getHttpProxy().replace(/:\d+$/, "");
        }
        this.withHostname(url || proxy.getHttpProxy());
        return this;
    }
    packParams(params) {
        let chunk = "";
        List_1.HashMap.of(params).each((value, key) => chunk += "%s=%s&".format(key, encodeURI(String(value))));
        return chunk.replace(/\&$/, "");
    }
    withPostData(data) {
        return this.withData(data, true);
    }
    withData(data, post = false) {
        let dat = "";
        switch (typeof data) {
            case "object":
                dat = post ? this.packParams(data) : JSON.stringify(data);
                break;
            case "string":
                dat = data;
                break;
        }
        this.data = data;
        return this.withHeader("Content-Length", dat.length);
    }
    withParams(params) {
        this.params = "%s%s".format("?", this.packParams(params));
        return this;
    }
    build() {
        if (!this.params.isEmpty())
            this.options.put("path", (this.options.get("path") || "/") + this.params);
        if (this.value instanceof RestHttps)
            return new RestHttps(this.options, JSON.stringify(this.data));
        return new RestHttp(this.options, JSON.stringify(this.data));
    }
}
exports.HttpOptions = HttpOptions;
//# sourceMappingURL=Http.js.map