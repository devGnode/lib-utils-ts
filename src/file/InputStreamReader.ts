import {Reader} from "./Reader";
import {InputStream} from "./InputStream";
import {Objects} from "../type/Objects";
/***
 * @InputStreamReader
 * @see FileReader
 */
export class InputStreamReader extends Reader{
    /***
     */
    private input:InputStream;

    constructor(ins:InputStream) {
        super();
        this.input = Objects.requireNotNull(ins);
    }
    /***
     * @returns {number}
     */
    public read(): number {return this.input.read();}
    /***
     * @param {string[]} buffer
     * @param {number} off
     * @param {number} length
     * @returns {number}
     */
    public readByte(buffer:string[], off:number = 0, length:number):number{
        return this.input.readBytes(buffer,off,length);
    }
    /***
     * @returns {boolean}
     */
    public ready(): boolean {return false;}
    /***
     *
     */
    public close(): void {this.input.close();}
}
Object.package(this);