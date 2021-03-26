import * as path from "path";
import "../globalUtils";
import {fileStream} from "../Interface";
/***
 * Wrapper Class
 */
export class Path implements fileStream{

    private readonly path :string;
    private readonly file :string;
    private readonly ext :string;

    constructor( pathA : string) {
        let p = path.parse(pathA);
        this.path = p.dir;
        this.file = p.name;
        this.ext  = p.ext;
    }

    public get( ):string{return "%s/%s.%s".format(this.path,this.file,this.ext);}

    public  getPath(): string {return this.path;}

    public  getFileName(): string {return "%s.%s".format(this.file,this.ext);}
    /***
     */
    public toForNamePath( absolute:boolean = false ):string{return "%s.%s%s".format(this.path.replace(/\\|\//gi, "."), this.file, this.ext);}
}