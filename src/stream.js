"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectStream = exports.Stream = void 0;
var List_1 = require("./List");
var Predication_1 = require("./Predication");
var Optional_1 = require("./Optional");
var Iterator_1 = require("./Iterator");
var Stream = /** @class */ (function () {
    function Stream(value) {
        if (value === void 0) { value = null; }
        this.list = null;
        this.findLimit = null;
        this.list = value;
    }
    Stream.prototype.each = function (callback) {
        var tmp, key;
        for (tmp in this.list) {
            key = isNaN(parseInt(tmp)) ? tmp : parseInt(tmp);
            var valor = this.list[tmp];
            if (typeof this.list[tmp] !== "function")
                callback(valor, key);
        }
        return this;
    };
    Stream.prototype.mapTo = function (callback) {
        var _this = this;
        var out = [], i = 0;
        this.each(function (value, key) { return out[i++] = callback.call(_this, value, key); });
        out = out.length > 0 ? out : null;
        return new Stream(out);
    };
    Stream.prototype.map = function (callback) {
        return this.mapTo(callback);
    };
    Stream.prototype.mapToInt = function (callback) {
        return this.mapTo(callback);
    };
    Stream.prototype.filter = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = (function () { return void 0; }); }
        var out = [], i = 0;
        this.each(function (value, key) {
            var state, keyInt = 0;
            if (callback instanceof Predication_1.Predication) {
                state = callback.test(value);
            }
            else
                state = callback.call(null, value, key);
            if ((state && _this.findLimit === null) || (state && (_this.findLimit > 0 && out.length < _this.findLimit))) {
                out[i++] = value;
            }
        });
        return new Stream(out);
    };
    Stream.prototype.limit = function (limit) {
        if (limit === void 0) { limit = null; }
        this.findLimit = limit;
        return this;
    };
    Stream.prototype.findFirst = function () {
        var out = this.list[0];
        return new Optional_1.Optional(this.list[0] === undefined ? null : out);
    };
    Stream.prototype.findAny = function () {
        var out = this.list[Math.floor(Math.random() * (this.list.length - 1))];
        return new Optional_1.Optional(out === undefined ? out : null);
    };
    Stream.prototype.allMatch = function (callback) {
        if (callback === void 0) { callback = (function () { return void 0; }); }
        return this.filter(callback).count() === this.count();
    };
    Stream.prototype.anyMatch = function (callback) {
        if (callback === void 0) { callback = (function () { return void 0; }); }
        return this.filter(callback).count() > 0;
    };
    Stream.prototype.noneMatch = function (callback) {
        if (callback === void 0) { callback = (function () { return void 0; }); }
        return !this.anyMatch(callback);
    };
    Stream.prototype.hasPeer = function () {
        return this.anyMatch(function (value, key) { return value % 2 === 0; });
    };
    Stream.prototype.count = function () { var _a; return (_a = this.list) === null || _a === void 0 ? void 0 : _a.length; };
    Stream.prototype.sum = function () {
        var sum = 0;
        this.mapToInt(function (v) { return v; }).each(function (value) { return sum = parseInt(String(value)); });
        return new Optional_1.Optional(sum);
    };
    Stream.prototype.min = function () {
        var min = Number.MIN_VALUE;
        this.mapToInt(function (v) { return v; }).each(function (value) {
            min = parseInt(String(value < min ? value : min));
        });
        return new Optional_1.Optional(min);
    };
    Stream.prototype.max = function () {
        var max = Number.MAX_VALUE;
        this.mapToInt(function (v) { return v; }).each(function (value) { return max = parseInt(String(value > max ? value : max)); });
        return new Optional_1.Optional(max);
    };
    Stream.prototype.sorted = function () {
        throw new Error("Method not implemented.");
    };
    Stream.prototype.getList = function () { return List_1.ArrayList.of(this.list); };
    Stream.prototype.toArray = function () { return this.list; };
    Stream.prototype.iterator = function () { return new Iterator_1.Iterator(this.list); };
    Stream.prototype.listIterator = function () { return new Iterator_1.ListIterator(this.list); };
    Stream.of = function (list) { return new Stream(list); };
    return Stream;
}());
exports.Stream = Stream;
var ObjectStream = /** @class */ (function () {
    function ObjectStream(value) {
        if (value === void 0) { value = null; }
        this.list = null;
        this.findLimit = null;
        this.list = value;
    }
    ObjectStream.prototype.map = function (callback) {
        throw new Error("Method not implemented.");
    };
    ObjectStream.prototype.allMatch = function (callback) {
        if (callback === void 0) { callback = (function () { return void 0; }); }
        return false;
    };
    ObjectStream.prototype.anyMatch = function (callback) {
        if (callback === void 0) { callback = (function () { return void 0; }); }
        return false;
    };
    ObjectStream.prototype.count = function () {
        return 0;
    };
    ObjectStream.prototype.each = function (callback) {
        return undefined;
    };
    ObjectStream.prototype.filter = function (predicate) {
        if (predicate === void 0) { predicate = (function () { return void 0; }); }
        return undefined;
    };
    ObjectStream.prototype.findAny = function () {
        return undefined;
    };
    ObjectStream.prototype.findFirst = function () {
        return undefined;
    };
    ObjectStream.prototype.limit = function () {
        return undefined;
    };
    ObjectStream.prototype.noneMatch = function (callback) {
        if (callback === void 0) { callback = (function () { return void 0; }); }
        return false;
    };
    return ObjectStream;
}());
exports.ObjectStream = ObjectStream;
//# sourceMappingURL=stream.js.map