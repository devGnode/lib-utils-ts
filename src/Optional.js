"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Optional = void 0;
var Predication_1 = require("./Predication");
var Exception_1 = require("./Exception");
var Optional = /** @class */ (function () {
    function Optional(value) {
        this.value = null;
        this.value = value;
    }
    Optional.prototype.isPresent = function () { return this.value !== null && this.value !== undefined; };
    Optional.prototype.isEmpty = function () { return !this.isPresent(); };
    Optional.prototype.equals = function (obj) { return this.value === obj; };
    Optional.prototype.get = function () { return this.value; };
    Optional.prototype.map = function (callback) { return this.mapTo(callback); };
    Optional.prototype.mapTo = function (callback) {
        return new Optional(callback.call(null, this.value));
    };
    Optional.prototype.filter = function (predicate) {
        var state;
        if (predicate instanceof Predication_1.Predication)
            state = predicate.test(this.value);
        else
            state = predicate(this.value);
        return new Optional(state === true ? this.value : null);
    };
    Optional.prototype.orElse = function (other) { return !this.isEmpty() ? this.value : other; };
    Optional.prototype.orElseThrow = function (other) {
        if (!this.isEmpty())
            return this.value;
        throw other;
    };
    Optional.of = function (value) {
        if (value === null)
            throw new Exception_1.NullPointerException("value is null");
        return new Optional(value);
    };
    Optional.ofNullable = function (value) { return new Optional(value); };
    return Optional;
}());
exports.Optional = Optional;
//# sourceMappingURL=Optional.js.map