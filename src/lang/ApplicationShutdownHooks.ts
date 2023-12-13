import {IConsumer, List, Runnable} from "../Interface";
import {ArrayList} from "../utils/ArrayList";
import {Objects} from "../type/Objects";
import {HookThread} from "./HookThread";
import {CloseProcess} from "./CloseProcess";
import {ExitSign} from "./ExitSign";
import {Byte} from "../primitives/Byte";
import {Shutdown} from "./Shutdown";
import {Risk} from "../init/Risk";
/***
 * @version 4.0-R-libUtilsTs
 * @version 1.0-R-JSTrip
 */
export class ApplicationShutdownHooks {
    /***
     */
    private static readonly INSTANCE:ApplicationShutdownHooks = new ApplicationShutdownHooks();
    /***
     * @type {ArrayList<HookThread>}
     */
    private static hooks:List<HookThread> = new ArrayList();
    /***
     */
    private constructor() {  /*try{this.init();}catch(e){*/Risk.failure(()=>this.init());/*}*/ }
    /***
     * @initialInit
     * @native
     */
    private init():void{
        // default
        process.on(ExitSign.EXIT.name(), (exit:number)=>Shutdown.exit(CloseProcess.exit(Byte.mk(exit))));
        // most used
        process.on(ExitSign.SIGINT.toSignJS(), ()=>Shutdown.exit(CloseProcess.signInt()));
        process.on(ExitSign.SIGTERM.toSignJS(), ()=>Shutdown.exit(CloseProcess.signTerm()));
        process.on(ExitSign.SIGHUP.toSignJS(), ()=>Shutdown.exit(CloseProcess.signHug()));
        process.on(ExitSign.SIGBREAK.toSignJS(), ()=>Shutdown.exit(CloseProcess.signBreak()));
        process.on(ExitSign.SIGKILL.toSignJS(), ()=>Shutdown.exit(CloseProcess.signKill()));
        process.on(ExitSign.SIGSTOP.toSignJS(), ()=>Shutdown.exit(CloseProcess.signStop()));
        // ShutDown init
        Shutdown.add(1, new class extends HookThread implements Runnable{

            constructor() {super();}

            public runIf(sign: ExitSign) {ApplicationShutdownHooks.run(sign);}

            public run(): void { this.runIf(null); }

        });
    }
    /***
     * @add
     * @param hook
     */
    public static add(hook:HookThread):void{
        if(Objects.isNull(hook)&&Objects.isNull(this.hooks)) return;
        // no Listener Found
        // CUSTOM EXIT LISTENER
        if(!Objects.isNull(hook.getSigns())&&!hook.getSigns().isListen()){
            process.on(hook.getSigns().toSignJS(), ()=>Shutdown.exit(CloseProcess.sign(hook.getSigns())));
        }
        this.hooks.add(hook);
    }
    /***
     * @remove
     * @param {HookThread} hook
     */
    public static remove(hook:HookThread):void{
        if(Objects.isNull(hook)&&Objects.isNull(this.hooks)) return;
        this.hooks.remove(hook);
    }
    /***
     * @run
     * @param {NodeJS.Signals} sign
     */
    private static run( sign:ExitSign ):void{
        if(Objects.isNull(this.hooks))return;
        this.hooks.forEach(new class implements IConsumer<HookThread>{

            public accept(thread:HookThread):void{
                // Run
                try {thread.runIf(sign);}catch (e) {
                    //
                }
            }
        });
        //sign.finalize();
        this.hooks = null;
    }
}
Object.package(this);