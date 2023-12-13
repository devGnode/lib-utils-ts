import {RemoteInfo, Socket} from "dgram";
import {InetSocketAddr} from "./InetSocketAddr";
import * as dgram from "dgram";
import {Objects} from "../type/Objects";
import {InetAddress} from "./InetAddress";
import {SocketException} from "./SocketException";
import {Func} from "../Interface";
import {DataGramPacket} from "./DataGramPacket";
import {Word} from "../primitives/Word";
import {Inet4Address} from "./Inet4Address";
import {BinaryInputStream} from "../primitives/BinaryInputStream";
import {Buffer} from "buffer";

interface receive {
    (socket:DGramSocket, inet:InetSocketAddr, message:BinaryInputStream):void
}
export class DGramSocket {
    //
    private static readonly SO_NOT_CONNECTED:number = 0;
    private static readonly SO_CONNECTED:number     = 1;
    /***
     *
     */
    private so:Socket;
    private sClose:boolean       = false;
    private sBound:boolean       = false;
    /***
     *
     * @type {null}
     */
    private address:InetAddress  = null;
    private port:number          = -1;
    /***
     *
     * @type {null}
     */
    private lasError:Error = null;
    private ttl:number     = 2000;

    private state:number = DGramSocket.SO_NOT_CONNECTED;

    constructor() {
        this.so = dgram.createSocket({type:"udp4",reuseAddr:true});
        this.so.addListener("error",(error:Error)=>this.error0(error));
    }

    private error0(error:Error):void{
        this.lasError = error;
        this.so.close();
    }

    public isClose():boolean{return this.sClose;}

    public isBound():boolean{return this.sBound;}

    public getInetAddress():InetAddress{return this.address;}

    public getPort():number{ return this.port; }
    /***
     * @param {InetSocketAddr} socketAddr
     * @return {Promise<void>}
     */
    public async connect(socketAddr:InetSocketAddr):Promise<void>{
        if(this.sClose) throw new SocketException("Socket is Close !");
        if(this.isConnected()) throw new SocketException("Socket already connected !");
        this.resumeLastError();
        return new Promise(resolve => {
               this.so.connect(socketAddr.getPort(),socketAddr.getAddress().getHostAddress(),()=>{
                   this.address  = socketAddr.getAddress();
                   this.port     = socketAddr.getPort();
                   this.state    = DGramSocket.SO_CONNECTED;
                   resolve(void 0)
               });
        });
    }
    /**/
    public async receiveSync():Promise<DataGramPacket>{
        if(this.sClose) throw new SocketException("Socket is Close !");
        this.resumeLastError();
        return new Promise(resolve =>{
            let isTimeout = false, valid:boolean= false;
            this.so.on("message",(message:Buffer, remote:RemoteInfo)=>{
                if(!isTimeout){
                    resolve(new DataGramPacket(Inet4Address.of(remote.address), Word.mk(remote.port)).setStringData(message.toString("binary")));
                    valid =true;
                }
            });
            if(this.ttl!=null) setTimeout( ()=>{
                isTimeout = true;
                !valid ? resolve(null) : void 0;
            }, this.ttl);
        });
    }
    /****
     * Server callback
     * @param {Func<void, void>} callback
     * @return {DGramSocket}
     */
    public receive( callback:receive ):DGramSocket{
        if(this.sClose) throw new SocketException("Socket is Close !");
        this.resumeLastError();
        this.so.on('message',  (message:Buffer, remote:RemoteInfo)=> {
            callback.call(
                null,
                this,
                new InetSocketAddr(Inet4Address.of(remote.address) ,Word.mk(remote.port)),
                new BinaryInputStream(message.toString('binary'))
            );
        });
        return this;
    }
    /****
     *
     * @param {InetSocketAddr} socketAddr
     * @return {Promise<boolean>}
     */
    public async bind(socketAddr:InetSocketAddr):Promise<boolean>{
        if(this.sClose) throw new SocketException("Socket is Close !");
        if(this.sBound) throw new SocketException("Socket already bound");
        if(socketAddr==null)  socketAddr = InetSocketAddr.ofPort(0);
        this.resumeLastError();
        this.address = socketAddr.getAddress();
        this.port    = socketAddr.getPort();

        return new Promise(resolve =>{
            let isResolve:boolean=false;
            this.so.bind(socketAddr.getPort(), socketAddr.getAddress().getHostAddress(), ()=>{
                isResolve=true;
                resolve(this.sBound = this.getLastMessageError()==null);
            });
            if(this.getLastMessageError()!= null )
            setTimeout(()=> !isResolve ? resolve(this.sBound = false): void 0, 1000);
            else{
                resolve(this.sBound = false);
            }
        });
    }
    /***
     * @param {DataGramPacket} packet
     * @return {Promise<void>}
     */
    public async send( packet: DataGramPacket ):Promise<boolean>{
        if(this.isClose()) throw new SocketException("Socket is close !");
        this.resumeLastError();
        return new Promise<boolean>(resolve => {
           // console.log("BOUT", Buffer.from(packet.getData()).toString('hex'));
          // console.log("BOUT", Buffer.from(packet.getData(),"binary").toString('hex'));
            this.so.send(
                Buffer.from(packet.getData(),'binary'),
                packet.getOffset(),
                packet.getDataSize(),
                packet.getPort(),
                packet.getAddress().getHostAddress(),
                (error:Error) => resolve( (this.lasError = error)==null )
            );
        });
    }
    /***
     * @param {Func<void, void>} callback
     */
    public listeningEvent(callback:Func<DGramSocket, void>):DGramSocket{
        this.so.on("listening",()=>!this.isClose()?Objects.requireNotNull(callback).call(null,this):void 0);
        return this;
    }
    /***
     * @param {Func<void, void>} callback
     */
    public errorEvent(callback:Func<DGramSocket, void>):DGramSocket{
        this.so.on("error",()=>!this.isClose()?Objects.requireNotNull(callback).call(null,this):void 0);
        return this;
    }
    /***
     * @param {Func<void, void>} callback
     */
    public closeEvent(callback:Func<DGramSocket, void>):DGramSocket{
        this.so.on("close",()=>!this.isClose()?Objects.requireNotNull(callback).call(null,this):void 0);
        return this;
    }
    /***/
    public isConnected(){return this.state == DGramSocket.SO_CONNECTED;}
    /***
     */
    public close():void{
        if(this.isClose()) return;
        this.so.close();
        this.sClose = true;
    }
    /***
     *
     */
    public disconnect():void{
        if(!this.isClose()) return;
        this.so.disconnect();
        this.state   = DGramSocket.SO_NOT_CONNECTED;
        this.lasError= this.address = null;
        this.sBound  = false;
        this.port    = -1;
        this.ttl     = 2000;
    }
    /***/
    public setTTL(ttl:number){this.so.setTTL( (this.ttl = ttl)/10 );}
    /**/
    public getTTL():number{ return this.ttl;}
    /***
     */
    public getLastMessageError():string{return Objects.isNull(this.lasError) ? null :this.lasError.stack;}

    public resumeLastError():void{if(this.lasError) throw new SocketException(this.lasError.stack);}
    
}
Object.package(this);