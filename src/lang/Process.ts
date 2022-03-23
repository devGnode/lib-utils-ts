import {InputStream} from "../file/InputStream";
import {OutputStream} from "../file/OutputStream";
import {ExitSign} from "./ExitSign";
/***
 * @version 4.0-R-libUtilsTs
 * @version 1.0-R-JSTrip
 */
export abstract class Process {
    /**
     *
     */
    public abstract halt(sign:ExitSign):void;
    /***/
    public abstract destroy():void;
    /**
     */
    public abstract exitValue():void;
    /**
     */
    public abstract getErrorStream():InputStream;
    /**
     */
    public abstract getInputStream(): OutputStream;
    /**
     */
    public abstract getOutputStream():InputStream;
    /**
     */
    public isAlive():boolean{return false;}
}
Object.package(this);