import {BYTE} from "../primitives/Globals";
/***
 * @Writer
 *
 * @see PrintWriter
 * @see OutputStreamWriter
 */
export abstract class Writer {
    /***
     */
    protected constructor() {}
    /**
     * @param b
     * @return void
     */
    public write(b:number|BYTE|string|string[]):void{
        let str:string[];

        if(typeof b ==="number") str=[String.fromCharCode(b)];
        else if(typeof b ==="string") str=b.split("");
        else{
            str= [b.toString()];
        }
        this.writeBytes(str,0,str.length);
    }
    /**
     * @return void
     */
    public abstract writeBytes( buffer:string[]|string, off?:number, len?:number ):void;
    /**
     * @flush - flush buffer
     * @return void
     */
    public abstract flush():void;
    /***
     * @close allow to close descriptor
     * @return void
     */
    public abstract close():void;
    /***/
}
Object.package(this);