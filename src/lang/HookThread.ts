import {Thread} from "./Thread";
import {Runnable} from "../Interface";
import {Objects} from "../type/Objects";
import {RuntimeException} from "../Exception";
import {ExitSign} from "./ExitSign";
/***
 * @version 4.0-R-libUtilsTs
 * @version 1.0-R-JSTrip
 */
export abstract class HookThread extends Thread implements Runnable{
    /***
     * @type {boolean}
     */
    private consumed:boolean= false;
    /***
     *
     */
    protected sign:ExitSign;

    protected constructor(sign:ExitSign = null) {super(); this.sign = sign; }
    /***
     */
    public run():void{
        if(this.consumed) throw new RuntimeException("HookThread already consumed !");
        this.consumed=true;
    }
    /***
     * @param {ExitSign} sign
     */
    public runIf(sign:ExitSign):void{
        if(Objects.isNull(sign)||(!Objects.isNull(sign)&&sign.equals(sign))) this.run();
    }
    /***
     * @return {boolean}
     */
    public isConsumed():boolean{return this.consumed; }
    /**
     * @return {ExitSign}
     */
    public getSigns():ExitSign{ return this.sign; }
    /***
     * @param {Object} o
     * @return {boolean}
     */
    public equals(o:Object):boolean{
        if(o===null||o===undefined||!(o instanceof HookThread))return false;
        if(o===this)return true;
        return false;
    }
}
Object.package(this);