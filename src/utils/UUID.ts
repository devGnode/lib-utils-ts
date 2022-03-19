import assert = require("assert");
import {Byte} from "../primitives/Byte";
import {Convert} from "../primitives/Convert";

export class UUID {

    private readonly mostSigBits:number;
    private readonly leastSigBits:number;

    public constructor(byte:Byte[]) {
        let msb:number = 0,
            lsb:number = 0,
            i:number = 0;

        assert.strictEqual( byte.length,16, "data must be 16 bytes in length" );
        for(; i < 8; i++ )msb = (msb << 8) + (byte[i].valueOf() & 0xff);
        for(i=8; i < 16; i++ )lsb = (lsb << 8) + (byte[i].valueOf() & 0xff);
        this.mostSigBits = msb;
        this.leastSigBits = lsb;
    }

    public static UUID():UUID{
        let randomBytes:Byte[] = [];

        for(let i=0; i < 16; i++) randomBytes.push(Byte.random(Byte.mk(0),Byte.mk(255)));
        randomBytes[6] = Byte.mk(randomBytes[6].valueOf()&0x0f);
        randomBytes[6] = Byte.mk(randomBytes[6].valueOf()|0x40);
        randomBytes[8] = Byte.mk(randomBytes[6].valueOf()&0x3f);
        randomBytes[8] = Byte.mk(randomBytes[6].valueOf()|0x80);
        return new UUID(randomBytes);
    }

    private static of(mostSigBits:number,leastSigBits:number):UUID{
        let out:UUID = new UUID([]);
        (<any>out).leastSigBits = leastSigBits;
        (<any>out).mostSigBits  = mostSigBits;
        return out;
    }

    private static digits(val:number,digits:number):string {
        let hi:number = 1 * Math.pow(2, (digits * 4));
        return Convert.To.hex(hi+(val & (hi - 1))).substring(1);
    }

    public equals(o:Object):boolean{
        if(o===null||o===undefined||!(o instanceof UUID)) return false;
        if(this==o)return true;
        return this.mostSigBits === o.mostSigBits &&
            this.leastSigBits == o.leastSigBits;
    }

    public toString():string {
        return (UUID.digits(this.mostSigBits >> 32, 8) + "-" +
            UUID.digits(this.mostSigBits >> 16, 4) + "-" +
            UUID.digits(this.mostSigBits, 4) + "-" +
            UUID.digits(this.leastSigBits >> 48, 4) + "-" +
            UUID.digits(this.leastSigBits, 12));
    }
}
Object.package(this);