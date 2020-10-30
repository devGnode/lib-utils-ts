"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Optional = void 0;
const Predication_1 = require("./Predication");
const Exception_1 = require("./Exception");
class Optional {
    constructor(value) {
        this.value = null;
        this.value = value;
    }
    isPresent() { return this.value !== null && this.value !== undefined; }
    isEmpty() { return !this.isPresent(); }
    equals(obj) { return this.value === obj; }
    get() { return this.value; }
    map(callback) { return this.mapTo(callback); }
    mapTo(callback) {
        return new Optional(callback.call(null, this.value));
    }
    filter(predicate) {
        let state;
        if (predicate instanceof Predication_1.Predication)
            state = predicate.test(this.value);
        else
            state = predicate(this.value);
        return new Optional(state === true ? this.value : null);
    }
    orElse(other) { return !this.isEmpty() ? this.value : other; }
    orElseThrow(other) {
        if (!this.isEmpty())
            return this.value;
        throw other;
    }
    static of(value) {
        if (value === null)
            throw new Exception_1.NullPointerException("value is null");
        return new Optional(value);
    }
    static ofNullable(value) { return new Optional(value); }
}
exports.Optional = Optional;
//# sourceMappingURL=Optional.js.map