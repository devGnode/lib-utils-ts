import * as path from "path";
import {comparable,iterator} from "../Interface";
import {ParsedPath} from "path";
import {Optional} from "../utils/Optional";
import {Objects} from "../type/Objects";
import {Iterator} from "../utils/Iterator";
import {IllegalArgumentException, NullPointerException} from "../Exception";
import { Arrays } from "../type/Arrays";
import {File} from "./File";;
/***
 * Wrapper Class
 * @to-Fix
 */
export class Path implements comparable<Path>{

    private readonly full:string;
    private readonly pathDesc:ParsedPath;

    private readonly separator:RegExp = /\/|\\|\./;

    constructor( pathS : string, ...other:string[]) {
        if(pathS===null) throw new NullPointerException();
        /^([a-zA-Z]{1}:|\/)/.test(pathS)
        //if(pathS.length>0) pathS=pathS.replace(/(\\|\/)$/,"");
        this.full       = pathS;
        this.pathDesc   = path.parse(pathS);
    }

    private adapt(value:string):Path{ return new Path(value); }

    public startWidth(other:string|Path):boolean{
        if(typeof other ==="string") other = this.adapt(other);
       /* this.get
        other.
        this.full.split(/\\|\/|/)*/
        return null;
    }

    public endWidth(other:string|Path):boolean{
        return null;
    }
    /***
     *  This method return root of the path
     *  for Linux will be return / and for
     *  Windows drive:\\
     * @returns {Path}
     */
    public getRoot():Path{
        //System.out.println("--*-*-*--*"+this.pathDesc.root);
        return this.pathDesc.root.length>0? new Path(this.pathDesc.root):null;
    }
    /**
     * This method return name of the path without
     * the ending extension.
     *
     * <pre>
     *  /foo/bar/file.ext => file
     *  /foo/bar/file.tmp.ext => file.tmp
     *  /foo/bar => bar
     *  </pre>
     *
     * @returns {Path}
     */
    public getFileName(): Path {return new Path(this.pathDesc.base); }
    /***
     * This method return name of the path with the
     * extension.
     * @returns {string}
     */
    public getShortFileName():string{ return this.pathDesc.name.length>0?this.pathDesc.name:null; }
    /***
     * This method return the extension of the
     * current path.
     * @returns {string}
     */
    public getExt():string{ return this.pathDesc.ext.length>0?this.pathDesc.ext:null;}
    /**
     *
     * @param {number} index
     * @returns {Path}
     */
    public getName(index:number):Path{
        return Optional
            .ofNullable(this.full.split(this.separator).filter(v=>!v.isEmpty())[index])
            .map(v=>Objects.isNull(v)?null:new Path(<string>v))
            .get();
    }
    /**
     *
     * @returns {iterator<Path>}
     */
    public iterator():iterator<Path>{
         return new Iterator(
             this.full
                 .replace(this.pathDesc.root,"")
                 .split(this.separator)
                 .filter(v=>v.length>0)
                 .map(v=>new Path(v))
         );
    }
    /***
     *
     * @returns {Path}
     */
    public normalize():Path{ return new Path(path.normalize(this.full)); }
    /***
     *
     * @returns {Path}
     */
    public getParent():Path{
        let out:string;
        return ( out = path.dirname(this.full) ).length>0? new Path(out):null;
    }
    /***
     *
     * @returns {boolean}
     */
    public isAbsolute():boolean{return path.isAbsolute(this.full);}
    /***
     *
     * @param {number} beginIndex
     * @param {number} endIndex
     * @returns {Path}
     */
    public subpath(beginIndex:number, endIndex:number):Path{
        return new Path(
            Arrays.copyOfRange(
                this.full.split(this.separator).filter(v=>!v.isEmpty()),
                beginIndex,
                endIndex
        ).join("/") );
    }
    /***
     *
     * @returns {number}
     */
    public getNameCount():number{
        return this.full
            .split(/\/|\\/)
            .filter(v=>!v.isEmpty())
            .length;
    }
    /***
     *
     * @param {Path} other
     * @returns {Path}
     */
    public resolve(other?:Path):Path{
        if(other==null) return new Path(path.resolve(this.toString())).normalize();
        if(other.isAbsolute()) return other;
        return new Path(this.toString()+"/"+other.toString()).normalize();
    }

    public relativize(other?:Path):Path{

        if(other==null) return this;
        if((!other.isAbsolute()&&this.isAbsolute())||(other.isAbsolute()&&!this.isAbsolute()))
            throw new IllegalArgumentException("'other' is different type of Path");

        return new Path(
            other.normalize()
                .toString()
                .replace(this.normalize().toString(),"")
                .replace(/^(\\|\/)/,"")
        );
    }

    public toFile():File{return new File(this.toString());}

    public compareTo(obj: Path): number {
        if(obj==null) return -1;
        return this.normalize().getNameCount()-obj.normalize().getNameCount();
    }
    /**
     *
     * @returns {string}
     */
    public toString():string{return this.full;}
    /***
     *
     * @returns {Path}
     */
    public toPosix():Path{
        return new Path("/"+this.full.replace(/\\\\|\\/gi,"/"));
    }
    /***
     *
     * @param {Path} other
     * @returns {boolean}
     */
    public equals(other:Path):boolean{
       if(Objects.isNull(other)||this.compareTo(other)!=0) return false;
       let itr0:iterator<Path> = other.normalize().iterator(),
           itr1: iterator<Path> = this.normalize().iterator();

       while (itr0.hasNext())if(!itr0.next().toString().equals(itr1.next().toString()))return false;

        return true;
    }
    /***
     */
    public toForNamePath( absolute:boolean = false ):string{
        let normal:Path;
        if( /\.\./.test( (normal = this.normalize()).toString() ) ) return null;
        return  ( this.pathDesc.root=="/" ? "R"+ normal.toString() : normal.toString() )
            .replace(/^(\.){1}/,"")
            .replace(/\:|(\..+)$/gi,"")
            .replace(/\\|\//gi,".");
    }
    /***
     *
     * @param {string} name
     * @param {string} ext
     * @returns {Path}
     */
    public static ofPackageName(name:string, ext:string = "ts" ):Path{
        if(!(/([a-zA-Z\-\_]+\.*)+/.test(name)))return  null;

        if(name.startsWith("R")&&process.platform!=="win32"){
            name=name.replace(/^R/,"");
        }
        if(process.platform=="win32"&&/^([a-zA-Z]{1})\./.test(name)){
            name = name.replace(/^([a-zA-Z]{1})/,"$1:");
        }

        return new Path( name.replace(/\./gi,"/")+"."+ext||"ts" );
    }
    /***
     *
     * @returns {string}
     */
    public static getDelimiter():string{ return path.delimiter; }

}