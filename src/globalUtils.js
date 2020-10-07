"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var List_1 = require("./List");
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
 * String extends
 */
// @ts-ignore
Number.prototype.equals = String.prototype.equals = function (value) {
    if (value === void 0) { value = ""; }
    return this.valueOf() === value;
};
// @ts-ignore
String.prototype.equalsToIgnoreCase = function (value) {
    if (value === void 0) { value = ""; }
    return this.toString().toLowerCase() === value.toLowerCase();
};
// @ts-ignore
String.prototype.regExp = function (regExp, callback) {
    if (regExp === void 0) { regExp = /.+/; }
    if (callback === void 0) { callback = null; }
    return Utils_1.Utils.regExp(regExp, this.toString(), callback);
};
// @ts-ignore
String.repeat = function (char, loop) {
    if (loop === void 0) { loop = 0; }
    return new Array(loop).fill(char.charAt(0)).join("");
};
String.prototype.contains = function (value) {
    return new RegExp(value).test(value);
};
/***
 Date Extends
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
//# sourceMappingURL=globalUtils.js.map