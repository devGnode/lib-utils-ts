import {Enum} from "../Enum";
/***
 * @version 4.0-R-libUtilsTs
 * @version 1.0-R-JSTrip
 */export class ExitSign extends Enum{
    /***/
    @Enum.args(true, 0) static EXIT:ExitSign;
    @Enum.args(true, 1) static SIGHUP:ExitSign;
    @Enum.args(true, 2) static SIGINT:ExitSign;
    @Enum.args(false, 3) static SIGQUIT:ExitSign;
    @Enum.args(false, 4) static SIGILL:ExitSign;
    @Enum.args(false, 5) static SIGTRAP:ExitSign;
    @Enum.args(false, 6) static SIGABRT:ExitSign;
    @Enum.args(false, 6) static SIGIOT:ExitSign;
    @Enum.args(false, 7) static SIGBUS:ExitSign;
    @Enum.args(false, null) static SIGEMT:ExitSign;
    @Enum.args(false,8) static SIGFPE:ExitSign;
    @Enum.args(true, 9) static SIGKILL:ExitSign;
    @Enum.args(false, 10) static SIGUSR1:ExitSign;
    @Enum.args(false, 11) static SIGSEGV:ExitSign;
    @Enum.args(false, 12) static SIGUSR2:ExitSign;
    @Enum.args(false, 13) static SIGPIPE:ExitSign;
    @Enum.args(false, 14) static SIGALRM:ExitSign;
    @Enum.args(true, 15) static SIGTERM:ExitSign;
    @Enum.args(false, 16) static SIGSTKFLT:ExitSign;
    @Enum.args(false, 17) static SIGCHLD:ExitSign;
    @Enum.args(false, null) static SIGCLD:ExitSign;
    @Enum.args(false,  18) static SIGCONT:ExitSign;
    @Enum.args(true, 19) static SIGSTOP:ExitSign;
    @Enum.args(false, 20) static SIGTSTP:ExitSign;
    @Enum.args(false, 21) static SIGTTIN:ExitSign;
    @Enum.args(false, 22) static SIGTTOU:ExitSign;
    @Enum.args(false, 23) static SIGURG:ExitSign;
    @Enum.args(false, 24) static SIGXCPU:ExitSign;
    @Enum.args(false, 25) static SIGFSZ:ExitSign
    @Enum.args(false, 26) static SIGVTALRM:ExitSign
    @Enum.args(false, 27) static SIGPROF:ExitSign;
    @Enum.args(false, 28) static SIWINCH:ExitSign;
    @Enum.args(false, 29) static SIGIO:ExitSign;
    @Enum.args(false,  null) static SIGPOLL:ExitSign;
    @Enum.args(false, 30) static SIGPWR:ExitSign;
    @Enum.args(false, null) static SIGINFO:ExitSign;
    @Enum.args(false, null) static SIGLOST:ExitSign;
    @Enum.args(false) static SIGSYS:ExitSign;
    @Enum.args(false, 31) static SIGUNUSED:ExitSign;
    @Enum.args(true, 31) static SIGBREAK:ExitSign;
    /****
     * This attribute allow to check if
     * a signal, is already in listener
     * see {ApplicationShutdownHooks}.
     */
    private initListen:boolean;

    private readonly exitCode:number;
    /***
     * @param {boolean} state
     * @param code
     */
    protected constructor(state:boolean, code:number) {
        super();
        this.initListen = state||false;
        this.exitCode   = code;
    }
    /***
     * @constructor
     */
    public Init():void{
        if(this.initListen)return;
        this.initListen=true;
    }
    /***
     * @return {boolean}
     */
    public isListen():boolean{return this.initListen;}
    /***
     *
     */
    public getExitCode():number{return this.exitCode; }
    /***
     * Need for have a  good parameter type
     *  for a native NodeJS signs type.
     * @return {NodeJS.Signals}
     */
    public toSignJS():NodeJS.Signals{ return <NodeJS.Signals>this.name(); }
}
Object.package(this);