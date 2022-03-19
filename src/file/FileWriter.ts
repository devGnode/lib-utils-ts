import {OutputStreamWriter} from "./OutputStreamWriter";
import {File} from "./File";
import {FileOutputStream} from "./FileOutputStream";
import {FileDescriptor} from "./FileDescriptor";
/***
 * @FileWriter
 * @extends OutputStreamWriter and Writer class
 */
export class FileWriter extends OutputStreamWriter{
    /***
     * @param {File | string | FileDescriptor} file
     * @param {boolean} append
     */
    constructor(file:string|File|FileDescriptor, append?:boolean ) {
        super(new FileOutputStream(typeof file == "string"? new File(file) : file, append||null));
    }
}
Object.package(this);