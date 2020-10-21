import * as fs from "fs";
import {IOException, NullPointerException} from "../Exception";
import {List} from "../Interface";
import {Define} from "../Define";
import {mkdirSync, statSync, writeFileSync} from "fs";
import {Path} from "./Path";

export interface reader {
    read( ): string
    getLines(): List<string>
}
export interface writer {
    write( l:string): void
}
export interface fileStream {
    getPath( ): string
    getFileName( ):string
}

export class InputStreamReader implements reader,fileStream{

    protected file : string     = null;
    protected data : string[]   = null;
    protected index: number     = 0;

    protected constructor( file : string ) {
        try{
           this.file = file;
           this.data = ( fs.readFileSync(file,'utf8')||"").split("");
        }catch(e){
            throw new IOException(`File not found : ${file}`);
        }
    }

    public read( ): string{return Define.of<string>(this.data[this.index++]).orElseThrow(new NullPointerException("target is null !") );}

    public getPath( ): string{ return this.file; }

    public getLines(): List<string>{return this.toString().explodeAsList(/\r|\n|\n/);}

    public toString( ) : string{return this.data.join("");}

    getFileName(): string {
        return "";
    }
}
/***
 *
 */
export class FileReaderA extends InputStreamReader{

    constructor(file :string) {super(file);}

}
/***
 */
export class OutputStreamWriter implements writer,fileStream{

    protected file:string =null;
    protected flag :string= "a";

    constructor( file : string, flag: string = "a") {
        this.file=file;
        this.flag=flag;
    }

    public write( data :string, truncate:boolean = true,encoding: BufferEncoding = "utf8", create: boolean = true ): void{
        try{
            if(!OutputStreamWriter.exists( new Path(this.file ) )&&create) mkdirSync(new Path(this.file ).getPath(),{recursive:true});
            if(truncate) fs.truncateSync(this.file,0);
            writeFileSync(this.file,data,{ encoding:encoding, flag:this.flag});
        }catch (e) {
            throw new IOException(`Something wrong : ${e.message}`);
        }
    }

    public static exists( path : Path ):boolean{
        try {statSync(path.get());return true;} catch (e) {
            return false;
        }
    }

    public getPath(): string {return this.file;}

    getFileName(): string {
        return "";
    }
}
export class FileWriter extends OutputStreamWriter{
    constructor(file: string) {super(file);}
}