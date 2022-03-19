/** *
 * Here need to load really the natives
 * classes,  by this way, you avoid any
 * error with another classes like Enum.
 * some classes need of extended method
 * of an object that not be yet loaded.
 *
 * Warning Keep this loading order.
 * */
/***
 * First init package
 */
import {Package} from "./Package/Package";
Object.package  = Package;
Object.defineProperty(Object,"package",{enumerable:false,configurable:false,writable:false})
/***
 *
 */
import {Objects} from "./type/Objects";
import {FunctionA} from "./type/FunctionA";
import {Class} from "./Class";
/****
 * Native Object extension area
 *
 *  update Interfaces each time
 *  there is a new extension
 * + String
 * + Number
 * + Date
 * ....
 */
/***
 Object extension
 */
Object.nonNull                      = Objects.nonNull;
Object.isNull                       = Objects.isNull;
Object.requireNotNull               = Objects.requireNotNull;

Object.toString                     = Objects.toString;
Object.equals                       = Objects.equals;
Object.compare                      = Objects.compare;
Object.deepEquals                   = Objects.deepEquals;
Object.typeof                       = Objects.typeof;
//
Object.prototype.equals             = Objects.prototype.equals;
Object.prototype.getClass           = function<T>():Class<T> { return new Class<T>(this); };
Object.prototype.toString           = function():string {return Objects.toString(this);};
Object.prototype.hash               = Objects.hash;
Object.defineProperty(Object,"nonNull",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"isNull",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"requireNotNull",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"deepEquals",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"typeof",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object,"toString",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"getClass",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"equals",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"toString",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"hash",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"__serial__",{enumerable: false, writable: true, configurable: true, value:null});
/***
 * @Function Area
 */
Function.prototype.class            = FunctionA.prototype.class;
Object.defineProperty(Function.prototype,"class",{enumerable: false, writable: false, configurable: false});
/** *
 * Other extended classes
 *
 * Warning Keep this loading order.
 * */
import {Integer} from "./type/Integer";
import {DateA} from "./type/DateA";
import {BooleanA} from "./type/BooleanA";
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
Date.prototype.plusDays             = DateA.prototype.plusDays;
Date.prototype.lessDays             = DateA.prototype.lessDays;
Date.prototype.plusYears            = DateA.prototype.plusYears;
Date.prototype.lessYears            = DateA.prototype.lessYears;
Date.prototype.elapsedTime          = DateA.prototype.elapsedTime;
Date.prototype.compareTo            = DateA.prototype.compareTo;
Date.dateFormat                     = DateA.prototype.dateFormat;
/***
 Boolean extension
 */
Boolean.prototype.state             = BooleanA.prototype.state;
Boolean.prototype.compareTo         = BooleanA.prototype.compareTo;
Boolean.of                          = BooleanA.of;
Boolean.compare                     = BooleanA.compare;
Object.defineProperty(Boolean.prototype,"state",{enumerable: false, writable: true, configurable: true});
/***
 Array extension
 */
Array.asList                        = ArrayA.prototype.asList;
Array.list                          = ArrayA.prototype.list;
Array.newList                       = ArrayA.prototype.newList;
Array.sum                           = ArrayA.prototype.sum;
Array.prototype.equals              = ArrayA.prototype.equals;
Object.defineProperty(Array.prototype,"equals",{enumerable: false, writable: true, configurable: true});