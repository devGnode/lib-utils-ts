import {Runnable} from "../Interface";
import {Exception, IndexOfBoundException, NullPointerException} from "../Exception";
import {CloseProcess} from "./CloseProcess";
import {Byte} from "../primitives/Byte";
import {HookThread} from "./HookThread";

export abstract class Shutdown {

    private static RUN:number       = 0;
    private static HOOK:number      = 1;
    private static FINALIZED:number = 2;

    private static state:number = Shutdown.RUN

    private static readonly MAX_HOOKS:number = 10;

    private static readonly hooks:Runnable[] = [];

    private construtor(){}

    public static add(offset:number, hook:Runnable):void{
        if(offset==null) throw new NullPointerException("");
        if(offset>Shutdown.MAX_HOOKS||offset<0)
            throw new IndexOfBoundException(`max capacity of hooks is equals to ${Shutdown.MAX_HOOKS}, offset[ ${offset} ]`);

        if(this.hooks[offset] != null ) throw new Exception(`Shutdown hooks slot ${offset} already defined !`);
        if(this.state > Shutdown.RUN )throw new Exception(`Shutdown in progress`);
        this.hooks[offset] = hook;
    }

    private static runHooks(cp:CloseProcess):void{
        for(let i:number = 0; i < Shutdown.MAX_HOOKS; i++ ){
            if( this.hooks[i] != null ){
                try{
                    if(this.hooks[i] instanceof HookThread ) (<HookThread>this.hooks[i]).runIf(cp.getSign());
                    else{
                        this.hooks[i].run();
                    }
                }catch (e) {
                    //
                }
            }
        }
    }
    /***
     *
     * @param {CloseProcess} cp
     */
    public static exit(cp:CloseProcess):void{
        switch (Shutdown.state) {
            case Shutdown.RUN: Shutdown.state = Shutdown.HOOK; break;
            case Shutdown.HOOK: return;
            case Shutdown.FINALIZED:
                if(cp.getExitCode()!=0) cp.finalize();
            break;
        }
        this.runHooks(cp);
        Shutdown.state = Shutdown.FINALIZED;
        cp.finalize();
    }
    /***
     * ShutDown
     */
    public static shutdown():void{Shutdown.exit(CloseProcess.exit(Byte.mk(0)));}
}
Object.package(this);