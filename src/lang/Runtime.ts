import * as os from "os";
import {IOException} from "../Exception";
import {Byte} from "../primitives/Byte";
import {ProcessBuilder} from "./ProcessBuilder";
import {Process} from "./Process";
import {HookThread} from "./HookThread";
import {ApplicationShutdownHooks} from "./ApplicationShutdownHooks";
import {CloseProcess} from "./CloseProcess";
import {ExitSign} from "./ExitSign";
import {Shutdown} from "./Shutdown";
import {File} from "../file/File";
/***
 * @version 4.0-R-libUtilsTs
 * @version 1.0-R-JSTrip
 * @todo implement : load, loadLibrary
 */
export class Runtime {
    /***
     * Current pointer to {Runtime}
     * @type {Runtime}
     */
    private static current:Runtime = new Runtime();

    protected constructor() {}
    /***
     * @return {Runtime}
     */
    public static getRuntime():Runtime{return Runtime.current;}
    /***
     * @param {Byte} signalCode
     */
    public exit(signalCode:Byte):void{
        if(signalCode===null||signalCode===undefined) throw new IOException("Process exit SIGNAL cannot be null !");
        Shutdown.exit(CloseProcess.exit(signalCode));
    }
    /**/
    public halt(signalCode:ExitSign):void{
        if(signalCode===null||signalCode===undefined) throw new IOException("Process Exit SIGNAL cannot be null !");
        Shutdown.exit(CloseProcess.sign(signalCode));
    }
    /**/
    public addHookShutDown(hook:HookThread=null):void{
        if(hook===null)return;
        ApplicationShutdownHooks.add(hook);
    }
    /**/
    public removeAddHookShutDown(hook:HookThread=null):void{
        if(hook===null)return;
        ApplicationShutdownHooks.remove(hook);
    }
    /***
     * @return {number}
     */
    public freeMem():number{ return os.freemem(); }
    /***/
    public totalMemory():number{ return os.totalmem();}
    /***
     * @return {number}
     */
    public pid():number{ return process.pid; }
    /***
     * @return {number}
     */
    public ppid():number{ return process.ppid; }
    /***
     * @return {number}
     */
    public uptime():number{ return process.uptime(); }
    /***/
    public availableProcessors():number{return os.cpus().length;}
    /**
     * @return {Process}
     * @param dir
     * @param commands
     */
    public exec( dir:File = null, ...commands:string[] ):Process{
        return ProcessBuilder
            .of(...commands)
            .setDirectory(dir)
            .start();
    }
}
Object.package(this);