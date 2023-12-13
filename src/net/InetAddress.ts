import {Byte} from "../primitives/Byte";

export class InetAddress {

    public static readonly IPV4:number = 1;

    public static readonly IPV6:number = 2;

    protected hostname:string;
    protected family:number;
    protected address:number;

    constructor() {}

    public isAnyLocalAddress():boolean{ return false; }

    public isLoopbackAddress():boolean{ return false; }

    public isMultiCast():boolean{ return false; }

    public isSiteLocalAddress():boolean{ return false; }

    public getHostname(){ return this.hostname;}

    public getFamily():number{return this.family;}

    public getHostAddress():string{return null;}

    public getAddress():Byte[]{return null;}

    public toString():string{return this.getHostAddress();}

    public toArray():number[]{ return this.getAddress().map(byte=>byte.valueOf()); }
    
    public equals(o:Object):boolean{
        if(o==null||!(o instanceof InetAddress)) return false;
        return this.getHostAddress().equals(o.getHostAddress()) && this.getFamily()==o.getFamily();
    }
}
Object.package(this);