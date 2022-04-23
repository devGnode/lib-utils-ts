import {Path} from "./Path";
import {File} from "./File";
import * as fs from "fs";
import {IOException} from "./IOException";

export abstract class Files{

    /***
     * @param {File | Path} file
     * @return {number}
     */
    public static size(file:File|Path):number{
        if(file instanceof Path) file = file.toFile();
        if(file instanceof File){
            if(file.isDirectory()) throw new IOException(`${file.toString()} is not a file !`);
            if(file.isFile()) fs.statSync('path/to/file').size;
        }
        return -1;
    }

    private constructor() {}
}