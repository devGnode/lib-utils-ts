import {Utils} from "./Utils";
import {ArrayList, HashMap} from "./List";
import {format} from "util";
import {Define} from "./Define";
import {Class} from "./Class";
import {NullPointerException} from "./Exception";
import {Constructor} from "./Constructor";
import {Comparator} from "./Comparator";
/****
 * Native Object extension area
 *
 *  update Interfaces each time
 *  there is a new extension
 * + String
 * + Number
 * + Date
 * ....
 *
 */
/***
 * String extension
 */
// @ts-ignore
Boolean.prototype.equals = Number.prototype.equals = String.prototype.equals = function(value : string | number| boolean | Object ) : boolean {return this.valueOf()===value;};
String.prototype.equalsIgnoreCase = function ( value : string ) : boolean {return this.toString().toLowerCase()===value.toLowerCase();};
String.prototype.regExp = function ( regExp : RegExp = /.+/, callback : Function ) : string{return Utils.regExp(regExp,this.toString(),callback);};
// @ts-ignore
String.repeatString = function( char : string, loop : number = 0 ) : String{return new Array<any>(loop).fill(char.charAt(0)).join("");};
String.prototype.contains = function( value : string|RegExp ) :boolean{return new RegExp(value).test(this.valueOf());};
String.prototype.format = function(  ... args : any[] ) :string{return format.apply(null,Array.from([this.valueOf()]).concat(args));};
String.prototype.isEmpty = function(  ) : boolean{return this.valueOf().length===0;};
String.prototype.explodeAsList = function( separator : string|RegExp ) : ArrayList<string>{return ArrayList.of<string>(this.valueOf().split(separator));};
String.prototype.exec = function( regExp : RegExp ) : string[]{return regExp.exec(this.valueOf());};
String.prototype.orDefault = function( value : String|string ): string{return this.isEmpty()?value:this.valueOf();};
//https://stackoverflow.com/questions/5326165/use-javascript-to-stripslashes-possible/14623073
String.prototype.stripSlashes = function() :string{return this.replace(/\\(.)/mg, "$1");};
String.prototype.compareTo = function (another:string):number {return new Comparator<string>().compare(this.valueOf(),another);}
/***
 *
 */
Number.of = function( value : Object ):number{return parseInt(<string>value);}
Number.compare = function( x :number, y:number):number{ return new Comparator<number>().compare(x,y); }
Number.prototype.compareTo = function(another:number):number{ return Number.compare(this.valueOf(),another); }
/***
 Date Extension
 */
Date.prototype.plusDays = function ( days : number ) : Date{return new Date( this.setDate( this.getDate() + days ) );};
Date.prototype.lessDays = function ( days : number ) : Date{return this.plusDays(-Math.abs(days));};
Date.prototype.plusYears = function ( years : number ) : Date{return this.plusDays(365*years );};
Date.prototype.lessYears = function ( years : number ) : Date{return this.plusYears(-Math.abs(years));};
Date.prototype.elapsedTime = function( date : Date ) : number{return this.getTime()- date.getTime();};
Date.prototype.compareTo = function( date:Date): number{ return this.elapsedTime(date); }
let local_round = value=>value.length%2===0?"0"+value:value;
Date.dateFormat = Date.prototype.dateFormat = function( pattern : string ) : string{
    let now =this instanceof Date ? this : new Date();
    HashMap.of<string,string>({
        YYYY:now.getFullYear(), YY: String(now.getFullYear()).substring(2,4),
        MM: local_round(now.getMonth()+1),dd: local_round(now.getDate()),
        hh:local_round(now.getHours()), mm: local_round( now.getMinutes()),
        ss:local_round(now.getSeconds()),ms:now.getMilliseconds()
    }).each((value,key)=>{
        pattern = pattern.replace(new RegExp("\%"+key),value);
    });
    return pattern;
};
/***
 Boolean extension
 */
Boolean.prototype.state = function(  expectTrue : any, orElse : any ) : any {return this.valueOf()? expectTrue : orElse;};
Boolean.of = function(  value : Object ) : boolean {return value===true||value === "true"||value===1;};
/***
 Array extension
 */
Array.asList = function<T>( value : T[] ): ArrayList<T> {return new ArrayList<T>(value);};
/***
 Object extension
 */
Object.nonNull = function(obj:Object):boolean{
    return HashMap.of<string,Object>(obj)
        .stream()
        .anyMatch(value=> value !== null && value !== undefined );
};
Object.isNull = ( value : Object):boolean=> Define.of<Object>(value).isNull();
Object.requireNotNull = <T>( other: T, message?: string ) :T => Define.of<T>(other).orElseThrow(new NullPointerException(message||''));
Object.toString = function( o :Object):string{return o !== null ? o.toString() : null;}
Object.defineProperty(Object,"toString",{enumerable: false, writable: true, configurable: true});
Object.prototype.getClass = function<T>():Class<T> { return new Class<T>(this); };
Object.defineProperty(Object.prototype,"getClass",{enumerable: false, writable: true, configurable: true});
Object.prototype.equals = function(object:Object):boolean{ return this.constructor === object.constructor && (<any>this).prototype === (<any>object).prototype; }
Object.defineProperty(Object.prototype,"equals",{enumerable: false, writable: true, configurable: true});
/***
 FunctionA extension
 */
Function.prototype.class = function<T extends Object>(): Constructor<T>{return new Constructor<T>(this);};
Object.defineProperty(Function.prototype,"class",{enumerable: false, writable: true, configurable: true});