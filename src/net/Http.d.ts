/// <reference types="node" />
import { ArrayList, HashMap } from "../List";
import { Proxy } from "./Proxy";
import { Cookie } from "./Cookie";
import "../globalUtils";
import { Define } from "../Define";
export declare type httpProtoType = "https" | "http";
export declare type httpMethodType = "HEAD" | "GET" | "PUT" | "POST" | "DELETE" | "CONNECT" | "TRACE" | "PATCH";
export declare type httpMimeType = "text/plain" | "text/html" | "text/xml" | "text/csv" | "application/octet-stream" | "application/xml" | "application/json" | "application/javascript" | "multipart/form-data" | "application/x-www-form-urlencoded" | "application/xhtml+xml" | "application/ld+json";
export interface wrapHeader<T> {
    build(): T;
}
export declare class Response {
    private response;
    constructor(response: any);
    getCookies(): ArrayList<Cookie>;
    getCookie(name: string): Cookie;
    getHeaders(): HashMap<string, any>;
    getHeader(name: string): any;
    getBody(): string;
    getBodyAsObject(): any;
    getStatusCode(): Number;
    getStatusMessage(): string;
    contentType(): string;
    hasError(): boolean;
    getLasError(): string;
    success(code: number): Define<Response>;
}
declare abstract class AbstractRestHttp {
    protected proto: httpProtoType;
    protected header: HashMap<string, any>;
    protected data: string;
    getProto(): string;
    getHeaderAsObject(): HashMap<string, any>;
    getDataAsObject(): any;
    getData(): string;
    request(): Promise<Response>;
}
export declare class RestHttp extends AbstractRestHttp {
    protected proto: httpProtoType;
    constructor(header: HashMap<string, any>, data: string);
    static options(): HttpOptions<RestHttp>;
}
export declare class RestHttps extends RestHttp {
    protected proto: httpProtoType;
    constructor(header: HashMap<string, any>, data: string);
    static options(): HttpOptions<RestHttps>;
}
export declare class HttpOptions<T> implements wrapHeader<T> {
    private options;
    private data;
    private params;
    private value;
    constructor(value: T);
    withHostname(hostname: string): HttpOptions<T>;
    withPort(port: number): HttpOptions<T>;
    withEndPoint(endPoint: string): HttpOptions<T>;
    withTimeout(timeout: number): HttpOptions<T>;
    withMethod(method: httpMethodType): HttpOptions<T>;
    get(): HttpOptions<T>;
    put(): HttpOptions<T>;
    delete(): HttpOptions<T>;
    post(): HttpOptions<T>;
    withInsecureHTTPParser(state: boolean): HttpOptions<T>;
    withHeader(type: string, value: any): HttpOptions<T>;
    widthContentType(mime: httpMimeType | string): HttpOptions<T>;
    widthAccept(mime: httpMimeType | string): HttpOptions<T>;
    widthJson(mime: httpMimeType | string): HttpOptions<T>;
    withAuth(auth: string): HttpOptions<T>;
    withRejectUnauthorized(state: boolean): HttpOptions<T>;
    withRequestCert(state: boolean): HttpOptions<T>;
    withPfx(pfx: Buffer | string): HttpOptions<T>;
    withPassPhrase(passphrase: string): HttpOptions<T>;
    withCACert(cacert: Buffer | string): HttpOptions<T>;
    withCert(cert: Buffer | string): HttpOptions<T>;
    withDhparam(dhparam: string): HttpOptions<T>;
    withCrl(crl: Buffer | string): HttpOptions<T>;
    withSSlKey(key: string): HttpOptions<T>;
    withCiphers(ciphers: Array<String>): HttpOptions<T>;
    withSessionTimeout(sessionTimeout: number): HttpOptions<T>;
    withSecureOptions(value: number): HttpOptions<T>;
    withSigalgs(value: string): HttpOptions<T>;
    withProxy(proxy: Proxy): HttpOptions<T>;
    private packParams;
    withPostData(data: object | string): HttpOptions<T>;
    withData(data: object | string, post?: boolean): HttpOptions<T>;
    withParams(params: object): HttpOptions<T>;
    build(): any;
}
export {};
