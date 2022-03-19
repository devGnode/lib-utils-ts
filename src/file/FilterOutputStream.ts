import {BYTE} from "../primitives/Globals";
import {OutputStream} from "./OutputStream";
/****
 * @see OutputStream
 * @see PrintStream
 */
export class FilterOutputStream extends OutputStream{

    protected out:OutputStream;

    constructor(out:OutputStream) {
        super();
        this.out = out;
    }

    public write(b: number | BYTE | string | string[]) {
        this.out.write(b);
    }

    public writeBytes(buffer: string[]|string, off?: number, len?: number): void {
        this.out.writeBytes(buffer,off,len);
    }

    public close(): void {this.out.close();}

    public flush(): void { this.out.flush(); }

}