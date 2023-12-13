import {format} from "util";
import {comparable, comparator, Func, List} from "../Interface";
import {ArrayList} from "../utils/ArrayList";
import {Objects} from "./Objects";
import {ENCODING} from "../file/charset/ENCODING";
import {Encoder} from "../file/charset/Encoder";
/***
 * @Strings : Proxy class, allow to extend the prototype
 * of the native String or string Object. Dont forget to
 * implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 */
export abstract class Strings extends String implements comparable<string>{
    /***
     * @equalsIgnoreCase :
     */
    public equalsIgnoreCase( value : string ) : boolean {return Objects.isNull(value) ? false : this.toString().toLowerCase()===value.toLowerCase();}
    /***
     * @regExp
     */
    public regExp( regExp : RegExp = /.+/, callback : Func<string,string> ) : string{return Strings.regExp(regExp,this.toString(),callback)}
    /***
     * @contains
     */
    public contains( value : string|RegExp ) :boolean{return new RegExp(value).test(this.valueOf());}
    /***
     * @format
     */
    public format(...args : any[]) :string{return format(this.valueOf(),...args);}
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
            if(Objects.isNull(o1)&&Objects.isNull(o2)) return 0;
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
    public compareTo(another:string):number {return Strings.compareString.compare(this.valueOf(),another);}
    /***
     * @repeatStringA
     */
    public static repeatStringA( char : string, loop : number = 0 ) : String{ return loop <= 0 || Objects.isNull(loop) ? "" :new Array<any>(loop).fill(char.charAt(0)).join("");}
    /***/
    public toArray():string[]{return this.valueOf().split("");}
    /***/
    public getBytes(charsetTo:ENCODING = ENCODING.UTF_8, charsetFrom:ENCODING = ENCODING.UTF_8 ):string[]{
        let encoder:Encoder = Encoder.from(Objects.requireNotNull(charsetFrom).toString());
        if(!charsetTo.equals(charsetFrom))encoder.to(charsetTo.toString());
        return encoder.encodeLoop(this.toString());
    }
    /**
     * **/
    private static regExp( regexp : RegExp = /.+/, value : string, callback : Func<string,string>  ):string{
        try{
            let tmp,toReplace;
            while(( tmp = regexp.exec(value) )){
                toReplace = callback !==undefined ? callback.call(tmp,value, tmp) : "";
                value = value.replace(tmp[0], toReplace||"");
            }
        }catch (e) {
            return value;
        }
        return value;
    }
}
Object.package(this);