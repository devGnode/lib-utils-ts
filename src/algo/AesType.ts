import {Enum} from "../Enum";
import {CipherCCMTypes} from "crypto";
import {Dword} from "../primitives/Dword";

export class AesType extends Enum{

    @Enum.args(128) static  AES_128_CBC:AesType;
    @Enum.args(128) static AES_128_CTR:AesType;
    @Enum.args(128) static AES_128_OFB:AesType;

    @Enum.args(192) static  AES_192_CBC:AesType;
    @Enum.args(192) static AES_192_CTR:AesType;
    @Enum.args(192) static AES_192_OFB:AesType;

    @Enum.args(256) static AES_256_CBC:AesType;
    @Enum.args(256) static AES_256_CTR:AesType;
    @Enum.args(256) static  AES_256_OFB:AesType;
    
    public AESType():CipherCCMTypes{ return <CipherCCMTypes>this.toString();}

    private readonly size:number;

    private constructor(size:number) {super();this.size = size;}

    public getIvsLength():Dword{ return new Dword(16); }

    public getPasswordLength():Dword{ return new Dword(this.size /8); }

    public static valueOf<T extends Enum>(value:string):T {
        return super.valueOf(value.replace(/-/gi,"_").toUpperCase());
    }

    public toString():string {
        return this
            .name()
            .replace(/_/gi,"-")
            .toLowerCase();
    }
}
Object.package(this);