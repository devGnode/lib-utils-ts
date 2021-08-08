import {Define} from "../Define";
import {Utils} from "../Utils";
import {format} from "util";
import {ArrayList} from "../List";
import {comparable, comparator} from "../Interface";
/***
 * @StringA : Proxy class, allow to extend the prototype of the native String or string
 * Object. Dont forget to implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 */
export abstract class StringA extends String implements comparable<string>{
    /***
     * @equalsIgnoreCase :
     */
    public equalsIgnoreCase( value : string ) : boolean {return Object.isNull(value) ? false : this.toString().toLowerCase()===value.toLowerCase();}
    /***
     * @regExp
     */
    public regExp( regExp : RegExp = /.+/, callback : Function ) : string{return Utils.regExp(regExp,this.toString(),callback);}
    /***
     * @contains
     */
    public contains( value : string|RegExp ) :boolean{return new RegExp(value).test(this.valueOf());}
    /***
     * @format
     */
    public format(  ... args : any[] ) :string{return format.apply(null,Array.from(args).concat([this.valueOf()]));}
    /***
     * @isEmpty
     */
    public isEmpty(  ) : boolean{return this.valueOf().length===0;}
    /***
     * @explodeAsList
     */
    public explodeAsList( separator : string|RegExp ) : ArrayList<string>{return ArrayList.of<string>(this.valueOf().split(separator));}
    /***
     * @exec
     */
    public exec( regExp : RegExp ) : string[]{return regExp.exec(this.valueOf());}
    /***
     * @orDefault
     */
    public orDefault( value : String|string ): string{return this.isEmpty()?String(value):this.valueOf();}
    /***
     * https://stackoverflow.com/questions/5326165/use-javascript-to-stripslashes-possible/14623073
     */
    public stripSlashes() :string{return this.replace(/\\(.)/mg, "$1");}
    /***
     *
     */
    private static compareString: comparator<string> = new class implements comparator<string>{
        public compare(o1: string, o2: string): number {
            let res:number = Object.compare(o1,o2);
            return res === 0 ? res : o1.length - o2.length;
        }
    }
    /***
     * @compareTo : compare to string each other.
     */
    public compareTo(another:string):number {return StringA.compareString.compare(this.valueOf(),another);}
    /***
     * @repeatStringA
     */
    public static repeatStringA( char : string, loop : number = 0 ) : String{ return new Array<any>(Math.abs(Define.of(loop).orElse(0))).fill(char.charAt(0)).join("");}

}