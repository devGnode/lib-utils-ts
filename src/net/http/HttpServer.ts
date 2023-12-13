import {ServerImpl} from "./ServerImpl";
import {InetSocketAddr} from "../InetSocketAddr";
import {HttpContext} from "./HttpContext";
import {Executor, HttpHandler, Runnable} from "./interfaces";
import {HttpMethod} from "./HttpMethod";
import {ClassLoader} from "../../ClassLoader";

export class HttpServer{
    /***
     */
    private readonly server:ServerImpl;

    private constructor(addr:InetSocketAddr = null, async:boolean = false,  backlog:number = null) {
        this.server = new ServerImpl("http",addr,async,backlog);
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
     * @return {HttpContext}
     */
    public setContext(path:string, context:HttpHandler):HttpContext{return this.server.createContext(path,context,null);}
    /***
     *
     * @param {ClassLoader<Runnable>} runner
     * * @return void
     */
    public setRunner(runner:ClassLoader<Runnable>):void{ this.server.setRunner(runner); }
    /***
     * @param {string} method
     * @param {string} path
     * @param {HttpHandler} context
     * @return {HttpContext}
     */
    public setRestContext(method:HttpMethod, path:string, context:HttpHandler):HttpContext{return this.server.createContext(path,context,method);}
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
     * @return {void}
     */
    public close():void{ return this.server.close();}
    /***
     * @param {InetSocketAddr} addr
     * @param {number} backlog
     * @return {HttpServer}
     */
    public static create(addr:InetSocketAddr = null, async:boolean = false, backlog:number = null):HttpServer{
        return new HttpServer(addr||InetSocketAddr.ofPort(80),async ,backlog);
    }
}
Object.package(this);