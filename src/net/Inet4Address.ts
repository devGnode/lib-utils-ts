import {InetAddress} from "./InetAddress";
import {Byte} from "../primitives/Byte";
import {Arrays} from "../type/Arrays";
import {Collectors} from "../Collectors";
import {List} from "../Interface";
import {IllegalArgumentException} from "../Exception";

export class Inet4Address extends InetAddress{

    constructor(hostname?:string, addr?:Byte[]|number) {
        super();
        
        this.family   = Inet4Address.IPV4;
        if(hostname==null&&addr==null){
            this.hostname = null;
            this.address  = 0;
        }else{
            this.hostname = hostname;
            if(typeof addr ==="number") this.address = addr;
            else {
                if (addr.length === 4)
                    this.address =
                        addr[0].valueOf() * Math.pow(2,24) +
                        addr[1].valueOf() * Math.pow(2,16) +
                        addr[2].valueOf() * Math.pow(2,8) +
                        addr[3].valueOf();
            }
        }

    }
    /***/
    public isAnyLocalAddress():boolean{ return this.address.valueOf() === 0x00; }
    /***/
    public static anyLocalAddress():Inet4Address{return Inet4Address.of("0.0.0.0");}
    /***/
    public isLoopbackAddress():boolean{ return this.getAddress()[0].equals(127); }
    /***/
    public static loopBackAddress():Inet4Address{return Inet4Address.of("127.0.0.1");}
    /**/
    public isMultiCast():boolean{return this.address.valueOf()>=0x0E000000 && this.address.valueOf() <= 0xEFFFFFFF;}
    /***/
    /**/
    public isSiteLocalAddress():boolean{
        let b:Byte[] = this.getAddress();
        return b[0].valueOf() == 10 ||
            ( b[0].valueOf() == 172 && (b[1].valueOf() & 0xF0) == 16) ||
            ( b[0].valueOf() == 192 &&  b[1].valueOf() == 168 );
    }
    /**/
    public equals(o:Object):boolean{return o!=null && ( o instanceof Inet4Address ) && super.equals(o); }
    /****
     * @return {Byte[]}
     */
    public getAddress(): Byte[] {
       let out:Byte[] = [];
       out[0] = Byte.mk((this.address.valueOf()>>0x18)&0xff );
       out[1] = Byte.mk((this.address.valueOf()>>0x10)&0xff );
       out[2] = Byte.mk((this.address.valueOf()>>0x08)&0xff );
       out[3] = Byte.mk(this.address.valueOf()&0xff );
       return out;
    }
    /**/
    public getHostAddress():string{return Arrays.stream(this.getAddress()).map(b=>String(b.valueOf())).collector(Collectors.join("."));}
    /****
     * @param {Byte[]} src
     * @return {string}
     */
    public static numericToTextFormat(src:Byte[]):string{
        return src[0].valueOf()+"."+
            src[1].valueOf()+"."+
            src[2].valueOf()+"."+
            src[3].valueOf()
    }
    /**/
    public static of(inetString:string):Inet4Address{
        let list: List<string> = inetString.explodeAsList(".");
        if( list.size() != 4 ) throw new IllegalArgumentException(`Malformed ip '${inetString}'`);
        try{
            return new Inet4Address(
                null,
                list.stream()
                    .map(b=>Byte.mk(parseInt(b)))
                    .toArray()
            );
        }catch (e) {
            throw new IllegalArgumentException(`Malformed ip '${inetString}' `+e.stack);
        }

    }

}
Object.package(this);