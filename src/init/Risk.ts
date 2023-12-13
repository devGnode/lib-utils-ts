/***/
export abstract class Risk {
    private static retry:Function[] = Array();
    private static consumed:boolean = false;
    private static init:boolean     = false;

    public static failure(failCallback:Function):void{ if(failCallback!=null)Risk.retry.push(failCallback); }
    public static resumeFailureLoad():void{
        if(Risk.consumed)return;
        for(let i = 0; i < Risk.retry.length; i++){
            let f:Function = Risk.retry[i];
            f();
        }
        Risk.retry = [];
        this.init = true;
    }

    public static sz():number{return Risk.retry.length;}
    public static try(failCallback:Function){
        if(this.init)failCallback.call(null);
        else {
            try {
                failCallback.call(null)
            } catch (e) {
                if (Risk.consumed) throw new Error("");
                Risk.failure(failCallback);
            }
        }
    }
    private constructor() {}
}
Object.package(this);