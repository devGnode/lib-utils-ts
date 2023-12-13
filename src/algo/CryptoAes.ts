import {BinaryBuffer} from "../primitives/BinaryBuffer";
import {Random} from "../utils/Random";
import {Dword} from "../primitives/Dword";
import {AesType} from "./AesType";
import {Objects} from "../type/Objects";
import {Cipher, CipherGCM, createCipheriv, createDecipheriv, Decipher, DecipherCCM, randomBytes} from 'crypto';

export class CryptoAes {

    private readonly type:AesType;
    private ivs:BinaryBuffer;
    private cipher:CipherGCM;
    private password:Buffer;

    public sivs:string;

    constructor(type:AesType, password:string) {
        this.type       = type;
        this.password   = randomBytes(128 / 8);
    }

    public setIvs(ivs:BinaryBuffer):void{
        if(this.ivs!=null) return;
        this.ivs = ivs;
    }

    public getIvs():BinaryBuffer{
        return Objects.requireNotNull(this.ivs);
    }

    private getCipher():Cipher{
        return Objects.requireNotNull(this.cipher);
    }

    private setCipher(cipher:CipherGCM){
        this.cipher = cipher;
    }

    public encode(value:string, encode:string = "string"):string{
        //console.log("VALUE = ", value.length / 2 );
        let encrypt:string;
        let s;
        s = createCipheriv("aes-128-ccm", this.password, this.getIvs().toString(),{
                authTagLength: 16
        });
        encrypt = s.update(value,'binary');
        encrypt +=  s.final();

        //console.log("ENCRYPT = ", encrypt.length / 2 );
        let decipher:DecipherCCM = createDecipheriv("aes-128-ccm", this.password, this.getIvs().toString(),{
            authTagLength: 16
        });
        try {
            decipher.setAuthTag(s.getAuthTag());
            let text = decipher.update(Buffer.from(encrypt,'binary'));
            console.log("DDENCRYPT = ", text + "" + decipher.final('utf8'));
        }catch (e) {
            console.log(e);
        }
        return encrypt;
    }

    public decode(value:string):string{
        let encrypt:string;

        let decipher:DecipherCCM = createDecipheriv("aes-128-gcm", this.password, "Hook'em Horns",{
            authTagLength: 16
        });
        decipher.setAuthTag(this.cipher.getAuthTag());
        encrypt = decipher.update(value,'binary', "binary");
        encrypt +=  decipher.final("binary");
        return encrypt.toString();
    }

    public static tt(){
        return randomBytes(16).toString('hex')
    }

    public static generateKey(byte:Dword):string{
        let binaryBuffer:BinaryBuffer = new BinaryBuffer();
        for(let i = 0; i < byte.valueOf();i++ )binaryBuffer.append(Random.nextInt(97,122));
        return binaryBuffer.toString();
    }

}
Object.package(this);