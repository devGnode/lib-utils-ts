import {Class} from "./Class";
import {NumberA} from "./type/NumberA";
import {DateA} from "./type/DateA";
import {BooleanA} from "./type/BooleanA";
import {ArrayA} from "./type/ArrayA";
import {ObjectA} from "./type/ObjectA";
import {FunctionA} from "./type/FunctionA";
import {StringA} from "./type/StringA";
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
/****
 * equals method extended for all native Object
 */
Boolean.prototype.equals = Number.prototype.equals = String.prototype.equals = function(value : string | number| boolean | Object ) : boolean { return this.valueOf()===value; }
/***
 * String extension
 */
String.prototype.equalsIgnoreCase   = StringA.prototype.equalsIgnoreCase;
String.prototype.regExp             = StringA.prototype.regExp;
// @ts-ignore
String.repeatString                 = StringA.repeatStringA;
String.prototype.contains           = StringA.prototype.contains;
String.prototype.format             = StringA.prototype.format;
String.prototype.isEmpty            = StringA.prototype.isEmpty;
String.prototype.explodeAsList      = StringA.prototype.explodeAsList;
String.prototype.exec               = StringA.prototype.exec;
String.prototype.orDefault          = StringA.prototype.orDefault;
String.prototype.stripSlashes       = StringA.prototype.stripSlashes;
String.prototype.compareTo          = StringA.prototype.compareTo;
/***
 * Number extension
 */
Number.of                           = NumberA.of
Number.compare                      = NumberA.prototype.compare;
Number.prototype.compareTo          = NumberA.prototype.compareTo;
Number.prototype.isPrime            = NumberA.prototype.isPrime;
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
/***
 Object extension
 */
Object.nonNull                      = ObjectA.nonNull;
Object.isNull                       = ObjectA.isNull;
Object.requireNotNull               = ObjectA.requireNotNull;
Object.toString                     = ObjectA.toString;
Object.prototype.equals             = ObjectA.prototype.equals;
Object.equals                       = ObjectA.equals;
Object.compare                      = ObjectA.compare;
Object.deepEquals                   = ObjectA.deepEquals;
Object.typeof                       = ObjectA.typeof;
Object.prototype.getClass           = function<T>():Class<T> { return new Class<T>(this); };
Object.defineProperty(Object,"nonNull",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"isNull",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"requireNotNull",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object,"toString",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"getClass",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"equals",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"deepEquals",{enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype,"typeof",{enumerable: false, writable: true, configurable: true});
/***
 FunctionA extension
 */
Function.prototype.class            = FunctionA.prototype.class;
Object.defineProperty(Function.prototype,"class",{enumerable: false, writable: true, configurable: true});