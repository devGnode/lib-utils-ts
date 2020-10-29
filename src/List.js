"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashMap = exports.AbstractMap = exports.MapEntry = exports.SetList = exports.AbstractSet = exports.ArrayList = exports.AbstractList = exports.AbstractCollection = void 0;
const Exception_1 = require("./Exception");
const stream_1 = require("./stream");
const Iterator_1 = require("./Iterator");
const Define_1 = require("./Define");
class AbstractCollection {
    constructor(value) {
        this.value = null;
        this.value = value;
    }
    add(value) { this.value.push(value); return true; }
    addAll(collection) {
        let tmp = collection.iterator();
        try {
            while (tmp.hasNext())
                this.value[this.value.length] = tmp.next();
        }
        catch (e) {
            return false;
        }
        return true;
    }
    clear() {
        let itr = this.iterator();
        while (itr.hasNext())
            this.value.pop();
    }
    contains(o) {
        let itr = this.iterator();
        while (itr.hasNext())
            if (itr.next() === o)
                return true;
        return false;
    }
    containsAll(collection) {
        let itr = collection.iterator();
        while (itr.hasNext())
            if (!this.contains(itr.next()))
                return false;
        return true;
    }
    equals(o) { return this.value === o; }
    isEmpty() { return this.size() === 0; }
    iterator() { return new Iterator_1.Iterator(this.value); }
    remove(value) {
        let to = this.value.indexOf(value);
        this.value = this.value
            .slice(0, Math.abs(to))
            .concat(this.value.slice((to < 0 ? this.value.length - to : to) + 1, this.value.length));
        return true;
    }
    size() { var _a; return (_a = this.value) === null || _a === void 0 ? void 0 : _a.length; }
    toArray() { return this.value; }
    toString() { return this.value.toString(); }
    toJson() { return {}; }
}
exports.AbstractCollection = AbstractCollection;
class AbstractList extends AbstractCollection {
    constructor(value) {
        super(value);
        this.modCount = 0;
    }
    get(index) {
        if (this.value[index] === undefined)
            throw new Exception_1.IndexOfBoundException(`element ${index} not found`);
        return this.value[index];
    }
    indexOf(value) { return this.value.indexOf(value); }
    lasIndexOf(value) { return this.indexOf(value) - 1; }
    set(index, element) {
        Define_1.Define.of(element).orElseThrow(new Exception_1.NullPointerException("Element value is null"));
        this.get(index);
        return this.value[index] = element;
    }
    listIterator() { return new Iterator_1.ListIterator(this.value); }
    subList(from, to) {
        if (to === undefined)
            to = from;
        this.value = this.value
            .slice(0, Math.abs(from))
            .concat(this.value.slice((to < 0 ? this.value.length - to : to) + 1, this.value.length));
        return this;
    }
    shift() { return this.value.shift(); }
    pop() { return this.value.pop(); }
    stream() { return new stream_1.Stream(this.value); }
}
exports.AbstractList = AbstractList;
class ArrayList extends AbstractList {
    constructor(value) { super(value || new Array()); }
    clone() {
        let out = new ArrayList(), itr = this.iterator();
        while (itr.hasNext())
            out.add(itr.next());
        return out;
    }
    add(...value) {
        let tmp = new Iterator_1.Iterator(value);
        while (tmp.hasNext())
            this.value[this.value.length] = tmp.next();
        return true;
    }
    static of(value) { return new ArrayList(value); }
}
exports.ArrayList = ArrayList;
class AbstractSet extends AbstractCollection {
    constructor(value) { super(value); }
}
exports.AbstractSet = AbstractSet;
class SetList extends AbstractSet {
    constructor(value) { super(value); }
}
exports.SetList = SetList;
class MapEntry {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    getKey() { return this.key; }
    getValue() { return this.value; }
}
exports.MapEntry = MapEntry;
class AbstractMap {
    constructor(value) {
        this.value = null;
        this.length = 0;
        this.value = value;
    }
    clear() { this.value = {}; }
    containsKey(key) {
        return stream_1.Stream.of(this.keySet().toArray())
            .anyMatch(value => value === key);
    }
    containsValue(value) {
        return stream_1.Stream.of(this.entrySet().toArray())
            .anyMatch(map => map.getValue() === value);
    }
    keySet() {
        let out = new ArrayList();
        this.each((dummy, key) => { out.add(key); });
        return new SetList(out.toArray());
    }
    equals(o) { return this.value === o; }
    each(callback) {
        let tmp, ret;
        try {
            for (tmp in this.value)
                if ((ret = callback(this.value[tmp], tmp)))
                    break;
        }
        catch (e) {
            console.warn(e);
        }
        return ret;
    }
    get(key) { this.length++; return this.value[key]; }
    isEmpty() { return this.size() <= 0; }
    entrySet() {
        let out = new ArrayList();
        this.each((value, key) => { out.add(new MapEntry(key, value)); });
        return new SetList(out.toArray());
    }
    put(key, value) { this.length++; return this.value[key] = value; }
    remove(o) {
        return this.each((value, key) => {
            if (String(o).equals(String(key))) {
                let find = value;
                delete this.value[key];
                this.length--;
                return find;
            }
        });
    }
    size() { return this.length; }
    valueCollection() {
        let out = [];
        this.each(value => { out.push(value); });
        return new ArrayList(out);
    }
    stream() { return new stream_1.ObjectStream(this.value); }
}
exports.AbstractMap = AbstractMap;
class HashMap extends AbstractMap {
    constructor(value) { super(value); }
    toJson() {
        let out = {}, tmp, itr = this.entrySet().iterator();
        while (itr.hasNext()) {
            tmp = itr.next();
            if (tmp.getValue() instanceof HashMap)
                out[tmp.getKey()] = tmp.getValue().toJson();
            else if (tmp.getValue() instanceof ArrayList)
                out[tmp.getKey()] = tmp.getValue().toArray();
            else {
                out[tmp.getKey()] = tmp.getValue();
            }
        }
        return out;
    }
    static of(value) { return new HashMap(value); }
}
exports.HashMap = HashMap;
//# sourceMappingURL=List.js.map