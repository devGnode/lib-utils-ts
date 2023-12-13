import {ServerImpl} from "./ServerImpl";
import {InetSocketAddr} from "../InetSocketAddr";
import {HttpContext} from "./HttpContext";
import {Executor, HttpHandler} from "./interfaces";
import {HttpMethod} from "./HttpMethod";

export class HttpsServer{
    /***
     */
    private readonly server:ServerImpl;

    private constructor(addr:InetSocketAddr = null, async:boolean = false, backlog:number = null) {
        this.server = new ServerImpl("https",addr,async, backlog);
    }
    /***
     */
    public start():void{this.server.start();}
    /***
     * @param {InetSocketAddr} addr
     * @param {number} backlog
     */
    public bind(addr:InetSocketAddr = null, backlog:number = null):void{this.server.bind(addr,backlog);}
    /***
     * @param {Function} executor
     */
    public setExecutor(executor:Executor):void{ this.server.setExecutor(executor); }
    /***
     * @return {Executor}
     */
    public getExecutor():Executor{ return this.server.getExecutor();}
    /***
     * @param {string} path
     * @param {HttpHandler} context
     * @param method
     * @return {HttpContext}
     */
    public setContext(path:string, context:HttpHandler = null, method:HttpMethod = null):HttpContext{return this.server.createContext(path,context, method);}
    /***
     * @param {string} path
     */
    public removeContextByPath(path:string):void{this.server.removeContextByPath(path);}
    /***
     * @param {HttpContext} context
     */
    public removeContext(context:HttpContext):void{this.server.removeContext(context);}
    /***
     * @return {InetSocketAddr}
     */
    public getAddress():InetSocketAddr{ return this.server.getAddress(); }
    /***
     * @param {InetSocketAddr} addr
     * @param {number} backlog
     * @return {HttpServer}
     */
    public static create(addr:InetSocketAddr = null, async:boolean = false, backlog:number = null):HttpsServer{
        return new HttpsServer(addr||InetSocketAddr.ofPort(443),async ,backlog);
    }
}
Object.package(this);