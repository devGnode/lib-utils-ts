import {InetSocketAddr} from "../InetSocketAddr";
import {IllegalArgumentException, RuntimeException} from "../../Exception";
import {Objects} from "../../type/Objects";
import * as http from "http";
import {IncomingMessage, RequestListener, Server, ServerResponse} from "http";
import {HttpContext} from "./HttpContext";
import {Executor, HttpHandler, Runnable} from "./interfaces";
import {Log} from "../../log/Global";
import {Loggers} from "../../log/Loggers";
import {ContextList} from "./ContextList";
import {IllegalStateException} from "../../lang/IllegalStateException";
import {Nested} from "../../annotation/Nested";
import {System} from "../../lang/System";
import {Code} from "./Code";
import {HttpMethod} from "./HttpMethod";
import {EnpointManager} from "./EnpointManager";
import {HttpEndpointTemplate} from "./EndPoint";
import {HttpConfigurationException} from "./HttpConfigurationException";
import {ClassLoader} from "../../ClassLoader";

const {NestedClass} = Nested;

export class ServerImpl{

    private static readonly logger:Log = Loggers.factory(ServerImpl.class());

    private readonly protocol:string;
    private readonly server:Server;

    private readonly contexts:ContextList;
    private readonly endpoints:EnpointManager;

    private inet:InetSocketAddr;
    private backlog:number;
    private executor:Executor;
    private runnable:ClassLoader<Runnable>;

    private started:boolean = false;
    private bound:boolean   = false;

    public constructor(protocol:string,inet?:InetSocketAddr, async:boolean = false, backlog?:number ) {
        this.protocol   = Objects.requireNotNull(protocol);
        this.server     = http.createServer(this.getIncoming(async));
        this.server.on('error',(e:Error)=>this.error(e));

        this.contexts       = new ContextList();
        this.endpoints      = new EnpointManager();

        this.bind(inet, backlog);
    }

    private error(err:Error):void{
        this.bound = this.started = false;
        throw new RuntimeException(`Error : ${err.message}`);
    }

    private getHandler(req:IncomingMessage, res:ServerResponse, wrap:ServerImpl, data:string):Runnable{
        if(this.runnable!=null){
            return this.runnable.instance(this.protocol,req, res, this, data);
        }
        return new ServerImpl.Exchange(this.protocol, req, res, this, data);
    }

    private handler(req:IncomingMessage, res:ServerResponse):void{
        try{
            let data:string = "";
            req.on("data",(value:string)=>data+=value)
                .on("end",()=>this.executor.execute(this.getHandler(req, res, this, data)));
        }catch (e) {
            console.log(e)
        }
    }

    private async handlerAsync(req:IncomingMessage, res:ServerResponse):Promise<void>{
        try{
            let data:string = "";
            req.on("data",(value:string)=>data+=value)
            .on("end",async ()=>await this.executor.executeASync(this.getHandler(req, res, this, data)));
        }catch (e) {
            console.log(e)
        }
    }

    // @ts-ignore
    private getIncoming(async:boolean):RequestListener<any, any>{return async ? this.setIncAsync( ) : this.setInc();}

    // @ts-ignore
    private setInc():RequestListener<any, any>{
        return (req:IncomingMessage, res:ServerResponse)=>this.handlerAsync(req,res);
    }

    // @ts-ignore
    private setIncAsync():RequestListener<any, any>{
        return (req:IncomingMessage, res:ServerResponse)=>(async ()=> await this.handlerAsync(req,res))();
    }

    public start():void{
        if(this.started||this.bound)throw new IllegalStateException ("server in wrong state");
        if(Objects.isNull(this.executor))this.executor = new ServerImpl.DefaultExecutor();
        this.server.listen(this.inet.getPort(),this.inet.getAddress().toString(), this.backlog);
        this.bound  = this.started = true;
    }

    public setExecutor(executor:Executor):void{
        if (this.started) throw new IllegalStateException ("server already started");
        this.executor = executor;
    }

    public getExecutor():Executor{return this.executor;}

    public setRunner(constructor:ClassLoader<Runnable>):void{ this.runnable = constructor; }

    public createContext(path:string, hanlder:HttpHandler = null, method:HttpMethod = null):HttpContext{
        let context:HttpContext;
        // HttpContext already created
        if((context = this.contexts.findByHandler(hanlder)) ){
            let template:HttpEndpointTemplate = context.getTemplateEndpoint(path);
            // handler already exists
            if(template!=null&&template.hasMethod(method))
                throw new HttpConfigurationException(`Context [ ${method} = '${path}' ] already defined !`);
            else{
                // path exists but not
                // the http method
                if(template!=null){
                    template.addMethod(method);
                    ServerImpl.logger.info(`Method ${method} was been added to the endpoint '${path}'`);
                    return context;
                }
            }
        }
        // endPoint already exists
        if((context = this.contexts.find(this.protocol, path, method))){
            throw new HttpConfigurationException(`Conflict context already created for '${path}'`);
        }

        ServerImpl.logger.info(`Context was been created on the ${method?method:"(*)"} method(s) '${path}'`);
        context = new HttpContext("http", path, hanlder, method, this);
        this.contexts.add(context);

        return context;
    }

    public removeContextByPath(path:string):void{
        this.removeContext(this.contexts.find(this.protocol,Objects.requireNotNull(path)));
    }

    public removeContext(context:HttpContext):void{
        if(!( context instanceof HttpContext))throw new IllegalArgumentException ("wrong HttpContext type "+ context);
        this.contexts.removeContext(context);
        ServerImpl.logger.info(`Remove Context '${context.getPath()}'`);
    }

    public bind(inet:InetSocketAddr = null, backlog:number = null):void{
        if(this.bound&&(this.server&&this.server.listening)) throw new RuntimeException(`Http server is already bound !`);
        this.inet       = Objects.requireNotNull(inet,"inetSockAddr is null !");
        this.backlog    = backlog||0;
    }

    public getAddress():InetSocketAddr{ return this.inet; }

    public getContexts():ContextList{ return this.contexts; }

    public close():void{ this.server.close(); }
    /***
     */
    @NestedClass
    private static readonly DefaultExecutor = class DefaultExecutor implements Executor{
        public execute(runnable: Runnable): void {runnable.run();}
        public async executeASync(runnable: Runnable): Promise<void> { await runnable.runASync();}
    };
    /***
     */
    @NestedClass
    private static readonly Exchange = class Exchange implements Runnable{

        wrap:ServerImpl;
        readonly proto:string;
        readonly req:IncomingMessage;
        readonly res:ServerResponse;
        readonly data:string;

        public constructor(protocol:string, req:IncomingMessage, res:ServerResponse, wrap:ServerImpl, data:string ) {
            this.wrap   = wrap;
            this.proto  = protocol;
            this.req    = req;
            this.res    = res;
            this.data   = data;
        }

        public run(): void {


            System.out.println(this.req.method);
            console.log(this.req.socket.address());
            System.out.println(new URL(this.req.url,this.proto+"://"+this.wrap.inet.getAddress().toString()).pathname);
            System.out.println(this.req.rawHeaders);

           // EndPoint.endpointIn(HttpMethod.valueOf(this.req.method.toUpperCase()),this.req.url);
            let httpContext:HttpContext = this.wrap.contexts.find(this.proto, this.req.url, HttpMethod.valueOf(this.req.method.toUpperCase()) );
            if(Objects.isNull(httpContext)){
                this.reject(Code.HTTP_NOT_FOUND,"");
                return;
            }
            if(Objects.isNull(httpContext.getCaller())){
                this.reject(Code.HTTP_INTERNAL_SERVER_ERROR, "No handler for context")
                return;
            }
            this.res.writeHead(Code.HTTP_OK.get());
            httpContext.getCaller().handle(this.res);

        }

        public reject(code:Code, message:string = null ):void{
            this.res.writeHead(code.get());
            this.res.end(`<html><head><title>${code.get()} - ${code.toString()}</title></head><h1>${code.get()} - ${code.toString()} : ${message||""}</h1></html>`);
        }

    };
}
Object.package(this);