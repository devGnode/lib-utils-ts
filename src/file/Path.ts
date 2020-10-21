import * as path from "path";
import {fileStream} from "./IOStream";

export class Path implements fileStream{

    private readonly path :string;
    private readonly file :string;
    private readonly ext :string;

    constructor( pathA : string) {
        let p = path.parse(pathA);
        this.path = p.dir;
        this.file = p.name;
        this.ext = p.ext;
    }

    public get( ):string{return this.path+"/"+this.file+"."+this.ext;}

    getPath(): string {return this.path;}

    getFileName(): string {return "%s.%s".format(this.file,this.ext);}
}