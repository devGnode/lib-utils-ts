import * as fs from "fs";
import path = require("path");
import {Path} from "./Path";
import {Objects} from "../type/Objects";
import { SecurityException} from "../Exception";
import {readdirSync} from "fs";
import {predicate} from "../Interface";
/***
 *
 */
export class File {
    /***
     *
     */
    private readonly path:string;

    constructor(pathS:string, parent?:Path) {
        this.path = path.normalize(pathS);
    }
    /***
     *
     * @returns {string}
     */
    public getName():string{return this.toPath().getFileName().toString();}
    /***
     *
     * @returns {File}
     */
    public getParentFile():File{return new File(this.getParent());}
    /***
     *
     * @returns {string}
     */
    public getParent():string{return this.toPath().getParent().toString(); }
    /***
     *
     * @returns {boolean}
     */
    public createNewFile():boolean{
        if(this.exists()||this.isFile()) return false;
        try {
            if(!new File(this.getParent()).exists())new File(this.getParent()).mkdirs();
            fs.closeSync(fs.openSync(this.path,"w"));
        }catch (e) {
            return false;
        }
        return true;
    }
    /***
     *
     * @returns {number}
     */
    private mode():number{
        if(!this.exists()) throw new SecurityException(`Cannot access to path '${this.path}'`);
        return fs.statSync(this.path).mode;
    }
    /***
     * @isAbsolute
     * @returns {boolean}
     */
    public isAbsolute():boolean{ return this.toPath().isAbsolute(); }
    /***/
    public getAbsolutePath():string{
        let path:Path;
        if(this.isAbsolute()){
            if(this.isFile()) return this.getParent();
            return this.path;
        }
        path = this.toPath().resolve(new Path(this.path));
        if(this.isFile()) return path.getParent().toString();
        return path.toString();
    }
    /***
     *
     */
    public getAbsoluteFile():File{return new File(this.getAbsolutePath()); }
    /***
     * @isFile
     * @returns {boolean}
     */
    public isFile():boolean{
        try {return fs.lstatSync(this.path).isFile();}catch (e) {
            return false;
        }
    }
    /***
     * @isDirectory
     * @returns {boolean}
     */
    public isDirectory():boolean{
        try{return fs.lstatSync(this.path).isDirectory();}catch (e) {
            return false;
        }
    }
    /***
     * @exists
     * @returns {boolean}
     */
    public exists(  ):boolean{
        try {fs.statSync(this.path);return true;} catch (e) {
            return false;
        }
    }
    /***
     *
     * @param {File} file
     * @returns {boolean}
     * @throws NullPointerException
     */
    public renameTo(file:File):boolean{
        try {fs.renameSync(this.path,Objects.requireNotNull(file).toString());return true;} catch (e) {
            return false;
        }
    }
    /***
     * @length
     * @returns {number}
     */
    public length( ) : number{
        try{let stats = fs.statSync(this.path); return stats["size"];}catch (e) {
            return -1;
        }
    }
    /***
     * @mkdir
     * @params {Path} path
     * @returns {boolean}
     */
    public mkdir( recursive?:boolean ):boolean{
        try{
            if(this.exists()||this.isDirectory()) return false;
            fs.mkdirSync(this.path,{recursive:recursive||false});
            return true;
        }catch (e) {
            return false;
        }
    }
    /***
     * @mkdir
     * @params {Path} path
     * @returns {boolean}
     */
    public mkdirs():boolean{return this.mkdir(true);}
    /***
     *
     * @returns {File[]}
     */
    public list(filer?:predicate<string>):string[]{
        let out:string[] = [], list:string[];

        if(!this.isDirectory()) throw new SecurityException(`'${this.path}' is not a directory !`);
        list = readdirSync(this.path);
        for(let i=0; i<list.length; i++){
            /*!new File(list[i]).isDirectory() &&*/
            if((Objects.isNull(filer)||(!Objects.isNull(filer)&&filer.test(list[i])))){
                out.push(list[i]);
            }
        }
        return out;
    }
    /***/
    public listFiles(filer?:predicate<string>):File[]{
        let out:File[] = [], tmp:File, list:string[];

        if(!this.isDirectory()) throw new SecurityException(`'${this.path}' is not a directory !`);
        list = readdirSync(this.path);
        for(let i=0; i<list.length; i++){
            tmp = new File(this.toPath().resolve(new Path(list[i])).resolve().toString());
            if((Objects.isNull(filer)||(!Objects.isNull(filer)&&filer.test(list[i])))){
                out.push(tmp);
            }
        }
        return out;
    }
    /***
     * @delete
     * @returns {boolean}
     */
    public delete():boolean{
        if(this.isDirectory()){
            try {fs.rmdirSync(this.path);return true;} catch (e) {
                return false;
            }
        }
        try {fs.unlinkSync(this.path);return true;} catch (e) {
            return false;
        }
    }
    /***
     * @toPath
     * @returns {Path}
     */
    public toPath():Path{ return new Path(this.path); }
    /***
     * @toString
     * @override
     * @returns {string}
     */
    public toString():string{return this.path;}
    /***
     * @equals
     * @param {Object} other
     * @returns {boolean}
     */
    public equals(other:Object):boolean{
        if(!(other instanceof File)) return false;
        return this.toPath().equals(other.toPath());
    }
    /***
     *
     * @param {string} path
     * @returns {File}
     */
    public static of(path:string):File{return new File(path);}

}
//Object.package(this);