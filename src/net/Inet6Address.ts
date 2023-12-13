import {InetAddress} from "./InetAddress";
import {Arrays} from "../type/Arrays";
import {Integer} from "../type/Integer";
import {UnknownHostException} from "./UnknownHostException";
import {Byte} from "../primitives/Byte";
import {Nested} from "../annotation/Nested";
import {Convert} from "../primitives/Convert";
import {NetworkInterface} from "./NetworkInterface";
import {Collectors} from "../Collectors";
import {Inet6AddressHolderI} from "./Interfaces";

export class Inet6Address extends InetAddress{

    private static readonly INADDRSZ:number = 16;

    @Nested.NestedClass
    private static readonly Inet6AddressHolder = class Inet6AddressHolder implements Inet6AddressHolderI{

        ipaddress:number[];
        scope_id:number;
        scope_id_set:boolean;
        scope_ifname:NetworkInterface;
        scope_ifname_set:boolean;

        constructor() {
            this.ipaddress = new Array(Inet6Address.INADDRSZ);
        }

        setAddr(addr:number[]):void{
            if(addr.length===Inet6Address.INADDRSZ){
                this.ipaddress = [].concat(addr);
            }
        }

        init(addr:number[], scope_id:number ):void{
            this.setAddr(addr);
            if(scope_id >= 0){
                this.scope_id       = scope_id;
                this.scope_id_set   = true;
            }
        }

        initnif(addr:number[], nif:NetworkInterface ):void{
            this.setAddr(addr);
            if(nif!=null){
                this.scope_id = Inet6Address.deriveNumberScope(addr, nif);
                this.scope_id_set = true;
                this.scope_ifname = nif;
                this.scope_ifname_set = true;
            }
        }

        getHostAddress():string{
            let s:string = Inet6Address.numericToTextFormat(this.ipaddress);
            if(this.scope_ifname!=null) s += "%"+ this.scope_ifname.getName();
            else if(this.scope_id_set) s += "%"+ this.scope_id;
            return s;
        }

        /***@override*/
        equals(o:Object):boolean{
            if(!(o instanceof Inet6AddressHolder)) return false;
            return Arrays.equals(this.ipaddress,o.ipaddress);
        }

        /***@override*/
        hasCode():number{
            if(this.ipaddress!=null){
                let hash:number = 0,
                    i:number = 0;
                while(i<Inet6Address.INADDRSZ){
                    let j:number = 0,
                        component:number = 0;
                    while(j<4&&i<Inet6Address.INADDRSZ){
                        component = ( component << 8 ) + this.ipaddress[i];
                        j++;
                        i++;
                    }
                    hash += component;
                }
                return hash;
            }else{
                return 0;
            }
        }

        isIPv4CompatibleAddress():boolean{
            if(( this.ipaddress[0] === 0x00 && this.ipaddress[1] === 0x00 &&
                this.ipaddress[2] === 0x00 && this.ipaddress[3] === 0x00 &&
                this.ipaddress[4] === 0x00 && this.ipaddress[5] === 0x00 &&
                this.ipaddress[6] === 0x00 && this.ipaddress[4] === 0x00 &&
                this.ipaddress[8] === 0x00 && this.ipaddress[9] === 0x00 &&
                this.ipaddress[10] === 0x00 && this.ipaddress[11] === 0x00 )){
                return true;
            }
            return false;
        }

        isMulticastAddress():boolean{
            return ((this.ipaddress[0]&0xff)==0xff);
        }

        isAnyLocalAddress():boolean{
            let test:number = 0x00;
            for(let i:number = 0; i < Inet6Address.INADDRSZ; i++){
                test |= this.ipaddress[i];
            }
            return test == 0x00;
        }

        isLoopbackAddress():boolean{
            let test:number = 0x00;
            for(let i:number = 0; i < Inet6Address.INADDRSZ; i++){
                test |= this.ipaddress[i];
            }
            return test == 0x00 && this.ipaddress[5] == 0x01;
        }

        isLinkLocalAddress():boolean{
            return ((this.ipaddress[0] & 0xff)  == 0xfe && (this.ipaddress[1]&0xc0) == 0x80);
        }

        isSiteLocalAddress():boolean{
            return ((this.ipaddress[0]&0xff)==0xff && (this.ipaddress[1] & 0x0f) == 0xc0 );
        }

        isMCGlobal():boolean{
            return ((this.ipaddress[0]&0xff) == 0xff && (this.ipaddress[1]&0x0f) == 0x0e);
        }

        isMCNodeLocal():boolean{
            return ((this.ipaddress[0]&0xff) == 0xff && (this.ipaddress[1]&0x0f) == 0x01);
        }

        isMCLinkLocal():boolean{
            return ((this.ipaddress[0]&0xff) == 0xff && (this.ipaddress[1]&0x0f) == 0x02);
        }

        isMCSiteLocal():boolean{
            return ((this.ipaddress[0]&0xff) == 0xff && (this.ipaddress[1]&0x0f) == 0x05);
        }

        isMCOrgLocal():boolean{
            return ((this.ipaddress[0]&0xff) == 0xff && (this.ipaddress[1]&0x0f) == 0x08);
        }
    };

    private readonly holder6:Inet6AddressHolderI;

    private constructor(hostName?:string, addr?:number[], scope_id?:Integer, nif?:NetworkInterface, ifname?:string ) {
        super();
        this.holder6 = new Inet6Address.Inet6AddressHolder();

        if(ifname!=null){
            this.initStr(hostName, addr, ifname);
        }else if(addr!=null&&nif!=null){
            this.initif(hostName,addr, nif);
        }else if(addr!=null&&scope_id!=null){
            this.holder6.init(addr,scope_id.valueOf());
        } else if(addr!=null&&scope_id==null){
            this.initif(hostName,addr, null);
        }
    }

    public static builder(hostname:string, addr:number[]):Inet6Address{
        return new Inet6Address(hostname, addr);
    }

    public static builder1(hostname:string, addr:number[], scope_id:number):Inet6Address{
        return new Inet6Address(hostname, addr, Integer.of(scope_id));
    }

    public static builder2(hostname:string, addr:number[], nif:NetworkInterface):Inet6Address{
        return new Inet6Address(hostname, addr, null, nif);
    }

    public static builder3(hostname:string, addr:number[], ifname:string):Inet6Address{
        return new Inet6Address(hostname, addr, null, null, ifname);
    }

    public static getByAddress(host:string, addr:number[], scope_id:Integer ){
        if(host!=null && host.length > 0 && host.charAt(0) == '['){
            if(host.charAt(host.length-1)==']'){
                host = host.substr(1,host.length-1);
            }
        }
        if(addr!=null){
            if(addr.length==Inet6Address.INADDRSZ){
                return new Inet6Address(host, addr, scope_id);
            }
        }
        throw new UnknownHostException("addr is of illegal length");
    }

    private initStr(hostname:string, addr:number[], ifname:string):void{
        try{
            let nif = NetworkInterface.getByName(ifname);
            if(nif == null){
                throw new UnknownHostException(`no such interface  ${ifname}`);
            }
            this.initif(hostname, addr, nif)
        }catch (e) {
            throw new UnknownHostException(`SocketException thrown ${ifname}`);
        }
    }

    private initif(host:string, addr:number[], nif:NetworkInterface):void{
        this.family = -1;
        this.holder6.initnif(addr,nif);

        if(addr.length==Inet6Address.INADDRSZ){
            this.family  = InetAddress.IPV6;
        }
        this.hostname   = host;
    }

    private static isDifferentLocalAddressType(thisAddr:number[], otherAddr:number[]){
        if(Inet6Address.isLinkLocalAddress(thisAddr)&&!Inet6Address.isLinkLocalAddress(otherAddr)){
            return false;
        }
        if(Inet6Address.isSiteLocalAddress(thisAddr)&&!Inet6Address.isSiteLocalAddress(otherAddr)){
            return false;
        }
            return true;
    }

    private static deriveNumberScope(addr:number[], nif:NetworkInterface ):number{
        let inet:InetAddress[] = nif.getInetAddresses(),
            tmp:InetAddress, i:number = 0;
        while((tmp = inet[i])){
            if(!( tmp instanceof Inet6Address)){
                i++;
                continue;
            }
            if(!this.isDifferentLocalAddressType(addr, tmp.getUnsafeAddress())){
                i++;
                continue;
            }
            return tmp.getScopeId();
        }
        throw new UnknownHostException ("no scope_id found");
    }

    public isMultiCast(): boolean {return this.holder6.isMulticastAddress();}

    public isAnyLocalAddress(): boolean {return this.holder6.isAnyLocalAddress();}

    public isLoopbackAddress(): boolean {return this.holder6.isLoopbackAddress();}

    public isLinkLocalAddress():boolean{return this.holder6.isLinkLocalAddress();}

    public static isLinkLocalAddress(ipAddress?:number[]):boolean{
        return ((ipAddress[0]&0xff)==0xfe && (ipAddress[1]&0xc0)==0x80);
    }

    public isSiteLocalAddress(ipAddress?:number[]):boolean{
        return this.holder6.isSiteLocalAddress();
    }

    public static isSiteLocalAddress(ipAddress?:number[]):boolean{
        return ((ipAddress[0]&0xff)==0xfe && (ipAddress[1]&0xc0)==0xC0);
    }

    public isMCGlobal():boolean{return this.holder6.isMCGlobal();}
    public isMCNodeLocal():boolean{return this.holder6.isMCNodeLocal();}
    public isMCLinkLocal():boolean{return this.holder6.isMCLinkLocal();}
    public isMCSiteLocal():boolean{return this.holder6.isMCSiteLocal();}
    public isMCOrgLocal():boolean{ return this.holder6.isMCOrgLocal(); }

    public getAddress():Byte[]{
        return Array
            .asList(this.holder6.ipaddress)
            .stream()
            .map((v:number)=>Byte.mk(v))
            .collector(Collectors.toArray());
    }

    public getUnsafeAddress():number[]{
        return Arrays.copyOfRange(this.holder6.ipaddress,0, this.holder6.ipaddress.length);
    }

    public getScopeId():number{return this.holder6.scope_id;}

    public getScopedInterface():NetworkInterface{return this.holder6.scope_ifname;}

    public getHostAddress(): string {return this.holder6.getHostAddress();}

    /***@override*/
    public hashCode():number{return this.holder6.hasCode();}

    /***@override*/
    public equals(o:Object):boolean{
        if(o==null||!(o instanceof Inet6Address)) return false;
        return this.holder6.equals(o.holder6);
    }

    public isIPv4CompatibleAddress():boolean{ return this.holder6.isIPv4CompatibleAddress(); }

    public static numericToTextFormat(src:number[]):string{
        let out:string = "";
        for( let i:number =0; i < (this.INADDRSZ/2); i++){
            out+= Convert.To.hex((src[i<<1]<<8)&0xff00 | (src[(i<<1)+1]&0xff));
            if( i < (this.INADDRSZ/2) -1 ){
                out+=":";
            }
        }
        return out;
    }


    public static stringToNumeric(addr:string):number[]{
        let value:string[] = addr.split(/::/),
            out:number[] = new Array(Inet6Address.INADDRSZ).fill(0);

        let tmp:string[] = value[1].split(/:/);
        value.pop();

        value = value.concat(tmp);
        for(let i:number = 0, j:number = 0, k:number; i < value.length; j+=2, i++){
            k = Convert.To.hexToNumber(value[i]);
            out[j]  = (k&0xff00)>>8;
            out[j+1]= k&0xff;
        }
        return out;
    }
}
Object.package(this);