
export interface HttpHandler {
    handle(o:Object):void;
    handleASync?(o:Object):Promise<void>;
}

export interface Runnable {
    run():void;
    runASync?():Promise<void>;
}

export interface Executor {
    execute(runnable:Runnable):void;
    executeASync?(runnable:Runnable):Promise<void>;
}