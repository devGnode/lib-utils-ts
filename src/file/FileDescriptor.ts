import * as fs from "fs";
import {IOException} from "../Exception";
/***
 * @FileDescriptor
 * @author maroder
 */
export class FileDescriptor {
    /***
     * Descriptor of STDIN
     * @type {FileDescriptor}
     */
    public static readonly in:FileDescriptor = FileDescriptor.standardStream(0);
    /***
     * Descriptor of STDOUT
     * @type {FileDescriptor}
     */
    public static readonly out:FileDescriptor = FileDescriptor.standardStream(1);
    /***
     * Descriptor of STDERR
     * @type {FileDescriptor}
     */
    public static readonly err:FileDescriptor = FileDescriptor.standardStream(2);
    /***
     * The default file descriptor is equals to -1,
     * this value is an invalid descriptor.
     * @type {number}
     */
    private fd:number = -1;
    /***
     */
    constructor() {}
    /****
     * @standardStream build basic standard file descriptor
     * @param {number} fd
     * @returns {FileDescriptor}
     */
    private static standardStream(fd:number):FileDescriptor{
        let desc:FileDescriptor = new FileDescriptor();
        desc.fd = fd;
        return desc;
    }
    /***
     * @isValid file descriptor
     * @returns {boolean}
     */
    public isValid():boolean{ return this.fd != -1; }
    /***
     * @get getFile descriptor
     * @returns {number}
     */
    public get():number{return this.fd;}
    /***
     * @set file descriptor
     * @param {number} fd
     * @returns {FileDescriptor}
     */
    public set(fd:number):FileDescriptor{
        if(this.fd===-1) this.fd = fd;
        return this;
    }
    /**
     * @close : allow to close a file descriptor
     * @native
     */
    public close():void{
        try {fs.closeSync(this.fd);}catch (e) {
            throw new IOException();
        }
    }
    /***
     * @override
     * @param {Object} o
     * @returns {boolean}
     */
    public equals(o:Object){
        if(o===null||o===undefined||!(o instanceof FileDescriptor))return false;
        if( this === o )return true;
        return o.get().equals(o.get());
    }
}
Object.package(this);