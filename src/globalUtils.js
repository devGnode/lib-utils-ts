"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
const List_1 = require("./List");
const util_1 = require("util");
Boolean.prototype.equals = Number.prototype.equals = String.prototype.equals = function (value) { return this.valueOf() === value; };
String.prototype.equalsIgnoreCase = function (value) { return this.toString().toLowerCase() === value.toLowerCase(); };
String.prototype.regExp = function (regExp = /.+/, callback) { return Utils_1.Utils.regExp(regExp, this.toString(), callback); };
String.repeatString = function (char, loop = 0) { return new Array(loop).fill(char.charAt(0)).join(""); };
String.prototype.contains = function (value) { return new RegExp(value).test(this.valueOf()); };
String.prototype.format = function (...args) { return util_1.format.apply(null, Array.from([this.valueOf()]).concat(args)); };
String.prototype.isEmpty = function () { return this.valueOf().length === 0; };
String.prototype.explodeAsList = function (separator) { return List_1.ArrayList.of(this.valueOf().split(separator)); };
String.prototype.exec = function (regExp) { return regExp.exec(this.valueOf()); };
String.prototype.orDefault = function (value) { return this.isEmpty() ? value : this.valueOf(); };
String.prototype.stripSlashes = function () { return this.replace(/\\(.)/mg, "$1"); };
Number.of = function (value) { return parseInt(value); };
Date.prototype.plusDays = function (days) { return new Date(this.setDate(this.getDate() + days)); };
Date.prototype.lessDays = function (days) { return this.plusDays(-Math.abs(days)); };
Date.prototype.plusYears = function (years) { return this.plusDays(365 * years); };
Date.prototype.lessYears = function (years) { return this.plusYears(-Math.abs(years)); };
Date.prototype.elapsedTime = function (date) { return this.getTime() - date.getTime(); };
let local_round = value => value.length % 2 === 0 ? "0" + value : value;
Date.dateFormat = Date.prototype.dateFormat = function (pattern) {
    let now = this instanceof Date ? this : new Date();
    List_1.HashMap.of({
        YYYY: now.getFullYear(), YY: String(now.getFullYear()).substring(2, 4),
        MM: local_round(now.getMonth() + 1), dd: local_round(now.getDate()),
        hh: local_round(now.getHours()), mm: local_round(now.getMinutes()),
        ss: local_round(now.getSeconds()), ms: now.getMilliseconds()
    }).each((value, key) => {
        pattern = pattern.replace(new RegExp("\%" + key), value);
    });
    return pattern;
};
Boolean.prototype.state = function (expectTrue, orElse) { return this.valueOf() ? expectTrue : orElse; };
Boolean.of = function (value) { return value === "true" || value === 1; };
Array.asList = function (value) { return new List_1.ArrayList(value); };
//# sourceMappingURL=globalUtils.js.map