import {ExitSign} from "./ExitSign";
import {Byte} from "../primitives/Byte";
import {Objects} from "../type/Objects";
/***
 * @version 4.0-R-libUtilsTs
 * @version 1.0-R-JSTrip
 */
export class CloseProcess{
    /***/
    private constructor() {}
    /***
     */
    public static readonly SIGNS = ExitSign;
    /***
     * @param {number} exitCode
     * @return {CloseProcess}
     */
    public static exit(exitCode:Byte):CloseProcess{
        Objects.requireNotNull(exitCode);
        return new class extends CloseProcess{
            /***/
            getSign(): ExitSign {return ExitSign.EXIT;}
            getExitCode():number{return exitCode.valueOf();}
            finalize():void{ process.kill(process.pid,this.getExitCode()); }

        }
    };
    /***@SIGINT*/
    public static signInt():CloseProcess{return this.sign(ExitSign.SIGINT);};
    /***@SIGTERM*/
    public static signTerm():CloseProcess{return this.sign( ExitSign.SIGTERM);}
    /***@SIGHUP*/
    public static signHug():CloseProcess{return this.sign(ExitSign.SIGHUP);}
    /***@SIGBREAK*/
    public static signBreak():CloseProcess{return this.sign(ExitSign.SIGBREAK);}
    /***@SIGKILL*/
    public static signKill():CloseProcess{return this.sign(ExitSign.SIGKILL);};
    /***@SIGSTOP*/
    public static signStop():CloseProcess{return this.sign(ExitSign.SIGSTOP);};
    /***
     * @param {ExitSign} sign
     * @return {CloseProcess}
     */
    public static sign(sign:ExitSign):CloseProcess{
        Objects.requireNotNull(sign);
        return new class extends CloseProcess{
            /***/
            public getSign(): ExitSign {return sign;}

            public getExitCode():number{return sign.getExitCode();}
        }
    }
    /***
     * @return {number}
     */
    public getExitCode():number{return null;}
    /***
     * @return {ExitSign}
     */
    public getSign():ExitSign{ return null;}
    /***
     * @return {NodeJS.Signals}
     */
    public toSignJS():NodeJS.Signals{return this.getSign().toSignJS();}
    /***
     */
    public finalize():void{process.kill(process.pid,this.getSign().name());}
}
Object.package(this);