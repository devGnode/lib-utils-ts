/***
 */
export class Static {

    private static INSTANCE:Static = new Static();

    private handler:Object[] = new Array<Object>();

    private constructor() {}

    public static set(o:Object):Object{
        if(this.INSTANCE.handler==null) return null;
        if(this.INSTANCE==null) this.INSTANCE = new Static();
        this.INSTANCE.handler.push(o);
        return o;
    }

    public static resume():void{
        let o:Object[] =this.INSTANCE.handler;
        for( let i:number = 0; i < o.length; i++ ) (<any>o.shift()).__staticResume();
        this.INSTANCE.handler= this.INSTANCE = null;
    }
}