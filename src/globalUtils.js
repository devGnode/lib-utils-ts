"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var List_1 = require("./List");
var util_1 = require("util");
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
Boolean.prototype.equals = Number.prototype.equals = String.prototype.equals = function (value) {
    return this.valueOf() === value;
};
// @ts-ignore
String.prototype.equalsIgnoreCase = function (value) {
    return this.toString().toLowerCase() === value.toLowerCase();
};
// @ts-ignore
String.prototype.regExp = function (regExp, callback) {
    if (regExp === void 0) { regExp = /.+/; }
    return Utils_1.Utils.regExp(regExp, this.toString(), callback);
};
// @ts-ignore
String.repeatString = function (char, loop) {
    if (loop === void 0) { loop = 0; }
    return new Array(loop).fill(char.charAt(0)).join("");
};
String.prototype.contains = function (value) {
    return new RegExp(value).test(this.valueOf());
};
String.prototype.format = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return util_1.format.apply(null, Array.from([this.valueOf()]).concat(args));
};
String.prototype.isEmpty = function () {
    return this.valueOf().length === 0;
};
String.prototype.explodeAsList = function (separator) {
    return List_1.ArrayList.of(this.valueOf().split(separator));
};
String.prototype.exec = function (regExp) {
    return regExp.exec(this.valueOf());
};
String.prototype.orDefault = function (value) {
    return this.isEmpty() ? value : this.valueOf();
};
//https://stackoverflow.com/questions/5326165/use-javascript-to-stripslashes-possible/14623073
String.prototype.stripSlashes = function () {
    return this.replace(/\\(.)/mg, "$1");
};
/***
 Date Extension
 */
Date.prototype.plusDays = function (days) {
    return new Date(this.setDate(this.getDate() + days));
};
Date.prototype.lessDays = function (days) {
    return this.plusDays(-Math.abs(days));
};
Date.prototype.plusYears = function (years) {
    return this.plusDays(365 * years);
};
Date.prototype.lessYears = function (years) {
    return this.plusYears(-Math.abs(years));
};
Date.prototype.elapsedTime = function (date) {
    return this.getTime() - date.getTime();
};
var local_round = function (value) { return value.length % 2 === 0 ? "0" + value : value; };
Date.dateFormat = Date.prototype.dateFormat = function (pattern) {
    var now = this instanceof Date ? this : new Date();
    List_1.HashMap.of({
        YYYY: now.getFullYear(), YY: String(now.getFullYear()).substring(2, 4),
        MM: local_round(now.getMonth() + 1), dd: local_round(now.getDate()),
        hh: local_round(now.getHours()), mm: local_round(now.getMinutes()),
        ss: local_round(now.getSeconds()), ms: now.getMilliseconds()
    }).each(function (value, key) {
        pattern = pattern.replace(new RegExp("\%" + key), value);
    });
    return pattern;
};
/***
 Boolean extension
 */
Boolean.prototype.state = function (expectTrue, orElse) {
    return this.valueOf() ? expectTrue : orElse;
};
/***
 Array extension
 */
Array.asList = function (value) {
    return new List_1.ArrayList(value);
};
//# sourceMappingURL=globalUtils.js.map