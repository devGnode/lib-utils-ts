import {InputStream} from "./InputStream";
import {File} from "./File";
import {Objects} from "../type/Objects";
import {FileNotFoundException} from "./FileNotFoundException";
import {IOException} from "./IOException";
import * as fs from "fs";
import {EOFException} from "./EOFException";
import {FileDescriptor} from "./FileDescriptor";
import {NullPointerException} from "../Exception";

export class FileInputStream extends InputStream{

    private readonly fd:FileDescriptor;
    private readonly path:string;

    private index:number = 0;
    private offset:number = 0;

    constructor(file:string|File|FileDescriptor) {
        super();

        if(file===null||file===undefined) throw new NullPointerException();
        if(typeof file ==="string") file=new File(file);
        if(file instanceof  FileDescriptor){
            this.fd     = file;
            this.path   = null;
        }else{

            if(!file.exists()) throw new FileNotFoundException(`Invalid file path, '${file.toString()}' doesn't exists.`);
            if(file.isDirectory()) throw new IOException(`Target is a directory.`);

            this.path   = file.toString();
            this.fd     = new FileDescriptor();
            this.fd.set(fs.openSync(this.path,"r"));

        }

    }
    /***
     *
     * @param {string[]} buffer
     * @returns {number}
     */
    public read(buffer?:string[]): number {
        if(Objects.isNull(buffer)){
            let  value:number,
                uint8: Uint8Array = new Uint8Array(1);

            fs.readSync(this.fd.get(),uint8,0,1,this.offset++);
            if((value = uint8.values().next().value)===0x00) throw new EOFException();

            return value;
        }
        return super.readBytes(buffer, 0, buffer.length);
    }
    /***
     *
     * @param {string[]} buffer
     * @param {number} off
     * @param {number} length
     * @returns {number}
     */
    public readBytes(buffer:string[], off:number = 0, length:number):number{
        return super.readBytes(buffer,off,length);
    }
    /***
     *
     * @returns {FileDescriptor}
     */
    public getFD():FileDescriptor{return this.fd;}
    /***
     *
     * @returns {boolean}
     */
    public close(): boolean {
        // flush
        if(this.fd.get() === 1 || this.fd.get()===2) void 0;
        else{
            //
            this.fd.close();
        }
        return true;
    }

    public mark(offset: number): void {
        if(offset!=null||offset<0) return;
        this.offset = offset;
    }

}
// package
Object.package(this);