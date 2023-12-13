import {Writer} from "./Writer";
import {IOException} from "../Exception";
import {Arrays} from "../type/Arrays";

export class StringWriter extends Writer{

    private value:string[] = new Array<string>();
    private isClose:boolean  = false;

    constructor() {super();}

    public append(chr:string):StringWriter{
        this.write(chr);
        return this;
    }

    public close(): void {this.isClose=true;}

    public flush(): void { this.value=[]; }

    public writeBytes(buffer: string[] | string, off?: number, len?: number): void {
        if(this.isClose==null) throw new IOException(`Stream ${StringWriter.class().getName()} is closed !`);
        for(let i:number= this.value.length; i < (i+buffer.length); i++) this.value[i] = buffer[i];
    }

    public getBuffer():string[]{ return Arrays.copyOfRange(this.value,0, null); }

    /***@override*/
    public toString():string{ return this.value.join(); }
}
Object.package(this);