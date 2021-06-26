import {Define} from "../Define";
import {Utils} from "../Utils";
import {format} from "util";
import {ArrayList} from "../List";
import {Comparator} from "../Comparator";
/***
 *
 */
export abstract class StringA extends String{
    /***
     *
     */
    public equalsIgnoreCase( value : string ) : boolean {return Define.of(value).isNull() ? false : this.toString().toLowerCase()===value.toLowerCase();}
    /***
     *
     */
    public regExp( regExp : RegExp = /.+/, callback : Function ) : string{return Utils.regExp(regExp,this.toString(),callback);}
    /***
     *
     */
    public contains( value : string|RegExp ) :boolean{return new RegExp(value).test(this.valueOf());}
    /***
     *
     */
    public format(  ... args : any[] ) :string{return format.apply(null,Array.from([this.valueOf()]).concat(args));}
    /***
     *
     */
    public isEmpty(  ) : boolean{return this.valueOf().length===0;}
    /***
     *
     */
    public explodeAsList( separator : string|RegExp ) : ArrayList<string>{return ArrayList.of<string>(this.valueOf().split(separator));}
    /***
     *
     */
    public exec( regExp : RegExp ) : string[]{return regExp.exec(this.valueOf());}
    /***
     *
     */
    public orDefault( value : String|string ): string{return this.isEmpty()?String(value):this.valueOf();}
    /***
     *
     */
    public stripSlashes() :string{return this.replace(/\\(.)/mg, "$1");}
    /***
     *
     */
    public compareTo(another:string):number {return new Comparator<string>().compare(this.valueOf(),another);}
    /***
     *
     */
    public static repeatStringA( char : string, loop : number = 0 ) : String{ if(loop<0)loop=0; return new Array<any>(loop).fill(char.charAt(0)).join("");}

}