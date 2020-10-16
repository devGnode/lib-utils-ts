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
exports.ListIterator = exports.Iterator = void 0;
var Exception_1 = require("./Exception");
/***
 * @Iterator
 */
var Iterator = /** @class */ (function () {
    /***
     *
     * @param value
     */
    function Iterator(value) {
        /***
         *
         */
        this.iteration = 0;
        /***
         *
         */
        this.list = [];
        this.list = value;
    }
    /***
     *
     * @param key
     */
    Iterator.prototype.get = function (key) {
        if (this.list[key] === undefined)
            throw new Exception_1.NoSuchElementException("elements [ " + key + " ] is not defined");
        return this.list[key];
    };
    /***
     *
     */
    Iterator.prototype.hasNext = function () {
        return this.iteration + 1 <= this.list.length;
    };
    /***
     *
     */
    Iterator.prototype.next = function () {
        var key = this.iteration;
        this.iteration++;
        return this.get(key);
    };
    return Iterator;
}());
exports.Iterator = Iterator;
/***
 * @ListIterator
 */
var ListIterator = /** @class */ (function (_super) {
    __extends(ListIterator, _super);
    /***
     *
     * @param listIterate
     */
    function ListIterator(listIterate) {
        return _super.call(this, listIterate) || this;
    }
    /***
     *
     * @param e
     */
    ListIterator.prototype.add = function (e) {
        this.list[this.iteration++] = e;
    };
    ;
    /***
     *
     */
    ListIterator.prototype.hasPrevious = function () {
        try {
            this.get(this.iteration - 1);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    /***
     *
     */
    ListIterator.prototype.nextIndex = function () {
        try {
            this.get(this.iteration);
            return this.iteration;
        }
        catch (e) {
            return null;
        }
    };
    ;
    /***
     *
     */
    ListIterator.prototype.previous = function () {
        this.iteration--;
        return this.get(this.iteration);
    };
    /***
     *
     * @param e
     */
    ListIterator.prototype.set = function (e) {
        this.list[this.iteration - 1] = e;
    };
    return ListIterator;
}(Iterator));
exports.ListIterator = ListIterator;
//# sourceMappingURL=Iterator.js.map