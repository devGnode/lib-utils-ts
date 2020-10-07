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
exports.HashMap = exports.LinkedList = exports.ArrayList = void 0;
var Exception_1 = require("./Exception");
var stream_1 = require("./stream");
var Iterator_1 = require("./Iterator");
var AbstractArrayList = /** @class */ (function () {
    function AbstractArrayList(list) {
        if (list === void 0) { list = null; }
        this.list = null;
        this.list = list;
    }
    AbstractArrayList.prototype.get = function (key) {
        if (key === void 0) { key = 0; }
        if (this.list[key] === undefined)
            throw new Exception_1.indexOfBoundException(key + " not found");
        return this.list[key];
    };
    AbstractArrayList.prototype.clear = function () { this.list = []; };
    AbstractArrayList.prototype.size = function () { var _a; return (_a = this.list) === null || _a === void 0 ? void 0 : _a.length; };
    AbstractArrayList.prototype.isEmpty = function () { return this.size() === 0; };
    AbstractArrayList.prototype.stream = function () { return new stream_1.Stream(this.list); };
    AbstractArrayList.prototype.remove = function (from, to) {
        if (to === undefined)
            to = from;
        this.list = this.list
            .slice(0, Math.abs(from))
            .concat(this.list.slice((to < 0 ? this.list.length - to : to) + 1, this.list.length));
    };
    AbstractArrayList.prototype.iterator = function () {
        return new Iterator_1.Iterator(this.list);
    };
    AbstractArrayList.prototype.listIterator = function (index) {
        return new Iterator_1.ListIterator(this.list);
    };
    AbstractArrayList.prototype.contains = function (o) {
        var itr = this.iterator();
        while (itr.hasNext())
            if (itr.next() === o)
                return true;
        return false;
    };
    AbstractArrayList.prototype.indexOf = function (object) {
        var itr = this.listIterator();
        while (itr.hasNext())
            if (itr.next() === object)
                return itr.nextIndex() - 1;
        return null;
    };
    AbstractArrayList.prototype.clone = function () {
        var out = new ArrayList(), itr = this.iterator();
        while (itr.hasNext())
            out.add(itr.next());
        return out;
    };
    AbstractArrayList.prototype.toArray = function () {
        return this.list;
    };
    AbstractArrayList.prototype.set = function (key, value) {
        this.get(key); // if not exists will be throw an exception
        this.list[key] = value;
        return value;
    };
    AbstractArrayList.of = function (list) { return new ArrayList(list); };
    AbstractArrayList.prototype.toString = function () {
        var out = "", tmp;
        for (tmp in this.list) {
            var name_1 = void 0;
            if (typeof this.list[tmp] == 'object')
                name_1 = "Object@" + (this.list[tmp].constructor ? this.list[tmp].constructor.name : typeof this.list[tmp]);
            out += tmp + " = " + name_1 + ", ";
        }
        out = out.replace(/\,\s*$/, "");
        return "[ " + out + " ]";
    };
    return AbstractArrayList;
}());
var ArrayList = /** @class */ (function (_super) {
    __extends(ArrayList, _super);
    function ArrayList(list) {
        return _super.call(this, list || new Array()) || this;
    }
    // @ts-ignore
    ArrayList.prototype.add = function () {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        var tmp = new Iterator_1.Iterator(value);
        while (tmp.hasNext())
            this.list[this.list.length] = tmp.next();
    };
    return ArrayList;
}(AbstractArrayList));
exports.ArrayList = ArrayList;
/***
 * LinkedList
 */
var LinkedList = /** @class */ (function () {
    /***
     * Constructor
     */
    function LinkedList() {
        this.list = { length: 0 };
        this.length = 0;
        this.list = { length: 0 };
    }
    LinkedList.prototype.put = function (key, value) { this.list[key] = value; };
    LinkedList.prototype.delete = function (key) { delete this.list[key]; };
    LinkedList.prototype.count = function () {
        var count = 0;
        this.each(function () { count++; });
        return count;
    };
    LinkedList.prototype.each = function (callback) {
        var tmp;
        try {
            for (tmp in this.list)
                if (!tmp.equals("length"))
                    callback(this.list[tmp], tmp);
        }
        catch (e) {
        }
    };
    LinkedList.prototype.clear = function () { this.list = { length: 0 }; };
    LinkedList.of = function (list) {
        var out = new LinkedList();
        for (var tmp in list)
            out.put(tmp, list[tmp]);
        return out;
    };
    LinkedList.prototype.get = function (key) { return this.list[key]; };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
var HashMap = /** @class */ (function (_super) {
    __extends(HashMap, _super);
    function HashMap() {
        return _super.call(this) || this;
    }
    HashMap.of = function (list) {
        var out = new HashMap();
        for (var tmp in list)
            out.put(tmp, list[tmp]);
        return out;
    };
    return HashMap;
}(LinkedList));
exports.HashMap = HashMap;
//# sourceMappingURL=List.js.map