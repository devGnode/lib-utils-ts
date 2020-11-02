"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectStream = exports.AbstractObjectStream = exports.Stream = void 0;
const List_1 = require("./List");
const Predication_1 = require("./Predication");
const Optional_1 = require("./Optional");
const Iterator_1 = require("./Iterator");
class Stream {
    constructor(value = null) {
        this.list = null;
        this.findLimit = null;
        this.list = value;
    }
    each(callback) {
        let tmp, key;
        for (tmp in this.list) {
            key = isNaN(parseInt(tmp)) ? tmp : parseInt(tmp);
            let valor = this.list[tmp];
            if (typeof this.list[tmp] !== "function")
                callback(valor, key);
        }
        return this;
    }
    mapTo(callback) {
        let out = [], i = 0;
        this.each((value, key) => out[i++] = callback.call(this, value, key));
        out = out.length > 0 ? out : null;
        return new Stream(out);
    }
    async asyncMapTo(callback) {
        let out = [], i = 0;
        let itr = this.iterator();
        while (itr.hasNext()) {
            out[i] = await callback.call(this, itr.next(), i);
            i++;
        }
        return new Stream(out.length > 0 ? out : null);
    }
    map(callback) { return this.mapTo(callback); }
    mapToInt(callback) { return this.mapTo(callback); }
    filter(callback = (() => void 0)) {
        let out = [], i = 0;
        this.each((value, key) => {
            let state, keyInt = 0;
            if (callback instanceof Predication_1.Predication) {
                state = callback.test(value);
            }
            else
                state = callback.call(null, value, key);
            if ((state && this.findLimit === null) || (state && (this.findLimit > 0 && out.length < this.findLimit))) {
                out[i++] = value;
            }
        });
        return new Stream(out);
    }
    limit(limit = null) {
        this.findLimit = limit;
        return this;
    }
    findFirst() {
        let out = this.list[0];
        return new Optional_1.Optional(this.list[0] === undefined ? null : out);
    }
    findAny() {
        let out = this.list[Math.floor(Math.random() * (this.list.length - 1))];
        return new Optional_1.Optional(out === undefined ? out : null);
    }
    allMatch(callback = (() => void 0)) {
        return this.filter(callback).count() === this.count();
    }
    anyMatch(callback = (() => void 0)) {
        return this.filter(callback).count() > 0;
    }
    noneMatch(callback = (() => void 0)) {
        return !this.anyMatch(callback);
    }
    hasPeer() {
        return this.anyMatch((value, key) => value % 2 === 0);
    }
    count() { var _a; return (_a = this.list) === null || _a === void 0 ? void 0 : _a.length; }
    sum() {
        let sum = 0;
        this.mapToInt(v => v).each(value => sum = parseInt(String(value)));
        return new Optional_1.Optional(sum);
    }
    min() {
        let min = Number.MIN_VALUE;
        this.mapToInt(v => v).each(value => {
            min = parseInt(String(value < min ? value : min));
        });
        return new Optional_1.Optional(min);
    }
    max() {
        let max = Number.MAX_VALUE;
        this.mapToInt(v => v).each(value => max = parseInt(String(value > max ? value : max)));
        return new Optional_1.Optional(max);
    }
    sorted() {
        throw new Error("Method not implemented.");
    }
    getList() { return List_1.ArrayList.of(this.list); }
    toArray() { return this.list; }
    iterator() { return new Iterator_1.Iterator(this.list); }
    listIterator() { return new Iterator_1.ListIterator(this.list); }
    static of(list) { return new Stream(list); }
}
exports.Stream = Stream;
class AbstractObjectStream {
    constructor(value) {
        this.list = null;
        this.findLimit = null;
        this.list = value;
    }
    each(callback) {
        let tmp, ret;
        try {
            for (tmp in this.list)
                if ((ret = callback(this.list[tmp], tmp)))
                    break;
        }
        catch (e) {
            console.warn(e);
        }
        return new ObjectStream(ret);
    }
    filter(predicate = (() => void 0)) {
        let out = {}, i = 0;
        this.each((value, key) => {
            let state, keyInt = 0;
            if (predicate instanceof Predication_1.Predication) {
                state = predicate.test(value);
            }
            else
                state = predicate.call(null, value, key);
            if ((state && this.findLimit === null) || (state && (this.findLimit > 0 && i < this.findLimit))) {
                out[key] = value;
                i++;
            }
        });
        return new ObjectStream(out);
    }
    mapTo(callback) {
        let out = {};
        this.each((value, key) => out[key] = callback.call(this, value, key));
        out = out.length > 0 ? out : null;
        return new ObjectStream(out);
    }
    map(callback) { return this.mapTo(callback); }
    findAny() {
        let out = null, i = 0, rand = Math.floor(Math.random() * (this.count() - 1));
        this.each(value => { if (rand === i)
            return out = value; i++; });
        return new Optional_1.Optional(out);
    }
    findFirst() {
        let out = null;
        this.each(value => out = value);
        return new Optional_1.Optional(out);
    }
    limit(limit) {
        this.findLimit = limit;
        return this;
    }
    noneMatch(callback) { return !this.anyMatch(callback); }
    allMatch(callback) { return this.filter(callback).count() === this.count(); }
    anyMatch(callback) { return this.filter(callback).count() > 0; }
    count() {
        let c = 0;
        this.each(() => { c++; });
        return c;
    }
    static of(list) { return new ObjectStream(list); }
}
exports.AbstractObjectStream = AbstractObjectStream;
class ObjectStream extends AbstractObjectStream {
    constructor(value) { super(value); }
}
exports.ObjectStream = ObjectStream;
//# sourceMappingURL=stream.js.map