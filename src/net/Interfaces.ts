import {NetworkInterface} from "./NetworkInterface";

export interface Inet6AddressHolderI {
    ipaddress:number[];
    scope_id:number;
    scope_id_set:boolean;
    scope_ifname:NetworkInterface;
    scope_ifname_set:boolean;
    setAddr(addr:number[]):void
    init(addr:number[], scope_id:number ):void
    initnif(addr:number[], nif:Object ):void
    getHostAddress():string
    hasCode():number
    equals(o:Object):boolean
    isIPv4CompatibleAddress():boolean
    isMulticastAddress():boolean
    isAnyLocalAddress():boolean
    isLoopbackAddress():boolean
    isLinkLocalAddress():boolean
    isSiteLocalAddress():boolean
    isMCGlobal():boolean
    isMCLinkLocal():boolean
    isMCSiteLocal():boolean
    isMCOrgLocal():boolean
    isMCNodeLocal():boolean
}

export interface osNetwork {
    address:string;
    netmask:string;
    family:string;
    mac:string;
    internal:boolean;
    cidr:string
    scopeid?:number
}