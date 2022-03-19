import { Writer } from "./Writer";
import {OutputStream} from "./OutputStream";
import {format} from "util";
import {BYTE} from "../primitives/Globals";
import {Objects} from "../type/Objects";
import * as os from "os";
/***
 * @see Writer
 */
export class PrintWriter extends Writer{

    private readonly out:Writer;
    private readonly autoFlush:boolean;

    private readonly lineSeparator:string = os.EOL;

    constructor(out:Writer|OutputStream, autoFlush?:boolean) {
        super();
        this.out        = out;
        this.autoFlush  = autoFlush;
    }

    public close(): void {this.out.close();}

    public flush(): void {this.out.flush();}

    public write(b: number | BYTE | string) {this.out.write(b);}

    public writeBytes(buffer: string[]|string, off?: number, len?: number): void {
        this.out.writeBytes(buffer,off,len);
    }

    public print(value?:Object):void{
        this.write(Objects.isNull(value)?"null":value.toString());
    }

    public println(value?:Object):void{
        this.write(Objects.isNull(value)?"null":value.toString());
        this.newLine();
    }

    private newLine():void{
        this.write(this.lineSeparator);
    }

    public printf(pattern:string, ... args: Object[]){
       return this.write(format.apply( null, [ pattern ].concat(args.map(value=>value.toString()))));
    }
}
Object.package(this);