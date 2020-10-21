import {Utils} from "./Utils";
import {ArrayList, HashMap} from "./List";
import {format} from "util";
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
Boolean.prototype.equals = Number.prototype.equals = String.prototype.equals = function(value : string | number| boolean | Object ) : boolean {
    return this.valueOf()===value;
};
// @ts-ignore
String.prototype.equalsIgnoreCase = function ( value : string ) : boolean {
    return this.toString().toLowerCase()===value.toLowerCase();
};
// @ts-ignore
String.prototype.regExp = function ( regExp : RegExp = /.+/, callback : Function ) : string{
    return Utils.regExp(regExp,this.toString(),callback);
};
// @ts-ignore
String.repeatString = function( char : string, loop : number = 0 ) : String{
    return new Array<any>(loop).fill(char.charAt(0)).join("");
};
String.prototype.contains = function( value : string|RegExp ) :boolean{
    return new RegExp(value).test(this.valueOf());
};
String.prototype.format = function(  ... args : any[] ) :string{
    return format.apply(null,Array.from([this.valueOf()]).concat(args));
};
String.prototype.isEmpty = function(  ) : boolean{
    return this.valueOf().length===0;
};
String.prototype.explodeAsList = function( separator : string|RegExp ) : ArrayList<string>{
    return ArrayList.of<string>(this.valueOf().split(separator));
};
String.prototype.exec = function( regExp : RegExp ) : string[]{
  return regExp.exec(this.valueOf());
};
String.prototype.orDefault = function( value : String|string ): string{
    return this.isEmpty()?value:this.valueOf();
};
//https://stackoverflow.com/questions/5326165/use-javascript-to-stripslashes-possible/14623073
String.prototype.stripSlashes = function() :string{
    return this.replace(/\\(.)/mg, "$1");
};
/***
 Date Extension
 */
Date.prototype.plusDays = function ( days : number ) : Date{
    return new Date( this.setDate( this.getDate() + days ) );
};
Date.prototype.lessDays = function ( days : number ) : Date{
    return this.plusDays(-Math.abs(days));
};
Date.prototype.plusYears = function ( years : number ) : Date{
    return this.plusDays(365*years );
};
Date.prototype.lessYears = function ( years : number ) : Date{
    return this.plusYears(-Math.abs(years));
};
Date.prototype.elapsedTime = function( date : Date ) : number{
    return this.getTime()- date.getTime();
};
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
Boolean.prototype.state = function(  expectTrue : any, orElse : any ) : any {
    return this.valueOf()? expectTrue : orElse;
};
/***
 Array extension
 */
Array.asList = function<T>( value : T[] ): ArrayList<T> {
    return new ArrayList<T>(value);
};

