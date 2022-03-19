import {IndexOfBoundException, NullPointerException} from "../Exception";
import {BYTE} from "../primitives/Globals";
import {Objects} from "../type/Objects";
/**
 * @OutputStream
 *
 * @see FileOutputStream
 * @see FilterOutputStream
 */
export abstract class OutputStream {

    protected buffer:string[];

    public abstract write(b: number | BYTE | string | string[]):void;
    /***
     * @writeBytes
     * @param {@value string} buffer
     * @param {@value number}  off
     * @param {@value number} len
     * @return void
     */
    public writeBytes(buffer: string[]|string, off?: number, len?: number):void{
        let buff:string[];

        Objects.requireNotNull(buffer);
        buff = typeof buffer==="string" ? buffer.split("") : buffer;
        if(Objects.isNull(off)&&Objects.isNull(len)) this.writeBytes(buff,0,buffer.length);

        if( off < 0 || len < 0 || off > buffer.length || off+len > buffer.length )
            throw new IndexOfBoundException();

        for(let index=0; index < len; index++ )this.write(buff[ off + index ].charCodeAt(0));
    }
    /***
     *
     */
    public flush():void{}
    /***
     * close descriptor
     */
    public close():void{}

}
// package
Object.package(this);