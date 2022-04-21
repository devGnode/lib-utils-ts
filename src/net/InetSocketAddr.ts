import {InetAddress} from "./InetAddress";
import {WORD} from "../primitives/Globals";
import {Word} from "../primitives/Word";
import {Inet4Address} from "./Inet4Address";

export class InetSocketAddr {
    /***
     */
    private address:InetAddress;
    /***
     */
    private port:WORD;

    constructor(inet:InetAddress, port:WORD) {
        this.address = inet;
        this.port    = port;
    }

    public setAddress(inet:InetAddress):void{ this.address= inet; }

    public getAddress():InetAddress{ return this.address; }

    public setPort(port:number):void{ this.port= Word.mk(port); }

    public getPort():number{ return this.port.valueOf(); }

    public toString():string{return `${this.getAddress()}:${this.getPort()}`;}

    public equals(o:Object):boolean{
        if(o==null||!(o instanceof InetSocketAddr)) return false;
        return this.getPort().equals(o.getPort()) && this.getAddress().equals(o.getAddress());
    }

    public static ofPort(port:number):InetSocketAddr{
        return new InetSocketAddr(Inet4Address.anyLocalAddress(), Word.mk(port));
    }
}
Object.package(this);