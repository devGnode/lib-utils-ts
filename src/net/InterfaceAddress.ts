import {InetAddress} from "./InetAddress";
import {Inet4Address} from "./Inet4Address";
import {Int16} from "../primitives/Int16";
import {Objects} from "../type/Objects";

export class InterfaceAddress {

    private readonly address:InetAddress     = null;
    private readonly broadcast:Inet4Address  = null;
    private readonly maskLength:Int16        = Int16.mk(0);

    constructor(address:InetAddress, broadcast:Inet4Address, maxLength:Int16) {
        this.address    = address;
        this.broadcast  = broadcast;
        this.maskLength = maxLength;
    }

    public getAddress():InetAddress{ return this.address; }

    public getBroadcast():Inet4Address{return this.broadcast; }

    public getNetworkPrefixLength():Int16{ return this.maskLength; }

    /***@override*/
    public equals(o:Object):boolean{
        if(o==null||!(o instanceof InterfaceAddress))return false;
        return Objects.equals(this.address,o.address) &&
            Objects.equals(this.broadcast,o.broadcast) &&
            this.maskLength.equals(o.maskLength);
    }

    /***@override*/
    public hashCode():number{
        return null;
    }

    /***@override*/
    public toString():string{
        return `${this.address.toString()}/${this.maskLength.valueOf()} [${this.broadcast.toString()}]`;
    }
}
Object.package(this);