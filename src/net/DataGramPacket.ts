import {IllegalArgumentException} from "../Exception";
import { Inet4Address } from "./Inet4Address";
import {InetAddress} from "./InetAddress";
import {BYTE, WORD} from "../primitives/Globals";
import {Word} from "../primitives/Word";
import {InetSocketAddr} from "./InetSocketAddr";

export class DataGramPacket {

    private port:WORD;
    private address:InetAddress;
    private data:string;

    constructor(inet:InetAddress, port:WORD) {
        this.data    = "";
        this.address = inet;
        this.port    = port;
    }

    public getAddress():InetAddress{return this.address;}

    public setAddress(inet:string):void{
        this.address = Inet4Address.of(inet);
    }

    public getPort():number{return this.port.valueOf();}

    public setPort(port:number):void{
        if(port<0||port>65535) throw new IllegalArgumentException(`Port out of range : ${port}`);
        this.port = Word.mk(port);
    }

    public getData():string{return this.data;}

    public getDataSize():number{ return this.getData().length; }

    public getOffset():number{return 0;}

    public setDataBytes(bytes:BYTE[], offset:number, length:string ){
        bytes.join("");
        return this;
    }
    /***/
    public setStringData(data:string):DataGramPacket{
        this.data = data;
        return this;
    }
    /***
     * @param {number} port
     * @return {DataGramPacket}
     */
    public static ofPort(port:number){
        return new DataGramPacket(Inet4Address.anyLocalAddress(),Word.mk(port));
    }

    public static ofSockAddr(socketAddr:InetSocketAddr){
        return new DataGramPacket(socketAddr.getAddress(),Word.mk(socketAddr.getPort()));
    }
}

Object.package(this);