import {InputStreamReader} from "./InputStreamReader";
import {File} from "./File";
import {FileInputStream} from "./FileInputStream";
import {FileDescriptor} from "./FileDescriptor";
/****
 *
 */
export class FileReader extends InputStreamReader{
    /***
     * @param {File | string} file
     * @returns FileReader
     */
    public constructor(file:string|File|FileDescriptor) {
        super(new FileInputStream( typeof file === "string"  ? new File(file) : file));
    }
    /***
     * @returns {boolean}
     */
    public ready(): boolean {return true;}
}
Object.package(this);