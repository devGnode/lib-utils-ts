import {Reader} from "../../file/Reader";
import {InputStream} from "../../file/InputStream";
import {Byte} from "../Byte";
import {UnsupportedOperationException} from "../../Exception";
import {Word} from "../Word";
import {Convert} from "../Convert";
import {Int8} from "../Int8";
import {Int16} from "../Int16";
import {Dword} from "../Dword";
import {Int32} from "../Int32";
import {Float} from "../Float";
import {Objects} from "../../type/Objects";
import {Uint8} from "../Uint8";
import {Uint16} from "../Uint16";
import {Qword} from "../Qword";
import {Double} from "../Double";
/**
 *
 */
export class BinaryReader extends Reader{

    private readonly ins:InputStream;
    private offset:number = 0;

    constructor(ins:InputStream) {
        super();
        this.ins = Objects.requireNotNull(ins);
    }

    public next():number{
        try{return this.ins.read();}catch (e) {
            return -1;
        }
    }

    public nextBytes(bytes:number[], len:number ):number[]{
        this.ins.nextBytes(bytes, 0, len);
        return bytes;
    }

    public byte():Byte{return new Byte(this.next());}

    public int8():Int8{ return new Byte(this.next()).toInt8(); }

    public uint8():Uint8{ return new Uint8(this.byte()); }

    public word():Word{return new Word((this.next() << 8) + this.next() );}

    public int16():Int16{return this.word().toInt16();}

    public uint16():Uint16{ return new Uint16(this.word()); }

    public dword():Dword{return new Dword(Convert.arrayToNumber(this.nextBytes([], 4)));}

    public int32():Int32{ return this.dword().toInt32(); }

    public qword():Qword{ return new Qword(Convert.arrayToNumber(this.nextBytes([], 8))); }

    public double():Double{ return new Double(this.qword()); }

    public float():Float{return this.dword().toFloat(); }

    public close(): void {this.ins.close();}

    public read(): number { throw new UnsupportedOperationException(`Disabled`);}

    public ready(): boolean {return true;}

}
Object.package(this);