import {InetAddress} from "./InetAddress";
import {InterfaceAddress} from "./InterfaceAddress";
import {Objects} from "../type/Objects";
import {IllegalArgumentException} from "../Exception";
import {Inet4Address} from "./Inet4Address";
import {Inet6Address} from "./Inet6Address";
import {List} from "../Interface";
import {ArrayList} from "../utils/ArrayList";
import {Arrays} from "../type/Arrays";
import {Optional} from "../utils/Optional";
import {osNetwork} from "./Interfaces";
import * as os from "os";
import {SocketException} from "./SocketException";

export class NetworkInterface {

    private readonly name:string         = null;
    private readonly index:number        = null;
    private readonly mac:string          = null;
    private readonly addrs:InetAddress[];

    private biding:InterfaceAddress[];

    private static readonly Network = new class Network {

        constructor() {}

        private getAll(callback:Function):NetworkInterface[]{
            let all:NetworkInterface[] = [], i:number=0, o:osNetwork,
                addr:InetAddress,obj:Object = os.networkInterfaces(),
                list:InetAddress[];

            for(let key in obj){
                list = [];
                for(let j:number = 0; j < (<any>obj)[key].length; j++){
                    o = (<any>obj)[key][j];
                    if(!callback(key,i,(<any>obj)[key][j])) continue;
                    if(o.family=="IPv4") addr = Inet4Address.of(o.address);
                    if(o.family=="IPv6") addr = Inet6Address.builder1(null,Inet6Address.stringToNumeric(o.address),o.scopeid);
                    list.push(addr);
                }
                if(list.length>0) all.push(new NetworkInterface(key, i, list, o.mac));
                i++;
            }

            return all;
        }

        public getAll0():NetworkInterface[]{ return this.getAll(()=> true ); }

        public getInterfacesByInet0(addrIn:InetAddress):NetworkInterface{
            return Optional.ofNullable(this
                .getAll((name:string,index:number, o:osNetwork):boolean=> addrIn.toString().equals(o.address) )
                .shift())
                .orElseThrow(new SocketException(`Interface '${addrIn.toString()}' doesn't exist`));;
        }

        public getByName0(interfaceName:string):NetworkInterface{
            return Optional.ofNullable(this
                .getAll((name:string):boolean=> name===interfaceName)
                .shift())
                .orElseThrow(new SocketException(`Interface '${interfaceName}' doesn't exist`));
        }

        public getByIndex0(index:number):NetworkInterface{
            return Optional.ofNullable(this
                .getAll((name:string,oIndex:number):boolean=> index===oIndex)
                .shift())
                .orElseThrow(new SocketException(`Interface index '${index}' doesn't exist`));
        }

    };

    private constructor(name?:string, index?:number, addrs?:InetAddress[], mac?:string) {
        this.name = name;
        this.index= index;
        this.addrs= addrs;
        this.mac  = mac;
    }

    public getInterfaceAddresses():List<InterfaceAddress>{
        let lst:List<InterfaceAddress> = new ArrayList();
        if(this.biding!=null) lst.addAll(new ArrayList(this.biding));
        return lst;
    }

    public getNetworkInterfaces():List<NetworkInterface>{ return new ArrayList(NetworkInterface.Network.getAll0()); }

    public getInetAddresses():InetAddress[] {
        return Arrays.copyOfRange(this.addrs, 0, this.addrs.length);
    }

    public static getByName(name:string):NetworkInterface{
        return NetworkInterface.Network.getByName0(Objects.requireNotNull(name));
    }

    public static getByIndex(index:number):NetworkInterface{
        return NetworkInterface.Network.getByIndex0(Objects.requireNotNull(index));
    }

    public static getByInetAddress(addr:InetAddress):NetworkInterface{
        if(Objects.requireNotNull(addr).getFamily()===InetAddress.IPV4){
            if(!(addr instanceof Inet4Address)){
                throw new IllegalArgumentException(`invalid family type:  ${addr.getFamily()}`);
            }
        }else if(addr.getFamily()===InetAddress.IPV6){
            if(!(addr instanceof Inet6Address)){
                throw new IllegalArgumentException(`invalid family type:  ${addr.getFamily()}`);
            }
        }else{
            throw new IllegalArgumentException(`invalid address type: ${addr}`);
        }
        return NetworkInterface.Network.getInterfacesByInet0(addr);
    }

    public getName():string{ return this.name; }

    /***@override*/
    public equals(o:Object):boolean{
        if(!(o instanceof NetworkInterface)) return false;
        if( this.name != null ){
            if(!this.name.equals(o.name)){
                return false;
            }
        }else{
            if(this.name!=null){
                return false;
            }
        }

        if(this.addrs==null){
            return o.addrs == null;
        }else if(o.addrs == null ){
            return false;
        }

        if(this.addrs.length!=o.addrs.length) return false;
        let addrs:InetAddress[] = o.addrs,
            count:number = addrs.length;

        for(let i:number = 0; i < count; i++){
            let found:boolean = false;
            for(let j:number = 0; j < count; j++){
                if(addrs[i].equals(addrs[j])){
                    found=true;
                    break;
                }
            }
            if(!found) return false;
        }
        return true;
    }

    public hashCode():number{
        return null;
    }

    /***@override*/
    public toString():string{
        let result:string = "name: ";
        result+= this.name == null ? "null" : this.name;
        return result;
    }
}
Object.package(this);