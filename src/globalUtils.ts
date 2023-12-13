/** *
 * Here need to load really the natives
 * classes,  by this way, you avoid any
 * error with another classes like Enum.
 * some classes need of extended method
 * of an object that not be yet loaded.
 *
 * */
/***
 * 0 - make first init
 * Warning Keep this importation order.
 *
 * @init: Package.Package
 * ***/
import {Package} from "./Package/Package";
Object.package  = Package.Package;
Object.defineProperty(Object,"package",{enumerable:false,configurable:false,writable:false});
/***tmp init Function.class**/
import {Constructor} from "./init/Constructor";
Function.prototype.class = <any>Constructor.clazz;
Object.defineProperty(Function.prototype,"class",{enumerable: false, writable: true, configurable: true});
/***init Object.getClass**/
import {Objects} from "./type/Objects";
import {Class} from "./Class";
Object.prototype.getClass           = function<T>():Class<T> { return new Class<T>(this); };
Object.defineProperty(Object.prototype,"getClass",{enumerable: false, writable: false, configurable: false});
/***final Function.getClass**/
import {Functions} from "./type/Functions";
Function.prototype.class            = Functions.prototype.class;
Object.defineProperty(Function.prototype,"class",{enumerable: false, writable: false, configurable: false});
/****
 * 1 - Native Object extension area
 *
 * + String
 * + Number
 * + Date
 * ....
 */
/***
 Object extension
 */
/***/
Object.toString                     = Objects.toString;
Object.equals                       = Objects.equals;
Object.compare                      = Objects.compare;
//
Object.prototype.equals             = Objects.prototype.equals;
Object.prototype.toString           = function():string {return Objects.toString(this);};
Object.prototype.hash               = Objects.hash;
Object.defineProperty(Object,"equals",{enumerable: false, writable: true, configurable: false});
Object.defineProperty(Object,"compare",{enumerable: false, writable: false, configurable: false});
Object.defineProperty(Object,"toString",{enumerable: false, writable: true, configurable: false});
Object.defineProperty(Object.prototype,"equals",{enumerable: false, writable: true, configurable: false});
Object.defineProperty(Object.prototype,"toString",{enumerable: false, writable: true, configurable: false});
Object.defineProperty(Object.prototype,"hash",{enumerable: false, writable: true, configurable: false});
Object.defineProperty(Object.prototype,"__serial__",{enumerable: false, writable: true, configurable: true, value:null});
/** *
 * Other extended classes
 * Warning Keep this loading order.
 * */
import {Integer} from "./type/Integer";
import {Dates} from "./type/Dates";
import {Booleans} from "./type/Booleans";
import {ArrayA} from "./type/ArrayA";
import {Strings} from "./type/Strings";
/****
 * equals method extended for all native Object
 */
Boolean.prototype.equals = Number.prototype.equals = String.prototype.equals = function(value : string | number| boolean | Object ) : boolean { return this.valueOf()===value; }
/***
 * String extension
 */
String.prototype.equalsIgnoreCase   = Strings.prototype.equalsIgnoreCase;
String.prototype.regExp             = Strings.prototype.regExp;
// @ts-ignore
String.repeatString                 = Strings.repeatStringA;
String.prototype.contains           = Strings.prototype.contains;
String.prototype.format             = Strings.prototype.format;
String.prototype.isEmpty            = Strings.prototype.isEmpty;
String.prototype.explodeAsList      = Strings.prototype.explodeAsList;
String.prototype.exec               = Strings.prototype.exec;
String.prototype.orDefault          = Strings.prototype.orDefault;
String.prototype.stripSlashes       = Strings.prototype.stripSlashes;
String.prototype.compareTo          = Strings.prototype.compareTo;
String.prototype.toArray            = Strings.prototype.toArray;
String.prototype.getBytes           = Strings.prototype.getBytes;
/***
 * Number extension
 */
Number.of                           = Integer.of;
Number.compare                      = Integer.prototype.compare;
Number.prototype.compareTo          = Integer.prototype.compareTo;
Number.prototype.isPrime            = Integer.prototype.isPrime;
Number.sum                          = Integer.sum;
/***
 Date Extension
 */
Date.prototype.plusDays             = Dates.prototype.plusDays;
Date.prototype.lessDays             = Dates.prototype.lessDays;
Date.prototype.plusYears            = Dates.prototype.plusYears;
Date.prototype.lessYears            = Dates.prototype.lessYears;
Date.prototype.elapsedTime          = Dates.prototype.elapsedTime;
Date.prototype.compareTo            = Dates.prototype.compareTo;
Date.dateFormat                     = Dates.prototype.dateFormat;
/***
 Boolean extension
 */
Boolean.prototype.state             = Booleans.prototype.state;
Boolean.prototype.compareTo         = Booleans.prototype.compareTo;
Boolean.of                          = Booleans.of;
Boolean.compare                     = Booleans.compare;
Object.defineProperty(Boolean.prototype,"state",{enumerable: false, writable: true, configurable: true});
/***
 Array extension
 */
Array.asList                        = ArrayA.prototype.asList;
Array.list                          = ArrayA.prototype.list;
Array.newList                       = ArrayA.prototype.newList;
Array.sum                           = ArrayA.prototype.sum;
Array.prototype.equals              = ArrayA.prototype.equals;
Array.prototype.sum                 = function( ):number{
    let i:number = 0,  sum:number = 0,
        len:number = this.length;
    try{
        for(; i < len; i++ ) sum += typeof parseInt( this[ i ] ) === "number" ? parseInt( this[ i ] )  : 0;
    }catch(e){}
    return sum;
};
Object.defineProperty(Array.prototype,"equals",{enumerable: false, writable: true, configurable: true});