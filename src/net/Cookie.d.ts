import "../globalUtils";
export declare type cookieSameSite = "lax" | "strict" | "none";
export declare class Cookie {
    private name;
    private value;
    private domain;
    private path;
    private secure;
    private httpOnly;
    private expiry;
    private samesite;
    constructor(name?: String, value?: String, path?: String, domain?: string, secure?: boolean, httpOnly?: boolean, expiry?: string, samesite?: cookieSameSite);
    setValue(name: String, value: String): Cookie;
    setPath(path: string): Cookie;
    setDomain(domain: string): Cookie;
    setSecure(isSecure?: boolean): Cookie;
    setHttpOnly(isHttp?: boolean): Cookie;
    setExpiry(expire: Date): Cookie;
    setSameSite(sameSite: cookieSameSite): Cookie;
    getName(): String;
    getValue(): String;
    getPath(): String;
    getDomain(): string;
    getSecure(): boolean;
    getHttpOnly(): boolean;
    getExpiry(): String;
    toString(): string;
    static parse(cookie: string): Cookie;
}
