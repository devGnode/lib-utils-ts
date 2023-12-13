/***
 * @Reader
 *
 * extends :
 * @InputStreamReader
 * @StringReader
 */
export abstract class Reader {
    /***
     * @returns {number}
     */
    public abstract read():number;
    /**
     *
     * @param {string[]} buffer
     * @param {number} off
     * @param {number} length
     * @returns {number}
     */
    public readByte(buffer:string[], off:number = 0, length:number):number{
        return 0;
    }
    /***
     *
     */
    public nextByte(buffer:number[], offset:number = 0, length:number):number{
        return 0;
    }
    /***
     *
     * @returns {boolean}
     */
    public abstract ready():boolean;
    /***
     * close descriptor
     */
    public abstract close():void;
}