import * as fs from "fs";
import {IOException, NullPointerException} from "../Exception";
import {fileStream, List, reader, writer} from "../Interface";
import {Define} from "../Define";
import {mkdirSync, statSync, writeFileSync} from "fs";
import {Path} from "./Path";
import "../globalUtils";
import {Iterator} from "../Iterator";

/***
 *
 */
export abstract class AbstractIOFile implements fileStream{
    /***
     * file pattern : /foo/bar/NSAStalker.txt
     */
    protected file : string     = null;
    /***
     * @param file
     */
    protected constructor( file :string ){this.file = file;}
    /***
     *
     */
    public getPath( ): string{ return this.file; }
    /***
     *
     */
    public getFileName(): string {return new Path(this.file).getFileName();}
    /***
     *
     */
    public static exists( path : Path ):boolean{
        try {statSync(path.get());return true;} catch (e) {
            return false;
        }
    }
    /***
     *
     */
    public static getFileSize( filename : string = "" ) : number{
        try{let stats = statSync(filename);return stats["size"];}catch (e) {
            return -1;
        }
    }
}
/****
 *
 *
 */
export class InputStreamReader extends AbstractIOFile implements reader{

    protected data : string[]   = [];
    protected index: number     = 0;

    protected constructor( file : string ) {
        super(file);
        try{this.data = ( fs.readFileSync(file,'utf8')||"").split("");}catch(e){
            throw new IOException(`File not found : ${file}`);
        }
    }
    /***
     * It return size of file in byte(s) value
     */
    public size( ):number{ return this.data.length; }
    /***
     * Reset stream index incrementation
     */
    public reset( ): void{ this.index=0; }
    /***
     *
     */
    public read( ): string{return Define.of<string>(this.data[this.index++]).orElseThrow(new NullPointerException("target is null !") );}
    /***
     *
     */
    public getLines(): List<string>{return this.toString().explodeAsList(/\r|\n|\n/);}
    /***
     *
     */
    public getIterator( ) :Iterator<string>{return new Iterator<string>(this.data); }
    /***
     *
     */
    public toString( ) : string{ return String(this.data.join(""));}
}
/***
 *
 */
export class FileReader extends InputStreamReader{constructor(file :string) {super(file);}}
/***
 *
 */
export class OutputStreamWriter extends AbstractIOFile implements writer{

    protected flag :string       = "a";
    protected truncate : boolean = true;

    constructor( file : string, flag: string = "a", truncate : boolean = true ) {
        super(file);
        this.flag=flag;
        this.truncate = truncate;
    }

    public setTruncate( state : boolean ): void{ this.truncate = state; }

    public setFlag( flag : string ): void{ this.flag = flag; }

    public write( data :string, truncate:boolean = true,encoding: BufferEncoding = "utf8", create: boolean = true ): void{
        try{
            if(!OutputStreamWriter.exists( new Path(this.file) )&&create) mkdirSync(new Path(this.file).getPath(),{recursive:true});
            if(truncate) fs.truncateSync(this.file,0);
            writeFileSync(this.file,data,{ encoding:encoding, flag:this.flag});
        }catch (e) {
            throw new IOException(`Something wrong : ${e.message}`);
        }
    }
}
/***
 *
 */
export class FileWriter extends OutputStreamWriter{constructor(file: string) {super(file);}}