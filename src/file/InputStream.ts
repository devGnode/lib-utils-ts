import {IndexOfBoundException, NullPointerException} from "../Exception";
import {EOFException} from "./EOFException";
/***
 * @InputStream
 *
 * extends to :
 * @FileInputStream
 */
export abstract class InputStream {
    /***
     * @param {string[]} buffer
     * @returns {number}
     */
    public abstract read(buffer?: string[]): number;
    /***
     * @param {string[]} buffer
     * @param off
     * @param length
     * @returns {number}
     */
    public readBytes(buffer: string[], off: number = 0, length: number): number {
        if (buffer === null) throw new NullPointerException();
        if (off < 0 || length < 0 ) throw new IndexOfBoundException();

        let i = 0
        try {
            for (; i < length; i++) {
                buffer[off + i] = String.fromCharCode(this.read());
            }
        } catch (e) {
            if (e instanceof EOFException) return -1;
        }

        return i;
    }
    /***
     * @param {number[]} buffer
     * @param {number} off
     * @param {number} length
     * @return {number}
     */
    public nextBytes(buffer: number[], off: number = 0, length: number): number {
        if (buffer === null) throw new NullPointerException();
        if (off < 0 || length < 0 ) throw new IndexOfBoundException();
        let i = 0
        try {
            for (; i < length; i++) buffer[off + i] = this.read();
        } catch (e) {
            if (e instanceof EOFException) return -1;
        }
        return i;
    }
    /***
     * @returns {boolean}
     */
    public close(): boolean {return null;}
    /***
     */
    public abstract mark(offset: number): void;
}
Object.package(this);