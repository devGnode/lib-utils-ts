import {Define} from "../Define";
import {Utils} from "../Utils";
import {format} from "util";
import {comparable, comparator, List} from "../Interface";
import {ArrayList} from "../ArrayList";
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
    public explodeAsList( separator : string|RegExp ) : List<string>{return ArrayList.of<string>(this.valueOf().split(separator));}
    /***
     * @exec
     */
    public exec( regExp : RegExp ) : string[]{return regExp.exec(this.valueOf());}
    /***
     * @orDefault
     */
    public orDefault( value : String|string ): string{return this.isEmpty()?String(value):this.valueOf();}
    /***
     * @stripSlashes
     */
    public stripSlashes() :string{return this.replace(/\\(.)/mg, "$1");}
    /***
     * @compareString
     * @interface comparator<string>
     */
    private static compareString: comparator<string> = new class implements comparator<string>{
        public compare(o1: string, o2: string): number {
            if(Object.isNull(o1)&&Object.isNull(o2)) return 0;
            // copy to java class
            for (let i = 0, len = Math.min(o1.length, o2.length); i < len; i++) {
                let a:number = o1.charCodeAt(i);
                let b:number = o2.charCodeAt(i);
                if (a != b) return a - b;
            }
            return o1.length - o2.length ;
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