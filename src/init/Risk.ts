/***/
export abstract class Risk {
    private static retry:Function[] = Array();
    public static failure(failCallback:Function):void{ if(failCallback!=null)this.retry.push(failCallback); }
    public static resumeFailureLoad():void{for(let i = 0; i < this.retry.length; i++,this.retry.shift()());}
    public static try(failCallback:Function){try{failCallback.call(null)}catch (e) {this.failure(failCallback);}}
    private constructor() {}
}
Object.package(this);