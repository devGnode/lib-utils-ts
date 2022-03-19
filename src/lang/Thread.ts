import {Runnable} from "../Interface";


export class Thread implements Runnable{

    protected static id:number = 0;

    private readonly id:number;

    constructor() {this.id = Thread.id++;}

    public getId():number{ return this.id; }

    public run(): void {}
    /***
     * @sleep
     * @async
     * @return {Promise<void>}
     */
    public static async sleep(milliscds:number):Promise<void>{
        return new Promise<void>((resolve)=>{
            setTimeout(()=>resolve(void 0), milliscds);
        });
    }

}
Object.package(this);