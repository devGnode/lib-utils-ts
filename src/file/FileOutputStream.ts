import {OutputStream} from "./OutputStream";
import {File} from "./File";
import {FileNotFoundException} from "./FileNotFoundException";
import * as fs from "fs";
import {IOException, NullPointerException} from "../Exception";
import {BYTE} from "../primitives/Globals";
import {FileDescriptor} from "./FileDescriptor";
/***
 *
 */
export class FileOutputStream extends OutputStream{

    private readonly path:string;
    private readonly fd:FileDescriptor;

        constructor(file:string|File|FileDescriptor, truncate?:boolean ) {
        super();

        if(file===null||file===undefined) throw new NullPointerException();
        if(typeof file ==="string") file = new File(file);
        if(file instanceof FileDescriptor){
            this.path = null;
            this.fd = file;
        }else {
            if (!file.exists()) {
                if (!file.createNewFile())
                    throw new IOException(`Impossible to create file '${file.getName()}' in target '${file.getParent()}'`);
            }
            if (!file.isFile()) throw new FileNotFoundException(`Invalid file path, '${file.toString()}' doesn't exists.`);

            this.path = file.toString();
            this.fd = new FileDescriptor().set(fs.openSync(this.path, truncate === true ? "a" : "w"));
        }
    }

    public write(b:number|BYTE|string): void {
            try {fs.writeSync(this.fd.get(), b === "string" ? b.toString() : typeof b === "number" ? String.fromCharCode(b) : b.toString());}catch (e) {
                throw new IOException(e.stack)
            }
    }

    public writeBytes(buffer: string[], off: number = 0, length: number): void {
        super.writeBytes(buffer, off, length);
    }

    public close() {
        // flush
        if(this.fd.get()===1||this.fd.get()===2) void 0;
        else{
            // close fd
            this.fd.close();
        }
    }

    public getFD():FileDescriptor{
        if(!this.fd) return null;
        if(this.fd.isValid())return this.fd;
        throw new IOException();
    }

    public flush() {fs.ftruncateSync(this.fd.get(),0);}

}
Object.package(this);