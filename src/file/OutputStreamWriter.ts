import {Writer} from "./Writer";
import {Objects} from "../type/Objects";
import {OutputStream} from "./OutputStream";
import {type} from "os";
/***
 * @OutputStreamWriter
 *
 * extends :
 *
 * @FileWriter
 */
export class OutputStreamWriter extends Writer{

    private readonly out: OutputStream;

    constructor(out:OutputStream) {
        super();
        this.out = Objects.requireNotNull(out);
    }

    public writeBytes(buffer: string[]|string, off?: number, len?: number): void {
        let buff:string[];

        if(typeof buffer==="string") buff = buffer.split("");
        else buff = buffer;

        if(Objects.isNull(off)&&Objects.isNull(len)){
            this.out.writeBytes(buff, 0, buff.length);
        }

        this.out.writeBytes(buff, off, len);
    }
    /**
     */
    public flush(): void {this.out.flush();}
    /**
     */
    public close(): void {this.out.close();}
    /**
     */
}
Object.package(this);