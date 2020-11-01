"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
require("../globalUtils");
const Define_1 = require("../Define");
class Cookie {
    constructor(name = null, value = null, path = "/", domain = null, secure = false, httpOnly = false, expiry = null, samesite = null) {
        this.name = null;
        this.value = null;
        this.domain = Define_1.Define.of(null);
        this.path = "/";
        this.secure = false;
        this.httpOnly = false;
        this.expiry = Define_1.Define.of(null);
        this.samesite = Define_1.Define.of(null);
        this.name = null;
        this.value = value;
        this.path = path;
        this.domain = Define_1.Define.of(domain);
        this.secure = secure;
        this.httpOnly = httpOnly;
        this.expiry = Define_1.Define.of(expiry);
        this.samesite = Define_1.Define.of(samesite);
    }
    setValue(name, value) {
        this.name = name;
        this.value = value;
        return this;
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    setDomain(domain) {
        this.domain = Define_1.Define.of(domain);
        return this;
    }
    setSecure(isSecure = true) {
        this.secure = isSecure;
        return this;
    }
    setHttpOnly(isHttp = true) {
        this.httpOnly = isHttp;
        return this;
    }
    setExpiry(expire) {
        this.expiry = Define_1.Define.of(expire === null || expire === void 0 ? void 0 : expire.toDateString());
        return this;
    }
    setSameSite(sameSite) {
        this.samesite = Define_1.Define.of(sameSite);
        return this;
    }
    getName() {
        return this.name;
    }
    getValue() {
        return this.value;
    }
    getPath() {
        return this.path;
    }
    getDomain() {
        return this.domain.valueOf();
    }
    getSecure() {
        return this.secure;
    }
    getHttpOnly() {
        return this.httpOnly;
    }
    getExpiry() {
        return this.expiry.valueOf();
    }
    toString() {
        return "%s=%s;%s=%s;".format(this.getName(), this.value, "path", this.path) +
            this.domain.map(value => value !== null ? `domain=${value};` : "").get() +
            this.expiry.map(value => value !== null ? `expiry=${value};` : "").get() +
            this.secure.state("secure;", "") +
            this.httpOnly.state("httpOnly;", "") +
            this.samesite.map(value => value !== null ? `samesite=${value};` : "").get();
    }
    static parse(cookie) {
        let cook = cookie.explodeAsList(";"), tmp, out = new Cookie();
        tmp = cook.shift().explodeAsList("=");
        out.setValue(tmp.get(0), tmp.get(1));
        cook.stream().each(value => {
            tmp = value.explodeAsList("=");
            switch (tmp.get(0)) {
                case 'path':
                    out.setPath(tmp.get(1));
                    break;
                case 'domain':
                    out.setDomain(tmp.get(1));
                    break;
                case 'samesite':
                    out.setDomain(tmp.get(1));
                    break;
                case 'httpOnly':
                    out.setHttpOnly(true);
                    break;
                case 'secure':
                    out.setSecure(true);
                    break;
            }
        });
        return out;
    }
}
exports.Cookie = Cookie;
//# sourceMappingURL=Cookie.js.map