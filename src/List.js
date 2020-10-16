"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashMap = exports.AbstractMap = exports.MapEntry = exports.SetList = exports.AbstractSet = exports.ArrayList = exports.AbstractList = exports.AbstractCollection = void 0;
var Exception_1 = require("./Exception");
var stream_1 = require("./stream");
var Iterator_1 = require("./Iterator");
var Define_1 = require("./Define");
/***
 * public AbstractCollection<E>
 */
var AbstractCollection = /** @class */ (function () {
    /***
     *
     * @param value
     */
    function AbstractCollection(value) {
        /***
         *
         */
        this.value = null;
        this.value = value;
    }
    /***
     *
     * @param value
     */
    AbstractCollection.prototype.add = function (value) { this.value.push(value); return true; };
    /***
     *
     * @param collection
     */
    AbstractCollection.prototype.addAll = function (collection) {
        var tmp = collection.iterator();
        try {
            while (tmp.hasNext())
                this.value[this.value.length] = tmp.next();
        }
        catch (e) {
            return false;
        }
        return true;
    };
    /***
     *
     */
    AbstractCollection.prototype.clear = function () {
        var itr = this.iterator();
        while (itr.hasNext())
            this.value.pop();
    };
    /***
     *
     * @param o
     */
    AbstractCollection.prototype.contains = function (o) {
        var itr = this.iterator();
        while (itr.hasNext())
            if (itr.next() === o)
                return true;
        return false;
    };
    /***
     *
     * @param collection
     */
    AbstractCollection.prototype.containsAll = function (collection) {
        var itr = collection.iterator();
        while (itr.hasNext())
            if (!this.contains(itr.next()))
                return false;
        return true;
    };
    /***
     *
     * @param o
     */
    AbstractCollection.prototype.equals = function (o) { return this.value === o; };
    /***
     *
     */
    AbstractCollection.prototype.isEmpty = function () { return this.size() === 0; };
    /***
     *
     */
    AbstractCollection.prototype.iterator = function () { return new Iterator_1.Iterator(this.value); };
    /***
     *
     * @param value
     */
    AbstractCollection.prototype.remove = function (value) {
        var to = this.value.indexOf(value);
        this.value = this.value
            .slice(0, Math.abs(to))
            .concat(this.value.slice((to < 0 ? this.value.length - to : to) + 1, this.value.length));
        return true;
    };
    /****
     *
     */
    AbstractCollection.prototype.size = function () { var _a; return (_a = this.value) === null || _a === void 0 ? void 0 : _a.length; };
    /**
     * @param
     */
    AbstractCollection.prototype.toArray = function () { return this.value; };
    /***
     *
     */
    AbstractCollection.prototype.toString = function () { return this.value.toString(); };
    /***
     *
     */
    AbstractCollection.prototype.toJson = function () { return {}; };
    return AbstractCollection;
}());
exports.AbstractCollection = AbstractCollection;
/***
 * AbstractList<E>
 */
var AbstractList = /** @class */ (function (_super) {
    __extends(AbstractList, _super);
    /***
     *
     * @param value
     */
    function AbstractList(value) {
        var _this = _super.call(this, value) || this;
        /***
         *
         */
        _this.modCount = 0;
        return _this;
    }
    /**
     *
     * @param index
     */
    AbstractList.prototype.get = function (index) {
        if (this.value[index] === undefined)
            throw new Exception_1.IndexOfBoundException("element " + index + " not found");
        return this.value[index];
    };
    /***
     *
     * @param value
     */
    AbstractList.prototype.indexOf = function (value) { return this.value.indexOf(value); };
    /***
     *
     * @param value
     */
    AbstractList.prototype.lasIndexOf = function (value) { return this.indexOf(value) - 1; };
    /**
     * @param index
     * @param element
     */
    AbstractList.prototype.set = function (index, element) {
        Define_1.Define.of(element).orElseThrow(new Exception_1.NullPointerException("Element value is null"));
        this.get(index); // IndexOfBoundException
        return this.value[index] = element;
    };
    /***
     *
     */
    AbstractList.prototype.listIterator = function () { return new Iterator_1.ListIterator(this.value); };
    /***
     *
     * @param from
     * @param to
     */
    AbstractList.prototype.subList = function (from, to) {
        if (to === undefined)
            to = from;
        this.value = this.value
            .slice(0, Math.abs(from))
            .concat(this.value.slice((to < 0 ? this.value.length - to : to) + 1, this.value.length));
        return this;
    };
    /***
     *
     */
    AbstractList.prototype.shift = function () { return this.value.shift(); };
    /***
     *
     */
    AbstractList.prototype.pop = function () { return this.value.pop(); };
    /***
     *
     */
    AbstractList.prototype.stream = function () { return new stream_1.Stream(this.value); };
    return AbstractList;
}(AbstractCollection));
exports.AbstractList = AbstractList;
/***
 * ArrayList<E>
 */
var ArrayList = /** @class */ (function (_super) {
    __extends(ArrayList, _super);
    /***
     *
     * @param value
     */
    function ArrayList(value) {
        return _super.call(this, value || new Array()) || this;
    }
    /****
     *
     */
    ArrayList.prototype.clone = function () {
        var out = new ArrayList(), itr = this.iterator();
        while (itr.hasNext())
            out.add(itr.next());
        return out;
    };
    /***
     *
     * @param value
     */
    ArrayList.prototype.add = function () {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        var tmp = new Iterator_1.Iterator(value);
        while (tmp.hasNext())
            this.value[this.value.length] = tmp.next();
        return true;
    };
    /**
     *
     */
    ArrayList.of = function (value) { return new ArrayList(value); };
    return ArrayList;
}(AbstractList));
exports.ArrayList = ArrayList;
/***
 * AbstractSet<E>
 */
var AbstractSet = /** @class */ (function (_super) {
    __extends(AbstractSet, _super);
    /**
     * @param value
     */
    function AbstractSet(value) {
        return _super.call(this, value) || this;
    }
    return AbstractSet;
}(AbstractCollection));
exports.AbstractSet = AbstractSet;
/**
 *
 */
var SetList = /** @class */ (function (_super) {
    __extends(SetList, _super);
    function SetList(value) {
        return _super.call(this, value) || this;
    }
    return SetList;
}(AbstractSet));
exports.SetList = SetList;
/***
 *
 */
var MapEntry = /** @class */ (function () {
    /***
     *
     * @param key
     * @param value
     */
    function MapEntry(key, value) {
        this.key = key;
        this.value = value;
    }
    /***
     *
     */
    MapEntry.prototype.getKey = function () { return this.key; };
    /***
     *
     */
    MapEntry.prototype.getValue = function () { return this.value; };
    return MapEntry;
}());
exports.MapEntry = MapEntry;
var AbstractMap = /** @class */ (function () {
    /***
     *
     * @param value
     */
    function AbstractMap(value) {
        /***
         *
         */
        this.value = null;
        this.length = 0;
        this.value = value;
    }
    /***
     *
     */
    AbstractMap.prototype.clear = function () { this.value = {}; };
    /***
     *
     * @param key
     */
    AbstractMap.prototype.containsKey = function (key) {
        return stream_1.Stream.of(this.keySet().toArray())
            .anyMatch(function (value) { return value === key; });
    };
    /****
     *
     * @param value
     */
    AbstractMap.prototype.containsValue = function (value) {
        return stream_1.Stream.of(this.entrySet().toArray())
            .anyMatch(function (map) { return map.getValue() === value; });
    };
    /***
     *
     */
    AbstractMap.prototype.keySet = function () {
        var out = new ArrayList();
        this.each(function (dummy, key) { out.add(key); });
        return new SetList(out.toArray());
    };
    /***
     *
     * @param o
     */
    AbstractMap.prototype.equals = function (o) { return this.value === o; };
    /***
     *
     * @param callback
     */
    AbstractMap.prototype.each = function (callback) {
        var tmp, ret;
        try {
            for (tmp in this.value)
                if ((ret = callback(this.value[tmp], tmp)))
                    break;
        }
        catch (e) {
            console.warn(e);
        }
        return ret;
    };
    /***
     *
     * @param key
     */
    AbstractMap.prototype.get = function (key) { this.length++; return this.value[key]; };
    /***
     *
     */
    AbstractMap.prototype.isEmpty = function () { return this.size() <= 0; };
    /***
     *
     */
    AbstractMap.prototype.entrySet = function () {
        var out = new ArrayList();
        this.each(function (value, key) { out.add(new MapEntry(key, value)); });
        return new SetList(out.toArray());
    };
    /***
     *
     * @param key
     * @param value
     */
    AbstractMap.prototype.put = function (key, value) { this.length++; return this.value[key] = value; };
    /***
     *
     * @param o
     */
    AbstractMap.prototype.remove = function (o) {
        var _this = this;
        return this.each(function (value, key) {
            if (String(o).equals(String(key))) {
                var find = value;
                delete _this.value[key];
                _this.length--;
                return find;
            }
        });
    };
    /***
     *
     */
    AbstractMap.prototype.size = function () { return this.length; };
    /***
     *
     * for get a ArrayList just cast this value
     * like (<ArrayList<T>>valueCollection())
     */
    AbstractMap.prototype.valueCollection = function () {
        var out = [];
        this.each(function (value) { out.push(value); });
        return new ArrayList(out);
    };
    /**
     *
     */
    AbstractMap.prototype.stream = function () { return new stream_1.ObjectStream(this.value); };
    return AbstractMap;
}());
exports.AbstractMap = AbstractMap;
var HashMap = /** @class */ (function (_super) {
    __extends(HashMap, _super);
    /**
     *
     * @param value
     */
    function HashMap(value) {
        return _super.call(this, value) || this;
    }
    /*
     *
     */
    HashMap.prototype.toJson = function () {
        var out = {}, tmp, itr = this.entrySet().iterator();
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
    };
    /***
     *
     */
    HashMap.of = function (value) { return new HashMap(value); };
    return HashMap;
}(AbstractMap));
exports.HashMap = HashMap;
//# sourceMappingURL=List.js.map