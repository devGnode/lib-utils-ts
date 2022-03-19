import {Enum} from "../Enum";
/***
 * @version 4.0-R-libUtilsTs
 * @version 1.0-R-JSTrip
 */export class ExitSign extends Enum{
    /***/
    @Enum.args(true) static EXIT:ExitSign;
    @Enum.args(true) static SIGHUP:ExitSign;
    @Enum.args(true) static SIGINT:ExitSign;
    @Enum.args(false) static SIGQUIT:ExitSign;
    @Enum.args(false) static SIGILL:ExitSign;
    @Enum.args(false) static SIGTRAP:ExitSign;
    @Enum.args(false) static SIGABRT:ExitSign;
    @Enum.args(false) static SIGIOT:ExitSign;
    @Enum.args(false) static SIGBUS:ExitSign;
    @Enum.args(false) static SIGEMT:ExitSign;
    @Enum.args(false) static SIGFPE:ExitSign;
    @Enum.args(true) static SIGKILL:ExitSign;
    @Enum.args(false) static SIGUSR1:ExitSign;
    @Enum.args(false) static SIGSEGV:ExitSign;
    @Enum.args(false) static SIGUSR2:ExitSign;
    @Enum.args(false) static SIGPIPE:ExitSign;
    @Enum.args(false) static SIGALRM:ExitSign;
    @Enum.args(true) static SIGTERM:ExitSign;
    @Enum.args(false) static SIGSTKFLT:ExitSign;
    @Enum.args(false) static SIGCHLD:ExitSign;
    @Enum.args(false) static SIGCLD:ExitSign;
    @Enum.args(false) static SIGCONT:ExitSign;
    @Enum.args(true) static SIGSTOP:ExitSign;
    @Enum.args(false) static SIGTSTP:ExitSign;
    @Enum.args(false) static SIGTTIN:ExitSign;
    @Enum.args(false) static SIGTTOU:ExitSign;
    @Enum.args(false) static SIGURG:ExitSign;
    @Enum.args(false) static SIGXCPU:ExitSign;
    @Enum.args(false) static SIGFSZ:ExitSign
    @Enum.args(false) static SIGVTALRM:ExitSign
    @Enum.args(false) static SIGPROF:ExitSign;
    @Enum.args(false) static SIWINCH:ExitSign;
    @Enum.args(false) static SIGIO:ExitSign;
    @Enum.args(false) static SIGPOLL:ExitSign;
    @Enum.args(false) static SIGPWR:ExitSign;
    @Enum.args(false) static SIGINFO:ExitSign;
    @Enum.args(false) static SIGLOST:ExitSign;
    @Enum.args(false) static SIGSYS:ExitSign;
    @Enum.args(false) static SIGUNUSED:ExitSign;
    @Enum.args(true) static SIGBREAK:ExitSign;
    /****
     * This attribute allow to check if
     * a signal, is already in listener
     * see {ApplicationShutdownHooks}.
     */
    private initListen:boolean;
    /***
     * @param {boolean} state
     */
    protected constructor(state:boolean) {super(); this.initListen = state||false; }
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
     * Need for have a  good parameter type
     *  for a native NodeJS signs type.
     * @return {NodeJS.Signals}
     */
    public toSignJS():NodeJS.Signals{ return <NodeJS.Signals>this.name(); }
}
Object.package(this);